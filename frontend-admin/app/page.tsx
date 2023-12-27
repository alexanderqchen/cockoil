import Content from "../components/Content";
import Sidebar from "../components/Sidebar";

const Admin = () => {
  return (
    <div>
      <Sidebar
        items={[
          { title: "Orders", route: "/orders" },
          { title: "Payouts", route: "/payouts" },
        ]}
      />

      <Content>
        <h1>Hello world</h1>
      </Content>
    </div>
  );
};

export default Admin;
