"use client";


import { useState } from "react";
import ChatBot from "../chatbot/page";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nissan GT-R is on discount for rent: $80.00/day (actual price $100)", isRead: false },
    { id: 2, text: "New rental offer: Rent a luxury car and get a free upgrade!", isRead: false },
    { id: 3, text: "Limited time deal: SUV rentals starting at $50/day!", isRead: false },
  ]);
  

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl text-center font-semibold text-gray-800 mb-6">
        Your Notifications
      </h1>


      {/* Notifications */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`relative bg-white shadow-md p-4 rounded-lg border ${
              notification.isRead ? "border-green-500" : "border-gray-300"
            } transition-all duration-500 ease-in-out transform ${
              notification.isRead ? "translate-x-0" : "translate-x-5"
            }`}
          >
            <p className="text-gray-800">{notification.text}</p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleMarkAsRead(notification.id)}
                className={`px-4 py-2 text-sm font-medium rounded ${
                  notification.isRead
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-blue-700 text-white hover:bg-blue-600"
                }`}
                disabled={notification.isRead}
              >
                {notification.isRead ? "Marked as Read" : "Mark as Read"}
              </button>
              <button
                onClick={() => handleDelete(notification.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
            {notification.isRead && (
              <div className="absolute top-2 right-2 text-green-500 text-xl">
                ✓ {/* Tick icon */}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Buttons for Actions */}
      {notifications.length > 0 && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={handleMarkAllAsRead}
            className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
          >
            Mark All as Read
          </button>
          <button
            onClick={handleDeleteAll}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete All
          </button>
        </div>
      )}

      {/* Empty State */}
      {notifications.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No notifications available.</p>
      )}
    </div>
  );
}






