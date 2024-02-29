import NavDrawer from "@/components/NavDrawer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthenticatedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const idToken = cookies().get("firebaseIdToken");
  const firebaseUid = cookies().get("firebaseUid");

  if (!idToken || !firebaseUid) {
    redirect("/");
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;
