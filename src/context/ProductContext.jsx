import React, { createContext, useEffect, useState } from "react";
import { disableProductApi, adminGetProductsApi } from "../service/allAPI";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await adminGetProductsApi();
      if (res.status === 200) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleProductStatus = async (id) => {
    try {
      const res = await disableProductApi(id);
      if (res.status === 200) {
        alert(res.data.message);
        fetchProducts();
      }
    } catch (err) {
      console.error("Error toggling product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProducts, toggleProductStatus, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
