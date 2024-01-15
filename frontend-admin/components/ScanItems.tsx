"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { getIdFromUrl, formatItemUrl } from "@/helpers";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { updateOrderAction as updateOrder } from "@/app/actions";
import LoadingCircle from "@/components/LoadingCircle";
import type { Item } from "@/api";
import { isEqual } from "lodash";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const ScanItems = ({
  orderId,
  internalItems,
  updateInternalItems,
  numQrRequired,
}: {
  numQrRequired: number;
  orderId: number;
  internalItems: Item[];
  updateInternalItems: () => Promise<void>;
}) => {
  const [scanAddInput, setScanAddInput] = useState("");
  const [scanRemoveInput, setScanRemoveInput] = useState("");
  const [items, setItems] = useState(internalItems.map(({ id }) => id));
  const [loading, setLoading] = useState(false);

  const itemsUpToDate = isEqual(
    internalItems.map(({ id }) => id),
    items
  );
  const buttonDisabled =
    items.length !== numQrRequired || loading || itemsUpToDate;

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
      if (index !== -1) {
        newItems.splice(index, 1);
      }
      return newItems;
    });
    setScanRemoveInput("");
  };

  const handleSave = async (items: string[]) => {
    setLoading(true);
    try {
      const response = await updateOrder(orderId, { internalItemIds: items });

      if (!response.error) {
        const order = await updateInternalItems();
        setLoading(false);
      } else {
        throw response.error;
      }
    } catch (error) {
      console.log(error);
    }
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
            const itemId = getIdFromUrl(scanRemoveInput);
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
            key={itemId}
            className="w-12 h-auto inline-block mr-4 mb-4"
            value={formatItemUrl(itemId)}
          />
        ))}
      </div>
      <button
        onClick={() => handleSave(items)}
        className={`w-full bg-blue-600 leading-10 py-1 text-white rounded-md mb-2 flex items-center justify-center gap-1 ${
          buttonDisabled && "bg-slate-400 cursor-not-allowed"
        }`}
        disabled={buttonDisabled}
      >
        {loading && <LoadingCircle />}
        {itemsUpToDate ? (
          <>
            <CheckCircleIcon className="h-6 inline" />
            Up to Date
          </>
        ) : (
          "Save"
        )}
      </button>
      {!itemsUpToDate && items.length !== numQrRequired && (
        <p className="text-sm text-gray-600 flex items-center gap-1">
          <InformationCircleIcon className="h-5 w-5" />
          You must have {numQrRequired} QR code(s) to save
        </p>
      )}
    </>
  );
};

export default ScanItems;
