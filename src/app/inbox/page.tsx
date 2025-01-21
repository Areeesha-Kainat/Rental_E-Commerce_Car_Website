'use client';

import { motion } from 'framer-motion';

export default function InboxPage() {
  const messages = [
    { id: 1, sender: 'Customer Support', preview: 'Your rental confirmation is ready! 🚗', unread: true },
    { id: 2, sender: 'Payment System', preview: 'Invoice #1234 has been generated. 💳', unread: false },
    { id: 3, sender: 'Car Maintenance', preview: 'Your car service is scheduled for next week. 🛠️', unread: true },
    { id: 4, sender: 'Travel Updates', preview: 'New travel deals are available! ✈️', unread: false },
    { id: 5, sender: 'Feedback Team', preview: 'We’d love to hear your feedback! 🌟', unread: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mb-8"
      >
        <h1 className="text-4xl text-center font-bold text-blue-700">Inbox</h1>
        <p className="text-lg text-center text-gray-600">Your messages and notifications</p>
      </motion.div>

      {/* Message List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl shadow-lg cursor-pointer transition-all ${
              message.unread
                ? 'bg-white border-l-4 border-blue-500 hover:bg-blue-50'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900">{message.sender}</p>
                <p className="text-gray-600">{message.preview}</p>
              </div>
              {message.unread && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.3, type: 'spring', stiffness: 200 }}
                  className="w-3 h-3 bg-blue-500 rounded-full"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Action Button (FAB) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </motion.button>
    </div>
  );
}