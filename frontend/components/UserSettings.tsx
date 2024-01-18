"use client";

import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import type { User } from "@/api";
import { updateUserAction as updateUser } from "@/app/actions";
import Toast from "./Toast";
import LoadingCircle from "./LoadingCircle";

const UserSettings = ({ user }: { user: User }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email);
  const [payoutMethod, setPayoutMethod] = useState(
    user.payoutMethod || "PAYPAL"
  );
  const [payoutUsername, setPayoutUsername] = useState(
    user.payoutUsername || ""
  );
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  return (
    <>
      <label>Name</label>
      <input
        className="w-full bg-[#28282F] rounded-md px-4 mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email</label>
      <input
        className="w-full bg-[#28282F] rounded-md px-4 mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Payout Method</label>
      <select
        className="w-full bg-[#28282F] rounded-md px-4 h-10 border-r-8 border-transparent mb-2"
        value={payoutMethod}
        onChange={(e) => setPayoutMethod(e.target.value)}
      >
        <option value="PAYPAL">PayPal</option>
        <option value="VENMO">Venmo</option>
        <option value="CASHAPP">CashApp</option>
      </select>
      <label>PayPal Handle</label>
      <input
        className="w-full bg-[#28282F] rounded-md px-4 mb-8"
        value={payoutUsername}
        onChange={(e) => setPayoutUsername(e.target.value)}
      />
      <button
        onClick={async () => {
          setLoading(true);
          const res = await updateUser(user.id, {
            name,
            email,
            payoutMethod,
            payoutUsername,
          });
          console.log(res);
          if (res.error) {
            setLoading(false);
            setShowErrorToast(true);
            setTimeout(() => {
              setShowErrorToast(false);
            }, 2000);
          } else {
            setLoading(false);
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 2000);
          }
        }}
        className={`w-full bg-[#432529] rounded-md h-10 font-medium ${
          loading && "bg-gray-700 cursor-not-allowed"
        }`}
        disabled={loading}
      >
        {loading && <LoadingCircle />}
        SAVE
      </button>

      <Toast visible={showToast}>Settings saved</Toast>
      <Toast visible={showErrorToast}>
        <XCircleIcon className="size-6" />
        Save failed
      </Toast>
    </>
  );
};
export default UserSettings;
