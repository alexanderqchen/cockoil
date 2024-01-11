import { getUser } from "@/api";
import QRCode from "react-qr-code";
import ShareButton from "@/components/ShareButton";
import { cookies } from "next/headers";
import { formatUserUrl } from "@/helpers";

const Profile = async () => {
  const firebaseUid = cookies().get("firebaseUid")?.value || "";
  const { id, name } = await getUser(firebaseUid);

  const referUrl = formatUserUrl(id);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">{name}</h1>
      <QRCode
        className="bg-white p-4 w-full h-auto rounded-3xl border-8 border-[#432529] mb-4"
        value={referUrl}
      />
      <div className="flex items-center gap-8 mb-4">
        <div className="h-px bg-white grow" />
        <p>or</p>
        <div className="h-px bg-white grow" />
      </div>

      <ShareButton url={referUrl} />
    </div>
  );
};

export default Profile;
