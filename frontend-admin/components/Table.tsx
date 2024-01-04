import PaginationFooter from "@/components/PaginationFooter";

type Column = {
  title: string;
  key: string;
};

const Table = ({
  skeleton,
  pathname,
  itemName,
  page,
  pageSize,
  count,
  columns,
  items,
}: {
  skeleton?: boolean;
  pathname: string;
  itemName: string;
  page: number;
  pageSize: number;
  count: number;
  columns: Column[];
  items: any;
}) => {
  if (skeleton) {
    return (
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-slate-700 text-gray-200">
            <tr key="head">
              {columns.map(({ title, key }) => (
                <th className="px-6 py-3" key={"head" + key}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((number) => (
              <tr
                className="odd:bg-white even:bg-gray-100 border-b"
                key={number}
              >
                {columns.map(({ key }) => (
                  <td className="px-6 py-4" key={number + key}>
                    <div
                      className={`w-30 h-4 bg-slate-300 rounded-md animate-pulse`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <PaginationFooter
            pathname={pathname}
            itemName={itemName}
            numColumns={columns.length}
            page={page}
            pageSize={pageSize}
            count={count}
          />
        </table>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs uppercase bg-slate-700 text-gray-200">
          <tr key="head">
            {columns.map(({ title, key }) => (
              <th className="px-6 py-3" key={"head" + key}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr
              className="odd:bg-white even:bg-gray-100 border-b"
              key={item.id}
            >
              {columns.map(({ key }) => (
                <td className="px-6 py-4" key={item.id + key}>
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <PaginationFooter
          pathname={pathname}
          itemName={itemName}
          numColumns={columns.length}
          page={page}
          pageSize={pageSize}
          count={count}
        />
      </table>
    </div>
  );
};

export default Table;
