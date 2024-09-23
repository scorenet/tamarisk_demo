import React from 'react';
import './PlusCard.css';

interface PlusButtonProps {
  onClick: () => void;
  children: React.ReactNode; // 버튼에 표시될 내용 (텍스트와 이미지 등)
}

const PlusButton: React.FC<PlusButtonProps> = ({ onClick, children }) => {
  return (
    <div
      className="flex items-center justify-center plus_card bg-transparent">
      <button
        onClick={onClick}
        className="flex items-center space-x-2 text-lg font-bold text-[#999999]" // 이미지와 텍스트 사이 간격 추가
      >
        {children}
      </button>
    </div>
  );
};

export default PlusButton;
