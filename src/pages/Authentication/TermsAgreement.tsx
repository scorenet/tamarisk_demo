import React, { useState, useEffect } from 'react';
import ModalTemplate from '../../components/Modals/ModalServiceForm';

interface TermsAgreementProps {
  onAgreed: (canProceed: boolean) => void;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({ onAgreed }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string, content: string, isRequired: boolean, type: string }>({
    title: '',
    content: '',
    isRequired: false,
    type: ''
  });

  const [allAccepted, setAllAccepted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const canProceed = termsAccepted && privacyAccepted;
    onAgreed(canProceed);
  }, [termsAccepted, privacyAccepted, onAgreed]);

  useEffect(() => {
    setAllAccepted(termsAccepted && privacyAccepted && marketingAccepted);
  }, [termsAccepted, privacyAccepted, marketingAccepted]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openModal = (title: string, content: string, isRequired: boolean, type: string) => {
    setModalContent({ title, content, isRequired, type });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAgree = () => {
    switch (modalContent.type) {
      case 'terms':
        setTermsAccepted(true);
        break;
      case 'privacy':
        setPrivacyAccepted(true);
        break;
      case 'marketing':
        setMarketingAccepted(true);
        break;
      default:
        break;
    }
    closeModal();
  };

  const handleAllAcceptedChange = (checked: boolean) => {
    setTermsAccepted(checked);
    setPrivacyAccepted(checked);
    setMarketingAccepted(checked);
    setAllAccepted(checked);
  };

  const isSmallScreen = windowWidth < 660;
  const iconSize = isSmallScreen ? 20 : 28;
  const textSize = isSmallScreen ? 'text-sm' : 'text-lg';

  return (
    <div>
      <div className="border border-borgray rounded-[8px] lg:mx-12">
      <div className='my-2 mx-4 px-1 pb-1 flex items-center border-b border-borgray lg:px-4'>
          <label className={`flex items-center w-full justify-between ${textSize}`}>
            <div className="flex items-center">
              <div className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={allAccepted}
                  onChange={(e) => handleAllAcceptedChange(e.target.checked)}
                  className="hidden"
                />
                <span>
                  <svg width={iconSize} height={iconSize} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M14 2.33301C20.4433 2.33301 25.6667 7.55635 25.6667 13.9997C25.6667 20.4429 20.4433 25.6663 14 25.6663C7.55667 25.6663 2.33333 20.4429 2.33333 13.9997C2.33333 7.55635 7.55667 2.33301 14 2.33301ZM17.7563 10.4643L12.5417 15.6789L10.2437 13.381C9.90201 13.0393 9.34799 13.0393 9.00628 13.381C8.66458 13.7227 8.66458 14.2766 9.00628 14.6184L11.923 17.535C12.2647 17.8767 12.8186 17.8767 13.1603 17.535L18.9937 11.7017C19.3354 11.36 19.3354 10.806 18.9937 10.4643C18.652 10.1226 18.098 10.1226 17.7563 10.4643Z" 
                      fill={allAccepted ? "#00B9F0" : "#999999"}
                    />
                  </svg>
                </span>
              </div>
              <span className="ml-2 text-black">전체 동의</span>
            </div>
          </label>
        </div>

        <div className='my-2 mx-4 px-1 pb-1 flex items-center border-b border-borgray lg:px-4'>
          <label className={`flex items-center w-full justify-between ${textSize}`}>
            <div className="flex items-center">
              <div className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="hidden"
                />
                <span>
                  <svg width={iconSize} height={iconSize} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M14 2.33301C20.4433 2.33301 25.6667 7.55635 25.6667 13.9997C25.6667 20.4429 20.4433 25.6663 14 25.6663C7.55667 25.6663 2.33333 20.4429 2.33333 13.9997C2.33333 7.55635 7.55667 2.33301 14 2.33301ZM17.7563 10.4643L12.5417 15.6789L10.2437 13.381C9.90201 13.0393 9.34799 13.0393 9.00628 13.381C8.66458 13.7227 8.66458 14.2766 9.00628 14.6184L11.923 17.535C12.2647 17.8767 12.8186 17.8767 13.1603 17.535L18.9937 11.7017C19.3354 11.36 19.3354 10.806 18.9937 10.4643C18.652 10.1226 18.098 10.1226 17.7563 10.4643Z" 
                      fill={termsAccepted ? "#00B9F0" : "#999999"}
                    />
                  </svg>
                </span>
              </div>
              <span className="ml-2 text-black">[필수] 사이트 이용약관<span className="text-red">*</span></span>
            </div>
            <button
              type="button"
              onClick={() => openModal('서비스 이용약관', '여기에 서비스 이용약관의 내용을 임의로 작성합니다.', true, 'terms')}
              className="ml-2 text-blue-500 underline"
            >
              보기
            </button>
          </label>
        </div>

        <div className='my-2 mx-4 px-1 pb-1 flex items-center border-b border-borgray lg:px-4'>
          <label className={`flex items-center w-full justify-between ${textSize}`}>
            <div className="flex items-center">
              <div className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="hidden"
                />
                <span>
                  <svg width={iconSize} height={iconSize} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M14 2.33301C20.4433 2.33301 25.6667 7.55635 25.6667 13.9997C25.6667 20.4429 20.4433 25.6663 14 25.6663C7.55667 25.6663 2.33333 20.4429 2.33333 13.9997C2.33333 7.55635 7.55667 2.33301 14 2.33301ZM17.7563 10.4643L12.5417 15.6789L10.2437 13.381C9.90201 13.0393 9.34799 13.0393 9.00628 13.381C8.66458 13.7227 8.66458 14.2766 9.00628 14.6184L11.923 17.535C12.2647 17.8767 12.8186 17.8767 13.1603 17.535L18.9937 11.7017C19.3354 11.36 19.3354 10.806 18.9937 10.4643C18.652 10.1226 18.098 10.1226 17.7563 10.4643Z" 
                      fill={privacyAccepted ? "#00B9F0" : "#999999"}
                    />
                  </svg>
                </span>
              </div>
              <span className="ml-2 text-black">[필수] 개인정보 처리방침<span className="text-red">*</span></span>
            </div>
            <button
              type="button"
              onClick={() => openModal('개인정보 처리방침', '여기에 개인정보 처리방침의 내용을 임의로 작성합니다.', true, 'privacy')}
              className="ml-2 text-blue-500 underline"
            >
              보기
            </button>
          </label>
        </div>

        <div className='my-2 mx-4 px-1 flex items-center lg:px-4'>
          <label className={`flex items-center w-full justify-between ${textSize}`}>
            <div className="flex items-center">
              <div className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={marketingAccepted}
                  onChange={(e) => setMarketingAccepted(e.target.checked)}
                  className="hidden"
                />
                <span>
                  <svg width={iconSize} height={iconSize} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M14 2.33301C20.4433 2.33301 25.6667 7.55635 25.6667 13.9997C25.6667 20.4429 20.4433 25.6663 14 25.6663C7.55667 25.6663 2.33333 20.4429 2.33333 13.9997C2.33333 7.55635 7.55667 2.33301 14 2.33301ZM17.7563 10.4643L12.5417 15.6789L10.2437 13.381C9.90201 13.0393 9.34799 13.0393 9.00628 13.381C8.66458 13.7227 8.66458 14.2766 9.00628 14.6184L11.923 17.535C12.2647 17.8767 12.8186 17.8767 13.1603 17.535L18.9937 11.7017C19.3354 11.36 19.3354 10.806 18.9937 10.4643C18.652 10.1226 18.098 10.1226 17.7563 10.4643Z" 
                      fill={marketingAccepted ? "#00B9F0" : "#999999"}
                    />
                  </svg>
                </span>
              </div>
              <span className="ml-2 text-black">[선택] 마케팅 수신 동의</span>
            </div>
            <button
              type="button"
              onClick={() => openModal('마케팅 수신 동의', '여기에 마케팅 수신 동의의 내용을 임의로 작성합니다.', false, 'marketing')}
              className="ml-2 text-blue-500 underline"
            >
              보기
            </button>
          </label>
        </div>
      </div>

      {isModalOpen && (
        <ModalTemplate
          title={modalContent.title}
          isRequired={modalContent.isRequired}
          content={modalContent.content}
          onClose={closeModal}
          onConfirm={handleAgree}
          confirmButtonText="동의하기"
          cancelButtonText="뒤로가기"
        />
      )}
    </div>
  );
};

export default TermsAgreement;
