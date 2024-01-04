import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CardSlider from "@/components/CardSlider";
import { getOrders } from "@/api";

const ProcessOrders = async () => {
  const { count, data: descOrders } = await getOrders({ status: "PENDING" });
  const orders = descOrders.reverse();

  return (
    <div className="text-gray-500 bg-slate-100 w-screen h-screen flex flex-col justify-between">
      <div className="flex justify-between p-4 pb-12">
        <h1 className="text-2xl">Process Orders</h1>
        <Link href="/orders">
          <XMarkIcon className="h-8 w-8" />
        </Link>
      </div>

      <CardSlider orders={orders} count={count} />
    </div>
  );
};

export default ProcessOrders;
