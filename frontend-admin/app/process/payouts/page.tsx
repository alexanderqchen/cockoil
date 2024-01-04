import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CardSlider from "@/components/CardSlider";
import { getPayouts } from "@/api";

const ProcessPayouts = async () => {
  const { count, data: descPayouts } = await getPayouts({ status: "UNPAID" });
  const payouts = descPayouts.reverse();

  return (
    <div className="text-gray-500 bg-slate-100 w-screen h-screen flex flex-col justify-between">
      <div className="flex justify-between p-4 pb-12">
        <h1 className="text-2xl">Process Payouts</h1>
        <Link href="/payouts">
          <XMarkIcon className="h-8 w-8" />
        </Link>
      </div>

      <CardSlider type="PAYOUT" payouts={payouts} count={count} />
    </div>
  );
};

export default ProcessPayouts;
