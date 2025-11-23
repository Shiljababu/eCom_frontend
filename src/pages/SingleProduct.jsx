import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProductApi } from "../service/allAPI";
import { addToCartApi } from "../service/allAPI"

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getSingleProductApi(id);
        if (response.status === 200) {
          setProduct(response.data.product);
          setMainImage(response.data.product.image?.[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const res = await addToCartApi({ productId: id, quantity });
      if (res.status === 200) {
        alert("Item added to cart successfully!");
        setShowModal(false);
      } else if (res.status === 401) {
        alert("Please log in to add items to your cart.");
        navigate("/login");
      } else {
        alert(res.data?.message || "Failed to add to cart.");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-gray-500 text-lg">Loading product...</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-[420px] overflow-hidden rounded-2xl shadow-md bg-gray-100">
              <img
                src={
                  product.image?.[0]
                    ? `${window.location.origin}${product.image[0]}`
                    : "https://placehold.co/400x400?text=No+Image"
                }
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                {product.name}
              </h2>
              <p className="text-gray-500 text-lg font-medium mb-6">
                {product.brand}
              </p>

              <div className="flex items-center mb-6">
                <span className="text-3xl font-extrabold text-amber-600">
                  ₹{product.price}
                </span>
                <span className="text-gray-400 ml-3 text-sm font-medium">
                  (Incl. taxes)
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-8 font-medium">
                {product.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-amber-600 flex items-center gap-2 text-white px-7 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  <i className="ri-shopping-cart-line text-lg"></i>
                  Add to Cart
                </button>
                <button className="bg-gray-200 flex items-center gap-2 text-gray-800 px-7 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                  <i className="ri-heart-line text-lg"></i>
                  Wishlist
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Key Features
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 font-medium">
                <li>
                  <strong>Color:</strong> {product.color || "Not specified"}
                </li>
                <li>
                  <strong>Brand:</strong> {product.brand || "Not specified"}
                </li>
                <li>
                  <strong>Category:</strong>{" "}
                  {product.categoryId?.name || "Uncategorized"}
                </li>
                <li>
                  <strong>Available:</strong>{" "}
                  {!product.isDisabled ? "Yes" : "No"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4">Price: ₹{product.price}</p>

            <div className="flex justify-center items-center space-x-4 mb-6">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                <i className="ri-subtract-line"></i>
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                <i className="ri-add-line"></i>
              </button>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
