// File: src/components/UserDetails.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SERVER_URL from "../service/serverUrl";
import { axiosInstance } from "../service/commonAPI";
import { getSingleUserApi } from "../service/allAPI";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserFromSession = async () => {
      try {
        const res = await getSingleUserApi();
        if (res.status === 200 && res.data?.user) {
          setUser(res.data.user);
        } else {
          console.error("Failed to fetch user:", res.data?.message);
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserFromSession();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const res = await axiosInstance.delete('/user/delete');
      if (res.status === 200) {
        alert("Account deleted successfully.");
        navigate("/login");
      } else {
        alert(res.data?.message || "Error deleting account.");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setShowModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">
          No user data found. Please log in again.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 mt-10">
      {/* Header */}
      <div className="bg-linear-to-r from-amber-500 to-yellow-400 px-6 py-8 flex flex-col items-center text-white">
        <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
          <i className="ri-user-3-line text-5xl text-amber-600"></i>
        </div>
        <h2 className="text-2xl font-semibold tracking-wide">
          {user.name || "User"}
        </h2>
        <p className="text-sm text-amber-100 mt-1">Member since 2023</p>
      </div>

      {/* Info */}
      <div className="px-8 py-6">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">
          Profile Information
        </h3>

        <dl className="divide-y divide-gray-200">
          <div className="py-4 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
            <dd className="col-span-2 text-sm text-gray-900 font-semibold">
              {user.name || "N/A"}
            </dd>
          </div>

          <div className="py-4 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Email Address</dt>
            <dd className="col-span-2 text-sm text-gray-900 font-semibold">
              {user.email || "N/A"}
            </dd>
          </div>

          <div className="py-4 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd className="col-span-2 text-sm text-gray-900 font-semibold">
              {user.phone || "N/A"}
            </dd>
          </div>

          <div className="py-4 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="col-span-2 text-sm text-gray-900 font-semibold leading-relaxed">
              {user.address || "N/A"}
            </dd>
          </div>
        </dl>
      </div>

      {/* Actions */}
      <div className="bg-gray-50 px-8 py-4 flex justify-end space-x-3 border-t">
        <Link to="/update">
          <button className="px-5 py-2 rounded-md bg-amber-500 text-white font-medium hover:bg-amber-600 transition">
            Edit Profile
          </button>
        </Link>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition"
        >
          Delete Account
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-light bg-light bg-light bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. Your account will be permanently deleted.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
