import { getUser } from "@/api";
import UserSettings from "@/components/UserSettings";
import { cookies } from "next/headers";

const Settings = async () => {
  const userId = cookies().get("firebaseUid")?.value || "";
  const user = await getUser(userId);

  return (
    <div className="text-xl leading-10 max-w-2xl m-auto">
      <UserSettings user={user} />
    </div>
  );
};

export default Settings;
