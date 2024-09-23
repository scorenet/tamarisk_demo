import React, { useState } from 'react';
import ModalServiceForm from "../Modals/ModalServiceForm";

const MarketingAgree: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    // 현재 시간을 'YYYY-MM-DD HH:MM:SS' 형식으로 포맷
    const currentDateTime = new Date().toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  
    // 커스텀 알림 창을 표시 (모달의 타이틀 사용)
    alert(`${currentDateTime} 마케팅 수신동의를 하셨습니다.`);
  
    setIsOpen(false); // 모달 닫기
  };

  const termsContent = (
    <>
      <h4 className="font-bold text-lg mb-2">제 1 장 총칙</h4>

      <h5 className="font-semibold mt-4">제 1 조 (목적)</h5>
      <p className="text-sm mb-4">
        본 약관은 사용자가 ... <br />
        서비스 제공과 관련한 의무 및 책임사항을 규정함을 목적으로 합니다.
      </p>

      <h5 className="font-semibold mt-4">제 2 조 (약관의 효력과 변경)</h5>
      <p className="text-sm mb-4">
        본 약관의 내용은 서비스 화면에 게시하거나 기타의 방법으로 사용자에게 공지함으로써 효력을 발생합니다. <br />
        회사는 필요하다고 인정되는 경우 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해 공지됩니다.
      </p>

      {/* 계속해서 내용 추가 */}
    </>
  );

  return (
    <div className="rounded-[8px] border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className='flex items-center justify-between py-4 px-4 sm:px-6 xl:px-10'>
        <h3 className="font-bold text-black dark:text-white">[선택]마케팅 수신 동의</h3>
        <div className='flex'>
          <button onClick={handleOpenModal} 
              className="inline-flex items-center justify-center gap-4 bg-primary h-10 px-10 rounded-full text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <span>
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.8125 16.6656H2.1875C1.69022 16.6656 1.21331 16.4681 0.861675 16.1164C0.510044 15.7648 0.3125 15.2879 0.3125 14.7906V5.20935C0.3125 4.71207 0.510044 4.23516 0.861675 3.88353C1.21331 3.53189 1.69022 3.33435 2.1875 3.33435H17.8125C18.3098 3.33435 18.7867 3.53189 19.1383 3.88353C19.49 4.23516 19.6875 4.71207 19.6875 5.20935V14.7906C19.6875 15.2879 19.49 15.7648 19.1383 16.1164C18.7867 16.4681 18.3098 16.6656 17.8125 16.6656ZM2.1875 4.58435C2.02174 4.58435 1.86277 4.6502 1.74556 4.76741C1.62835 4.88462 1.5625 5.04359 1.5625 5.20935V14.7906C1.5625 14.9564 1.62835 15.1153 1.74556 15.2325C1.86277 15.3498 2.02174 15.4156 2.1875 15.4156H17.8125C17.9783 15.4156 18.1372 15.3498 18.2544 15.2325C18.3717 15.1153 18.4375 14.9564 18.4375 14.7906V5.20935C18.4375 5.04359 18.3717 4.88462 18.2544 4.76741C18.1372 4.6502 17.9783 4.58435 17.8125 4.58435H2.1875Z"
                    fill=""
                  />
                  <path
                    d="M9.9996 10.6438C9.63227 10.6437 9.2721 10.5421 8.95898 10.35L0.887102 5.45001C0.744548 5.36381 0.642073 5.22452 0.602222 5.06277C0.58249 4.98268 0.578725 4.89948 0.591144 4.81794C0.603563 4.73639 0.631922 4.65809 0.674602 4.58751C0.717281 4.51692 0.773446 4.45543 0.839888 4.40655C0.906331 4.35767 0.981751 4.32236 1.06184 4.30263C1.22359 4.26277 1.39455 4.28881 1.5371 4.37501L9.60898 9.28126C9.7271 9.35331 9.8628 9.39143 10.0012 9.39143C10.1395 9.39143 10.2752 9.35331 10.3934 9.28126L18.4621 4.37501C18.5323 4.33233 18.6102 4.30389 18.6913 4.29131C18.7725 4.27873 18.8554 4.28227 18.9352 4.30171C19.015 4.32115 19.0901 4.35612 19.1564 4.40462C19.2227 4.45312 19.2788 4.51421 19.3215 4.58438C19.3642 4.65456 19.3926 4.73245 19.4052 4.81362C19.4177 4.89478 19.4142 4.97763 19.3948 5.05743C19.3753 5.13723 19.3404 5.21242 19.2919 5.27871C19.2434 5.34499 19.1823 5.40108 19.1121 5.44376L11.0402 10.35C10.7271 10.5421 10.3669 10.6437 9.9996 10.6438Z"
                    fill=""
                  />
                </svg>
              </span>
              동의하기
            </button>
            {isOpen && (
              <ModalServiceForm
                title="마케팅 수신동의"
                isRequired={false}
                content={termsContent}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                confirmButtonText="동의하기"
              />
            )}
        </div>
      </div>

    </div>
  );
};

export default MarketingAgree;
