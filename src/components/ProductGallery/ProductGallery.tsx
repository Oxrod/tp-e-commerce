import React from "react";
import { ApiProduct } from "../../interfaces/products";
import ProductItem from "../ProductItem/ProductItem";

interface ProductGalleryProps {
  products: ApiProduct[];
}
function ProductGallery({ products }: ProductGalleryProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
      {products.map((product, idx) => {
        return <ProductItem product={product} key={idx} />;
      })}
    </div>
  );
}

export default ProductGallery;
