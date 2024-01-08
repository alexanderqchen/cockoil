import { getUser } from "@/api";
import UserSettings from "@/components/UserSettings";

const userId = 1;

const Settings = async () => {
  const user = await getUser(userId);

  return (
    <div className="text-xl leading-10">
      <UserSettings user={user} />
    </div>
  );
};

export default Settings;
