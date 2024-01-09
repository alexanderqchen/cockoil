import { isEmpty } from "lodash";
import { cookies } from "next/headers";

const API_ENDPOINT = "http://localhost:3001";
const idToken = cookies().get("firebaseIdToken")?.value;

export const fetchAPI = async (
  path: string,
  params: { [key: string]: string } = {},
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
        Authorization: idToken,
      },
      ...(body && { body: JSON.stringify(body) }),
    }
  );

export type PaginatedReponse<T> = {
  count: number;
  data: T[];
};

import type { Order } from "./orders";
import { getOrders, updateOrder } from "./orders";
import type { Payout } from "./payouts";
import { getPayouts, getUserPayouts } from "./payouts";
import type { User } from "./users";
import { getUser, updateUser } from "./users";
import type { Reward } from "./rewards";
import { getUserRewards } from "./rewards";

export {
  Order,
  getOrders,
  updateOrder,
  Payout,
  getPayouts,
  getUserPayouts,
  User,
  getUser,
  updateUser,
  Reward,
  getUserRewards,
};
