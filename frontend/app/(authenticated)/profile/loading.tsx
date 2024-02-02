import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const Profile = async () => {
  return (
    <div className="text-center max-w-2xl m-auto">
      <div className="bg-gray-600 animate-pulse w-48 m-auto rounded-md">
        <h1 className="text-4xl font-bold mb-4 invisible">Name</h1>
      </div>

      <div className="bg-gray-600 w-full max-w-96 m-auto h-0 pb-[min(calc(100%-1rem),23rem)] rounded-3xl border-8 border-[#432529] mb-4 animate-pulse" />
      <div className="flex items-center gap-8 mb-4">
        <div className="h-px bg-white grow" />
        <p>or</p>
        <div className="h-px bg-white grow" />
      </div>

      <div className="mb-8">
        <button className="flex items-center gap-2 font-medium m-auto">
          <ArrowUpTrayIcon className="size-6" />
          <p>Share with Friends</p>
        </button>
      </div>

      <div className="text-left">
        <h2 className="mb-4 text-2xl font-bold">Apparel QR Codes</h2>
        <div className="p-1 bg-gray-600 w-16 h-16 inline-block mr-4 mb-4 rounded-md animate-pulse" />
        <div className="p-1 bg-gray-600 w-16 h-16 inline-block mr-4 mb-4 rounded-md animate-pulse" />
        <div className="p-1 bg-gray-600 w-16 h-16 inline-block mr-4 mb-4 rounded-md animate-pulse" />
      </div>
    </div>
  );
};

export default Profile;
