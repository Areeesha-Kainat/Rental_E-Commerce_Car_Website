'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { 
    FaCar, 
    FaDollarSign, 
    FaChartLine, 
    FaUsers, 
    FaCalendarCheck, 
    FaRoad,
    FaTags,
    FaListAlt,
    FaCoins,
    FaGasPump,
    FaTools,
    FaUserCheck
  } from "react-icons/fa";
import Image from "next/image";

const chartData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 7000 },
];

const barData = [
  { category: 'SUV', value: 4000 },
  { category: 'Sedan', value: 3000 },
  { category: 'Sports', value: 5000 },
  { category: 'Luxury', value: 4500 },
];

const recentActivities = [
  {
    name: "Nissan GT-R",
    time: "2 hours ago",
    image: "/Car (4).png"
  },
  {
    name: "Koenigsegg Regera",
    time: "4 hours ago",
    image: "/image 8.png"
  },
  {
    name: "Rolls-Royce Phantom",
    time: "1 day ago",
    image: "/Car (5).png"
  },
  {
    name: "Honda CR-V",
    time: "2 days ago",
    image: "/Car (6).png"
  }
];

export default function DetailDashboard() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-blue-700 text-center dark:text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-700 text-center dark:text-gray-400">Comprehensive overview of your rental business</p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4"
          >
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FaDollarSign className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold dark:text-white">$54,230</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4"
          >
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
              <FaCar className="text-3xl text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Active Rentals</p>
              <p className="text-2xl font-bold dark:text-white">142</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4"
          >
            <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FaRoad className="text-3xl text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Total Trips</p>
              <p className="text-2xl font-bold dark:text-white">896</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4"
          >
            <div className="p-4 bg-pink-100 dark:bg-pink-900 rounded-lg">
              <FaUsers className="text-3xl text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Customers</p>
              <p className="text-2xl font-bold dark:text-white">2,340</p>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4 dark:text-white">Revenue Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4F46E5" 
                    strokeWidth={2}
                    dot={{ fill: '#4F46E5' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4 dark:text-white">Category Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            <h2 className="text-xl font-bold mb-4 dark:text-white">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="relative h-16 w-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold dark:text-white">New rental booked</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.name}     •    {item.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
         {/* Quick Stats */}
<motion.div 
  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
  initial={{ y: 20 }}
  animate={{ y: 0 }}
>
  <h2 className="text-xl font-bold mb-4 dark:text-white">Quick Stats</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Existing Stats */}
    <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-blue-300">Avg. Rental Duration</p>
          <p className="text-2xl font-bold dark:text-white">4.2 Days</p>
        </div>
        <FaCalendarCheck className="text-2xl text-blue-600 dark:text-blue-400" />
      </div>
    </div>

    <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-green-300">Satisfaction Rate</p>
          <p className="text-2xl font-bold dark:text-white">94%</p>
        </div>
        <FaChartLine className="text-2xl text-green-600 dark:text-green-400" />
      </div>
    </div>

    <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-purple-300">Active Promotions</p>
          <p className="text-2xl font-bold dark:text-white">3</p>
        </div>
        <FaTags className="text-2xl text-purple-600 dark:text-purple-400" />
      </div>
    </div>

    {/* New Additional Stats */}
    <div className="p-4 bg-orange-50 dark:bg-orange-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-orange-300">Total Reservations</p>
          <p className="text-2xl font-bold dark:text-white">286</p>
        </div>
        <FaListAlt className="text-2xl text-orange-600 dark:text-orange-400" />
      </div>
    </div>

    <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-yellow-300">Avg. Daily Rate</p>
          <p className="text-2xl font-bold dark:text-white">$89</p>
        </div>
        <FaCoins className="text-2xl text-yellow-600 dark:text-yellow-400" />
      </div>
    </div>

    <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-red-300">Fleet Utilization</p>
          <p className="text-2xl font-bold dark:text-white">82%</p>
        </div>
        <FaGasPump className="text-2xl text-red-600 dark:text-red-400" />
      </div>
    </div>

    <div className="p-4 bg-teal-50 dark:bg-teal-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-teal-300">Maintenance Alerts</p>
          <p className="text-2xl font-bold dark:text-white">5</p>
        </div>
        <FaTools className="text-2xl text-teal-600 dark:text-teal-400" />
      </div>
    </div>

    <div className="p-4 bg-pink-50 dark:bg-pink-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-pink-300">Customer Retention</p>
          <p className="text-2xl font-bold dark:text-white">88%</p>
        </div>
        <FaUserCheck className="text-2xl text-pink-600 dark:text-pink-400" />
      </div>
    </div>

    <div className="p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-indigo-300">Revenue/Vehicle</p>
          <p className="text-2xl font-bold dark:text-white">$1,240</p>
        </div>
        <FaDollarSign className="text-2xl text-indigo-600 dark:text-indigo-400" />
      </div>
    </div>
  </div>
</motion.div>
        </div>
      </div>
    </div>
  );
}