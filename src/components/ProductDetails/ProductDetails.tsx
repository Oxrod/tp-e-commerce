import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { ApiProduct } from "../../interfaces/products";
import { GlobalContext } from "../../GlobalContext";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

interface ProductDetailsProps {
  product: ApiProduct;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function ProductDetails({ product, open, setOpen }: ProductDetailsProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const { detailsModal, cart } = useContext(GlobalContext);

  function handleClose() {
    detailsModal.setOpen(false);
    setOpen(false);
  }

  function handleAddToCart() {
    let isItemAlreadyPresent = false;
    cart.items.forEach((item) => {
      isItemAlreadyPresent = item.product.id === product.id;
    });
    if (isItemAlreadyPresent) {
      const updatedItems = cart.items.map((item) => {
        if (item.product.id === product.id) {
          item.quantity++;
        }

        return item;
      });
      cart.setItems(updatedItems);
      addToLocalStorage(updatedItems);
    } else {
      const newItems = [...cart.items, { product: product, quantity: 1 }];
      cart.setItems(newItems);
      addToLocalStorage(newItems);
    }
    detailsModal.setOpen(false);
    setOpen(false);
  }

  function addToLocalStorage(
    items: { product: ApiProduct; quantity: number }[]
  ) {
    const LOCAL_STORAGE_KEY = "cart-items";
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }

  function computePriceReduction() {
    const reductedPrice =
      product.price - (product.discountPercentage / 100) * product.price;
    return Math.floor(reductedPrice * 100) / 100;
  }

  return (
    <>
      {open && (
        <div className="flex fixed pointer-events-none inset-0 backdrop-brightness-50 z-50 w-full h-screen justify-center items-center">
          <div className="flex gap-12 p-10 bg-white relative pointer-events-auto max-w-[65%]">
            <button onClick={handleClose} className="absolute top-5 right-5">
              <CloseRoundedIcon />
            </button>
            <section className="flex flex-col items-center justify-between gap-5">
              <div className="flex grow max-h-80">
                <img
                  src={product.images[currentPhotoIndex]}
                  alt=""
                  className="h-72 w-72 object-contain overflow-hidden"
                />
              </div>
              <div className="flex gap-5 shrink">
                {product.images.map((img, idx) => {
                  return (
                    <button key={idx} onClick={() => setCurrentPhotoIndex(idx)}>
                      <img
                        className={`w-11 p-1 rounded-sm ${
                          idx === currentPhotoIndex
                            ? "outline outline-black"
                            : "outline-none"
                        } aspect-square object-cover cursor-pointer`}
                        src={img}
                        alt=""
                      />
                    </button>
                  );
                })}
              </div>
            </section>
            <section className="flex flex-col w-1/2">
              <div className="flex flex-col grow">
                <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
                <p className="mb-5">{product.description}</p>
                <p className="text-sm opacity-70">
                  Note moyenne : {product.rating}/5
                </p>
                <p>En stock : {product.stock}</p>
              </div>
              <div className="flex items-start flex-col gap-1 shrink">
                <p className="flex gap-3 p-1 items-end">
                  <span className="text-2xl">{computePriceReduction()}€</span>
                  <span className="line-through text-red-500">
                    {product.price}€
                  </span>
                </p>
                <button
                  onClick={handleAddToCart}
                  className="w-auto px-3 py-2 bg-slate-800 text-white rounded-md"
                >
                  Add to cart <AddShoppingCartRoundedIcon />
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
