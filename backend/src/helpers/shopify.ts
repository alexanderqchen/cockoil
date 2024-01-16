import { fetchShopify } from "../helpers/fetch";
import { generateReferralCode } from "./referrals";

export const createDiscountCode = async (userId: string) => {
  const discountCode = generateReferralCode(userId);

  const response = await fetchShopify(
    "/admin/api/2024-01/price_rules/1582841692401/discount_codes.json",
    "POST",
    { discount_code: { code: discountCode } }
  );

  return response;
};
