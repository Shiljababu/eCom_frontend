import React, { useContext } from "react";
import logoIcon from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/AuthContextApi";
import { logoutUserApi } from "../service/allAPI";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(userContext);
  const { cartCount } = useCart();
  const handleLogout = async () => {
    try {
      await logoutUserApi();
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <img src={logoIcon} alt="logo" />

        <nav className="hidden md:flex space-x-35">
          <Link to="/" className="text-gray-900 font-medium hover:text-primary">
            Home
          </Link>

          <Link to="/orders" className="text-gray-900 font-medium hover:text-primary">
            Orders
          </Link>
          <Link to="/about" className="text-gray-900 font-medium hover:text-primary">
            About
          </Link>
          <Link to="/login" className="text-gray-900 font-medium hover:text-primary">
            SignUp
          </Link>
        </nav>

        <div className="flex items-center space-x-6">
          <button
            onClick={() => {
              if (isLoggedIn) {
                navigate("/getAccount");
              } else {
                navigate("/login");
              }
            }}
            className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary transition-colors"
          >
            <i className="ri-user-line text-xl"></i>
          </button>

          {isLoggedIn && (
            <Link to="/viewCart">
              <button className="relative w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary transition-colors">
                <i className="ri-shopping-bag-line text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-amber-50 text- bg-red-500  text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              title="Logout"
              className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-red-600 transition-colors"
            >
              <i className="ri-logout-box-r-line text-xl"></i>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
