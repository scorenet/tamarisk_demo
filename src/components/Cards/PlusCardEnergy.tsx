import React, { useState, useEffect } from 'react';
import ModalPlusCard from '../Modals/ModalPlusCardEnergy';
import Dropdownmenu from '../Dropdowns/Dropdownmenu';
import './PlusCard.css'; // 스타일 경로 적용
import { useNavigate } from 'react-router-dom';

interface PlusCardEnergyProps {
  energyId: string;
  energyName: string;
  mainCategory: string;
  onEdit: () => void;
  onDelete: () => void;
  onEnergyClick: () => void;  // 발전소 클릭 시 동작하는 함수
}

const PlusCardEnergy: React.FC<PlusCardEnergyProps> = ({
  energyId,
  energyName,
  mainCategory,
  onEdit,
  onDelete,
  onEnergyClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentName, setCurrentName] = useState(energyName);

  // 모달을 열 때 기존 데이터를 반영
  useEffect(() => {
    if (isModalOpen) {
      setCurrentName(energyName);
    }
  }, [isModalOpen, energyName]);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleIconClick = (action: string) => {
    if (action === 'Action 1') {
      setIsModalOpen(true); // 수정 모달 열기
    } else if (action === 'Action 2') {
      const confirmDelete = window.confirm('삭제 후에는 복원이 불가능합니다. 해당 발전소를 삭제하시겠습니까?');
      if (confirmDelete) {
        onDelete(); // 발전소 삭제
      }
    }
    setIsDropdownOpen(false);
  };

  const handleSave = (data: { energyName: string; mainCategory: string }) => {
    setCurrentName(data.energyName); // 이름 업데이트
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="plus_card dark:bg-form-input">
      <div className="plus_header">
        <p className="plus_category">
          {mainCategory}
        </p>
        <div className="plus_menuIcon">
          <Dropdownmenu
            isOpen={isDropdownOpen}
            onToggle={handleToggleDropdown}
            onIconClick={handleIconClick}
          />
        </div>
      </div>

      {/* 발전소명을 클릭하면 onEnergyClick 실행 */}
      <h2 
        className="plus_title cursor-pointer text-black hover:text-primary dark:text-white"
        onClick={() => {
          console.log('발전소명이 클릭되었습니다:', energyName);
          onEnergyClick();  // 발전소명을 클릭하면 호출
        }}
      >
        {energyName}
      </h2>

      {isModalOpen && (
        <ModalPlusCard
          title="재생에너지 수정"
          mainCategories={[mainCategory]}  // 메인 카테고리 전달
          existingData={{
            energyName: currentName,
            mainCategory,
          }}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default PlusCardEnergy;
