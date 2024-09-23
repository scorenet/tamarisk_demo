import React from "react";


interface ListButtonProps {
    isActive: boolean;  // 부모 컴포넌트에서 전달받는 상태
    onClick: () => void;  // 부모 컴포넌트에서 전달받는 클릭 이벤트 콜백
}

const ListButton: React.FC<ListButtonProps> = ({ isActive, onClick }) => {
    const color = isActive ? '#666666' : '#DADADA';  // isActive에 따라 색상 변경
  

  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H20C20.5523 11 21 10.5523 21 10C21 9.44772 20.5523 9 20 9H4ZM3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14ZM4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17H4Z"
        fill={color}  // 상태에 따라 색상이 변경됨
        />
      </svg>
    </div>
  );
};

export default ListButton;
