import { getUser } from "@/api";
import UserSettings from "@/components/UserSettings";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Settings = async () => {
  const userId = cookies().get("firebaseUid")?.value || "";
  const user = await getUser(userId);

  if (!user.name) {
    redirect("/setup");
  }

  return (
    <div className="text-xl leading-10 max-w-2xl m-auto">
      <UserSettings user={user} />
    </div>
  );
};

export default Settings;
