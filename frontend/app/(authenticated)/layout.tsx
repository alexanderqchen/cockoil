import NavDrawer from "@/components/NavDrawer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const idToken = cookies().get("firebaseIdToken");
  const firebaseUid = cookies().get("firebaseUid");

  if (!idToken || !firebaseUid) {
    redirect("/");
  }

  return (
    <div>
      <NavDrawer>{children}</NavDrawer>
    </div>
  );
};

export default AuthenticatedLayout;
