'use client';

import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons
import { GiCarDoor } from "react-icons/gi"; // Fuel icon placeholder
import { BiCog } from "react-icons/bi"; // Transmission icon
import { FaUsers } from "react-icons/fa"; // Seats icon
import Image from "next/image"; // Import Next.js Image component
import { useState, useEffect } from "react";
import Link from "next/link";

// Define Car type for TypeScript
type Car = {
  _id: string;
  name: string;
  brand: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: number;
  pricePerDay: number;
  originalPrice?: number;
  tags: string[];
  imageUrl: string;
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Car[]>([]);

  // Fetch wishlist data from localStorage on component mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Toggle car in wishlist
  const toggleWishlist = (car: Car) => {
    let updatedWishlist = [...wishlist];
    const isCarInWishlist = wishlist.some((item) => item._id === car._id);

    if (isCarInWishlist) {
      updatedWishlist = updatedWishlist.filter((item) => item._id !== car._id);
    } else {
      updatedWishlist.push(car);
    }

    // Update wishlist in localStorage and state
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  // Check if a car is in the wishlist
  const isCarInWishlist = (car: Car) => wishlist.some((item) => item._id === car._id);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-xl font-bold">Your Wishlist</h2>

        <div className="mt-6">
          <div className="flex gap-6 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {wishlist.map((car) => (
              <div
                key={car._id}
                className="bg-white shadow-md rounded-lg p-6 relative w-[304px] h-auto"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{car.name}</h3>
                  <button onClick={() => toggleWishlist(car)}>
                    {isCarInWishlist(car) ? (
                      <FaHeart className="w-6 h-6 text-red-500" />
                    ) : (
                      <FaRegHeart className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">{car.type}</p>
                </div>

                <div className="mt-4 mb-4 flex justify-center relative">
                  <Image
                    src={car.imageUrl}
                    alt={car.name}
                    width={232}
                    height={128}
                    className="w-auto h-auto object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white opacity-25 shadow-lg h-8"></div>
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

                {/* Price and Rent Button */}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-bold">
                    ${car.pricePerDay}.00 <span className="text-gray-400 text-[14px]">/day</span>
                  </p>
                  <Link href={`/Wishlist/${car._id}`}>
                    <button className="bg-blue-700 text-white px-4 py-2 text-sm rounded-md">
                      Rent Now
                    </button>
                  </Link>
                </div>

                {/* Original Price */}
                {car.originalPrice && (
                  <p className="text-sm text-gray-500 line-through">${car.originalPrice}.00</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
