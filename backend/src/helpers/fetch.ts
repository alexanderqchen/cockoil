const SHOPIFY_URL = "https://cockoil.myshopify.com/";
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || "";

export const fetchShopify = async (
  endpoint: string,
  method: string = "GET",
  body: any = null
) => {
  const response = await fetch(SHOPIFY_URL + endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
    },
    ...(method !== "GET" && { body: JSON.stringify(body) }),
  });

  return response.json();
};
