import React from "react";

interface CardButtonProps {
  isActive: boolean;  // 부모 컴포넌트에서 전달받는 상태
  onClick: () => void;  // 부모 컴포넌트에서 전달받는 클릭 이벤트 콜백
}

const CardButton: React.FC<CardButtonProps> = ({ isActive, onClick }) => {
  const color = isActive ? '#666666' : '#DADADA';  // isActive에 따라 색상 변경

  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.75 21H12.75V12.75H21V17.75C21 19.5449 19.5449 21 17.75 21ZM21 11.25H12.75V3H17.75C19.5449 3 21 4.45507 21 6.25V11.25ZM11.25 11.25V3H6.25C4.45507 3 3 4.45507 3 6.25V11.25H11.25ZM3 12.75V17.75C3 19.5449 4.45507 21 6.25 21H11.25V12.75H3Z"
          fill={color}  // isActive 상태에 따라 색상 설정
        />
      </svg>
    </div>
  );
};

export default CardButton;
