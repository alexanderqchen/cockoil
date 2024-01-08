import { isEmpty } from "lodash";

const API_ENDPOINT = "http://localhost:3001";

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
import { getPayouts, getUserPayouts, updatePayout } from "./payouts";
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
  updatePayout,
  User,
  getUser,
  updateUser,
  Reward,
  getUserRewards,
};
