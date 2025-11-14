import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProductApi } from "../service/allAPI";

const AddProduct = () => {
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    size: "",
    color: "",
    brand: "",
    categoryId: "",
    price: "",
    image: [],
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData({ ...productData, image: files });
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === "image") {
          value.forEach((file) => formData.append("image", file));
        } else {
          formData.append(key, value);
        }
      });

      const response = await addProductApi(formData);

      if (response.status === 201) {
        alert(" Product added successfully!");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("Add product error:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Product Name</label>
            <input
              type="text"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Description</label>
            <textarea
              rows="3"
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Size, Color, Brand */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Size</label>
              <input
                type="text"
                value={productData.size}
                onChange={(e) => setProductData({ ...productData, size: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Color</label>
              <input
                type="text"
                value={productData.color}
                onChange={(e) => setProductData({ ...productData, color: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Brand</label>
              <input
                type="text"
                value={productData.brand}
                onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Category ID</label>
              <input
                type="text"
                value={productData.categoryId}
                onChange={(e) =>
                  setProductData({ ...productData, categoryId: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter category ID"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Price</label>
              <input
                type="number"
                value={productData.price}
                onChange={(e) =>
                  setProductData({ ...productData, price: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Product Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <div className="flex flex-wrap gap-3 mt-3">
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-md border"
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
