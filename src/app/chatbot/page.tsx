"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// FAQ Data
const faqData = [
  {
    question: "What is the minimum age for renting a car?",
    answer: "The minimum age for renting a car is 21 years old. Drivers under 25 may incur an additional fee.",
  },
  {
    question: "Can I rent a car without a credit card?",
    answer: "We require a credit card for booking and payment. Debit cards may not be accepted at all locations.",
  },
  {
    question: "Do you offer insurance for rental cars?",
    answer: "Yes, we offer insurance options at the time of booking or when you pick up the car.",
  },
  {
    question: "Can I extend my rental period?",
    answer: "Yes, you can extend your rental period by contacting us before your rental period ends.",
  },
  {
    question: "What do I need to bring when picking up the car?",
    answer: "You will need to bring a valid driver&rsquo;s license, a credit card, and proof of insurance (if not purchasing ours).",
  },
  {
    question: "Are the rental cars well maintained?",
    answer: "Yes, we ensure that all our cars are well-maintained and inspected regularly for your safety.",
  },
  {
    question: "What types of cars do you offer?",
    answer: "We offer a wide range of cars, including sedans, SUVs, luxury cars, and economy cars.",
  },
  {
    question: "Can I cancel or modify my reservation?",
    answer: "Yes, you can cancel or modify your reservation up to 24 hours before your rental period starts.",
  },
  {
    question: "Do you offer long term rentals?",
    answer: "Yes, we offer long-term rental options with discounted rates. Contact us for more details.",
  },
  {
    question: "What happens if I return the car late?",
    answer: "Late returns may incur additional charges. Please contact us if you anticipate a delay.",
  },
  {
    question: "Do you provide child car seats?",
    answer: "Yes, we provide child car seats for an additional fee. Please request them at the time of booking.",
  },
  {
    question: "Can I rent a car for one-way trips?",
    answer: "Yes, we offer one-way rentals. Additional fees may apply depending on the drop-off location.",
  },
  {
    question: "What is your fuel policy?",
    answer: "We provide the car with a full tank of fuel, and we ask that you return the car with a full tank. If not, a refueling fee will apply.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, we are transparent with all our fees. The only additional costs may be related to insurance, additional drivers, or late returns.",
  },
  {
    question: "Do you offer electric or hybrid cars?",
    answer: "Yes, we offer electric and hybrid cars in select locations. Please inquire when booking for availability.",
  },
  {
    question: "Is there a mileage limit?",
    answer: "We offer both unlimited mileage and limited mileage options. Please review your rental terms during booking.",
  },
  {
    question: "What is your policy on smoking in rental cars?",
    answer: "Smoking is strictly prohibited in all our rental cars. A cleaning fee will be charged if smoking occurs in the vehicle.",
  },
];



// Casual Responses for the ChatBot
const casualResponses = [
  { keyword: "hi", response: "Hello! How can I assist you today?" },
  { keyword: "how are you", response: "Im doing great, thank you for asking! How can I help you today?" },
  { keyword: "thanks", response: "Youre welcome! Let me know if you need anything else." },
  { keyword: "bye", response: "Goodbye! Have a great day!" },
  { keyword: "help", response: "Sure! Im here to assist you with anything related to car rentals. How can I help?" },
  { keyword: "founder", response: "The founder of this chatbot is Areesha Kainat." },
  { keyword: "who created you", response: "I was created by Areesha Kainat." },
  { keyword: "who made you", response: "Areesha Kainat is the creator of this chatbot." },
  { keyword: "rental", response: "I can help you with car rental information. What do you need assistance with?" },
  { keyword: "car rental", response: "Looking for a car to rent? I can help you with pricing, booking, and car options." },
  { keyword: "pricing", response: "Our prices vary by car type and rental duration. Would you like to see some options?" },
  { keyword: "booking", response: "Booking is easy! Just let me know which car you'd like and the dates, and I can help you secure your rental." },
  { keyword: "long term rental", response: "We offer long-term rental options with special pricing. Would you like more information?" },
  { keyword: "pickup", response: "Youll need a valid drivers license, credit card, and proof of insurance. Let me know if you need further details." },
  { keyword: "cancel", response: "You can cancel or modify your reservation up to 24 hours before the rental period starts." },
];


// ChatBot Component
const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ user: string; bot: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false); // State to toggle chatbot visibility

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, { user: message, bot: "..." }]);
    setIsLoading(true);

    const casualResponse = casualResponses.find((response) =>
      message.toLowerCase().includes(response.keyword)
    );

    if (casualResponse) {
      setTimeout(() => {
        setMessages([...messages, { user: message, bot: casualResponse.response }]);
        setMessage("");
        setIsLoading(false);
      }, 1000);
      return;
    }

    const faq = faqData.find((faq) =>
      faq.question.toLowerCase().includes(message.toLowerCase())
    );

    setTimeout(() => {
      setMessages([
        ...messages,
        {
          user: message,
          bot: faq ? faq.answer : "Sorry, I couldn't find an answer to that question. Please try again.",
        },
      ]);
      setMessage("");
      setIsLoading(false);
    }, 1000);
  };

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible); // Toggle chatbot visibility
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end space-y-4">
      {/* ChatBot Toggle Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center cursor-pointer"
        onClick={toggleChat}
      >
        <h3 className="text-lg font-semibold text-blue-600 mb-2">Let's Talk</h3>
        <Image
          src="/ai.avif" // Replace with your robot image path
          alt="ChatBot"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full hover:scale-110 transition-transform" // Added rounded-full for circular image
        />
      </motion.div>

      {/* ChatBot Window */}
      <AnimatePresence>
        {isChatVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg bg-white shadow-lg rounded-lg border border-gray-200"
          >
            {/* Chat Header */}
            <div className="bg-blue-600 text-white text-lg font-bold py-4 px-6 rounded-t-lg">
              Car Rental Assistant
            </div>

            {/* Messages */}
            <div className="p-4 space-y-4 overflow-y-auto max-h-64">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col space-y-2"
                  >
                    {/* User Message */}
                    <div className="self-end bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md max-w-max">
                      {msg.user}
                    </div>
                    {/* Bot Message */}
                    <div className="self-start bg-gray-100 text-gray-800 px-4 py-2 rounded-lg shadow-sm max-w-max">
                      {msg.bot}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="text-gray-500 text-sm animate-pulse">Bot is typing...</div>
              )}
            </div>

            {/* Input */}
            <div className="flex items-center p-4 border-t border-gray-200">
              <input
                type="text"
                placeholder="Ask me about car rentals..."
                className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="ml-3 bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
