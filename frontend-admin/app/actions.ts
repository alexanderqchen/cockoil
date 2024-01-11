"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { updateOrder, updatePayout } from "@/api";

export const setAuthCookies = async (
  firebaseUid: string,
  firebaseIdToken: string
) => {
  cookies().set("firebaseUid", firebaseUid, { secure: true });
  cookies().set("firebaseIdToken", firebaseIdToken, { secure: true });
};

export const navigateToOrders = async () => {
  redirect("/orders");
};

export const updateOrderAction = async (
  id: number,
  body: { status?: string }
) => updateOrder(id, body);

export const updatePayoutAction = async (
  id: number,
  body: { status?: string }
) => updatePayout(id, body);
