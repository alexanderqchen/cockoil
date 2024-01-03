"use client";

import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import LoadingCircle from "@/components/LoadingCircle";
import Link from "next/link";

const PaginationFooter = ({
  numColumns,
  page,
  pageSize,
  count,
}: {
  page: number;
  numColumns: number;
  pageSize: number;
  count: number;
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [page]);

  const startNumber = (page - 1) * pageSize + 1;
  const endNumber = Math.min(startNumber + pageSize - 1, count);

  return (
    <tfoot>
      <tr className="border-t-2 border-slate-300">
        <td className="px-3 py-3" colSpan={numColumns}>
          <div className="flex items-center justify-end">
            {loading && <LoadingCircle />}
            <p>
              {startNumber}-{endNumber} of {count} Orders
            </p>
            <Link
              href={{
                pathname: "/orders",
                query: {
                  page: page - 1,
                },
              }}
              onClick={() => setLoading(true)}
              className={`mx-2 ${
                page <= 1 && "text-gray-300 pointer-events-none"
              }`}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </Link>
            <div className="font-medium h-6 w-6 border-2 border-gray-500 text-center rounded-md">
              1
            </div>
            <Link
              href={{
                pathname: "/orders",
                query: {
                  page: page + 1,
                },
              }}
              onClick={() => setLoading(true)}
              className={`mx-2 ${
                endNumber === count && "text-gray-300 pointer-events-none"
              }`}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </Link>
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default PaginationFooter;
