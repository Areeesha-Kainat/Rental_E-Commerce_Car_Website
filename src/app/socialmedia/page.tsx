'use client';

import { useState } from 'react';
import { FaFacebook, FaHeart, FaRegHeart, FaTwitter, FaWhatsapp } from "react-icons/fa"; // Heart icons
import { GiCarDoor } from "react-icons/gi"; // Fuel icon
import { BiCog } from "react-icons/bi"; // Transmission icon
import { FaUsers } from "react-icons/fa"; // Seats icon
import Image from "next/image";

type Car = {
  _id: string;
  name: string;
  brand: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: number;
  pricePerDay: number;
  imageUrl: string;
};

const SharePage = () => {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [sharedMessage, setSharedMessage] = useState<string>('');

  const cars: Car[] = [
    {
      _id: '1',
      name: 'BMW X5',
      brand: 'BMW',
      type: 'SUV',
      fuelCapacity: '60L',
      transmission: 'Automatic',
      seatingCapacity: 5,
      pricePerDay: 150,
      imageUrl: '/car (5).png',
    },
    {
      _id: '2',
      name: 'Audi Q7',
      brand: 'Audi',
      type: 'SUV',
      fuelCapacity: '80L',
      transmission: 'Manual',
      seatingCapacity: 7,
      pricePerDay: 200,
      imageUrl: '/car (4).png',
    },
    {
      _id: '3',
      name: 'New MG ZS',
      brand: 'MG',
      type: 'SUV',
      fuelCapacity: '70L',
      transmission: 'Manual',
      seatingCapacity: 6,
      pricePerDay: 100,
      imageUrl: '/car (6).png',
    },
  ];

  const handleSelectCar = (car: Car) => {
    setSelectedCars((prev) => {
      if (prev.some((item) => item._id === car._id)) {
        return prev.filter((item) => item._id !== car._id); // Deselect car
      }
      return [...prev, car]; // Select car
    });
  };

  const handleShare = () => {
    if (selectedCars.length > 0 && selectedPlatform) {
      setSharedMessage(`Your selected cars have been shared on ${selectedPlatform}!`);
    } else {
      setSharedMessage('Please select a car and a platform to share.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Share Your Cars</h2>

        {/* Cars Section */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div
              key={car._id}
              className={`bg-white shadow-md rounded-lg p-6 relative ${selectedCars.some(item => item._id === car._id) ? 'border-4 border-blue-500' : ''}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <button
                  className="text-blue-500"
                  onClick={() => handleSelectCar(car)}
                >
                  {selectedCars.some(item => item._id === car._id) ? (
                    <FaHeart className="w-6 h-6 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Car Image */}
              <div className="mt-4 mb-4 flex justify-center relative">
                <Image
                  src={car.imageUrl}
                  alt={car.name}
                  width={232}
                  height={128}
                  className="w-auto h-auto object-contain"
                />
              </div>

              {/* Car Details */}
              <div className="flex items-center text-gray-500 text-sm mt-6 space-x-4">
                <div className="flex items-center space-x-1">
                  <GiCarDoor className="w-4 h-4 text-gray-500" />
                  <p>{car.fuelCapacity}L</p>
                </div>
                <div className="flex items-center space-x-1">
                  <BiCog className="w-4 h-4 text-gray-500" />
                  <p>{car.transmission}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <FaUsers className="w-4 h-4 text-gray-500" />
                  <p>{car.seatingCapacity} people</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold">
                  ${car.pricePerDay}.00{" "}
                  <span className="text-gray-400 text-[14px]">/day</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Select Platform Dropdown */}
        {selectedCars.length > 0 && (
          <div className="mt-8">
            <label htmlFor="platform" className="block text-blue-700 font-semibold mb-2">
              Select Platform to Share:
            </label>
            <select
              id="platform"
              className="border-2 border-gray-300 rounded-lg p-2"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="">Select a platform</option>
              <option value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
          </div>
        )}

        {/* Share Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            onClick={handleShare}
          >
            Share Selected Cars
          </button>
        </div>

        {/* Share Confirmation Message */}
        {sharedMessage && (
          <div className="mt-6 text-center text-lg font-semibold text-blue-600">
            {sharedMessage}
          </div>
        )}

        {/* Social Media Share Icons */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Share this page</h3>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <FaFacebook size={30} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              <FaTwitter size={30} />
            </a>
            <a href="#" className="text-green-500 hover:text-green-700">
              <FaWhatsapp size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePage;
