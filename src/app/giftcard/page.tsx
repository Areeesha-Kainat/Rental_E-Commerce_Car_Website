"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGift, FaCreditCard, FaCheckCircle } from "react-icons/fa";

const GiftCardVoucher = () => {
  const [activeTab, setActiveTab] = useState<"purchase" | "redeem" | "balance">("purchase");
  const [message, setMessage] = useState<string | null>(null);

  const handlePurchase = () => {
    setMessage("Congratulations! Your purchase was successful.");
  };

  const handleRedeem = () => {
    const giftCardNumber = "GC-1234-5678-9101"; // Static gift card number
    setMessage(`Your gift card number is: ${giftCardNumber}`);
  };

  const handleCheckBalance = () => {
    const balance = "$50.00"; // Static balance
    setMessage(`Your current balance is: ${balance}`);
  };

  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-700 text-center mb-8">Gift Cards & Vouchers</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => { setActiveTab("purchase"); clearMessage(); }}
          className={`px-6 py-2 rounded-full font-semibold flex items-center space-x-2 transition-all ${
            activeTab === "purchase"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-blue-600 hover:bg-blue-50"
          }`}
        >
          <FaGift />
          <span>Purchase</span>
        </button>
        <button
          onClick={() => { setActiveTab("redeem"); clearMessage(); }}
          className={`px-6 py-2 rounded-full font-semibold flex items-center space-x-2 transition-all ${
            activeTab === "redeem"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-blue-600 hover:bg-blue-50"
          }`}
        >
          <FaCreditCard />
          <span>Redeem</span>
        </button>
        <button
          onClick={() => { setActiveTab("balance"); clearMessage(); }}
          className={`px-6 py-2 rounded-full font-semibold flex items-center space-x-2 transition-all ${
            activeTab === "balance"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-blue-600 hover:bg-blue-50"
          }`}
        >
          <FaCheckCircle />
          <span>Check Balance</span>
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-6">
        <AnimatePresence mode="wait">
          {activeTab === "purchase" && (
            <motion.div
              key="purchase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Purchase Gift Card</h2>
              <p className="text-gray-600 mb-6">
                Choose the perfect gift card for your loved ones. Available in various denominations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    amount: 25,
                    image: "/card1.jpg",
                    description: "Perfect for a day trip or short rental. Ideal for budget-conscious users.",
                  },
                  {
                    amount: 50,
                    image: "/card2.jpg",
                    description: "Great for weekend getaways or family outings. Offers flexibility and value.",
                  },
                  {
                    amount: 100,
                    image: "/card3.jpg",
                    description: "Luxury experience for long trips or special occasions. Premium service included.",
                  },
                ].map((card) => (
                  <motion.div
                    key={card.amount}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={card.image}
                        alt={`Gift Card ${card.amount}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800">${card.amount}</h3>
                    <p className="text-gray-600 mt-2">{card.description}</p>
                    <button 
                      onClick={handlePurchase}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all"
                    >
                      Purchase
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "redeem" && (
            <motion.div
              key="redeem"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Redeem Voucher</h2>
              <p className="text-gray-600 mb-6">
                Enter your voucher code below to redeem it and enjoy exclusive benefits.
              </p>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Enter Voucher Code"
                 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <button 
                  onClick={handleRedeem}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2"
                >
                  <FaCreditCard />
                  <span>Redeem</span>
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "balance" && (
            <motion.div
              key="balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Check Gift Card Balance</h2>
              <p className="text-gray-600 mb-6">
                Enter your gift card number to check the remaining balance.
              </p>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Enter Gift Card Number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <button 
                  onClick={handleCheckBalance}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2"
                >
                  <FaCheckCircle />
                  <span>Check Balance</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message Display */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
          >
            {message}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GiftCardVoucher;


