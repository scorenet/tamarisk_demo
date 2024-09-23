import React, { useEffect, useRef } from 'react';

interface DropdownNotificationProps {
  isOpen: boolean;
  onToggle: () => void;
  onIconClick: (action: string) => void;
}

const Dropdownmenu: React.FC<DropdownNotificationProps> = ({ isOpen, onToggle, onIconClick }) => {
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!isOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      onToggle();
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!isOpen || keyCode !== 27) return;
      onToggle();
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative">
      <button
        ref={trigger}
        onClick={onToggle}
        className="relative justify-center"
      >
        <svg
          className="fill-current duration-300 ease-in-out"
          width="28"
          height="24"
          viewBox="0 0 28 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.667 12C11.667 10.8954 12.5624 10 13.667 10C14.7716 10 15.667 10.8954 15.667 12C15.667 13.1046 14.7716 14 13.667 14C12.5624 14 11.667 13.1046 11.667 12Z"
            fill="#DADADA"
          />
          <path
            d="M11.667 5C11.667 3.89543 12.5624 3 13.667 3C14.7716 3 15.667 3.89543 15.667 5C15.667 6.10457 14.7716 7 13.667 7C12.5624 7 11.667 6.10457 11.667 5Z"
            fill="#DADADA"
          />
          <path
            d="M11.667 19C11.667 17.8954 12.5624 17 13.667 17C14.7716 17 15.667 17.8954 15.667 19C15.667 20.1046 14.7716 21 13.667 21C12.5624 21 11.667 20.1046 11.667 19Z"
            fill="#DADADA"
          />
        </svg>
      </button>

      <div
        ref={dropdown}
        className={`absolute z-9999 top-0 right-5 pt-1 bg-white border border-borgray rounded-md shadow-lg ${
          isOpen ? 'block' : 'hidden'
        }`}
        style={{ width: '108px', height: '75px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} // 드롭다운 박스 크기 및 그림자 설정
      >
        <ul className="flex-col items-center justify-center h-full"> {/* 가운데 정렬을 위해 flexbox 사용 */}
          <li
            className="w-full text-center text-sm py-1.5 text-gray6 hover:bg-[#EFEFEF] hover:text-gray6 cursor-pointer" // 호버 시 색상 변경
            onClick={() => onIconClick('Action 1')}
          >
            수정하기
          </li>
          <li
            className="w-full text-center text-sm py-1.5 text-gray6 hover:bg-[#EFEFEF] hover:text-gray6 cursor-pointer" // 호버 시 색상 변경
            onClick={() => onIconClick('Action 2')}
          >
            삭제하기
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdownmenu;
