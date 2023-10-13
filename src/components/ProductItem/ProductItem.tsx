import React, { useContext, useState } from "react";
import { ApiProduct } from "../../interfaces/products";
import { GlobalContext } from "../../GlobalContext";
import ProductDetails from "../ProductDetails/ProductDetails";

interface ProductItemProps {
  product: ApiProduct;
}
function ProductItem({ product }: ProductItemProps) {
  const [open, setOpen] = useState(false);
  const { detailsModal } = useContext(GlobalContext);

  function handleProductClick() {
    setOpen(true);
    detailsModal.setOpen(true);
  }
  return (
    <>
      <ProductDetails product={product} open={open} setOpen={setOpen} />
      <div
        onClick={handleProductClick}
        className="flex flex-col h-full items-center justify-center p-5 shadow cursor-pointer hover:scale-[102%] transition-transform"
      >
        <div className="flex w-full justify-center mb-6 max-h-[236px] items-center grow">
          <img
            className="object-contain h-full"
            src={product.thumbnail}
            alt=""
          />
        </div>

        <div className="flex flex-col shrink text-left w-full justify-end">
          <small className="opacity-75">{product.brand}</small>
          <h3 className="text-lg">{product.title}</h3>
          <p>{product.price} €</p>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
