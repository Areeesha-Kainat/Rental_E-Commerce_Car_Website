'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from '@/sanity/lib/client';
import Link from "next/link";

interface Car {
  _id: string;
  name: string;
  pricePerDay: number;
  imageUrl: string;
  seatingCapacity: number;
  transmission: string;
  type: string;
  originalPrice?: number;
}

export default function PaymentPage({ params }: { params: { carId: string } }) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const query = `*[_type == "car" && _id == $carId][0] {
          _id,
          name,
          pricePerDay,
          "imageUrl": image.asset->url,
          seatingCapacity,
          transmission,
          type,
          originalPrice
        }`;
        
        const result = await client.fetch(query, { carId: params.carId });
        setCar(result);
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [params.carId]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section - Keep your existing form UI exactly as before */}
        {/* Left Section */}
        <div>
          {/* Billing Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-1">Billing Info</h2>
            <p className="text-gray-400 mb-6">Please Enter Your Billing info</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full p-2 border rounded-md text-left"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="w-full p-2 border rounded-md text-left"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-2 border rounded-md text-left"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Town / City</label>
                <input
                  type="text"
                  placeholder="Town / City"
                  className="w-full p-2 border rounded-md text-left"
                />
              </div>
            </div>
          </div>

          {/* Rental Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold">Rental Info</h2>
            <p className="text-gray-400 mb-6">Please Enter Your Rental Date</p>
            <div className="space-y-4">
              <h3 className="font-medium mb-2">Pick-Up</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    placeholder="Select your city"
                    className="w-full p-2 border rounded-md text-left"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md text-left"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full p-2 border rounded-md text-left"
                  />
                </div>
              </div>

              <h3 className="font-medium mb-2">Drop-Off</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    placeholder="Select your city"
                    className="w-full p-2 border rounded-md text-left"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md text-left"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full p-2 border rounded-md text-left"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold">Payment Method</h2>
            <p className="text-gray-400 mb-6">Please Enter Your payment method</p>
            <div className="space-y-4">
              {/* Credit Card Option */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="radio" name="payment" className="mr-2" />
                  <span>Credit Card</span>
                </div>
                <Image
                  src="/Visa.png" // Add your credit card image here
                  alt="Credit Card"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 mt-4">
                {/* Form fields layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full p-2 border rounded-md text-left"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">Expiration Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-2 border rounded-md text-left"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">Card Holder</label>
                    <input
                      type="text"
                      placeholder="Card Holder"
                      className="w-full p-2 border rounded-md text-left"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">CVC</label>
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full p-2 border rounded-md text-left"
                    />
                  </div>
                </div>
              </div>

              {/* PayPal Option */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="radio" name="payment" className="mr-2" />
                  <span>PayPal</span>
                </div>
                <Image
                  src="/PayPal.png" // Add your PayPal image here
                  alt="PayPal"
                  width={30}
                  height={30}
                  className="object-cover"
                />
              </div>

              {/* Bitcoin Option */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="radio" name="payment" className="mr-2" />
                  <span>Bitcoin</span>
                </div>
                <Image
                  src="/Bitcoin.png" // Add your Bitcoin image here
                  alt="Bitcoin"
                  width={30}
                  height={30}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Confirmation Section */}
          <h2 className="text-2xl font-bold ">Confirmation</h2>
          <div className="w-full flex items-center justify-between mb-4">
            <h1 className="text-gray-400">We are getting to the end. Just a few clicks and your rental is ready</h1>
            <h1>Step 4 of 4</h1>
          </div>

          {/* Small Paragraphs with Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>I agree with sending an Marketing and newsletter emails. No spam, promissed!</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>I agree with our terms and conditions and privacy policy.</span>
            </div>
          </div>

          {/* Rent Now Button */}
          {/* <button className="w-auto bg-blue-600 text-white p-2 py-4 px-4 rounded-md mt-4 text-sm">
          <Link href="/dashboard">
        Rent Now
   
  </Link>  
          </button> */}
          {/* Rent Now Button */}
<button className="w-auto bg-blue-600 text-white p-2 py-4 px-4 rounded-md mt-4 text-sm">
  <Link href={`/dashboard/${params.carId}`}>
    Rent Now
  </Link>  
</button>
        </div>
        {/* Right Section - Updated with your original UI structure */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Rental Summary</h2>
            <p className="text-gray-400 mb-6">
              Prices may change depending on the length of the rental and the <br /> 
              price of your rental car.
            </p>
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
                <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
                <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
              </div>
            ) : car ? (
              <div className="flex flex-col md:flex-row items-center mb-6">
                <div className="w-full md:w-72 h-48 relative mb-4 md:mb-0 md:mr-6">
                  {!imageError && car.imageUrl ? (
                    <Image
                      src={car.imageUrl}
                      alt={car.name}
                      fill
                      className="object-cover rounded-lg"
                      onError={() => setImageError(true)}
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Image not available</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold">{car.name}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                    <span className="text-gray-500 ml-2">440+ Reviews</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-red-500">Car not found</div>
            )}

            {/* Price Section */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <span>Subtotal:</span>
                <span>${car?.pricePerDay || 0}.00</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>Tax:</span>
                <span>$0</span>
              </div>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Apply promo code"
                  className="w-full p-2 border rounded-md"
                />
                <button className="absolute right-0 top-0 bottom-0 text-black px-4 py-2 rounded-md">
                  Apply Now
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold">
                  Total Rental Price:
                  <br />
                  <span className="text-gray-400 text-sm md:text-[14px] font-normal">
                    Overall price and includes rental discount
                  </span>
                </h1>
                <span className="text-xl font-bold">
                  ${car?.pricePerDay || 0}.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}