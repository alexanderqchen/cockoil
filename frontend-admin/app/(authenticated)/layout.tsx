import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const adminWhitelist = [
  "LfuMBDFrx1QLa63lN7lfKE7JPHs1", // alexander.qili.chen@gmail.com (dev)
];

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const idToken = cookies().get("firebaseIdToken");
  const firebaseUid = cookies().get("firebaseUid");

  if (!idToken || !firebaseUid || !adminWhitelist.includes(firebaseUid.value)) {
    redirect("/");
  }

  return children;
};

export default AuthenticatedLayout;
