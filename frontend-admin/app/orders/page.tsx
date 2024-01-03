import { redirect } from "next/navigation";
import Table from "@/components/Table";
import { getOrders } from "@/api";
import { formatDate } from "@/helpers";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

const PAGE_SIZE = 20;

const Orders = async ({ searchParams }: Props) => {
  const { page } = searchParams;

  if (!page) {
    const newSearchParams = new URLSearchParams({
      ...searchParams,
      page: "1",
    });
    redirect("/orders?" + newSearchParams.toString());
  }

  const pageInt = parseInt(page);

  const { count, data: orders } = await getOrders({
    page: pageInt,
    pageSize: PAGE_SIZE,
  });

  const formattedOrders = orders.map((order) => ({
    ...order,
    createdAt: formatDate(order.createdAt),
    updatedAt: formatDate(order.updatedAt),
  }));

  return (
    <>
      <h1 className="text-3xl mb-8">Orders</h1>

      <Table
        page={pageInt}
        pageSize={PAGE_SIZE}
        count={count}
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
        items={formattedOrders}
      />
    </>
  );
};

export default Orders;
