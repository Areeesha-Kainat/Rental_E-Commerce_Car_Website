
import React from "react";

interface DropdownProps {
  label: string;
  options: string[];
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  className,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-gray-600 text-sm mb-1">{label}</label>
      <select
        className={`border border-gray-300 rounded-md shadow-sm w-full focus:ring-blue-500 focus:border-blue-500 ${className}`}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;