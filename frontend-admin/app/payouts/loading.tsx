import Table from "@/components/Table";

const Loading = () => (
  <>
    <h1 className="text-3xl mb-8">Payouts</h1>
    <Table
      skeleton
      pathname="/payouts"
      itemName="Payouts"
      page={0}
      pageSize={0}
      count={0}
      columns={[
        {
          title: "Payout ID",
          key: "id",
        },
        {
          title: "Status",
          key: "status",
        },
        {
          title: "Amount",
          key: "amount",
        },
        {
          title: "Customer",
          key: "givenToName",
        },
        {
          title: "Method",
          key: "method",
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
