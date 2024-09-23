import React, { useState, useRef, useEffect } from 'react';

interface DropdownsYearProps {
  onYearSelect: (year: number) => void; // Callback for when a year is selected
}

const DropdownsYear: React.FC<DropdownsYearProps> = ({ onYearSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2023); // Default to the first year

  const years = [2023, 2022, 2021]; 

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // Close if the ESC key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleYearSelect = (year: number) => {
    setSelectedYear(year); 
    setDropdownOpen(false); 
    onYearSelect(year); 
  };

  return (
    <div className="ml-2 relative">
      <button
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-center border border-borgray bg-white rounded-[8px] pl-2 w-[88px] h-[28px] text-xs text-gray6 dark:text-white"
      >
        {selectedYear}년도
        <svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
          <path d="M3 3L0.401924 -4.89399e-07L5.59808 -3.51373e-08L3 3Z" fill="#666666" />
        </svg>
      </button>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute z-9999 top-full right-0 pt-1 bg-white border border-borgray rounded-md shadow-lg ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
        style={{ width: '88px', height: 'auto', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        <ul className="flex flex-col items-center justify-center">
          {years.map((year) => (
            <li
              key={year}
              className="w-full text-center text-xs py-1 text-gray6 hover:bg-[#EFEFEF] hover:text-gray6 cursor-pointer"
              onClick={() => handleYearSelect(year)} 
            >
              {year}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownsYear;
