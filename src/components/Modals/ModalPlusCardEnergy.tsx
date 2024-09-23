import React, { useState, useEffect } from 'react';
import icon_close from "../../images/icon/icon-close.svg";

interface ModalPlusCardProps {
  title: string;
  mainCategories: string[];
  existingData?: { energyName: string; mainCategory: string };
  onClose: () => void;
  onSave: (data: { energyName: string; mainCategory: string }) => void;
}

const ModalPlusCard: React.FC<ModalPlusCardProps> = ({ 
  title, 
  mainCategories, 
  existingData, 
  onClose, 
  onSave 
}) => {
  const [energyName, setEnergyName] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 기존 데이터가 변경될 때마다 상태를 설정합니다.
  useEffect(() => {
    if (existingData) {
      setEnergyName(existingData.energyName);
      setMainCategory(existingData.mainCategory);
    }
  }, [existingData]);

  // 모달이 닫힐 때 상태를 초기화합니다.
  const handleClose = () => {
    onClose();
    setEnergyName('');
    setMainCategory('');
    setErrorMessage('');
  };

  const handleSave = () => {
    // 필수 입력 항목 체크
    if (!energyName || !mainCategory) {
      setErrorMessage('필수 항목을 모두 입력해주세요');
      return;
    }

    const energyData = { energyName, mainCategory };
    console.log('저장된 데이터:', energyData);

    onSave(energyData);
    handleClose();
  };

  return (
    <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/70 px-4 py-5">
      <div className="relative w-full max-w-lg rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark">
        <button onClick={handleClose} className="absolute top-4 right-4">
          <img src={icon_close} alt="닫기" />
        </button>

        <h3 className="pb-5 text-xl font-bold text-black dark:text-white sm:text-2xl">{title}</h3>

        {/* 대분류 선택 */}
        <div className="w-full text-left mb-6">
          <label className="block font-bold mb-2">카테고리 <span className="text-red">*</span></label>
          <select
            value={mainCategory}
            onChange={(e) => setMainCategory(e.target.value)}
            disabled={!!existingData && !!existingData.mainCategory}// existingData가 있고, 카테고리가 이미 있을 때만 비활성화
            className={`w-full rounded-lg border border-borgray py-[9px] pl-6 pr-10 text-sm outline-none dark:bg-form-input ${!!existingData && existingData.mainCategory ? 'bg-borgray' : 'bg-white'} dark:${!!existingData && existingData.mainCategory ? 'bg-butgray' : 'bg-form-input'}`}
          >
            <option value="" disabled>카테고리를 선택하세요</option>
            {mainCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* 에너지 이름 입력 */}
        <div className="text-left mb-6">
          <label className="block font-bold mb-2">재생에너지 발전소명 <span className="text-red">*</span></label>
          <input
            type="text"
            value={energyName}
            onChange={(e) => setEnergyName(e.target.value)}
            className={"w-full rounded-lg border border-borgray py-[9px] pl-6 pr-10 text-sm outline-none dark:bg-form-input bg-white dark:bg-form-input"}
            placeholder="재생에너지 발전소명을 입력하세요"
          />
        </div>

        {/* 경고 메시지 */}
        {errorMessage && <p className="text-red mb-4">{errorMessage}</p>}

        {/* 버튼들 */}
        <div className="flex flex-row justify-between mt-6 mx-6">
          <div className="2xsm:w-1/2 w-full px-3">
            <button
              onClick={handleClose}
              className="block w-full rounded-full border border-white bg-butgray p-[9px] text-sm text-center font-medium text-black transition hover:bg-gray"
            >
              뒤로가기
            </button>
          </div>
          <div className="2xsm:w-1/2 w-full px-3">
            <button
              onClick={handleSave}
              className="block w-full rounded-full border border-black bg-black p-[9px] text-sm text-center font-medium text-white transition hover:bg-opacity-90"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPlusCard;
