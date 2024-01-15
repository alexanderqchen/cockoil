import { isEmpty } from "lodash";
import { cookies } from "next/headers";

const API_ENDPOINT = "http://localhost:3001";

export const fetchAPI = async (
  path: string,
  params: { [key: string]: string } = {},
  method: string = "GET",
  body?: any
) => {
  const idToken = cookies().get("firebaseIdToken")?.value;

  return await fetch(
    API_ENDPOINT +
      path +
      (!isEmpty(params) ? "?" : "") +
      new URLSearchParams(params).toString(),
    {
      cache: "no-store",
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: idToken,
      },
      ...(body && { body: JSON.stringify(body) }),
    }
  );
};

export type PaginatedReponse<T> = {
  count: number;
  data: T[];
};

import type { Order } from "./orders";
import { getOrders, getOrder, updateOrder } from "./orders";
import type { Payout } from "./payouts";
import { getPayouts, updatePayout } from "./payouts";

export {
  Order,
  getOrders,
  getOrder,
  updateOrder,
  Payout,
  getPayouts,
  updatePayout,
};
