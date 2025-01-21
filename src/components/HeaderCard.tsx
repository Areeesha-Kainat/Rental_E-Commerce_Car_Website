

import Image from 'next/image';
import Link from 'next/link';

interface HeaderCardProps {
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  bgClass: string; // Background styling for each card
}

const HeaderCard: React.FC<HeaderCardProps> = ({
  title,
  description,
  buttonText,
  imageSrc,
  bgClass,
}) => {
  return (
    <div
      className={`relative rounded-lg p-6 ${bgClass} flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-6`}
    >
      {/* Text Section */}
      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
          {title}
        </h2>
        <p className="mt-4 text-sm sm:text-base lg:text-lg text-white text-opacity-80">
          {description}
        </p>
        <button className="mt-6 px-4 py-2 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300">
        <Link href="/category">
    
          {buttonText}
        </Link>
        </button>
      </div>

      {/* Image Section */}
      <div className="flex-1">
        <Image
          src={imageSrc}
          alt="Car Image"
          width={400}
          height={300}
          className="object-contain mx-auto lg:mx-0"
        />
      </div>
    </div>
  );
};

export default HeaderCard;
