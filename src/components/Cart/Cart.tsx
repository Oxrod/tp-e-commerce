import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { ApiProduct } from "../../interfaces/products";
import CartItem from "../CartItem/CartItem";

function Cart() {
  const [cartItems, setCartItems] = useState<
    { product: ApiProduct; quantity: number }[]
  >([]);
  const [totalDue, setTotalDue] = useState(0);

  const { cart } = useContext(GlobalContext);

  useEffect(() => {
    setCartItems(cart.items);
  }, [cart.items]);

  useEffect(() => {
    let sum = 0;
    cart.items.forEach((item) => {
      sum += item.quantity * item.product.price;
    });
    setTotalDue(sum);
  }, [cart.items]);

  return (
    <main className="h-[60vh] mt-2 w-full flex outline outline-1 outline-slate-800">
      <section className="flex flex-col gap-3 h-full w-3/4 p-2">
        {cartItems.map((item, idx) => {
          return <CartItem cartProduct={item} key={idx} />;
        })}
      </section>
      <section className="flex justify-end flex-col border-l border-slate-800 p-2">
        <p>Total du : {totalDue}€</p>
        <button className="px-3 py-2 bg-slate-800 text-white rounded-md">
          Payer maintenant
        </button>
      </section>
    </main>
  );
}

export default Cart;
