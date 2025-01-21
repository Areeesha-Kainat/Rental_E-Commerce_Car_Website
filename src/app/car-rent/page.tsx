'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Heart icons
import { GiCarDoor } from 'react-icons/gi'; // Fuel icon
import { BiCog } from 'react-icons/bi'; // Transmission icon
import { FaUsers } from 'react-icons/fa'; // Seats icon

export default function CarRentPage() {
  const cars = [
    {
      id: '1',
      name: 'Tesla Model S',
      brand: 'Tesla',
      type: 'Electric',
      fuelCapacity: '100 kWh',
      transmission: 'Automatic',
      seatingCapacity: 5,
      pricePerDay: 99,
      imageUrl: '/car (6).png',
    },
    {
      id: '2',
      name: 'Porsche 911',
      brand: 'Porsche',
      type: 'Sports',
      fuelCapacity: '64L',
      transmission: 'Automatic',
      seatingCapacity: 2,
      pricePerDay: 149,
      imageUrl: '/image 8.png',
    },
    {
      id: '3',
      name: 'Range Rover',
      brand: 'Land Rover',
      type: 'SUV',
      fuelCapacity: '90L',
      transmission: 'Automatic',
      seatingCapacity: 7,
      pricePerDay: 129,
      imageUrl: '/car (4).png',
    },
    {
      id: '4',
      name: 'BMW M5',
      brand: 'BMW',
      type: 'Sedan',
      fuelCapacity: '68L',
      transmission: 'Automatic',
      seatingCapacity: 5,
      pricePerDay: 119,
      imageUrl: '/car (5).png',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Available Luxury Cars
      </motion.h1>

      {/* Cars Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car, index) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow-md rounded-lg p-6 relative"
          >
            {/* Car Name and Like Button */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <button className="text-blue-500">
                <FaRegHeart className="w-6 h-6 text-gray-400" />
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
                <p>{car.fuelCapacity}</p>
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

            {/* Rent Now Button */}
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Rent Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}