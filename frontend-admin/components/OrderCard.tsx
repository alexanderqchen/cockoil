"use client";

import { useState } from "react";
import { keyBy } from "lodash";
import { CheckIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import type { Order } from "@/api";
import productList from "@/constants/products.json";
import { updateOrderAction as updateOrder } from "@/app/actions";
import ScanItems from "@/components/ScanItems";

const products = keyBy(productList, "id");

const OrderCard = ({ order, visible }: { order: Order; visible: boolean }) => {
  const [done, setDone] = useState(false);

  const markAsDone = async () => {
    await updateOrder(order.id, { status: "COMPLETED" });
    setDone(true);
  };
  const markAsNotDone = async () => {
    await updateOrder(order.id, { status: "PENDING" });
    setDone(false);
  };

  const itemCounts: { [id: string]: number } = {};

  order.items.forEach((item) => {
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
          onClick={() => markAsDone()}
          className="z-10 absolute top-4 right-8 text-blue-600 flex items-center gap-2 hover:text-blue-400"
        >
          <CheckIcon className="h-6 w-6 inline" />
          Mark as done
        </button>
      )}

      <div className="flex gap-8">
        <div className="w-1/2">
          <ScanItems totalItemCount={order.items.length} />
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
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
