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
  rewards: Reward[];
};

import type { Payout } from "./payouts";
import { getPayouts, getUserPayouts } from "./payouts";
import type { User } from "./users";
import { createUser, getUser, getUserIdFromItemId, updateUser } from "./users";
import type { Reward } from "./rewards";
import { getUserRewards } from "./rewards";

export {
  Payout,
  getPayouts,
  getUserPayouts,
  User,
  createUser,
  getUser,
  getUserIdFromItemId,
  updateUser,
  Reward,
  getUserRewards,
};
