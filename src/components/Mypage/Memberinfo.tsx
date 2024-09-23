import React, { useState } from 'react';
import ModalPassword from '../Modals/ModalPassword';
import ModalMember from '../Modals/ModalMember';
import UserOne from '../../images/user/user-default.svg';

const Memberinfo: React.FC = () => {
  const [currentModal, setCurrentModal] = useState<'password' | 'member'>('password');
  const [companyInfo, setCompanyInfo] = useState({
    companyName: '(주)에코벨',
    joinDate: '2024-06-20',
    email: 'email@email.com',
    emailVerifiedDate: '2024-08-20',
    lastPasswordChangeDate: '2024-08-23',
    representative: '홍길동',
    address: '서울특별시 금천구 시흥대로193길 12-34, 아람아이씨티타워 000호',
    postalCode: '12345',
    businessRegistrationNumber: '123-45-67890',
    corporateRegistrationNumber: '1234-56-789012-3',
    businessType: '정보통신업',
    businessCategory: '사업자 등록포기가 꽤나 긴경우가 있으면 웹반영할 폰 반영으로 사용하는 것이 좋을지도 ',
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleNext = () => {
    setCurrentModal('member'); // ModalMember로 전환
  };

  const handleUpdateCompanyInfo = (updatedInfo: Partial<typeof companyInfo>) => {
    setCompanyInfo((prevInfo) => ({
      ...prevInfo,
      ...updatedInfo,
    }));
  };

  const handleCloseModal = () => {
    setCurrentModal('password'); // Switch back to password modal when ModalMember is closed
  };

  const handleImageChange = (image: string | null) => {
    setSelectedImage(image); // 이미지 업데이트
  };

  return (
    <div className="rounded-[8px] border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center justify-between border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-10">
        <p className="font-bold text-xl text-black dark:text-white">기업정보</p>
        {currentModal === 'password' ? (
          <ModalPassword onAuthenticationSuccess={handleNext} />
        ) : (
          <ModalMember
            companyInfo={companyInfo}
            onUpdate={(updatedInfo) => {
              handleUpdateCompanyInfo(updatedInfo);
              setCurrentModal('password'); // Switch back after successful update
            }}
            onClose={handleCloseModal}
            onImageChange={handleImageChange} // 이미지 변경 핸들러 전달
          />
        )}
      </div>
      <div className="flex flex-wrap items-center py-10">
        <div className="hidden w-full border-stroke py-2 dark:border-strokedark xl:block xl:w-1/3 xl:border-r-2">
          <div className="flex justify-center items-center">
            <img
              src={selectedImage || UserOne}
              alt="User"
              className="w-30 h-30 rounded-full object-cover"
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            <div className="text-lg font-bold text-black dark:text-white">
              <span className="flex flex-wrap">
                <p>{companyInfo.companyName}</p>
                <p className='pt-1 text-sm'>님 환영합니다</p></span>
            </div>
          </div>
          <div className="flex justify-center items-center mt-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{companyInfo.joinDate} 최초가입</p>
          </div>
          <div className="px-10 mt-6 w-full space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#DADADA] border border-borgray rounded-lg dark:bg-gray-800 dark:border-gray-700">
              <p className="text-sm font-bold text-black dark:text-bordark">{companyInfo.email}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{companyInfo.emailVerifiedDate} 인증완료</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-borgray rounded-lg dark:bg-gray-800 dark:border-gray-700">
              <p className="text-sm font-medium text-black dark:text-bordark">비밀번호 설정</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{companyInfo.lastPasswordChangeDate} 마지막 변경</p>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-2/3 flex flex-col mt-8 xl:mt-0">
          <div className="text-left px-10 py-4">
            <div className="pb-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">대표자</p>
              <p className="text-sm font-bold text-black dark:text-white mb-4">{companyInfo.representative}</p>
            </div>
            <div className="pb-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">소재지</p>
              <p className="text-sm font-bold text-black dark:text-white mb-4">
                {companyInfo.postalCode} | {companyInfo.address}
              </p>
            </div>
            <div className="pb-2 flex flex-col gap-4 sm:flex-row">
              <div className="w-1/2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">사업자등록번호</p>
                <p className="text-sm font-bold text-black dark:text-white mb-4">{companyInfo.businessRegistrationNumber}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">법인등록번호</p>
                <p className="text-sm font-bold text-black dark:text-white mb-4">{companyInfo.corporateRegistrationNumber}</p>
              </div>
            </div>
            <div className="pb-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">업태</p>
              <p className="text-sm font-bold text-black dark:text-white mb-4">{companyInfo.businessType}</p>
            </div>
            <div className="pb-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">종목</p>
              <p className="text-sm font-bold text-black dark:text-white">
                {companyInfo.businessCategory}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memberinfo;
