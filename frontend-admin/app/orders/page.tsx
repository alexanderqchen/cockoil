import Table from "../../components/Table";

const Orders = () => {
  return (
    <>
      <h1 className="text-3xl mb-8">Orders</h1>

      <Table
        columns={[
          {
            title: "Order ID",
            key: "orderId",
          },
          {
            title: "Status",
            key: "status",
          },
          {
            title: "Shopify ID",
            key: "shopifyId",
          },
          {
            title: "Order Date",
            key: "orderDate",
          },
        ]}
        items={[
          {
            orderId: 1,
            status: "PENDING",
            shopifyId: "asdf",
            orderDate: "monday",
          },
          {
            orderId: 2,
            status: "COMPLETED",
            shopifyId: "fdsa",
            orderDate: "tuesday",
          },
        ]}
      />
    </>
  );
};

export default Orders;
