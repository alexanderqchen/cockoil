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

export const updateUser = async (
  id: number,
  {
    name,
    email,
    payoutMethod,
    payoutUsername,
  }: {
    name?: string;
    email?: string;
    payoutMethod?: string;
    payoutUsername?: string;
  }
) => {
  const response = await fetchAPI(`/users/${id}`, {}, "PATCH", {
    ...(name && { name }),
    ...(email && { email }),
    ...(payoutMethod && { payoutMethod }),
    ...(payoutUsername && { payoutUsername }),
  });

  return await response.json();
};
