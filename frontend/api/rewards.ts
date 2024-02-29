import { fetchAPI } from "@/api";
import type { Order, User, PaginatedReponse } from "@/api";

export type Reward = {
  id: number;
  amount: number;
  createdFromId: number;
  createdFrom: Order;
  givenTo: User;
  givenToId: number;
  createdAt: string;
  updatedAt: string;
};

export const getUserRewards = async (
  userId: string
): Promise<PaginatedReponse<Reward>> => {
  const response = await fetchAPI("/rewards", { givenToId: userId });
  return response;
};
