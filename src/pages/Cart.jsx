import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCartApi,
  editCartApi,
  deleteCartItemApi,
  placeOrderApi,
} from "../service/allAPI";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCartApi();
      if (res.status === 200 && res.data.cart) {
        setCart(res.data.cart);
        fetchCartCount();
      } else if (res.status === 401) {
        alert("Please log in to view your cart.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };


const handleQuantityChange = async (productId, delta) => {
  const item = cart.items.find((i) => i.productId._id === productId);
  const newQty = Math.max(1, item.quantity + delta);
  const res = await editCartApi({ productId, quantity: newQty });
  if (res.status === 200) {
    await fetchCart();
    fetchCartCount()
  }
};


const handleDeleteItem = async (productId) => {
  if (window.confirm("Remove this item from your cart?")) {
    const res = await deleteCartItemApi(productId);
    if (res.status === 200) {
      fetchCart();
      fetchCartCount();
    }
  }
};


const handlePlaceOrder = async () => {
  const res = await placeOrderApi();
  if (res.status === 201) {
    alert("Order placed successfully!");
    fetchCartCount(); 
    navigate("/orders");
  }
};

  //  Loading UI
  if (!cart)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading your cart...
      </div>
    );

  const total = cart.totalPrice || 0;

  return (
    <section className="w-full bg-white py-9 px-6">
      <h1 className="text-center text-gray-900 text-3xl font-semibold">
        My Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row items-start mt-8 gap-6">
        {/*  Cart Table */}
        <div className="bg-white p-4 w-full lg:w-[800px] rounded-xl shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-center border-b text-gray-500 uppercase">
                <th className="text-left px-3 py-2">Product</th>
                <th className="px-2 py-2">Price</th>
                <th className="px-2 py-2">Qty</th>
                <th className="px-2 py-2">Subtotal</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cart.items.map((item) => {
                const { _id, name, price, image } = item.productId;
                const subtotal = price * item.quantity;

                return (
                  <tr key={_id} className="text-center border-b">
                    <td className="flex items-center gap-3 py-3">
                      <img
                        src={
                          image?.[0]
                            ? `http://localhost:3000/${image[0]}`
                            : "https://placehold.co/100x100"
                        }
                        alt={name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <span className="font-medium text-gray-800">{name}</span>
                    </td>

                    <td className="text-gray-700">₹{price}</td>

                    <td>
                      <div className="flex justify-center items-center gap-3 border rounded-full px-3 py-1">
                        <button
                          onClick={() => handleQuantityChange(_id, -1)}
                          className="text-gray-500 hover:text-black"
                        >
                          <i className="ri-subtract-line"></i>
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(_id, +1)}
                          className="text-gray-500 hover:text-black"
                        >
                          <i className="ri-add-line"></i>
                        </button>
                      </div>
                    </td>

                    <td className="font-semibold text-gray-900">
                      ₹{subtotal.toFixed(2)}
                    </td>

                    <td>
                      <button
                        onClick={() => handleDeleteItem(_id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <i className="ri-close-circle-line text-lg"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr className="border-t">
                <td colSpan="3" className="py-3">
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200"
                  >
                    Return to Shop
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/*  Cart Summary */}
        <div className="w-full lg:w-[400px] bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Cart Total
          </h2>

          <div className="flex justify-between py-2 text-gray-700">
            <span>Total:</span>
            <span className="font-semibold">₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-gray-700 border-t">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between py-2 text-gray-700 border-t">
            <span>Subtotal:</span>
            <span className="font-semibold">₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-5 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>

    </section>
  );
};

export default CartPage;
