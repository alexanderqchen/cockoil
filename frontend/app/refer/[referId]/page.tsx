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
    const { userId: registeredById } = await getUserIdFromItemId(id);

    if (!registeredById) {
      return redirect(`/profile/?register=${id}`);
    }

    discountCode += registeredById;
  }

  return redirect(SHOPIFY_URL + discountCode);
};

export default ReferPage;
