import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminUserList from "../components/UsersList";

const AdminLanding = () => {
  return (
    <>
      <AdminNavbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, Admin</h1>
       

        <div className="mt-6">
          <AdminUserList />
        </div>
      </div>
    </>
  );
};

export default AdminLanding;
