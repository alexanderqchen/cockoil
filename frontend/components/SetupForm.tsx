"use client";

import { useState } from "react";
import { updateUserAction as updateUser } from "@/app/actions";
import LoadingCircle from "@/components/LoadingCircle";
import Toast from "@/components/Toast";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { navigateToProfile } from "@/app/actions";

const SetupForm = ({ userId }: { userId: string }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-medium mb-8 text-center">Account Setup</h1>
      <div className="text-xl leading-10 mb-8">
        <label>What is your name?</label>
        <input
          className="w-full bg-[#28282F] rounded-md px-4 mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button
        onClick={async () => {
          setLoading(true);
          const res = await updateUser(userId, {
            name,
          });

          if (res.error) {
            setLoading(false);
            setShowErrorToast(true);
            setTimeout(() => {
              setShowErrorToast(false);
            }, 2000);
          } else {
            setLoading(false);
            navigateToProfile();
          }
        }}
        className={`w-full bg-[#432529] rounded-md h-10 font-medium ${
          loading && "bg-gray-700 cursor-not-allowed"
        }`}
        disabled={loading}
      >
        {loading && <LoadingCircle />}
        FINISH
      </button>

      <Toast visible={showErrorToast}>
        <XCircleIcon className="size-6" />
        Save failed
      </Toast>
    </div>
  );
};

export default SetupForm;
