import dotenv from "dotenv";
dotenv.config();

import fs from "node:fs/promises";
import { fetchShopify } from "../helpers/fetch";

type ShopifyProduct = {
  id: number;
  title: string;
};

const run = async () => {
  console.log("Pulling products from Shopify...");
  const shopifyProducts = (
    await fetchShopify("/admin/api/2023-10/products.json")
  ).products as ShopifyProduct[];

  console.log(`Pulled ${shopifyProducts.length} products`);

  console.log("Creating products.json...");
  const products = shopifyProducts.map(({ id, title }) => ({
    id: id.toString(),
    title,
    maximumDiscount: 1000,
  }));

  try {
    await fs.writeFile("src/constants/products.json", JSON.stringify(products));
    console.log("Created products.json");
  } catch (e) {
    console.log("Faild to create products.json with error: ", e);
  }
};

run();
