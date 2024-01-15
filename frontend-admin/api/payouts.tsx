import { fetchAPI } from "@/api";
import type { PaginatedReponse } from "@/api";

type User = {
  id: number;
  name: string;
  email: string;
  referredById?: number;
  payoutMethod?: string;
  payoutUsername?: string;
  createdAt: string;
  updatedAt: string;
};

export type Payout = {
  id: number;
  amount: number;
  givenToId: number;
  givenTo: User;
  status: string;
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

export const updatePayout = async (
  id: number,
  { status }: { status?: string }
) => {
  const response = await fetchAPI(`/payouts/${id}`, {}, "PATCH", {
    ...(status && { status }),
  });

  return response;
};
