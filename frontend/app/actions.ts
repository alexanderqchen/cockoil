"use server";

import { redirect } from "next/navigation";
import { updateUser, createUser } from "@/api";
import { cookies } from "next/headers";
import { updateItem } from "@/api/items";

export const createUserAction = async (firebaseUid: string, email: string) => {
  return await createUser(firebaseUid, email);
};

export const setAuthCookies = async (
  firebaseUid: string,
  firebaseIdToken: string
) => {
  cookies().set("firebaseUid", firebaseUid, { secure: true });
  cookies().set("firebaseIdToken", firebaseIdToken, { secure: true });
};

export const clearAuthCookies = async () => {
  cookies().delete("firebaseIdToken");
  cookies().delete("firebaseUid");
};

export const navigateToProfile = async () => {
  redirect("/profile");
};

export const updateUserAction = async (
  id: string,
  body: {
    name?: string;
    email?: string;
    payoutMethod?: string;
    payoutUsername?: string;
  }
) => updateUser(id, body);

export const registerItemAction = async (
  itemId: string,
  registeredById: string
) => await updateItem(itemId, { registeredById });
