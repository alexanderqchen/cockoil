import NavDrawer from "@/components/NavDrawer";

const NavLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavDrawer>{children}</NavDrawer>
    </div>
  );
};

export default NavLayout;
