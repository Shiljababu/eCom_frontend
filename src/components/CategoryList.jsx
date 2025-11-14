// src/pages/AdminCategoryList.jsx
import React, { useEffect, useState } from "react";
import {
  getAllCategoriesApi,
  deleteCategoryApi,
  addCategoryApi,
  updateCategoryApi,
} from "../service/allAPI";
import AdminNavbar from "../components/AdminNavbar";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategoriesApi();
      if (res.status === 200) setCategories(res.data.categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const res = await updateCategoryApi(editId, formData);
        if (res.status === 200) alert("Category updated successfully!");
      } else {
        const res = await addCategoryApi(formData);
        if (res.status === 201) alert("Category added successfully!");
      }
      setFormData({ name: "", description: "" });
      setIsEditing(false);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setFormData({ name: category.name, description: category.description });
    setEditId(category._id);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Deleting this category will delete all products in it. Proceed?"
      )
    )
      return;

    try {
      const res = await deleteCategoryApi(id);
      if (res.status === 200) {
        alert("Category deleted successfully!");
        fetchCategories();
      }
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Manage Categories
          </h2>

          <button
            onClick={() => {
              setIsEditing(false);
              setFormData({ name: "", description: "" });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Category
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Category Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border p-3 rounded-lg w-full"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {isEditing ? "Update Category" : "Add Category"}
          </button>
        </form>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">All Categories</h3>
          {categories.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Description</th>
                  <th className="p-3 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{cat.name}</td>
                    <td className="p-3 border-b">{cat.description}</td>
                    <td className="p-3 border-b text-center space-x-4">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-center">No categories found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
