'use client';

import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons
import { GiCarDoor } from "react-icons/gi"; // Fuel icon placeholder
import { BiCog } from "react-icons/bi"; // Transmission icon
import { FaUsers } from "react-icons/fa"; // Seats icon
import Image from "next/image"; // Import Next.js Image component
import { client } from "@/sanity/lib/client";
import { fetchCarsQuery } from "@/sanity/queries"; // Adjust the path if necessary
import Link from "next/link";
import { useState, useEffect } from "react"; // For localStorage and wishlist functionality
import PickDropSection from "@/components/PickDropSection";

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
  tags: string[]; // Removed popular tag here
  imageUrl: string;
};

export default function CategoryPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCars: Car[] = await client.fetch(fetchCarsQuery);
      setCars(fetchedCars);
      setFilteredCars(fetchedCars); // Initialize filteredCars with all cars
    };

    fetchData();
  }, []);

  // Wishlist state and functions
  const [wishlist, setWishlist] = useState<Car[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const toggleWishlist = (car: Car) => {
    let updatedWishlist = [...wishlist];
    const isCarInWishlist = wishlist.some((item) => item._id === car._id);

    if (isCarInWishlist) {
      updatedWishlist = updatedWishlist.filter((item) => item._id !== car._id);
      setMessage(`Removed ${car.name} from wishlist`);
    } else {
      updatedWishlist.push(car);
      setMessage(`Added ${car.name} to wishlist`);
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const isCarInWishlist = (car: Car) => wishlist.some((item) => item._id === car._id);

  const types = [
    { name: "Sport", count: 10 },
    { name: "SUV", count: 12 },
    { name: "Gasoline", count: 16 },
    { name: "Sedan", count: 20 },
    { name: "Hybrid", count: 14 },
    { name: "Hatchback", count: 14 },
  ];

  const capacities = [
    { name: "2 Person", count: 10 },
    { name: "4 Person", count: 14 },
    { name: "5 Person", count: 8 },
    { name: "6 Person", count: 12 },
    { name: "7 or More", count: 16 },
  ];

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(100);

  useEffect(() => {
    let filtered = cars;

    if (selectedType) {
      filtered = filtered.filter((car) => car.type === selectedType);
    }

    if (selectedCapacity) {
      const capacityMap: { [key: string]: number } = {
        "2 Person": 2,
        "4 Person": 4,
        "5 Person": 5,
        "6 Person": 6,
        "7 or More": 7,
      };
      filtered = filtered.filter((car) => car.seatingCapacity >= capacityMap[selectedCapacity!]);
    }

    filtered = filtered.filter((car) => car.pricePerDay <= price);

    setFilteredCars(filtered);
  }, [selectedType, selectedCapacity, price, cars]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden lg:block w-[360px] h-[1600px] p-6 bg-white shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Type</h2>
          <ul className="space-y-3">
            {types.map((type) => (
              <li
                key={type.name}
                className="flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedType(type.name)}
              >
                <span className="flex items-center text-xl">{type.name}</span>
                <span className="text-gray-400">{type.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Capacity</h2>
          <ul className="space-y-3">
            {capacities.map((capacity) => (
              <li
                key={capacity.name}
                className="flex justify-between items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedCapacity(capacity.name)}
              >
                <span className="flex items-center text-xl">{capacity.name}</span>
                <span className="text-gray-400">{capacity.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Price</h2>
          <div className="relative pt-2">
            <input
              type="range"
              min="0"
              max="500"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div
              className="absolute top-0 left-0 h-2 rounded-lg bg-blue-500 pointer-events-none"
              style={{ width: `${(price / 500) * 100}%` }}
            ></div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Min: $0</span>
              <span>Max: ${price}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {message && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3">
              <span className="material-icons text-2xl">info</span>
              <p className="text-sm font-medium">{message}</p>
              <button
                className="ml-4 bg-blue-800 hover:bg-blue-900 text-white px-2 py-1 rounded-full text-xs font-bold"
                onClick={() => setMessage("")}
              >
                ✕
              </button>
            </div>
          )}

          <div className="mt-12">
            <PickDropSection />
            <div className="mt-6 overflow-x-auto sm:overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <div key={car._id} className="bg-white shadow-md rounded-lg p-6 relative">
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
                        width={200}
                        height={200}
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="mt-2">
                      <p className="text-lg font-semibold text-gray-900">${car.pricePerDay} / Day</p>
                    </div>

                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <GiCarDoor className="w-5 h-5 text-gray-600" />
                        <span>{car.fuelCapacity}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <BiCog className="w-5 h-5 text-gray-600" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <FaUsers className="w-5 h-5 text-gray-600" />
                        <span>{car.seatingCapacity} Seats</span>
                      </div>
                    </div>

                    <Link
                      href={`/car/${car._id}`}
                      className="block mt-6 text-center bg-blue-600 text-white px-6 py-2 rounded-md"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
