"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { getIdFromUrl, formatItemUrl } from "@/helpers";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const ScanItems = ({ totalItemCount }: { totalItemCount: number }) => {
  // TODO: disable save button unless the item counts match
  // TODO: create item objects when you click save
  // TODO: show qrs with item on save
  // TODO: allow reset items

  const [scanAddInput, setScanAddInput] = useState("");
  const [scanRemoveInput, setScanRemoveInput] = useState("");
  const [items, setItems] = useState([] as string[]);

  const addItem = (itemId: string) => {
    setItems((prev) => {
      if (!items.includes(itemId)) {
        return [...prev, itemId];
      }
      return prev;
    });
    setScanAddInput("");
  };
  const removeItem = (itemId: string) => {
    setItems((prev) => {
      const newItems = [...prev];
      const index = newItems.indexOf(itemId);
      return newItems.splice(index, 1);
    });
    setScanRemoveInput("");
  };

  return (
    <>
      <h2 className="font-bold mb-2">Scan Items</h2>
      <form
        className="flex items-center justify-between gap-4 mb-2"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const itemId = getIdFromUrl(scanAddInput);
            addItem(itemId);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <input
          className="border-2 rounded-md px-4 leading-10 grow"
          value={scanAddInput}
          onChange={(e) => setScanAddInput(e.target.value)}
        />
        <button
          type="submit"
          className="border-2 px-4 py-1 rounded-md text-green-600 leading-10"
        >
          Add
        </button>
      </form>
      <form
        className="flex items-center justify-between gap-4 mb-4"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const itemId = getIdFromUrl(scanAddInput);
            removeItem(itemId);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <input
          className="border-2 rounded-md px-4 leading-10 grow"
          value={scanRemoveInput}
          onChange={(e) => setScanRemoveInput(e.target.value)}
        />
        <button
          type="submit"
          className="border-2 px-4 py-1 rounded-md text-red-600 leading-10"
        >
          Remove
        </button>
      </form>
      <div>
        {items.map((itemId) => (
          <QRCode
            className="w-1/5 h-auto inline-block mr-4 mb-4"
            value={formatItemUrl(itemId)}
          />
        ))}
      </div>
      <button
        className={`w-full bg-blue-600 leading-10 py-1 text-white rounded-md mb-2 ${
          items.length !== totalItemCount && "bg-slate-400 cursor-not-allowed"
        }`}
      >
        Save
      </button>
      <p className="text-sm text-gray-600 flex items-center gap-1">
        <InformationCircleIcon className="h-5 w-5" />
        QR count must equal item count to save
      </p>
    </>
  );
};

export default ScanItems;
