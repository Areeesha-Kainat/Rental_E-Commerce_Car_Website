'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Dot } from 'recharts';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiActivity, FiDollarSign, FiStar } from 'react-icons/fi';
import { useState } from 'react';

const data = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 7000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <p className="font-bold text-indigo-600 dark:text-indigo-400">{label}</p>
        <p className="flex items-center gap-2">
          <FiDollarSign className="text-green-500" />
          <span className="font-semibold">{payload[0].value}</span>
        </p>
      </motion.div>
    );
  }
  return null;
};

const AnimatedDot = (props: any) => {
  const { cx, cy, value } = props;
  return (
    <motion.g
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Dot
        {...props}
        r={6}
        fill="#4F46E5"
        strokeWidth={2}
        stroke="#fff"
        className="shadow-lg"
      />
    </motion.g>
  );
};

export default function InsightPage() {
  const [activeMetric, setActiveMetric] = useState<number | null>(null);

  return (
    <div className="p-6 max-w-7xl mx-auto ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Chart Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FiActivity className="text-blue-600 dark:text-indigo-400" />
              Revenue Overview
            </h2>
            <div className="bg-indigo-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
              +24% vs last quarter
            </div>
          </div>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tick={{ fill: '#6B7280' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tick={{ fill: '#6B7280' }} 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  dot={<AnimatedDot />}
                  activeDot={{ r: 8 }}
                  strokeLinecap="round"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="space-y-6">
          {[
            { metric: 'Total Rentals', value: '142', change: '+12%', icon: FiArrowUpRight, color: 'bg-green-100', text: 'text-green-600' },
            { metric: 'Customer Satisfaction', value: '94%', change: '+2%', icon: FiStar, color: 'bg-amber-100', text: 'text-amber-600' },
            { metric: 'Repeat Customers', value: '68%', change: '+5%', icon: FiArrowUpRight, color: 'bg-indigo-100', text: 'text-indigo-600' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl shadow-xl transition-all duration-300 cursor-pointer ${activeMetric === index ? 'bg-indigo-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
              onHoverStart={() => setActiveMetric(index)}
              onHoverEnd={() => setActiveMetric(null)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">{item.metric}</p>
                  <p className="text-3xl font-bold">{item.value}</p>
                </div>
                <div className={`${item.color} dark:bg-opacity-20 p-3 rounded-full`}>
                  <item.icon className={`w-6 h-6 ${item.text} dark:text-${item.text.split('-')[1]}-400`} />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm">
                <span className={`${item.text} dark:text-${item.text.split('-')[1]}-400`}>{item.change}</span>
                <span className="text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Additional Content Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
      >
        <div className="bg-gradient-to-br from-blue-600 to-blue-600 p-6 rounded-2xl text-white shadow-2xl">
          <h3 className="text-lg font-semibold mb-2">Peak Hours</h3>
          <p className="text-4xl font-bold mb-4">3-5 PM</p>
          <div className="h-2 bg-indigo-400 rounded-full mb-3">
            <div className="w-3/4 h-2 bg-white rounded-full"></div>
          </div>
          <p className="text-sm opacity-90">80% of bookings happen during peak hours</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          {['Luxury Sedan', 'SUV', 'Sports Car'].map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-0 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">{item}</span>
              <span className="text-sm bg-indigo-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full">
                2h ago
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 dark:bg-blue-900 rounded-full transform translate-x-12 -translate-y-12"></div>
          <h3 className="text-lg font-semibold mb-4">Performance Score</h3>
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle className="text-gray-200 dark:text-gray-600" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
              <circle
                className="text-blue-600"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset="251.2 - (251.2 * 82) / 100"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              82/100
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Overall system performance score</p>
        </div>
      </motion.div>
    </div>
  );
}