import Link from "next/link";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const ProcessOrders = () => (
  <div className="text-gray-500 bg-slate-100 w-screen h-screen flex flex-col justify-between">
    <div className="flex justify-between p-4 pb-12">
      <h1 className="text-2xl">Process Orders</h1>
      <Link href="/orders">
        <XMarkIcon className="h-8 w-8" />
      </Link>
    </div>
    <div className="grow flex justify-between gap-8">
      <button className="bg-white w-20 rounded-r-3xl opacity-60 flex items-center justify-center scale-90 -translate-x-1 hover:opacity-100 hover:shadow-lg hover:scale-100 hover:translate-x-0 transition ease-in-out duration-200">
        <ChevronLeftIcon className="h-12 w-12" />
      </button>
      <div className="bg-white grow rounded-3xl shadow-lg">asdf</div>
      <button className="bg-white w-20 rounded-l-3xl opacity-60 flex items-center justify-center scale-90 translate-x-1 hover:opacity-100 hover:shadow-lg hover:scale-100 hover:translate-x-0 transition ease-in-out duration-200">
        <ChevronRightIcon className="h-12 w-12" />
      </button>
    </div>
    <p className="text-lg text-center p-12">1 of 23 Orders</p>
  </div>
);

export default ProcessOrders;
