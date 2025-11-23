import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { products, loading, toggleProductStatus } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <button
            onClick={() => navigate("/admin/products/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add New Product
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600 text-center py-10">Loading products...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-3">
                        <img
                          src={
                            product.image?.[0]
                              ? `${window.location.origin}${product.image[0]}`
                              : "https://via.placeholder.com/100"
                          }
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="p-3 font-medium text-gray-800">{product.name}</td>
                      <td className="p-3 text-gray-700">
                        {product.categoryId?.name || "—"}
                      </td>
                      <td className="p-3 text-gray-800 font-semibold">${product.price}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.isDisabled
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {product.isDisabled ? "Disabled" : "Active"}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-medium mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleProductStatus(product._id)}
                          className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                            product.isDisabled
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }`}
                        >
                          {product.isDisabled ? "Enable" : "Disable"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
