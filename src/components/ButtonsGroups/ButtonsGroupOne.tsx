import React from 'react';
import { Link } from 'react-router-dom';

const ButtonsGroupOne: React.FC = () => {
  return (
      <div className="mt-1">
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <Link
              to="#"
              className="inline-flex bg-transparent rounded-[3px] mx-2 py-1 px-2 font-medium text-gray6 text-xs hover:bg-white hover:text-black"
            >
              Total
            </Link>
            |
            <Link
              to="#"
              className="inline-flex bg-transparent rounded-[3px] mx-2 py-1 px-2 font-medium text-gray6 text-xs hover:bg-white hover:text-blackd"
            >
              Scope 1
            </Link>
            |
            <Link
              to="#"
              className="inline-flex bg-transparent rounded-[3px] mx-2 py-1 px-2 font-medium text-gray6 text-xs hover:bg-white hover:text-black"
            >
              Scope 2
            </Link>
            |
            <Link
              to="#"
              className="inline-flex bg-transparent rounded-[3px] mx-2 py-1 px-2 font-medium text-gray6 text-xs hover:bg-white hover:text-black"
            >
              Scope 3
            </Link>
          </div>
        </div>
      </div>

  );
};

export default ButtonsGroupOne;
