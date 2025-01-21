'use client';

import { motion } from 'framer-motion';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Set up moment localizer for the calendar
const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const events = [
    { id: 1, title: 'Car Service Appointment', start: new Date(2024, 2, 20, 10, 0), end: new Date(2024, 2, 20, 11, 0) },
    { id: 2, title: 'Client Meeting', start: new Date(2024, 2, 22, 14, 30), end: new Date(2024, 2, 22, 15, 30) },
    { id: 3, title: 'Rental Pickup', start: new Date(2024, 2, 25, 9, 0), end: new Date(2024, 2, 25, 10, 0) },
  ];

  const chartData = [
    { name: 'Jan', rentals: 12 },
    { name: 'Feb', rentals: 18 },
    { name: 'Mar', rentals: 15 },
    { name: 'Apr', rentals: 22 },
    { name: 'May', rentals: 20 },
    { name: 'Jun', rentals: 25 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">Rental Calendar</h1>
        <p className="text-lg text-center text-gray-600">Manage your rentals and appointments in one place.</p>
      </motion.div>

      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-12"
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className="rounded-lg"
        />
      </motion.div>

      {/* Events Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                <span className="text-sm text-gray-600">
                  {moment(event.start).format('h:mm A')}
                </span>
              </div>
              <p className="text-blue-600 font-medium">
                {moment(event.start).format('MMMM D, YYYY')}
              </p>
              <button className="mt-4 w-full bg-gray-100 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Rentals Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rentals" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}