import React from "react";
import Retail from "../../components/shops/retail/retail";
import BulkOrder from "../../components/shops/bulk/bulkOrder";
import ShopLinks from "../../components/shops/shop/shopLinks";

export default async function Page({ params }) {
  const { slug } = await params;

  return (
    <div className="px-6 bg-[#ECECEC] min-h-screen">
      {slug === "shop-link" && <ShopLinks />}
      {slug === "mall-product" && <Retail />}
      {slug === "bulk-order" && <BulkOrder />}
    </div>
  );
}
