import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const SkeletonCardSlider = ({ itemName }: { itemName: string }) => {
  return (
    <>
      <div className="grow flex justify-between gap-8 animate-pulse">
        <button className="invisible bg-white w-20 rounded-r-3xl opacity-60 flex items-center justify-center scale-90 -translate-x-1 hover:opacity-100 hover:shadow-lg hover:scale-100 hover:translate-x-0 transition ease-in-out duration-200">
          <ChevronLeftIcon className="h-12 w-12" />
        </button>

        <div className="bg-slate-300 grow rounded-3xl shadow-lg p-12 text-black text-lg relative" />

        <button className="invisible bg-white w-20 rounded-l-3xl opacity-60 flex items-center justify-center scale-90 translate-x-1 hover:opacity-100 hover:shadow-lg hover:scale-100 hover:translate-x-0 transition ease-in-out duration-200">
          <ChevronRightIcon className="h-12 w-12" />
        </button>
      </div>
      <p className="text-lg text-center p-12">1 of 0 {itemName}</p>
    </>
  );
};

export default SkeletonCardSlider;
