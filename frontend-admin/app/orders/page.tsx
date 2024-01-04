import Link from "next/link";
import Table from "@/components/Table";
import { getOrders } from "@/api";
import { formatDate } from "@/helpers";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

const PAGE_SIZE = 20;

const Orders = async ({ searchParams }: Props) => {
  const page = searchParams.page;
  const pageInt = page ? parseInt(page) : 1;

  const { count, data: orders } = await getOrders({
    page: pageInt,
    pageSize: PAGE_SIZE,
  });

  const formattedOrders = orders.map((order) => ({
    ...order,
    createdAt: formatDate(order.createdAt),
    updatedAt: formatDate(order.updatedAt),
  }));

  const { count: numPendingOrders } = await getOrders({
    status: "PENDING",
  });

  return (
    <>
      <h1 className="text-3xl mb-8">Orders</h1>
      {numPendingOrders > 0 ? (
        <Link
          href="/process/orders"
          className="absolute top-4 right-4 py-2 px-4 bg-slate-700 rounded-md text-gray-200 font-medium"
        >
          PROCESS ORDERS ({numPendingOrders})
        </Link>
      ) : (
        <p className="flex absolute top-4 right-4 py-2 px-4 text-green-800">
          <CheckCircleIcon className="h-6 w-6 mr-1" />
          All Orders Processed
        </p>
      )}

      <Table
        pathname="/orders"
        itemName="Orders"
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
