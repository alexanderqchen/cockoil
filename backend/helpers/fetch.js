SHOPIFY_URL = "https://cockoil.myshopify.com/";

const fetchShopify = async (endpoint, method = "GET", body = null) => {
  const response = await fetch(SHOPIFY_URL + endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
    },
    body,
  });

  return response.json();
};

module.exports = {
  fetchShopify,
};
