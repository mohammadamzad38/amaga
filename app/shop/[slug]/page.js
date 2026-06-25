import React from "react";
import ShopLinks from "../../components/shops/shopLinks";
import Retail from "../../components/shops/retail";
import BulkOrder from "../../components/shops/bulkOrder";

export default async function Page({ params }) {
  const { slug } = await params;

  return (
    <div className="px-6 bg-[#ECECEC] h-screen">
      {slug === "shop-link" && <ShopLinks />}
      {slug === "mall-product" && <Retail />}
      {slug === "bulk-order" && <BulkOrder />}
    </div>
  );
}
