"use client";

import { useState, useEffect } from "react";
import { keyBy } from "lodash";
import { CheckIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import type { Order } from "@/api";
import productList from "@/constants/products.json";
import { updateOrder } from "@/api";

const products = keyBy(productList, "id");

const OrderCard = ({ order, display }: { order: Order; display: boolean }) => {
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
        !display && "hidden"
      } bg-white grow rounded-3xl shadow-lg p-12 text-black text-lg relative`}
    >
      <h1 className="text-3xl font-medium mb-4 mr-8 inline-block">
        Order {order.id}
      </h1>
      <p className="mb-4 inline-block">
        <span className="font-medium">Shopify ID:</span> {order.shopifyOrderId}
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

      <h2 className="font-bold">Items</h2>
      {Object.keys(itemCounts).map((itemId) => (
        <p key={itemId}>
          {itemCounts[itemId]} x {products[itemId].title}
        </p>
      ))}
    </div>
  );
};

export default OrderCard;
