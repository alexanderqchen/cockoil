import NavDrawer from "@/components/NavDrawer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const idToken = cookies().get("firebaseIdToken");

  if (!idToken) {
    redirect("/");
  }

  return (
    <div>
      <NavDrawer>{children}</NavDrawer>
    </div>
  );
};

export default AuthenticatedLayout;
