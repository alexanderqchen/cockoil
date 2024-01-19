import { keyBy } from "lodash";
import productList from "../constants/products.json";

const products = keyBy(productList, "id");

export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatDollars = (cents: number) =>
  `$${(Math.round(cents) / 100).toFixed(2)}`;

export const formatItemUrl = (itemId: string) => {
  return "https://affiliate.cockoil.com/refer/i" + itemId;
};

export const getIdFromUrl = (urlString: string) => {
  const url = new URL(urlString);
  const path = url.pathname;
  const splitPath = path.split("/");

  if (!splitPath) {
    throw "Bad url";
  }

  const prefixedId = splitPath.pop();

  if (!prefixedId || prefixedId.length < 2) {
    throw "Bad url";
  }

  return prefixedId.slice(1);
};

export const getNumQrRequired = (shopifyItems: string[]) =>
  shopifyItems.reduce(
    (acc, itemId) => (products[itemId].qrRequired ? acc + 1 : acc),
    0
  );
