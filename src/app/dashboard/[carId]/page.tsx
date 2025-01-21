'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Restored Link import
import { useRouter } from 'next/navigation'; // Import useRouter
import { client } from '@/sanity/lib/client';
import { FaTachometerAlt, FaCar, FaChartBar, FaWallet, FaInbox, FaCalendarAlt, FaCog, FaQuestionCircle, FaMoon, FaSun } from "react-icons/fa";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface Car {
  _id: string;
  name: string;
  pricePerDay: number;
  imageUrl: string;
  type: string;
  transmission: string;
  seatingCapacity: number;
}

export default function DashboardPage({ params }: { params: { carId: string } }) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const query = `*[_type == "car" && _id == $carId][0] {
          _id,
          name,
          pricePerDay,
          "imageUrl": image.asset->url,
          type,
          transmission,
          seatingCapacity
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

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!car) {
    return <div className="min-h-screen flex items-center justify-center">Car not found</div>;
  }

  // Data for the donut chart
  const donutChartData = {
    labels: ["Sport Car: ", "SUV: ", "Coupe: ", "Hatchback: ", "MPV: "],
    datasets: [
      {
        label: "Rentals",
        data: [17439, 9478, 18197, 12510, 14406],
        backgroundColor: [
          "#102E7A",
          "#1A4393",
          "#2A60B7",
          "#3D81DB",
          "#54A6FF",
        ],
        hoverBackgroundColor: [
          "#102E7A",
          "#1A4393",
          "#2A60B7",
          "#3D81DB",
          "#54A6FF",
        ],
        borderWidth: 2, // Decrease the thickness of the donut chart
      },
    ],
  };

  // Options for the donut chart
  const donutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Adjust the size of the hole in the middle (increase for thinner donut)
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <aside className={`w-full lg:w-64 p-6 flex flex-col justify-between ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <nav>
          <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`}>Main Menu</h2>
          <ul className="space-y-4">
            {[
              { icon: <FaTachometerAlt />, text: "Dashboard", link: "/detaildashboard" },
              { icon: <FaCar />, text: "Car Rent", link: "/car-rent" },
              { icon: <FaChartBar />, text: "Insight", link: "/insight" },
              { icon: <FaWallet />, text: "Reimburse", link: "/reimburse" },
              { icon: <FaInbox />, text: "Inbox", link: "/inbox" },
              { icon: <FaCalendarAlt />, text: "Calendar", link: "/calendar" },
            ].map((item, index) => (
              <li 
                key={index}
                className={`flex items-center space-x-2 text-lg p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Link href={item.link} className="flex items-center space-x-2 w-full">
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className={`text-lg font-semibold mt-4 mb-4 ${theme === 'dark' ? 'text-blue-700' : 'text-blue-600'}`}>Preferences</h3>
          <ul className="space-y-2">
          {[
              { icon: <FaCog />, text: "Settings", link: "/setting" }, // Added link for Settings
              { icon: <FaQuestionCircle />, text: "Help & Center", link: "/faq" }, // Added link for Help & Center
              { icon: theme === 'dark' ? <FaSun /> : <FaMoon />, text: theme === 'dark' ? "Light Mode" : "Dark Mode" },
            ].map((item, index) => (
              <li 
                key={index}
                className={`flex items-center space-x-2 text-lg p-2 rounded-lg transition-colors cursor-pointer ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => {
                  if (item.link) {
                    router.push(item.link); // Navigate to the link
                  } else if (index === 2) {
                    toggleTheme(); // Toggle theme for Light/Dark Mode
                  }
                }}
              >
                {item.icon}
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          {/* Updated Log Out Button */}
          <button
            className={`mt-6 w-full p-3 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-blue-400 to-blue-800 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                : 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-500 text-white shadow-md hover:shadow-lg'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {/* Details Rental */}
          <div className={`col-span-1 lg:col-span-2 rounded-lg p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className="text-lg font-semibold mb-4">Details Rental</h2>
            
            {/* Video Section */}
            <div className="relative mb-6 w-full h-64">
              <video
                src="/istockphoto-842944640-640_adpp_is.mp4"
                autoPlay
                loop
                muted
                className={`w-full h-full object-cover rounded-lg ${theme === 'dark' ? 'filter brightness-90' : ''}`}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-24 h-16 flex-shrink-0">
                <Image
                  src={car.imageUrl}
                  alt="Car Thumbnail"
                  fill
                  className="object-cover rounded"
                  sizes="100px"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p className={`capitalize ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {car.type.toLowerCase()}
                </p>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  #{car._id.slice(-4)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Rental Price
              </p>
              <p className="text-xl font-bold">${car.pricePerDay.toFixed(2)}</p>
            </div>

            <div className={`mt-6 grid grid-cols-2 gap-4 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <div>
                <span className="text-lg font-bold">Transmission: </span>
                <p className="capitalize text-md font-semibold ">{car.transmission.toLowerCase()}</p>
              </div>
              <div>
                <span className="text-lg font-bold">Capacity: </span>
                <p className="text-md font-semibold">{car.seatingCapacity} Persons</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className={`space-y-6 rounded-lg p-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Top 5 Car Rental */}
            <div>
              <h2 className="text-md font-semibold mb-4">Top 5 Car Rentals</h2>
              <div className="flex flex-col sm:flex-row items-center space-x-4 mb-4">
                <div className="relative w-40 h-40">
                  <Doughnut data={donutChartData} options={donutChartOptions} />
                </div>
                <ul className={`space-y-2 mt-4 sm:mt-0 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {donutChartData.labels.map((label, index) => (
                    <li key={index} className="flex justify-between text-xs">
                      <span><b>{label}</b></span>
                      <span>{donutChartData.datasets[0].data[index].toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
              <ul className={`space-y-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {[
                  { name: "Nissan GT-R", price: "$80.00", image: "/car (6).png" },
                  { name: "Koenigsegg", price: "$99.00", image: "/car (4).png" },
                  { name: "Rolls-Royce", price: "$96.00", image: "/image 8.png" },
                  { name: "CR-V", price: "$80.00", image: "/car (5).png" },
                ].map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={60} 
                      height={40}
                      className={`rounded-lg ${theme === 'dark' ? 'filter brightness-90' : ''}`}
                    />
                    <span>{item.name}</span>
                    <span className="font-semibold">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}