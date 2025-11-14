import React, { useEffect, useState } from "react";
import { getAllUsersApi, toggleUserStatusApi } from "../service/allAPI";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await getAllUsersApi();
    console.log("herer");
    
    console.log(res);
    
    if (res.status === 200) {
      setUsers(res.data.users);
    } else {
      console.error("Failed to fetch users:", res.data.message);
    }
    setLoading(false);
  };

  const handleToggleStatus = async (userId) => {
    const res = await toggleUserStatusApi(userId);
    if (res.status === 200) {
      alert(res.data.message);
      fetchUsers(); 
    } else {
      alert("Failed to toggle user status.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-3 font-medium text-gray-800">{user.name}</td>
                    <td className="p-3 text-gray-700">{user.email}</td>
                    <td className="p-3 text-gray-700 capitalize">{user.role}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.isDisabled
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.isDisabled ? "Disabled" : "Active"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleToggleStatus(user._id)}
                        className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
                          user.isDisabled
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                      >
                        {user.isDisabled ? "Enable" : "Disable"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;
