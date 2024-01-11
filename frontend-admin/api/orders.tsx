import { fetchAPI } from "@/api";
import type { PaginatedReponse } from "@/api";

export type Order = {
  id: number;
  shopifyOrderId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: string[];
  shippingName: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingPhone: string;
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
