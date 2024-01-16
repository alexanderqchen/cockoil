"use client";

import QRCode from "react-qr-code";
import { formatItemUrl } from "@/helpers";
import Modal from "@/components/Modal";
import {
  registerItemAction as registerItem,
  navigateToProfile,
} from "@/app/actions";

const RegisterProductModal = ({
  itemId,
  userId,
}: {
  itemId: string;
  userId: string;
}) => {
  return (
    <Modal
      visible={true}
      title="Register Product"
      body={
        <div>
          <p className="mb-4">
            Register this product to earn rewards when others purchase items
            using this QR code.
          </p>
          <QRCode
            className="w-12 h-auto inline mr-4 mb-4"
            value={formatItemUrl(itemId)}
          />
        </div>
      }
      onOk={async () => {
        await registerItem(itemId, userId);
        navigateToProfile();
      }}
      onCancel={() => navigateToProfile()}
      okText="Register"
      cancelText="Cancel"
    />
  );
};

export default RegisterProductModal;
