import { getUserPayouts, getUserRewards } from "@/api";
import type { Payout, Reward } from "@/api";
import { formatDollars } from "@/helpers";
import HistoryEvent from "@/components/HistoryEvent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUser } from "@/api";

export type HistoryItem = {
  type: "PAYOUT" | "REWARD";
  payout?: Payout;
  reward?: Reward;
};

const combineHistoryItems = (
  payouts: Payout[],
  rewards: Reward[]
): HistoryItem[] => {
  if (payouts.length === 0 && rewards.length === 0) {
    return [];
  }
  if (payouts.length === 0) {
    return rewards.map((reward) => ({
      type: "REWARD",
      reward,
    }));
  }
  if (rewards.length === 0) {
    return payouts.map((payout) => ({
      type: "PAYOUT",
      payout,
    }));
  }

  let historyItems: HistoryItem[] = [];

  let payoutsIndex = 0;
  let rewardsIndex = 0;

  while (payoutsIndex < payouts.length && rewardsIndex < rewards.length) {
    const payout = payouts[payoutsIndex];
    const reward = rewards[rewardsIndex];

    if (payout.updatedAt >= reward.updatedAt) {
      historyItems.push({
        type: "PAYOUT",
        payout,
      });
      payoutsIndex++;
    } else {
      historyItems.push({
        type: "REWARD",
        reward,
      });
      rewardsIndex++;
    }
  }

  if (payoutsIndex < payouts.length) {
    historyItems = historyItems.concat(
      payouts.slice(payoutsIndex).map((payout) => ({
        type: "PAYOUT",
        payout,
      }))
    );
  }

  if (rewardsIndex < rewards.length) {
    historyItems = historyItems.concat(
      rewards.slice(rewardsIndex).map((reward) => ({
        type: "REWARD",
        reward,
      }))
    );
  }

  return historyItems;
};

const Rewards = async () => {
  const userId = cookies().get("firebaseUid")?.value || "";
  const user = await getUser(userId);

  if (!user.name) {
    redirect("/setup");
  }

  const { data: payouts } = await getUserPayouts(userId);
  const { data: rewards } = await getUserRewards(userId);

  const totalEarned = rewards.reduce((acc, { amount }) => acc + amount, 0);
  const historyItems = combineHistoryItems(payouts, rewards);

  return (
    <div className="max-w-2xl m-auto">
      <div className="w-full max-w-96 m-auto bg-[#432529] p-8 pb-12 rounded-3xl text-center mb-8">
        <h1 className="text-2xl font-medium mb-8">Total Earned</h1>
        <p className="text-6xl font-bold">{formatDollars(totalEarned)}</p>
      </div>

      <div>
        <h1 className="text-3xl font-medium mb-4">History</h1>
        {historyItems.length === 0 && (
          <p className="text-gray-400">Refer others to earn rewards.</p>
        )}
        {historyItems.map(({ type, reward, payout }: HistoryItem, index) => (
          <HistoryEvent
            key={
              (reward?.id && `r${reward.id}`) || (payout?.id && `p${payout.id}`)
            }
            userId={userId}
            type={type}
            reward={reward}
            payout={payout}
            hideLine={index === historyItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Rewards;
