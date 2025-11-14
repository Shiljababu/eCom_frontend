import React, { useEffect, useState } from "react";
import { getUserOrdersApi, updatePaymentStatusApi } from "../service/allAPI";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await getUserOrdersApi();
    if (res.status === 200) {
      setOrders(res.data.orders);
    } else {
      console.error("Failed to fetch orders:", res);
    }
  };

  const handleMarkAsPaid = async (orderId) => {
    const res = await updatePaymentStatusApi(orderId, { paymentStatus: "Paid" });
    if (res.status === 200) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, paymentStatus: "Paid" }
            : order
        )
      );
    } else {
      alert("Failed to update payment status");
      console.error("Payment update error:", res);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">No orders found yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5 md:px-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        My Orders
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.shippingStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.shippingStatus === "Processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.shippingStatus}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {/* Order items */}
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {item.productId.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-gray-800 font-semibold text-sm">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 mt-4 pt-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Total:</span>
                <span className="text-gray-900 font-bold text-lg">
                  ₹{order.totalPrice}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-medium ${
                    order.paymentStatus === "Paid"
                      ? "text-green-600"
                      : order.paymentStatus === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Payment: {order.paymentStatus}
                </span>

                {order.paymentStatus !== "Paid" && (
                  <button
                    onClick={() => handleMarkAsPaid(order._id)}
                    className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-md transition-all"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
