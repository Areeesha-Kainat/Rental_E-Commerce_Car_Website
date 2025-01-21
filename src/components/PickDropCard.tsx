
import React from "react";
import Dropdown from "./Dropdown";

interface PickDropCardProps {
  title: string;
  onLocationChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
}

const PickDropCard: React.FC<PickDropCardProps> = ({
  title,
  onLocationChange,
  onDateChange,
  onTimeChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 w-full">
      {/* Title */}
      <h3 className="text-lg font-bold text-gray-700 mb-4">{title}</h3>

      {/* Dropdowns in a Row */}
      <div className="flex items-center justify-between gap-4">
        <Dropdown
          label="Locations"
          options={["Select Location", "Karachi", "Lahore", "Islamabad"]}
          className="text-xs md:text-sm px-2 py-1 md:px-4 md:py-2"
          onChange={(e) => onLocationChange(e.target.value)}
        />
        <Dropdown
          label="Date"
          options={["Select Date", "Today", "Tomorrow", "Next Week"]}
          className="text-xs md:text-sm px-2 py-1 md:px-4 md:py-2"
          onChange={(e) => onDateChange(e.target.value)}
        />
        <Dropdown
          label="Time"
          options={["Select Timing", "Morning", "Afternoon", "Evening"]}
          className="text-xs md:text-sm px-2 py-1 md:px-4 md:py-2"
          onChange={(e) => onTimeChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PickDropCard;