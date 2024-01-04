"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import OrderCard from "@/components/OrderCard";
import type { Order } from "@/api";

const CardSlider = ({ orders, count }: { orders: Order[]; count: number }) => {
  const [cardIndex, setCardIndex] = useState(0);

  return (
    <>
      <div className="grow flex justify-between gap-8">
        <button
          onClick={() => setCardIndex((prev) => Math.max(prev - 1, 0))}
          className={`${
            cardIndex <= 0 && "invisible"
          } bg-white w-20 rounded-r-3xl opacity-60 flex items-center justify-center scale-90 -translate-x-1 hover:opacity-100 hover:shadow-lg hover:scale-100 hover:translate-x-0 transition ease-in-out duration-200`}
        >
          <ChevronLeftIcon className="h-12 w-12" />
        </button>

        {orders.map((order, i) => (
          <OrderCard key={order.id} order={order} display={i === cardIndex} />
        ))}

        <button
          onClick={() => setCardIndex((prev) => Math.min(prev + 1, count - 1))}
          className={`${
            cardIndex >= count - 1 && "invisible"
          } bg-white w-20 rounded-l-3xl opacity-60 flex items-center justify-center scale-90 translate-x-1 hover:opacity-100 hover:shadow-lg hover:scale-100 hover:translate-x-0 transition ease-in-out duration-200`}
        >
          <ChevronRightIcon className="h-12 w-12" />
        </button>
      </div>
      <p className="text-lg text-center p-12">
        {cardIndex + 1} of {count} Orders
      </p>
    </>
  );
};

export default CardSlider;
