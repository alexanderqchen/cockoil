"use client";

import { useState } from "react";
import { ArrowUpTrayIcon, ClipboardIcon } from "@heroicons/react/24/outline";

import Toast from "./Toast";

const ShareButton = ({ url }: { url: string }) => {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
          navigator.clipboard.writeText(url);
        }}
        className="flex items-center gap-2 font-medium m-auto"
      >
        <ArrowUpTrayIcon className="size-6" />
        <p>Share with Friends</p>
      </button>
      <Toast visible={showToast}>
        <ClipboardIcon className="size-6" />
        Copied to clipboard{" "}
      </Toast>
    </div>
  );
};

export default ShareButton;
