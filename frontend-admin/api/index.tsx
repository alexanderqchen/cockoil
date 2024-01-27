import { isEmpty } from "lodash";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clearAuthCookies } from "@/app/actions";

export const fetchAPI = async (
  path: string,
  params: { [key: string]: string } = {},
  method: string = "GET",
  body?: any
) => {
  const idToken = cookies().get("firebaseIdToken")?.value;

  const response = await fetch(
    process.env.BACKEND_API_ENDPOINT +
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
  const responseJson = await response.json();

  if (responseJson.error?.authError) {
    clearAuthCookies();
    return redirect(`/?toast=${responseJson.error.authError}`);
  }

  return responseJson;
};

export type PaginatedReponse<T> = {
  count: number;
  data: T[];
};

export type Item = {
  id: string;
  createdFromId: number;
  registeredById: string;
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
