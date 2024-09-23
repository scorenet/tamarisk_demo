import React, { useState, useEffect } from 'react';
import icon_close from "../../images/icon/icon-close.svg";

interface ModalPlusCardProps {
  title: string;
  mainCategories: string[];
  subCategories: string[];
  units: string[];
  existingData?: { productName: string; mainCategory: string; subCategory: string; unit: string; reduction: string };
  onClose: () => void;
  onSave: (data: { productName: string; mainCategory: string; subCategory: string; unit: string; reduction: string }) => void;
}

const ModalPlusCard: React.FC<ModalPlusCardProps> = ({ 
  title, 
  mainCategories, 
  subCategories, 
  units, 
  existingData, 
  onClose, 
  onSave 
}) => {
  const [productName, setProductName] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [reduction, setReduction] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 기존 데이터가 변경될 때마다 상태를 설정합니다.
  useEffect(() => {
    if (existingData) {
      setProductName(existingData.productName);
      setMainCategory(existingData.mainCategory);
      setSubCategory(existingData.subCategory);
      setUnit(existingData.unit);
      setReduction(existingData.reduction);
    }
  }, [existingData]); // existingData가 변경될 때만 상태 업데이트

  // 모달이 닫힐 때 상태를 초기화합니다.
  const handleClose = () => {
    onClose();
    // 상태 초기화
    setProductName('');
    setMainCategory('');
    setSubCategory('');
    setUnit('');
    setReduction('');
    setErrorMessage('');
  };

  const handleSave = () => {
    // 모든 필수 입력 항목이 입력되었는지 확인
    if (!productName || !mainCategory || !subCategory || !unit || !reduction) {
      setErrorMessage('필수 항목을 모두 입력해주세요');
      return;
    }

    // 입력된 데이터를 콘솔에 출력
    const productData = { productName, mainCategory, subCategory, unit, reduction };
    console.log('저장된 데이터:', productData);  // 콘솔 출력

    // 모든 항목이 입력되었을 경우 데이터 저장
    onSave(productData);
    handleClose(); // 모달 닫기
  };

  return (
    <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/70 px-4 py-5">
      <div className="relative w-full max-w-lg rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark">
        <button onClick={handleClose} className="absolute top-4 right-4">
          <img src={icon_close} alt="닫기" />
        </button>

        <h3 className="pb-5 text-xl font-bold text-black dark:text-white sm:text-2xl">{title}</h3>

        {/* 대분류 및 중분류 입력 */}
        <div className='flex gap-2'>
        <div className="w-1/2 text-left mb-6">
          <label className="block font-bold mb-2">대분류 <span className="text-red">*</span></label>
          <select
            value={mainCategory}
            onChange={(e) => setMainCategory(e.target.value)}
            disabled={!!existingData}
            className={`w-full rounded-lg border border-borgray py-[9px] pl-6 pr-10 text-sm outline-none dark:bg-form-input ${!!existingData ? 'bg-borgray' : 'bg-white'} dark:${!!existingData ? 'bg-butgray' : 'bg-form-input'}`}
          >
            <option value="" disabled className="text-placeholdergray">대분류를 선택하세요</option>
            {mainCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

          <div className="w-1/2 text-left mb-6">
            <label className="block font-bold mb-2">중분류 <span className="text-red">*</span></label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              disabled={!!existingData} 
              className={`w-full rounded-lg border border-borgray py-[9px] pl-6 pr-10 text-sm outline-none dark:bg-form-input ${!!existingData ? 'bg-borgray' : 'bg-white'} dark:${!!existingData ? 'bg-butgray' : 'bg-form-input'}`}
              >
              <option value="" disabled className="text-placeholdergray">중분류를 선택하세요</option>
              {subCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 상품명 입력 */}
        <div className="text-left mb-6">
        <label className="block font-bold mb-2">상품명 <span className="text-red">*</span></label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            disabled={!!existingData} 
            className={`w-full rounded-lg border border-borgray py-[9px] pl-6 pr-10 text-sm outline-none dark:bg-form-input ${!!existingData ? 'bg-borgray' : 'bg-white'} dark:${!!existingData ? 'bg-butgray' : 'bg-form-input'}`}
            placeholder="제품명을 입력하세요"
          />
        </div>

        {/* 산정단위 및 감축량 입력 */}
        <div className='flex gap-2'>
          <div className="w-1/2 text-left mb-6">
            <label className="block font-bold mb-2">산정단위 <span className="text-red">*</span></label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className={"w-full rounded-lg border border-borgray py-[9px] pl-6 pr-10 text-sm outline-none dark:bg-form-input bg-white dark:bg-form-input"}
          >
              <option value="" disabled className="text-placeholdergray">산정단위를 선택하세요</option>
              {units.map((unit, index) => (
                <option key={index} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <div className="w-1/2 text-left mb-6">
            <label className="block font-bold mb-2">감축량 <span className="text-red">*</span></label>
            <input
              type="text"
              value={reduction}
              onChange={(e) => setReduction(e.target.value)}
              className="w-full rounded-lg border border-borgray py-[9px] pl-6 pr-10 text-sm outline-none dark:bg-form-input dark:text-white"
              placeholder="감축량을 입력하세요"
            />
          </div>
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
