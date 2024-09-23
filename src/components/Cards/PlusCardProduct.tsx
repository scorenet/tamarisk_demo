import React, { useState, useEffect } from 'react';
import ModalPlusCard from '../Modals/ModalPlusCardProduct';
import Dropdownmenu from '../Dropdowns/Dropdownmenu';
import './PlusCard.css'; // 스타일 경로 적용
import { useNavigate } from 'react-router-dom'; // useNavigate를 가져옴

interface PlusCardProps {
  productId: string; // productId를 사용
  productName: string;
  mainCategory: string;
  subCategory: string;
  unit: string;
  reduction: string;
  onEdit: () => void;
  onDelete: () => void;
  onProductClick: () => void;  // 제품 클릭 시 동작하는 함수
}

const PlusCard: React.FC<PlusCardProps> = ({
  productId,  // productId prop 추가
  productName,
  mainCategory,
  subCategory,
  unit,
  reduction,
  onEdit,
  onDelete,
  onProductClick, 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUnit, setCurrentUnit] = useState(unit);
  const [currentReduction, setCurrentReduction] = useState(reduction);

  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 모달을 열 때 기존 데이터를 반영
  useEffect(() => {
    if (isModalOpen) {
      setCurrentUnit(unit);
      setCurrentReduction(reduction);
    }
  }, [isModalOpen, unit, reduction]);

  const getReductionBackgroundColor = () => {
    return currentUnit === 'ea' ? '#00bfff' : '#13C296';
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleIconClick = (action: string) => {
    if (action === 'Action 1') {
      setIsModalOpen(true);
    } else if (action === 'Action 2') {
      const confirmDelete = window.confirm('삭제 후에는 복원이 불가능합니다. 해당 제품을 삭제하시겠습니까?');
      if (confirmDelete) {
        onDelete();
      }
    }
    setIsDropdownOpen(false);
  };

  const handleSave = (data: { productName: string; mainCategory: string; subCategory: string; unit: string; reduction: string }) => {
    setCurrentUnit(data.unit);
    setCurrentReduction(data.reduction);
    setIsModalOpen(false);
  };

  // 제품명을 클릭하면 페이지 이동
  const handleProductClick = () => {
    navigate(`/product-manager/data`);  // 제품 ID를 URL에 포함하여 페이지 이동
  };

  return (
    <div className="plus_card dark:bg-form-input">
      <div className="plus_header">
        <p className="plus_category">
          {mainCategory} | {subCategory}
        </p>
        <div className="plus_menuIcon">
          <Dropdownmenu
            isOpen={isDropdownOpen}
            onToggle={handleToggleDropdown}
            onIconClick={handleIconClick}
          />
        </div>
      </div>

      {/* 제품명을 클릭하면 handleProductClick 실행 */}
      <h2 
        className="plus_title cursor-pointer text-black hover:text-primary dark:text-white"
        onClick={() => {
          console.log('제품명이 클릭되었습니다:', productName);
          onProductClick();  // 제품명을 클릭하면 호출
        }}
      >
        {productName}
      </h2>

      <div className="plus_reduction" style={{ backgroundColor: getReductionBackgroundColor() }}>
        <span>{currentUnit} 당 감축량</span>
        <span className="plus_reduction_value">- {currentReduction} tCO2e</span>
      </div>

      {isModalOpen && (
        <ModalPlusCard
          title="제품 수정"
          mainCategories={[mainCategory]}
          subCategories={[subCategory]}
          units={['ea', 'kg']}
          existingData={{
            productName,
            mainCategory,
            subCategory,
            unit: currentUnit,
            reduction: currentReduction,
          }}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default PlusCard;
