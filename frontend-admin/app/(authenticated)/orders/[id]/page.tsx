import Link from "next/link";
import { keyBy } from "lodash";
import QRCode from "react-qr-code";
import productList from "@/constants/products.json";
import { getOrder } from "@/api";
import { formatItemUrl } from "@/helpers";

const Order = async ({ params }: { params: { id: string } }) => {
  const orderId = parseInt(params.id);
  const products = keyBy(productList, "id");

  const order = await getOrder(orderId);

  const itemCounts: { [id: string]: number } = {};

  order.shopifyItems.forEach((item) => {
    if (!(item in itemCounts)) {
      itemCounts[item] = 0;
    }

    itemCounts[item]++;
  });

  return (
    <div className="text-xl relative">
      <Link href="/orders" className="text-sm text-gray-500">
        <p className="mb-2">&lt; Back</p>
      </Link>

      <h1 className="text-3xl mb-8 mr-8 inline-block">Order {orderId}</h1>
      <p className="mb-4 inline-block text-lg mr-8">
        <span className="font-medium">Shopify ID:</span>{" "}
        <a
          href={`https://admin.shopify.com/store/cockoil/orders?query=${order.shopifyOrderId}`}
          className="text-blue-600 underline"
          target="_blank"
        >
          {order.shopifyOrderId}
        </a>
      </p>
      <p className="mb-4 inline-block text-lg">
        <span className="font-medium">Status: </span>
        {order.status}
      </p>

      <div className="w-1/2 bg-slate-100 p-8 rounded-3xl">
        <div className="mb-8">
          <h2 className="font-bold mb-2">Items</h2>
          {Object.keys(itemCounts).map((itemId) => (
            <p key={itemId}>
              {itemCounts[itemId]} x {products[itemId].title}
            </p>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="font-bold mb-2">Shipping Info</h2>
          <p>{order.shippingName}</p>
          <p>{order.shippingAddress1}</p>
          <p>{order.shippingAddress2}</p>
          <p>
            {order.shippingCity}, {order.shippingState} {order.shippingZip}
          </p>
          <p>{order.shippingPhone}</p>
        </div>

        <div>
          <h2 className="font-bold mb-4">Associated QR Codes</h2>
          <div>
            {order.internalItems.map((item) => (
              <QRCode
                key={item.id}
                className="w-24 h-auto inline-block mr-4 mb-4"
                value={formatItemUrl(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
