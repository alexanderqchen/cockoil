import { fetchAPI } from "@/api";
import type { PaginatedReponse, User } from "@/api";

export type Payout = {
  id: number;
  amount: number;
  givenToId: number;
  givenTo: User;
  status: string;
  payoutMethod: string;
  payoutUsername: string;
  createdAt: string;
  updatedAt: string;
};

export const getPayouts = async ({
  page,
  pageSize,
  status,
}: {
  page?: number;
  pageSize?: number;
  status?: string;
}): Promise<PaginatedReponse<Payout>> => {
  const response = await fetchAPI("/payouts", {
    ...(pageSize && { limit: `${pageSize}` }),
    ...(page && pageSize && { offset: `${(page - 1) * pageSize}` }),
    ...(status && { status }),
  });
  return response;
};

export const getUserPayouts = async (
  userId: string
): Promise<PaginatedReponse<Payout>> => {
  const response = await fetchAPI("/payouts", {
    status: "PAID",
    givenToId: userId,
  });

  return response;
};
