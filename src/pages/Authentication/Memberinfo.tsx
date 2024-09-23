import React, { useState, useEffect } from 'react';


interface MemberInfoProps {
  onUpdate: (updatedInfo: {
    companyName: string;
    representative: string;
    address: string;
    postalCode: string;
    businessRegistrationNumber: string;
    corporateRegistrationNumber: string;
    businessType: string;
    businessCategory: string;
  }, isValid: boolean) => void;
}

const MemberInfo: React.FC<MemberInfoProps> = ({ onUpdate }) => {
  const [formValues, setFormValues] = useState({
    companyName: '',
    representative: '',
    address: '',
    postalCode: '',
    businessType: '',
    businessCategory: '',
  });

  const [businessNumberParts, setBusinessNumberParts] = useState({
    businessPart1: '',
    businessPart2: '',
    businessPart3: '',
  });

  const [corporateNumberParts, setCorporateNumberParts] = useState({
    corporatePart1: '',
    corporatePart2: '',
    corporatePart3: '',
    corporatePart4: '',
  });

  const [addressPart1, setAddressPart1] = useState('');
  const [addressPart2, setAddressPart2] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 필수 입력 필드들의 유효성을 확인하는 함수
  const validateForm = () => {
    return (
      formValues.companyName.trim() !== '' &&
      formValues.representative.trim() !== '' &&
      addressPart1.trim() !== '' &&
      formValues.businessType.trim() !== '' &&
      formValues.businessCategory.trim() !== '' &&
      businessNumberParts.businessPart1 !== '' &&
      businessNumberParts.businessPart2 !== '' &&
      businessNumberParts.businessPart3 !== '' 
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'addressPart1') {
      setAddressPart1(value);
    } else if (name === 'addressPart2') {
      setAddressPart2(value);
    } else if (name.includes("businessPart")) {
      setBusinessNumberParts((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, ''), // 숫자만 입력 가능
      }));
    } else if (name.includes("corporatePart")) {
      setCorporateNumberParts((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, ''), // 숫자만 입력 가능
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  // 폼이 변경될 때마다 부모 컴포넌트에 업데이트를 알림
  useEffect(() => {
    const businessRegistrationNumber = `${businessNumberParts.businessPart1}-${businessNumberParts.businessPart2}-${businessNumberParts.businessPart3}`;
    const corporateRegistrationNumber = `${corporateNumberParts.corporatePart1}-${corporateNumberParts.corporatePart2}-${corporateNumberParts.corporatePart3}-${corporateNumberParts.corporatePart4}`;
    const fullAddress = `${addressPart1}, ${addressPart2}`;
    const isValid = validateForm();

    onUpdate(
      {
        ...formValues,
        businessRegistrationNumber,
        corporateRegistrationNumber,
        address: fullAddress,
      },
      isValid // 유효성 검사 결과 전달
    );
  }, [formValues, businessNumberParts, corporateNumberParts, addressPart1, addressPart2]);

  return (
    <div className="relative w-full max-w-lg rounded-lg bg-white px-8 text-center dark:bg-boxdark">
      <div className='flex gap-2'>
        <div className="w-1/2 mb-4">
          <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
            기업명<span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={formValues.companyName}
            onChange={handleChange}
            placeholder="(주)기업명"
            className="w-full rounded-lg border border-borgray bg-transparent py-[9px] px-6 text-sm text-black outline-none focus:bg-transparent focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
/>
        </div>

        <div className="w-1/2 mb-4">
          <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
            대표자<span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="representative"
            value={formValues.representative}
            onChange={handleChange}
            placeholder="대표자명"
            className="w-full rounded-lg border border-borgray bg-transparent py-[9px] px-6 text-sm text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
          사업자등록번호<span className="text-red">*</span>
        </label>
        <div className="flex space-x-2 rounded-lg border border-borgray">
          <input
            type="text"
            name="businessPart1"
            value={businessNumberParts.businessPart1}
            onChange={handleChange}
            maxLength={3}
            placeholder="000"
            className="w-1/3 rounded-lg bg-transparent py-[9px] px-6 text-sm text-center text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <span className="mx-1 self-center">-</span>
          <input
            type="text"
            name="businessPart2"
            value={businessNumberParts.businessPart2}
            onChange={handleChange}
            maxLength={2}
            placeholder="00"
            className="w-1/3 rounded-lg bg-transparent py-[9px] px-6 text-sm text-center text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <span className="mx-1 self-center">-</span>
          <input
            type="text"
            name="businessPart3"
            value={businessNumberParts.businessPart3}
            onChange={handleChange}
            maxLength={5}
            placeholder="00000"
            className="w-1/3 rounded-lg bg-transparent py-[9px] px-6 text-sm text-center text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
          법인등록번호
        </label>
        <div className="flex space-x-2 rounded-lg border border-borgray">
          <input
            type="text"
            name="corporatePart1"
            value={corporateNumberParts.corporatePart1}
            onChange={handleChange}
            maxLength={4}
            placeholder="0000"
            className="w-1/4 bg-transparent py-[9px] pl-6 text-sm text-black text-center outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <span className="mx-1 self-center">-</span>
          <input
            type="text"
            name="corporatePart2"
            value={corporateNumberParts.corporatePart2}
            onChange={handleChange}
            maxLength={2}
            placeholder="00"
            className="w-1/4 bg-transparent py-[9px] text-sm text-black text-center outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <span className="mx-1 self-center">-</span>            
          <input
            type="text"
            name="corporatePart3"
            value={corporateNumberParts.corporatePart3}
            onChange={handleChange}
            maxLength={6}
            placeholder="000000"
            className="w-1/4 bg-transparent py-[9px] text-sm text-black text-center outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <span className="mx-1 self-center">-</span>
          <input
            type="text"
            name="corporatePart4"
            value={corporateNumberParts.corporatePart4}
            onChange={handleChange}
            maxLength={1}
            placeholder="0"
            className="w-1/4 bg-transparent py-[9px] text-sm text-black text-center outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      {/* 업태 및 종목 */}
      <div className='flex gap-2'>
        <div className="w-1/2 mb-4">
          <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
            업태<span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="businessType"
            value={formValues.businessType}
            onChange={handleChange}
            placeholder="업태"
            className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="w-1/2 mb-4">
          <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
            종목<span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="businessCategory"
            value={formValues.businessCategory}
            onChange={handleChange}
            placeholder="종목"
            className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      {/* 주소 */}
        <div className="mb-4">
            <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
              소재지
              <span className='flex items-center mb-2 '>
                <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.528 6.44137L1.696 5.83337L2.72 4.08937L0.912 3.32137L1.232 2.34537L3.152 2.80937L3.328 0.793374H4.368L4.544 2.79337L6.464 2.34537L6.784 3.32137L4.976 4.08937L6.016 5.83337L5.184 6.44137L3.856 4.88937L2.528 6.44137Z" fill="#FF3B30"/>
                </svg>
              </span>
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="addressPart1"
                value={addressPart1}
                onChange={handleChange}
                placeholder="우편번호"
                className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <button
                 // Address 연결
                className="w-1/5 rounded-lg border border-black bg-black py-[7px] text-sm font-medium text-white transition hover:bg-opacity-90"
              >
                검색
              </button>
            </div>
            <input
              type="text"
              name="addressPart2"
              value={addressPart2}
              onChange={handleChange}
              placeholder="주소"
              className="w-full rounded-lg border border-borgray bg-transparent mt-2 py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
          </div>
    </div>
  );
};

export default MemberInfo;
