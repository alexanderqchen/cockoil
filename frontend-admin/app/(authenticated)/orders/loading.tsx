import Table from "@/components/Table";

const Loading = () => (
  <>
    <h1 className="text-3xl mb-8">Orders</h1>
    <Table
      skeleton
      pathname="/orders"
      itemName="Orders"
      page={0}
      pageSize={0}
      count={0}
      columns={[
        {
          title: "Order ID",
          key: "id",
        },
        {
          title: "Status",
          key: "status",
        },
        {
          title: "Shopify ID",
          key: "shopifyOrderId",
        },
        {
          title: "Order Date",
          key: "createdAt",
        },
      ]}
      items={[]}
    />
  </>
);
export default Loading;
