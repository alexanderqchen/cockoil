import { fetchAPI } from "@/api";
import type { PaginatedReponse } from "@/api";

export type Payout = {
  id: number;
  amount: number;
  givenToId: number;
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
  return await response.json();
};

export const updatePayout = async (
  id: number,
  { status }: { status?: string }
) => {
  const response = await fetchAPI(`/payouts/${id}`, {}, "PATCH", {
    ...(status && { status }),
  });

  return await response.json();
};
