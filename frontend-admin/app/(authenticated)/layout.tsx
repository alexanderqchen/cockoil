import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const adminWhitelist = ["uROkkEChdQXVBmzDKx6aApKRwZS2"];

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const idToken = cookies().get("firebaseIdToken");
  const firebaseUid = cookies().get("firebaseUid");

  if (!idToken || !firebaseUid || !adminWhitelist.includes(firebaseUid.value)) {
    redirect("/");
  }

  return children;
};

export default AuthenticatedLayout;
