const API_ENDPOINT = "http://localhost:3001";

const fetchAPI = async (path: string, params: { [key: string]: string }) =>
  await fetch(
    API_ENDPOINT + path + "?" + new URLSearchParams(params).toString(),
    {
      cache: "no-store",
    }
  );

type PaginatedReponse<T> = {
  count: number;
  data: T[];
};

export type Order = {
  id: number;
  shopifyOrderId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: string[];
};

export const getOrders = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<PaginatedReponse<Order>> => {
  const response = await fetchAPI("/orders", {
    limit: `${pageSize}`,
    offset: `${(page - 1) * pageSize}`,
  });
  return await response.json();
};
