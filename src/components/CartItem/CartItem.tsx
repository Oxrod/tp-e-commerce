import React, { useContext } from "react";
import { ApiProduct } from "../../interfaces/products";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { GlobalContext } from "../../GlobalContext";

interface CartItemProps {
  cartProduct: { product: ApiProduct; quantity: number };
}

function CartItem({ cartProduct }: CartItemProps) {
  const { cart } = useContext(GlobalContext);

  function handleDeleteFromCart() {
    cart.setItems(
      cart.items.filter((item) => item.product.id !== cartProduct.product.id)
    );
    removeFromLocalStorage();
  }

  function removeFromLocalStorage() {
    const lsItemsString = localStorage.getItem("cart-items");
    if (lsItemsString === null) return;

    const lsItems: { product: ApiProduct; quantity: number }[] =
      JSON.parse(lsItemsString);
    const remainingItems = lsItems.filter(
      (item) => item.product.id !== cartProduct.product.id
    );

    localStorage.setItem("cart-items", JSON.stringify(remainingItems));
  }

  function handleAddQuantity() {
    const updatedItems = cart.items.map((item) => {
      if (item.product.id === cartProduct.product.id) {
        item.quantity++;
      }
      return item;
    });

    cart.setItems(updatedItems);
    localStorage.setItem("cart-items", JSON.stringify(updatedItems));
  }

  function handleRemoveQuantity() {
    const updatedItems = cart.items.map((item) => {
      if (item.product.id === cartProduct.product.id) {
        item.quantity--;
      }
      return item;
    });

    cart.setItems(updatedItems);
    localStorage.setItem("cart-items", JSON.stringify(updatedItems));
  }

  return (
    <div className="flex gap-2 w-full justify-between">
      <section className="flex gap-2">
        <div className="p-1 outline outline-2 rounded-sm outline-slate-800">
          <img
            className="aspect-square object-contain w-20"
            src={cartProduct.product.thumbnail}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between py-2">
          <h4 className="text-lg font-semibold">{cartProduct.product.title}</h4>
          <div className="flex gap-2 items-center">
            <p>Quantité :</p>
            <span className="flex w-auto justify-center gap-2 bg-slate-200 rounded-full">
              <button
                disabled={cartProduct.quantity === 1}
                onClick={handleRemoveQuantity}
                className="flex items-center disabled:opacity-40 justify-center"
              >
                <RemoveRoundedIcon />
              </button>
              <span>{cartProduct.quantity}</span>
              <button
                onClick={handleAddQuantity}
                className="flex items-center justify-center"
              >
                <AddRoundedIcon />
              </button>
            </span>
          </div>
        </div>
      </section>
      <button onClick={handleDeleteFromCart}>
        <DeleteForeverRoundedIcon className="!text-4xl" />
      </button>
    </div>
  );
}

export default CartItem;
