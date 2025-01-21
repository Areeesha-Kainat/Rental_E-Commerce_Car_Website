import React from "react";
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8 px-4 sm:px-10 lg:px-20">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 border-b pb-6 border-gray-300">
        {/* Logo and Vision */}
        <div className="lg:w-1/3">
          <h2 className="text-blue-600 font-bold text-lg">MORENT</h2>
          <p className="text-gray-500 mt-2">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>

        {/* Navigation Links (Aligned to the right) */}
        <div className="lg:w-2/3 flex flex-col lg:flex-row lg:justify-end gap-8">
          {/* About Section */}
          <div className="flex-1">
    <h3 className="font-semibold text-gray-800 mb-2">About</h3>
    <ul className="space-y-2">
      <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
        <Link href="/analytics">Analytics Dashboard</Link>
      </li>
      <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
        <Link href="/faq">FAQ</Link>
      </li>
      <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
        <Link href="/socialmedia">Share </Link>
      </li>
      <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
        <Link href="/translation">Translation</Link>
      </li>
      <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
        <Link href="/reimburse">Reimburse</Link>
      </li>
    </ul>
  </div>

          {/* Community Section */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-2">Community</h3>
            <ul className="space-y-2">
              <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
              <Link href="/giftcard">Gift Card and Voucher</Link>
               
              </li>
              <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
                <Link href="/subscription">Subscription</Link>
              </li>
              <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
                <Link href="/insight">Insights</Link>
              </li>
              <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
                <Link href="/detaildashboard">Detail Dashboard</Link>
              </li>
              <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
                <Link href="/calendar">Calendar</Link>
              </li>
            </ul>
          </div>

          {/* Socials Section */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-2">Socials</h3>
            <ul className="space-y-2">
              <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
              Linkedin
              </li>
              <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
                Github
              </li>
              <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
                Facebook
              </li>
              <li className="text-gray-500 hover:text-blue-600 cursor-pointer">
                Discord
              </li>
              
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-500 text-sm">
        <p className="text-center sm:text-left">©2022 MORENT. All rights reserved</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <span className="hover:text-blue-600 cursor-pointer">
            Privacy & Policy
          </span>
          <span className="hover:text-blue-600 cursor-pointer">
            Terms & Condition
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
