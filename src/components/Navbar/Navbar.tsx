import React, { useContext, useEffect, useState } from "react";
import "../../App.css";

import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { GlobalContext } from "../../GlobalContext";

function Navbar() {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const { cart } = useContext(GlobalContext);

  useEffect(() => {
    let sum = 0;
    cart.items.forEach((item) => {
      sum += item.quantity;
    });

    setCartItemsCount(sum);
  }, [cart.items]);
  return (
    <nav className="flex sticky left-0 top-0 right-0 p-4 justify-between z-50 bg-white outline outline-1 outline-slate-800">
      <div className="bg-white">
        <a href="/" className="text-2xl font-bold">
          NotAmazon
        </a>
      </div>
      <a href="/cart" className="flex gap-2 items-center">
        <ShoppingCartRoundedIcon />
        <p>Panier</p>
        {cartItemsCount !== 0 && (
          <span className="flex justify-center items-center bg-blue-300 rounded-full px-2 py-0.5 h-min">
            <small>{cartItemsCount}</small>
          </span>
        )}
      </a>
    </nav>
  );
}

export default Navbar;
