// src/components/Dashboard.js
import { useEffect, useState } from "react";
import axios from "../services/API";
import { MdDelete } from "react-icons/md";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/api/dashboard");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      if (err.response?.status === 401) {
        alert("Session expired or user deleted. Logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/login";
      } else {
        setError("Failed to fetch data.");
      }
    }
  };

  // Delete the data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/delete/${id}`);
      alert("User deleted successfully");

      const currentUserId = localStorage.getItem("userId");

      if (String(id) === currentUserId) {
        alert("You have deleted your own account. Logging out...");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        window.location.href = "/login";
        return;
      }

      fetchDashboardData(); // Refresh list after deletion
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Employee Dashboard</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone Number</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-blue-50">
                <td className="p-2 border">{user.id}</td>
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.phoneNumber}</td>
                <td className="p-2 border">{user.department}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
