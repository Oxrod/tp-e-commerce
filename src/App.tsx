import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import Cart from "./components/Cart/Cart";
import { ApiProduct } from "./interfaces/products";

function App() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<
    {
      product: ApiProduct;
      quantity: number;
    }[]
  >([]);

  useEffect(() => {
    detailsModalOpen
      ? document.body.classList.add("modal-open")
      : document.body.classList.remove("modal-open");
  }, [detailsModalOpen]);

  useEffect(() => {
    const lsItems = localStorage.getItem("cart-items")!;
    if (lsItems === null) return;
    setCartItems(JSON.parse(lsItems));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        cart: { items: cartItems, setItems: setCartItems },
        detailsModal: {
          open: detailsModalOpen,
          setOpen: setDetailsModalOpen,
        },
      }}
    >
      <Navbar />
      <div className="px-2">
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
