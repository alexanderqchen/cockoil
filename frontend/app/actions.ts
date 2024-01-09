"use server";

import { redirect } from "next/navigation";
import { updateUser } from "@/api";

export const navigateToProfile = async () => {
  redirect("/profile");
};

export const updateUserAction = async (
  id: number,
  body: {
    name?: string;
    email?: string;
    payoutMethod?: string;
    payoutUsername?: string;
  }
) => updateUser(id, body);
