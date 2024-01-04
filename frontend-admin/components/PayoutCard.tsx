"use client";

import { useState } from "react";
import { CheckIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import type { Payout } from "@/api";
import { updatePayout } from "@/api";

const PayoutCard = ({
  payout,
  visible,
}: {
  payout: Payout;
  visible: boolean;
}) => {
  const [done, setDone] = useState(false);

  const markAsDone = async () => {
    await updatePayout(payout.id, { status: "PAID" });
    setDone(true);
  };
  const markAsNotDone = async () => {
    await updatePayout(payout.id, { status: "UNPAID" });
    setDone(false);
  };

  return (
    <div
      className={`${
        !visible && "hidden"
      } bg-white grow rounded-3xl shadow-lg p-12 text-black text-lg relative`}
    >
      <h1 className="text-3xl font-medium mb-4 mr-8 inline-block">
        Payout {payout.id}
      </h1>
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
    </div>
  );
};

export default PayoutCard;
