import { fetchAPI } from "@/api";
import type { PaginatedReponse } from "@/api";
import type { Item } from "@/api";

export type Order = {
  id: number;
  shopifyOrderId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  shopifyItems: string[];
  internalItems: Item[];
  shippingName: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingPhone: string;
};

export const getOrder = async (orderId: number): Promise<Order> => {
  const response = await fetchAPI(`/orders/${orderId}`);

  return response;
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
  return response;
};

export const updateOrder = async (
  id: number,
  { status, internalItemIds }: { status?: string; internalItemIds?: string[] }
) => {
  const response = await fetchAPI(`/orders/${id}`, {}, "PATCH", {
    ...(status && { status }),
    ...(internalItemIds && { internalItemIds }),
  });

  return response;
};
