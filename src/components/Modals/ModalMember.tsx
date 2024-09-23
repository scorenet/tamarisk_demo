import React, { useState, useEffect, useRef } from 'react';
import UserModify from "../../images/user/user-default.svg";
import Address from "../Mypage/Address"
import icon_close from "../../images/icon/icon-close.svg"

interface ModalMemberProps {
  companyInfo: {
    companyName: string;
    representative: string;
    address: string;
    postalCode: string;
    businessRegistrationNumber: string;
    corporateRegistrationNumber: string;
    businessType: string;
    businessCategory: string;
  };
  onUpdate: (updatedInfo: Partial<ModalMemberProps['companyInfo']>) => void;
  onClose: () => void;
  onImageChange: (image: string | null) => void;
}

const ModalMember: React.FC<ModalMemberProps> = ({ companyInfo, onUpdate, onClose, onImageChange }) => {
  const [modalOpen, setModalOpen] = useState(true);

  const initialBusinessNumberParts = companyInfo.businessRegistrationNumber.split('-');
  const initialCorporateNumberParts = companyInfo.corporateRegistrationNumber.split('-');

  const [formValues, setFormValues] = useState(companyInfo);
  const [businessNumberParts, setBusinessNumberParts] = useState({
    part1: initialBusinessNumberParts[0] || '',
    part2: initialBusinessNumberParts[1] || '',
    part3: initialBusinessNumberParts[2] || '',
  });
  const [corporateNumberParts, setCorporateNumberParts] = useState({
    part1: initialCorporateNumberParts[0] || '',
    part2: initialCorporateNumberParts[1] || '',
    part3: initialCorporateNumberParts[2] || '',
    part4: initialCorporateNumberParts[3] || '',
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 주소를 쉼표로 분리
  const [addressPart1, setAddressPart1] = useState<string>(() => {
    const parts = companyInfo.address.split(',');
    return parts[0] ? parts[0].trim() : '';
  });
  const [addressPart2, setAddressPart2] = useState<string>(() => {
    const parts = companyInfo.address.split(',');
    return parts[1] ? parts[1].trim() : '';
  });

  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (modalOpen && modal.current && !modal.current.contains(event.target as Node)) {
        setModalOpen(false);
        onClose(); 
      }
    };
    document.addEventListener('mousedown', clickHandler);
    return () => document.removeEventListener('mousedown', clickHandler);
  }, [modalOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
      onClose(); 
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'addressPart1') {
      setAddressPart1(value);
    } else if (name === 'addressPart2') {
      setAddressPart2(value);
    } else if (name in businessNumberParts) {
      setBusinessNumberParts((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, ''), 
      }));
    } else if (name in corporateNumberParts) {
      setCorporateNumberParts((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, ''), 
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        onImageChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const businessRegistrationNumber = `${businessNumberParts.part1}-${businessNumberParts.part2}-${businessNumberParts.part3}`;
    const corporateRegistrationNumber = `${corporateNumberParts.part1}-${corporateNumberParts.part2}-${corporateNumberParts.part3}-${corporateNumberParts.part4}`;
    const fullAddress = `${addressPart1}, ${addressPart2}`;

    onUpdate({
      ...formValues,
      businessRegistrationNumber,
      corporateRegistrationNumber,
      address: fullAddress, // 전체 주소를 업데이트
    });

    setModalOpen(false);
    onClose();
  };

  return (
    modalOpen && (
      <div
        className="fixed left-0 top-0 z-9999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
      >
        <div
          ref={modal}
          className="relative md:px-9 w-full max-w-lg rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:pt-16 md:pb-10"
        >
          <button
            onClick={() => { setModalOpen(false); onClose(); }}
            className="absolute top-4 right-4"
          >
            <img src={icon_close} />
          </button>

          <h3 className="pb-10 text-xl font-bold text-black dark:text-white sm:text-2xl">
            회원정보 수정하기
          </h3>
          
          <div className="flex justify-center mb-4">
            <label htmlFor="imageUpload" className="relative cursor-pointer">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="User"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <img
                  src={UserModify}
                  alt="User Modify"
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}

              <svg
                className="absolute bottom-0 right-0 w-7 h-7 bg-borgray rounded-full p-1"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="1" width="26" height="26" rx="13" fill="#BBBBBB" />
                <rect x="1" y="1" width="26" height="26" rx="13" stroke="white" strokeWidth="2" />
                <g clipPath="url(#clip0_171_8481)">
                  <path
                    d="M20.3875 9.84355C19.6875 9.0998 18.9438 8.35605 18.2 7.63418C18.0469 7.48105 17.8719 7.39355 17.675 7.39355C17.4781 7.39355 17.2813 7.45918 17.15 7.6123L8.90313 15.7936C8.77188 15.9248 8.68438 16.0779 8.61876 16.2311L7.41563 19.9061C7.35001 20.0811 7.39376 20.2561 7.48126 20.3873C7.59063 20.5186 7.74376 20.6061 7.94063 20.6061H8.02813L11.7688 19.3592C11.9438 19.2936 12.0969 19.2061 12.2063 19.0748L20.4094 10.8936C20.5406 10.7623 20.6281 10.5654 20.6281 10.3686C20.6281 10.1717 20.5406 9.99668 20.3875 9.84355ZM11.5063 18.3967C11.4844 18.4186 11.4625 18.4186 11.4406 18.4404L8.61876 19.3811L9.55938 16.5592C9.55938 16.5373 9.58126 16.5154 9.60313 16.4936L15.6188 10.4998L17.5219 12.4029L11.5063 18.3967ZM18.2 11.7029L16.2969 9.7998L17.6313 8.46543C18.2656 9.07793 18.9 9.73418 19.5125 10.3686L18.2 11.7029Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_171_8481">
                    <rect width="14" height="14" fill="white" transform="translate(7 7)" />
                  </clipPath>
                </defs>
              </svg>
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="mb-4">
            <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
              기업명
              <span className='flex items-center mb-2 '>
                <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.528 6.44137L1.696 5.83337L2.72 4.08937L0.912 3.32137L1.232 2.34537L3.152 2.80937L3.328 0.793374H4.368L4.544 2.79337L6.464 2.34537L6.784 3.32137L4.976 4.08937L6.016 5.83337L5.184 6.44137L3.856 4.88937L2.528 6.44137Z" fill="#FF3B30"/>
                </svg>
              </span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formValues.companyName}
              onChange={handleChange}
              placeholder="(주)기업명"
              className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
          </div>
          <div className="mb-4">
            <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
              대표자
              <span className='flex items-center mb-2 '>
                <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.528 6.44137L1.696 5.83337L2.72 4.08937L0.912 3.32137L1.232 2.34537L3.152 2.80937L3.328 0.793374H4.368L4.544 2.79337L6.464 2.34537L6.784 3.32137L4.976 4.08937L6.016 5.83337L5.184 6.44137L3.856 4.88937L2.528 6.44137Z" fill="#FF3B30"/>
                </svg>
              </span>
            </label>
            <input
              type="text"
              name="representative"
              value={formValues.representative}
              onChange={handleChange}
              placeholder="대표자명"
              className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
          </div>
          <div className="mb-2">
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
                className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
              className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
          </div>

          <div className="mb-2">
          <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
                사업자등록번호
                <span className='flex items-center mb-2 '>
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.528 6.44137L1.696 5.83337L2.72 4.08937L0.912 3.32137L1.232 2.34537L3.152 2.80937L3.328 0.793374H4.368L4.544 2.79337L6.464 2.34537L6.784 3.32137L4.976 4.08937L6.016 5.83337L5.184 6.44137L3.856 4.88937L2.528 6.44137Z" fill="#FF3B30"/>
                  </svg>
                </span>
              </label>
            <div className="relative flex justify-between rounded-lg border border-borgray">
              <input
                type="text"
                name="part1"
                value={businessNumberParts.part1}
                onChange={handleChange}
                maxLength={3}
                placeholder="123"
                className="w-full rounded-lg bg-transparent py-[9px] px-6 text-sm text-center text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="mx-1 self-center">-</span>
              <input
                type="text"
                name="part2"
                value={businessNumberParts.part2}
                onChange={handleChange}
                maxLength={2}
                placeholder="45"
                className="w-full rounded-lg bg-transparent py-[9px] px-6 text-sm text-center text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="mx-1 self-center">-</span>
              <input
                type="text"
                name="part3"
                value={businessNumberParts.part3}
                onChange={handleChange}
                maxLength={5}
                placeholder="67890"
                className="w-full rounded-lg bg-transparent py-[9px] px-6 text-sm text-center text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="mb-2">
            <div className='flex'>
              <label className="flex flex-wrap mb-2 block font-bold text-md text-black text-left dark:text-white">
                법인등록번호
              </label>
            </div>
            <div className="relative flex relative flex justify-between rounded-lg border border-borgray">
              <input
                type="text"
                name="part1"
                value={corporateNumberParts.part1}
                onChange={handleChange}
                maxLength={4}
                placeholder="1234"
                className="w-full rounded-lg bg-transparent py-[9px] px-6 text-sm text-center text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="mx-1 self-center">-</span>
              <input
                type="text"
                name="part2"
                value={corporateNumberParts.part2}
                onChange={handleChange}
                maxLength={2}
                placeholder="56"
                className="w-full rounded-lg bg-transparent py-[9px] px-6 text-sm text-center text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="mx-1 self-center">-</span>
              <input
                type="text"
                name="part3"
                value={corporateNumberParts.part3}
                onChange={handleChange}
                maxLength={6}
                placeholder="789012"
                className="w-full rounded-lg bg-transparent py-[9px] px-6 text-sm text-center text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              <span className="mx-1 self-center">-</span>
              <input
                type="text"
                name="part4"
                value={corporateNumberParts.part4}
                onChange={handleChange}
                maxLength={1}
                placeholder="3"
                className="w-full rounded-lg bg-transparent py-[9px] px-6 text-sm text-center text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>
          </div>
          <div className="flex mb-2">
            <div className='w-1/2 flex flex-col mr-4'>
              <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
                업태
                <span className='flex items-center mb-2 '>
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.528 6.44137L1.696 5.83337L2.72 4.08937L0.912 3.32137L1.232 2.34537L3.152 2.80937L3.328 0.793374H4.368L4.544 2.79337L6.464 2.34537L6.784 3.32137L4.976 4.08937L6.016 5.83337L5.184 6.44137L3.856 4.88937L2.528 6.44137Z" fill="#FF3B30"/>
                  </svg>
                </span>
              </label>
              <div className="w-full">
                <input
                  type="text"
                  name="businessType"
                  value={formValues.businessType}
                  onChange={handleChange}
                  placeholder="업태"
                  className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />                   
              </div>
            </div>
            <div className='w-1/2 flex flex-col'>
              <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
                종목
                <span className='flex items-center mb-2 '>
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.528 6.44137L1.696 5.83337L2.72 4.08937L0.912 3.32137L1.232 2.34537L3.152 2.80937L3.328 0.793374H4.368L4.544 2.79337L6.464 2.34537L6.784 3.32137L4.976 4.08937L6.016 5.83337L5.184 6.44137L3.856 4.88937L2.528 6.44137Z" fill="#FF3B30"/>
                  </svg>
                </span>
              </label>
              <div className="w-full">
                <input
                  type="text"
                  name="businessCategory"
                  value={formValues.businessCategory}
                  onChange={handleChange}
                  placeholder="종목"
                  className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />                   
              </div>
            </div>
          </div>
          <div className="mx-6 mt-6 flex flex-wrap">
            <div className="w-1/2 px-3">
              <button
                onClick={() => { setModalOpen(false); onClose(); }}
                className="block w-full rounded-full border border-white bg-butgray p-[9px] text-sm text-center font-medium text-black transition hover:bg-gray"
              >
                뒤로가기
              </button>
            </div>
            <div className="w-1/2 px-3">
              <button
                onClick={handleSubmit}
                className="block w-full rounded-full border border-black bg-black p-[9px] text-sm text-center font-medium text-white transition hover:bg-opacity-90"
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalMember;
