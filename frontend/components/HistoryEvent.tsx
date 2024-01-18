import type { Payout, Reward } from "@/api";
import { formatDate, formatDollars } from "@/helpers";
import { ReactNode } from "react";
import { keyBy } from "lodash";
import productList from "@/constants/products.json";

const products = keyBy(productList, "id");

const Event = ({
  date,
  title,
  description,
  icon,
  hideLine,
}: {
  date: string;
  title: string;
  description: ReactNode;
  icon: string;
  hideLine?: boolean;
}) => (
  <div className="mb-2 flex gap-4">
    <div className=" shrink-0 relative flex justify-start items-center flex flex-col">
      <div className="rounded-full bg-[#432529] border-[#EB5757] border-2 size-12 flex items-center justify-center mb-2 shrink-0">
        <p className="text-xl">{icon}</p>
      </div>
      {!hideLine && <div className="min-h-4 h-full w-[2px] bg-gray-400" />}
    </div>
    <div>
      <p className="text-gray-400 text-sm">{date}</p>
      <p className="text-xl font-medium">{title}</p>
      {description}
    </div>
  </div>
);

const HistoryEvent = ({
  type,
  reward,
  payout,
  hideLine,
}: {
  type: "REWARD" | "PAYOUT";
  reward?: Reward;
  payout?: Payout;
  hideLine: boolean;
}) => {
  if (type === "REWARD" && reward) {
    const itemCounts: { [id: string]: number } = {};
    reward.createdFrom.shopifyItems.forEach((item) => {
      if (!(item in itemCounts)) {
        itemCounts[item] = 0;
      }

      itemCounts[item]++;
    });

    return (
      <Event
        date={formatDate(reward.updatedAt)}
        title={`You earned ${formatDollars(reward.amount)}`}
        description={
          <>
            <p>Someone used your code to buy:</p>
            {Object.keys(itemCounts).map((itemId) => (
              <p key={itemId}>
                {itemCounts[itemId]} x {products[itemId].title}
              </p>
            ))}
          </>
        }
        icon="💰"
        hideLine={hideLine}
      />
    );
  }

  if (type === "PAYOUT" && payout) {
    const payoutMonth = new Date(payout.updatedAt).toLocaleDateString("en-US", {
      month: "long",
    });

    return (
      <Event
        date={formatDate(payout.updatedAt)}
        title={`You got paid ${formatDollars(payout.amount)}`}
        description={`${payoutMonth} rewards sent through ${payout.payoutMethod} to ${payout.payoutUsername}`}
        icon="🏦"
        hideLine={hideLine}
      />
    );
  }

  return null;
};

export default HistoryEvent;
