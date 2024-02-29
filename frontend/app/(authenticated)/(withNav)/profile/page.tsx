import { getUser } from "@/api";
import QRCode from "react-qr-code";
import ShareButton from "@/components/ShareButton";
import { cookies } from "next/headers";
import { formatUserUrl, formatItemUrl } from "@/helpers";
import RegisterProductModal from "@/components/RegisterProductModal";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

const Profile = async ({ searchParams }: Props) => {
  const firebaseUid = cookies().get("firebaseUid")?.value || "";
  const { id, name, internalItems } = await getUser(firebaseUid);

  if (!name) {
    redirect("/setup");
  }

  const { register } = searchParams;

  const referUrl = formatUserUrl(id);

  return (
    <div className="text-center max-w-2xl m-auto">
      <h1 className="text-4xl font-bold mb-4">{name}</h1>
      <QRCode
        className="bg-white p-4 w-full max-w-96 m-auto h-auto rounded-3xl border-8 border-[#432529] mb-4"
        value={referUrl}
      />
      <div className="flex items-center gap-8 mb-4">
        <div className="h-px bg-white grow" />
        <p>or</p>
        <div className="h-px bg-white grow" />
      </div>

      <ShareButton url={referUrl} />

      <div className="text-left">
        <h2 className="mb-4 text-2xl font-bold">Apparel QR Codes</h2>
        {internalItems.length === 0 && (
          <p className="text-gray-400">
            Scan the QR code on your CockOil apparel to register you product.
          </p>
        )}
        {internalItems.map((item) => (
          <QRCode
            className="p-1 bg-white w-16 h-auto inline mr-4 mb-4 rounded-md"
            value={formatItemUrl(item.id)}
            key={item.id}
          />
        ))}
      </div>

      {register && <RegisterProductModal itemId={register} userId={id} />}
    </div>
  );
};

export default Profile;
