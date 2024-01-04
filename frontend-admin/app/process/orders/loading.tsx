import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SkeletonCardSlider from "@/components/SkeletonCardSlider";

const Loading = async () => {
  return (
    <div className="text-gray-500 bg-slate-100 w-screen h-screen flex flex-col justify-between">
      <div className="flex justify-between p-4 pb-12">
        <h1 className="text-2xl">Process Orders</h1>
        <Link href="/orders">
          <XMarkIcon className="h-8 w-8" />
        </Link>
      </div>

      <SkeletonCardSlider itemName="Orders" />
    </div>
  );
};

export default Loading;
