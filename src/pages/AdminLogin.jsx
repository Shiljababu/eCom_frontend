import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLoginApi } from "../service/allAPI";

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!adminData.email || !adminData.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await adminLoginApi(adminData)
      console.log("Admin login response:", response.data);

      if (response.status === 200) {
        alert("Admin login successful!");
        navigate("/admin/admin_landing")
      } else {
        alert(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="flex font-poppins items-center justify-center">
      <div className="flex justify-center items-center dark:bg-gray-900 min-h-screen">
        <div className="grid gap-8">
          <div
            id="back-div"
            className="bg-linear-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
          >
            <div className="border-20 border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-2 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
              

              <form className="space-y-4" onSubmit={handleAdminLogin}>
                <div>
                  <label className="mb-2 dark:text-gray-400 text-lg">Email</label>
                  <input
                    className="border p-3 dark:bg-indigo-700 dark:text-gray-300 shadow-md border-gray-300 rounded-lg w-full"
                    type="email"
                    placeholder="Admin Email"
                    value={adminData.email}
                    onChange={(e) =>
                      setAdminData({ ...adminData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 dark:text-gray-400 text-lg">Password</label>
                  <input
                    className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 border-gray-300 rounded-lg w-full"
                    type="password"
                    placeholder="Password"
                    value={adminData.password}
                    onChange={(e) =>
                      setAdminData({ ...adminData, password: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="bg-linear-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 transition duration-300 ease-in-out"
                >
                  Log In
                </button>
              </form>

              <div className="flex flex-col mt-4 items-center justify-center text-sm">
                <h3 className="dark:text-gray-300">
                  Not an admin?{" "}
                  <a href="/login" className="text-blue-400 hover:underline">
                    Go to User Login
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
