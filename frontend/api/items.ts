import { fetchAPI } from "@/api";

export const updateItem = async (
  id: string,
  {
    registeredById,
  }: {
    registeredById?: string;
  }
) => {
  const response = await fetchAPI(`/items/${id}`, {}, "PATCH", {
    ...(registeredById && { registeredById }),
  });

  return response;
};
