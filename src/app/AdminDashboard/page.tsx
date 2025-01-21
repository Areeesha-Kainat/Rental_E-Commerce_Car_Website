"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { FaCar, FaShoppingCart, FaUsers, FaTags, FaEdit, FaTrash, FaGift } from "react-icons/fa";

const AdminDashboard = () => {
  const [users, setUsers] = useState<{ email: string; password: string }[]>([]);
  const [activeSection, setActiveSection] = useState<"cars" | "bookings" | "users" | "categories" | "promotions" | null>(null);
  const [promotions, setPromotions] = useState([
    { id: 1, name: "Summer Sale", type: "Discount", code: "SUMMER10", value: "10% off", status: "Active" },
    { id: 2, name: "Flash Sale", type: "Coupon", code: "FLASH20", value: "$20 off", status: "Expired" },
    { id: 3, name: "New User Offer", type: "Campaign", code: "WELCOME", value: "15% off", status: "Active" },
  ]);

  // Fetch all users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  // Handle Delete Promotion
  const handleDeletePromotion = (id: number) => {
    setPromotions((prevPromotions) => prevPromotions.filter((promotion) => promotion.id !== id));
  };

  // Mock data for charts
  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
  ];

  const categoryData = [
    { name: "Sedan", value: 400 },
    { name: "SUV", value: 300 },
    { name: "Hybrid", value: 200 },
    { name: "Gasoline", value: 278 },
    { name: "Hatchback", value: 150 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  // Static data for Cars, Bookings, Users, and Categories
  const carsData = [
    { id: 1, name: "Toyota Camry", type: "Sedan", status: "Available", discount: "10% off" },
    { id: 2, name: "Honda CR-V", type: "SUV", status: "Booked", discount: "No discount" },
    { id: 3, name: "Toyota Prius", type: "Hybrid", status: "Available", discount: "15% off" },
  ];

  const bookingsData = [
    { id: 1, user: "Zoya", car: "Toyota Camry", date: "2023-10-01", status: "Confirmed" },
    { id: 2, user: "Ali", car: "Honda CR-V", date: "2023-10-05", status: "Pending" },
  ];

  const usersData = [
    { id: 1, name: "Zoya", email: "zoya@gmail.com" },
    { id: 2, name: "Ali", email: "ali@gmail.com" },
  ];

  const categoriesData = [
    { id: 1, name: "Sedan" },
    { id: 2, name: "SUV" },
    { id: 3, name: "Hybrid" },
    { id: 4, name: "Gasoline" },
    { id: 5, name: "Hatchback" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Centered Heading and Welcome Message */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome, Admin! Here&apos;s your business overview.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FaCar className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-600">Total Cars</p>
            <p className="text-2xl font-bold text-gray-800">1,234</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <FaShoppingCart className="text-green-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-600">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-800">567</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <FaUsers className="text-purple-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">89</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <FaTags className="text-orange-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-600">Total Categories</p>
            <p className="text-2xl font-bold text-gray-800">5</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Bookings</h2>
          <BarChart width={500} height={300} data={salesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Car Categories</h2>
          <PieChart width={500} height={300}>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Management Tools Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Management Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FaCar className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Cars</h3>
            <p className="text-gray-600">Manage your cars here.</p>
            <button
              onClick={() => setActiveSection("cars")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
            >
              Manage
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-3 bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FaShoppingCart className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Bookings</h3>
            <p className="text-gray-600">Manage your bookings here.</p>
            <button
              onClick={() => setActiveSection("bookings")}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
            >
              Manage
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-3 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FaUsers className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Users</h3>
            <p className="text-gray-600">Manage your users here.</p>
            <button
              onClick={() => setActiveSection("users")}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-all"
            >
              Manage
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-3 bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FaTags className="text-orange-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Categories</h3>
            <p className="text-gray-600">Manage your cars categories here.</p>
            <button
              onClick={() => setActiveSection("categories")}
              className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-all"
            >
              Manage
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-3 bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FaGift className="text-pink-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Promotions</h3>
            <p className="text-gray-600">Manage discounts, coupons, and campaigns.</p>
            <button
              onClick={() => setActiveSection("promotions")}
              className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-all"
            >
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Display Lists Based on Active Section */}
      {activeSection && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {activeSection === "cars" && "Cars"}
            {activeSection === "bookings" && "Bookings"}
            {activeSection === "users" && "Users"}
            {activeSection === "categories" && "Categories"}
            {activeSection === "promotions" && "Promotions"}
          </h2>
          <div className="space-y-4">
            {activeSection === "cars" &&
              carsData.map((car) => (
                <div key={car.id} className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-gray-800">{car.name}</p>
                      <p className="text-sm text-gray-600">{car.type}</p>
                      <p className={`text-sm ${car.status === "Available" ? "text-green-600" : "text-red-600"}`}>
                        {car.status}
                      </p>
                      <p className="text-sm text-yellow-600">{car.discount}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {activeSection === "bookings" &&
              bookingsData.map((booking) => (
                <div key={booking.id} className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-gray-800">{booking.car}</p>
                      <p className="text-sm text-gray-600">Booked by: {booking.user}</p>
                      <p className="text-sm text-gray-600">Date: {booking.date}</p>
                      <p className={`text-sm ${booking.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
                        {booking.status}
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {activeSection === "users" &&
              usersData.map((user) => (
                <div key={user.id} className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {activeSection === "categories" &&
              categoriesData.map((category) => (
                <div key={category.id} className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-gray-800">{category.name}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {activeSection === "promotions" &&
              promotions.map((promotion) => (
                <div key={promotion.id} className="p-6 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-gray-800">{promotion.name}</p>
                      <p className="text-sm text-gray-600">Type: {promotion.type}</p>
                      <p className="text-sm text-gray-600">Code: {promotion.code}</p>
                      <p className="text-sm text-gray-600">Value: {promotion.value}</p>
                      <p className={`text-sm ${promotion.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                        Status: {promotion.status}
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeletePromotion(promotion.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

