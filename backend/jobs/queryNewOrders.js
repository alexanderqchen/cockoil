const dotenv = require("dotenv");
dotenv.config();

const { fetchShopify } = require("../helpers/fetch");

const run = async () => {
  const orders = await fetchShopify(
    "/admin/api/2023-10/orders.json?status=paid"
  );
  console.log(orders);
};

run();
