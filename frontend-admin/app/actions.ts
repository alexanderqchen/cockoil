"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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
