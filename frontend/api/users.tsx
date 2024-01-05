import { fetchAPI } from "@/api";

export type User = {
  id: number;
  name: string;
  email: string;
  referredById?: number;
  payoutMethod?: string;
  payoutUsername?: string;
  createdAt: string;
  updatedAt: string;
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await fetchAPI(`/users/${userId}`);
  return await response.json();
};
