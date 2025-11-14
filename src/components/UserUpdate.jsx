import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfileApi, getSingleUserApi } from "../service/allAPI";
import SERVER_URL from "../service/serverUrl";



const UpdateProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    title: "",
    organization: "",
    email: "",
    phone: "",
    address: "",
    profile_picture: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getSingleUserApi();
        if (response && response.status === 200) {
          const data = response.data?.user ?? response.data ?? {};
          setUserData((prev) => ({
            ...prev,
            name: data.name ?? prev.name,
            email: data.email ?? prev.email,
            phone: data.phone ?? prev.phone,
            address: data.address ?? prev.address,
            profile_picture: data.profile_picture ?? prev.profile_picture,
          }));
        } else {
          console.error("Failed to fetch user data", response);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const key = e.target.id;
    setUserData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: userData.name,
        email: userData.email,
        address: userData.address,
        phone: userData.phone,
        profile_picture: userData.profile_picture,
      };

      const res = await updateProfileApi(payload);
      if (res && res.status === 200) {
        alert("Profile updated successfully!");
        navigate(`/getAccount`);
      } else {
        console.error("Update failed:", res);
        alert("Error updating profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating.");
    }
  };

  return (
    <div className="bg-linear-to-r from-indigo-800 to-blue-900 min-h-screen flex items-center justify-center p-4">
      <div className="font-sans mb-10 w-full max-w-3xl rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900 shadow-xl">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between mb-5 items-start">
            <h2 className="mb-5 text-4xl font-bold text-blue-900">
              Update Profile
            </h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={userData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={userData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;