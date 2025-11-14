import React, { createContext, useContext, useEffect, useState } from "react";
import { getCartApi } from "../service/allAPI";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  //  Fetch cart count safely
  const fetchCartCount = async () => {
    try {
      const res = await getCartApi();
      if (res.status === 200 && res.data?.cart?.items) {
        setCartCount(res.data.cart.items.length);
        console.log("cart count",res.data.cart.items.length);

        
      } else {
        setCartCount(0);
      }
    } catch (err) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
