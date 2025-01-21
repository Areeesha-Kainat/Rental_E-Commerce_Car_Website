"use client";

import { useState } from "react";
import { FaCheckCircle, FaSyncAlt, FaTimesCircle } from "react-icons/fa";

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "Premium Plan",
      price: "$19.99/month",
      status: "Active",
      renewalDate: "2023-12-01",
    },
    {
      id: 2,
      name: "Basic Plan",
      price: "$9.99/month",
      status: "Inactive",
      renewalDate: "2023-11-15",
    },
  ]);

  const handleSubscribe = (planName: string) => {
    alert(`Subscribed to ${planName}!`);
  };

  const handleCancel = (id: number) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: "Inactive" } : sub
      )
    );
    alert("Subscription canceled!");
  };

  const handleRenew = (id: number) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? { ...sub, status: "Active", renewalDate: "2024-01-01" }
          : sub
      )
    );
    alert("Subscription renewed!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
          Subscription Management
        </h1>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-600 p-6 rounded-2xl text-white">
            <h2 className="text-2xl font-bold mb-4">Premium Plan</h2>
            <p className="text-lg mb-4">Get access to all premium features.</p>
            <p className="text-3xl font-bold mb-6">$19.99/month</p>
            <button
              onClick={() => handleSubscribe("Premium Plan")}
              className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all"
            >
              Subscribe Now
            </button>
          </div>

          {/* Basic Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-600 p-6 rounded-2xl text-white">
            <h2 className="text-2xl font-bold mb-4">Basic Plan</h2>
            <p className="text-lg mb-4">Essential features for everyday use.</p>
            <p className="text-3xl font-bold mb-6">$9.99/month</p>
            <button
              onClick={() => handleSubscribe("Basic Plan")}
              className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all"
            >
              Subscribe Now
            </button>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Subscriptions
          </h2>
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {sub.name}
                  </h3>
                  <p className="text-gray-600">{sub.price}</p>
                  <p
                    className={`text-sm font-semibold ${
                      sub.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {sub.status}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Renewal Date: {sub.renewalDate}
                  </p>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  {sub.status === "Active" ? (
                    <button
                      onClick={() => handleCancel(sub.id)}
                      className="flex items-center bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-all"
                    >
                      <FaTimesCircle className="mr-2" />
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRenew(sub.id)}
                      className="flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition-all"
                    >
                      <FaSyncAlt className="mr-2" />
                      Renew
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;


