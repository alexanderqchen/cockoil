"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { keyBy } from "lodash";
import { CheckIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import type { Order } from "@/api";
import productList from "@/constants/products.json";
import {
  updateOrderAction as updateOrder,
  getOrderAction as getOrder,
} from "@/app/actions";
import ScanItems from "@/components/ScanItems";
import { formatItemUrl, getNumQrRequired } from "@/helpers";
import Modal from "@/components/Modal";

const products = keyBy(productList, "id");

const OrderCard = ({ order, visible }: { order: Order; visible: boolean }) => {
  const [done, setDone] = useState(false);
  const [internalItems, setInternalItems] = useState(order.internalItems);
  const [modalVisible, setModalVisible] = useState(false);

  const numQrRequired = getNumQrRequired(order.shopifyItems);

  const updateInternalItems = async () => {
    const updatedOrder = await getOrder(order.id);
    setInternalItems(updatedOrder.internalItems);
  };

  const markAsDone = async () => {
    await updateOrder(order.id, { status: "COMPLETED" });
    setDone(true);
  };
  const markAsNotDone = async () => {
    await updateOrder(order.id, { status: "PENDING" });
    setDone(false);
  };

  const itemCounts: { [id: string]: number } = {};

  order.shopifyItems.forEach((item) => {
    if (!(item in itemCounts)) {
      itemCounts[item] = 0;
    }

    itemCounts[item]++;
  });

  return (
    <div
      className={`${
        !visible && "hidden"
      } bg-white grow rounded-3xl shadow-lg p-12 text-black text-2xl relative`}
    >
      <h1 className="text-3xl font-medium mb-4 mr-8 inline-block">
        Order {order.id}
      </h1>
      <p className="mb-4 inline-block text-lg">
        <span className="font-medium">Shopify ID:</span>{" "}
        <a
          href={`https://admin.shopify.com/store/cockoil/orders?query=${order.shopifyOrderId}`}
          className="text-blue-600 underline"
          target="_blank"
        >
          {order.shopifyOrderId}
        </a>
      </p>
      {done ? (
        <div className="group absolute top-4 right-8 w-auto">
          <button className="group-hover:hidden text-green-600 flex items-center gap-2">
            <CheckCircleIcon className="h-6 w-6 inline" />
            Done
          </button>
          <button
            onClick={() => markAsNotDone()}
            className="hidden group-hover:block text-red-400"
          >
            Mark as not done
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            if (internalItems.length !== numQrRequired) {
              setModalVisible(true);
            } else {
              markAsDone();
            }
          }}
          className="z-10 absolute top-4 right-8 text-blue-600 flex items-center gap-2 hover:text-blue-400"
        >
          <CheckIcon className="h-6 w-6 inline" />
          Mark as done
        </button>
      )}

      <div className="flex gap-8">
        <div className="w-1/2">
          <ScanItems
            numQrRequired={numQrRequired}
            orderId={order.id}
            internalItems={internalItems}
            updateInternalItems={updateInternalItems}
          />
        </div>
        <div className="w-1/2 bg-slate-100 p-8 rounded-3xl">
          <div className="mb-8">
            <h2 className="font-bold mb-2">Items</h2>
            {Object.keys(itemCounts).map((itemId) => (
              <p key={itemId}>
                {itemCounts[itemId]} x {products[itemId].title}
              </p>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="font-bold mb-2">Shipping Info</h2>
            <p>{order.shippingName}</p>
            <p>{order.shippingAddress1}</p>
            <p>{order.shippingAddress2}</p>
            <p>
              {order.shippingCity}, {order.shippingState} {order.shippingZip}
            </p>
            <p>{order.shippingPhone}</p>
          </div>

          <div>
            <h2 className="font-bold">Associated QR Codes</h2>
            <p
              className={`text-base mb-2 ${
                internalItems.length !== numQrRequired && "text-red-600"
              }`}
            >
              {numQrRequired > 0
                ? `Associated ${internalItems.length}/${numQrRequired} QR codes`
                : `No QR codes required`}
            </p>
            <div>
              {internalItems.map((item) => (
                <QRCode
                  key={item.id}
                  className="w-12 h-auto inline-block mr-4 mb-4"
                  value={formatItemUrl(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={modalVisible}
        title="Are you sure?"
        body={`You scanned ${internalItems.length} items, but ${numQrRequired} are required.`}
        onOk={async () => await markAsDone()}
        onCancel={() => setModalVisible(false)}
        okText="Mark as done"
        cancelText="Cancel"
      />
    </div>
  );
};

export default OrderCard;
