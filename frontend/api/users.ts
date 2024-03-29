import { fetchAPI, Item } from "@/api";

export type User = {
  id: string;
  email: string;
  name: string;
  referredById?: number;
  payoutMethod?: string;
  payoutUsername?: string;
  internalItems: Item[];
  createdAt: string;
  updatedAt: string;
};

export const createUser = async (id: string, email: string) => {
  const response = await fetchAPI("/users", {}, "POST", {
    id,
    email,
  });
  return response;
};

export const getUser = async (userId: string): Promise<User> => {
  const response = await fetchAPI(`/users/${userId}`);
  return response;
};

export const getUserIdFromItemId = async (
  itemId: string
): Promise<{ userId: string }> => {
  const response = await fetchAPI(`/userIdFromItemId/${itemId}`);

  return response;
};

export const updateUser = async (
  id: string,
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

  return response;
};
