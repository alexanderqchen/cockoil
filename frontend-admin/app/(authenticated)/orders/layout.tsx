import Content from "@/components/Content";
import Sidebar from "@/components/Sidebar";

const OrderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar
        items={[
          { title: "Orders", route: "/orders", active: true },
          { title: "Payouts", route: "/payouts" },
        ]}
      />

      <Content>{children}</Content>
    </div>
  );
};

export default OrderLayout;
