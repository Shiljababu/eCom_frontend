import React, { useEffect, useState } from "react";
import { deleteOrderApi, editShippingStatusApi, getAdminAllOrdersApi } from "../service/allAPI";
import AdminNavbar from "../components/AdminNavbar";

const AdminOrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({});

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getAdminAllOrdersApi();
      if (res.status === 200) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, value) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: value }));
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      const res = await editShippingStatusApi(orderId, {
        shippingStatus: selectedStatus[orderId],
      });
      if (res.status === 200) {
        alert("Shipping status updated successfully!");
        fetchOrders();
      }
    } catch (err) {
      console.error("Error updating shipping status:", err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await deleteOrderApi(orderId);
      if (res.status === 200) {
        alert("Order deleted successfully!");
        fetchOrders();
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-8 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Manage Orders
        </h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600 text-center">No orders found.</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border-b">User</th>
                  <th className="p-3 border-b">Total Price</th>
                  <th className="p-3 border-b">Payment</th>
                  <th className="p-3 border-b">Shipping</th>
                  <th className="p-3 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">
                      {order.userId?.name} <br />
                      <span className="text-sm text-gray-500">
                        {order.userId?.email}
                      </span>
                    </td>
                    <td className="p-3 border-b">${order.totalPrice}</td>
                    <td className="p-3 border-b">{order.paymentStatus}</td>
                    <td className="p-3 border-b">
                      <select
                        value={selectedStatus[order._id] || order.shippingStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border border-gray-300 p-2 rounded-lg"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3 border-b text-center space-x-4">
                      <button
                        onClick={() => handleUpdateStatus(order._id)}
                        className="text-blue-600 hover:underline"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOrdersList;
