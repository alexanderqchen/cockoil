import { getUserIdFromItemId } from "@/api";
import { redirect } from "next/navigation";

const SHOPIFY_URL = "https://cockoil.com/discount/";

const ReferPage = async ({
  params: { referId },
}: {
  params: { referId: string };
}) => {
  const type = referId[0];
  const id = referId.slice(1);

  let discountCode = "xrefer_";

  if (type === "u") {
    discountCode += id;
  } else {
    const { userId } = await getUserIdFromItemId(id);
    discountCode += userId;
  }

  redirect(SHOPIFY_URL + discountCode);

  return null;
};

export default ReferPage;
