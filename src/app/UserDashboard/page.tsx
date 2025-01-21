"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaUser, FaEnvelope, FaLock, FaChartLine, FaHeart, FaHistory, FaStar, FaCog } from "react-icons/fa";

const UserDashboard = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<{ email: string; password: string } | null>(null);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`min-h-screen p-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-opacity-20 transition-all"
          style={{ backgroundColor: theme === "dark" ? "#374151" : "#E5E7EB" }}
        >
          {theme === "light" ? <FaMoon className="text-gray-800" /> : <FaSun className="text-yellow-400" />}
        </button>
      </div>
      <p className="mt-2 text-gray-500">Welcome back, {user?.email || "User"}!</p>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="p-6 rounded-lg shadow-md flex items-center space-x-4" style={{ backgroundColor: theme === "dark" ? "#1F2937" : "#F3F4F6" }}>
          <div className="p-3 rounded-full bg-blue-100">
            <FaChartLine className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500">Activity Progress</p>
            <p className="text-2xl font-bold">75%</p>
          </div>
        </div>
        <div className="p-6 rounded-lg shadow-md flex items-center space-x-4" style={{ backgroundColor: theme === "dark" ? "#1F2937" : "#F3F4F6" }}>
          <div className="p-3 rounded-full bg-green-100">
            <FaHeart className="text-green-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500">Saved Items</p>
            <p className="text-2xl font-bold">23</p>
          </div>
        </div>
        <div className="p-6 rounded-lg shadow-md flex items-center space-x-4" style={{ backgroundColor: theme === "dark" ? "#1F2937" : "#F3F4F6" }}>
          <div className="p-3 rounded-full bg-purple-100">
            <FaHistory className="text-purple-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500">Recent Activity</p>
            <p className="text-2xl font-bold">15</p>
          </div>
        </div>
        <div className="p-6 rounded-lg shadow-md flex items-center space-x-4" style={{ backgroundColor: theme === "dark" ? "#1F2937" : "#F3F4F6" }}>
          <div className="p-3 rounded-full bg-orange-100">
            <FaStar className="text-orange-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500">Rewards Balance</p>
            <p className="text-2xl font-bold">1,234 pts</p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        {user ? (
          <div className="p-6 rounded-lg shadow-md flex items-center space-x-6" style={{ backgroundColor: theme === "dark" ? "#1F2937" : "#F3F4F6" }}>
            <div className="p-4 rounded-full bg-blue-100">
              <FaUser className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-lg font-bold">{user.email}</p>
              <p className="text-sm text-gray-500">Email: {user.email}</p>
              <p className="text-sm text-gray-500">Password: {user.password}</p>
            </div>
          </div>
        ) : (
          <p>No user data found.</p>
        )}
      </div>

      {/* Settings Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg shadow-md flex items-center space-x-4" style={{ backgroundColor: theme === "dark" ? "#1F2937" : "#F3F4F6" }}>
            <div className="p-3 rounded-full bg-green-100">
              <FaCog className="text-green-600 text-2xl" />
            </div>
            <div>
              <p className="text-lg font-bold">Account Settings</p>
              <p className="text-sm text-gray-500">Update your account details.</p>
            </div>
          </div>
          <div className="p-6 rounded-lg shadow-md flex items-center space-x-4" style={{ backgroundColor: theme === "dark" ? "#1F2937" : "#F3F4F6" }}>
            <div className="p-3 rounded-full bg-purple-100">
              <FaLock className="text-purple-600 text-2xl" />
            </div>
            <div>
              <p className="text-lg font-bold">Security</p>
              <p className="text-sm text-gray-500">Change your password.</p>
            </div>
          </div>
          <div className="p-6 rounded-lg shadow-md flex items-center space-x-4" style={{ backgroundColor: theme === "dark" ? "#1F2937" : "#F3F4F6" }}>
            <div className="p-3 rounded-full bg-orange-100">
              <FaEnvelope className="text-orange-600 text-2xl" />
            </div>
            <div>
              <p className="text-lg font-bold">Notifications</p>
              <p className="text-sm text-gray-500">Manage your notifications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
