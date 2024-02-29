import { cookies } from "next/headers";
import SetupForm from "@/components/SetupForm";

const Setup = () => {
  const userId = cookies().get("firebaseUid")?.value || "";

  return (
    <div className="m-8">
      <SetupForm userId={userId} />
    </div>
  );
};

export default Setup;
