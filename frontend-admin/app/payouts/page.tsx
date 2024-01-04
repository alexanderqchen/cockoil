import Link from "next/link";
import Table from "@/components/Table";
import { getPayouts } from "@/api";
import { formatDate } from "@/helpers";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

const PAGE_SIZE = 20;

const Payouts = async ({ searchParams }: Props) => {
  const page = searchParams.page;
  const pageInt = page ? parseInt(page) : 1;

  const { count, data: payouts } = await getPayouts({
    page: pageInt,
    pageSize: PAGE_SIZE,
  });

  const formattedPayouts = payouts.map((payout) => ({
    ...payout,
    createdAt: formatDate(payout.createdAt),
    updatedAt: formatDate(payout.updatedAt),
  }));

  const { count: numPendingPayouts } = await getPayouts({
    status: "UNPAID",
  });

  return (
    <>
      <h1 className="text-3xl mb-8">Payouts</h1>
      {numPendingPayouts > 0 ? (
        <Link
          href="/process/payouts"
          className="absolute top-4 right-4 py-2 px-4 bg-slate-700 rounded-md text-gray-200 font-medium"
        >
          PROCESS PAYOUTS ({numPendingPayouts})
        </Link>
      ) : (
        <p className="flex absolute top-4 right-4 py-2 px-4 text-green-800">
          <CheckCircleIcon className="h-6 w-6 mr-1" />
          All Payouts Processed
        </p>
      )}

      <Table
        pathname="/payouts"
        itemName="Payouts"
        page={pageInt}
        pageSize={PAGE_SIZE}
        count={count}
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
        items={formattedPayouts}
      />
    </>
  );
};

export default Payouts;
