"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { updateOrder, updatePayout, getOrder } from "@/api";

export const setAuthCookies = async (
  firebaseUid: string,
  firebaseIdToken: string
) => {
  // Won't be set on localhost because secure setting requires https
  cookies().set("firebaseUid", firebaseUid, { secure: true });
  cookies().set("firebaseIdToken", firebaseIdToken, { secure: true });
};

export const clearAuthCookies = async () => {
  cookies().delete("firebaseIdToken");
  cookies().delete("firebaseUid");
};

export const navigateToOrders = async () => {
  redirect("/orders");
};

export const updateOrderAction = async (
  id: number,
  body: { status?: string; internalItemIds?: string[] }
) => updateOrder(id, body);

export const updatePayoutAction = async (
  id: number,
  body: { status?: string }
) => updatePayout(id, body);

export const getOrderAction = async (orderId: number) => getOrder(orderId);
