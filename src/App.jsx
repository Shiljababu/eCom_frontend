import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Footer from "./pages/Footer";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/SingleProduct";
import UserDetails from "./components/UserDetails";
import UpdateProfile from "./components/UserUpdate";
import CartPage from "./pages/Cart";
import UserOrders from "./pages/Orders";
import AdminLanding from "./pages/AdminLanding";
import AdminLogin from "./pages/AdminLogin";
import AdminNavbar from "./components/AdminNavbar";
import ProductContextProvider from "./context/ProductContext";
import ProductList from "./components/ProductList";
import AdminEditProduct from "./components/AdminEditProduct";
import AddProduct from "./components/AddProduct";
import CategoryList from "./components/CategoryList";
import AdminOrdersList from "./components/OrdersList";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminUserList from "./components/UsersList";


function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      
      <Routes>
        
        <Route path="/register" element={<Auth insideRegister={true} />} />
        <Route path="/login" element={<><Auth /></>} />
        <Route path="/" element={<Landing />} />
        <Route path="/getproduct/:id" element={<ProductDetails />} />
        <Route path="/getAccount" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
        <Route path="/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path="/viewCart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/admin_landing" element={<AdminLanding />} />
        <Route path="/admin/getUsers" element={
          <>
          <AdminNavbar/>
          <AdminUserList/>
          </>
        }
        />
        <Route path="/admin/products" element={
            <>
              <AdminNavbar />
              <ProductContextProvider>
                <ProductList />
              </ProductContextProvider>
            </>
          }
        />
        <Route path="/admin/products/edit/:id" 
        element={
    <>
      <AdminNavbar />
      <AdminEditProduct />
    </>
  }
/>

<Route
  path="/admin/products/add"
  element={
    <>
      <AdminNavbar />
      <AddProduct />
    </>
  }
/>
<Route
  path="/admin/categories"
  element={<CategoryList />}
/>
<Route path="/admin/orders" element={<AdminOrdersList />} />



      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
