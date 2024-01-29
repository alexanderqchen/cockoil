import { fetchShopify } from "../helpers/fetch";
import type { PrismaClient } from "@prisma/client";
import { generateReferralCode } from "./referrals";
import { getUserFromReferralCode } from "../helpers/referrals";

export const createDiscountCode = async (userId: string) => {
  const discountCode = generateReferralCode(userId);

  const response = await fetchShopify(
    "/admin/api/2024-01/price_rules/1582841692401/discount_codes.json",
    "POST",
    { discount_code: { code: discountCode } }
  );

  return response;
};

export const doesShopifyOrderExist = async (
  shopifyOrderId: number,
  prisma: PrismaClient
) => {
  const order = await prisma.order.findUnique({
    where: {
      shopifyOrderId: shopifyOrderId.toString(),
    },
  });

  return !!order;
};

type DiscountCode = {
  code: string;
};

export const getReferredByForOrder = (
  discount_codes: DiscountCode[],
  prisma: PrismaClient
) => {
  let referredBy = null;

  const discountCode = discount_codes.find(
    ({ code }: { code: string }) => code.split("_")[0] === "xrefer"
  );
  if (discountCode) {
    referredBy = getUserFromReferralCode(discountCode.code, prisma);
  }

  return referredBy;
};
