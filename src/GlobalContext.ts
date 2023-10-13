import { Dispatch, SetStateAction, createContext } from "react";
import { ApiProduct } from "./interfaces/products";

type GlobalContextType = {
  cart: {
    items: {
      product: ApiProduct;
      quantity: number;
    }[];
    setItems: Dispatch<
      SetStateAction<{ product: ApiProduct; quantity: number }[]>
    >;
  };
  detailsModal: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
};

const initialContext: GlobalContextType = {
  cart: {
    items: [],
    setItems: () => null,
  },
  detailsModal: {
    open: false,
    setOpen: () => null,
  },
};

export const GlobalContext = createContext<GlobalContextType>(initialContext);
