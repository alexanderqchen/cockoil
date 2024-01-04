import { isEmpty } from "lodash";

const API_ENDPOINT = "http://localhost:3001";

const fetchAPI = async (
  path: string,
  params: { [key: string]: string },
  method: string = "GET",
  body?: any
) =>
  await fetch(
    API_ENDPOINT +
      path +
      (!isEmpty(params) ? "?" : "") +
      new URLSearchParams(params).toString(),
    {
      cache: "no-store",
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body && { body: JSON.stringify(body) }),
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
  status,
}: {
  page?: number;
  pageSize?: number;
  status?: string;
}): Promise<PaginatedReponse<Order>> => {
  const response = await fetchAPI("/orders", {
    ...(pageSize && { limit: `${pageSize}` }),
    ...(page && pageSize && { offset: `${(page - 1) * pageSize}` }),
    ...(status && { status }),
  });
  return await response.json();
};

export const updateOrder = async (
  id: number,
  { status }: { status?: string }
) => {
  const response = await fetchAPI(`/orders/${id}`, {}, "PATCH", {
    ...(status && { status }),
  });

  return await response.json();
};
