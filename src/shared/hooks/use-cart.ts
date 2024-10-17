'use client'

import { useEffect } from "react";
import { useCartState } from "../store";

export const useCart = () => {
  const cartState = useCartState((state) => state);

  useEffect(() => {
    cartState.fetchItemsInCart();
  }, []);

  return cartState
};
