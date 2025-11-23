import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutAdminApi } from "../service/allAPI";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAdminApi();
      navigate("/admin/login");
    } catch (error) {
      console.error("Admin logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <nav className="flex space-x-20">
          <Link to="/admin/getUsers" className="hover:text-yellow-400">Users</Link>
          <Link to="/admin/products" className="hover:text-yellow-400">Products</Link>
          <Link to="/admin/categories" className="hover:text-primary">
            Categories
          </Link>
          <Link to="/admin/orders" className="hover:text-yellow-400">Orders</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
