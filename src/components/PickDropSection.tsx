"use client"
import React, { useState } from "react";
import PickDropCard from "./PickDropCard";

const PickDropSection = () => {
  // State to store selected values with default values
  const [pickupLocation, setPickupLocation] = useState<string>("Select Location");
  const [pickupDate, setPickupDate] = useState<string>("Select Date");
  const [pickupTime, setPickupTime] = useState<string>("Select Timing");
  const [dropoffLocation, setDropoffLocation] = useState<string>("Select Location");
  const [dropoffDate, setDropoffDate] = useState<string>("Select Date");
  const [dropoffTime, setDropoffTime] = useState<string>("Select Timing");
  const [availabilityMessage, setAvailabilityMessage] = useState<string>("");

  // Function to handle the arrow button click
  const handleCheckAvailability = () => {
    // Check if any dropdown has the default "Select" value
    if (
      pickupLocation === "Select Location" ||
      pickupDate === "Select Date" ||
      pickupTime === "Select Timing" ||
      dropoffLocation === "Select Location" ||
      dropoffDate === "Select Date" ||
      dropoffTime === "Select Timing"
    ) {
      setAvailabilityMessage("Please select valid options to check availability.");
      return;
    }

    // Mock logic for car availability
    if (
      pickupLocation === "Karachi" &&
      dropoffLocation === "Lahore" &&
      pickupDate === "Today" &&
      pickupTime === "Morning"
    ) {
      setAvailabilityMessage("Car is available for your selected options!");
    } else if (
      pickupLocation === "Islamabad" &&
      dropoffLocation === "Karachi"
    ) {
      setAvailabilityMessage("Car is unavailable for your selected options.");
    } else {
      setAvailabilityMessage("No cars available for the selected options.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-6 px-6 py-10 bg-gray-100 rounded-lg shadow-md">
      {/* Availability Message at the Top */}
      {availabilityMessage && (
        <div className="w-full text-center mb-6">
          <p
            className={`text-lg font-semibold ${
              availabilityMessage.includes("available")
                ? "text-green-600"
                : availabilityMessage.includes("unavailable")
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {availabilityMessage}
          </p>
        </div>
      )}

      {/* Pick-Up and Drop-Off Cards with Arrow Button */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full">
        {/* Pick-Up Card */}
        <PickDropCard
          title="Pick - Up"
          onLocationChange={setPickupLocation}
          onDateChange={setPickupDate}
          onTimeChange={setPickupTime}
        />

        {/* Arrow Button */}
        <button
          onClick={handleCheckAvailability}
          className="bg-blue-600 w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-white text-xl lg:w-24 lg:h-12 lg:rounded-md hover:bg-blue-700 transition-all"
        >
          <b>↑↓</b>
        </button>

        {/* Drop-Off Card */}
        <PickDropCard
          title="Drop - Off"
          onLocationChange={setDropoffLocation}
          onDateChange={setDropoffDate}
          onTimeChange={setDropoffTime}
        />
      </div>
    </section>
  );
};

export default PickDropSection;