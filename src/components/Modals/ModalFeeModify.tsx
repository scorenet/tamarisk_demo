import React, { useState, useEffect, useRef } from 'react';
import Logo from '../../images/logo/logo-dark.svg';
import icon_close from "../../images/icon/icon-close.svg"

interface ModalFeeModifyProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalFeeModify: React.FC<ModalFeeModifyProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('annually');
  const modal = useRef<HTMLDivElement>(null);

  // Handle outside click to close modal
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (isOpen && modal.current && !modal.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', clickHandler);
    return () => document.removeEventListener('mousedown', clickHandler);
  }, [isOpen, onClose]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (isOpen && keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [isOpen, onClose]);

  // Handle submit action
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    window.alert('멤버십 변경과 결제를 위해 <문의하기>를 이용해주세요.');
    onClose(); // Close the modal after showing the alert
  };

  return isOpen ? (
    <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
      <div
        ref={modal}
        className="relative md:px-9 w-full max-w-lg rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:pt-16 md:pb-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm"
        >
          <img src={icon_close} />
        </button>
        <img src={Logo} alt="Logo" className="mb-6 h-7 mx-auto" />
        <h3 className="pb-6 text-md font-bold text-black dark:text-white sm:text-md">
          프리미엄 멤버십 결제 플랜 선택
        </h3>

        <div className="mb-6">
          <div
            className={`border ${
              selectedPlan === 'monthly' ? 'border-primary' : 'border-borgray'
            } rounded-lg p-4 mb-4`}
          >
            <label className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-md font-semibold text-primary">Monthly 결제 플랜</p>
                <p className="text-sm text-gray-500">500,000원 | 1년 (VAT 별도)</p>
                <p className="text-xs text-gray-400">매월 1, 15, 30일 중 세금계산서 발행하여 결제하는 방식입니다.</p>
              </div>
              <input 
                type="radio" 
                name="plan" 
                value="monthly" 
                checked={selectedPlan === 'monthly'} 
                onChange={() => setSelectedPlan('monthly')}
                className="mr-2"
              />
            </label>
          </div>
          <div
            className={`border ${
              selectedPlan === 'annually' ? 'border-primary' : 'border-borgray'
            } rounded-lg p-4`}
          >
            <label className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-md font-semibold text-primary">Annually 결제 플랜</p>
                <p className="text-sm text-gray-500">5,000,000원 | 1년 (VAT 별도)</p>
                <p className="text-xs text-gray-400">한번 결제로 1년을 사용할 수 있는 플랜입니다. 월결제보다 약 17% 저렴합니다.</p>
              </div>
              <input 
                type="radio" 
                name="plan" 
                value="annually" 
                checked={selectedPlan === 'annually'} 
                onChange={() => setSelectedPlan('annually')}
                className="mr-2"
              />
            </label>
          </div>
        </div>

        <div className="mx-6 mt-6 flex flex-wrap">
          <div className="2xsm:w-1/2 w-full px-3">
            <button
              onClick={onClose}
              className="block w-full rounded-full border border-borgray bg-borgray p-[9px] text-sm text-center font-medium text-black transition hover:bg-gray"
            >
              뒤로가기 {/* Optional icon section */}
            </button>
          </div>
          <div className="2xsm:w-1/2 w-full px-3">
            <button
              onClick={handleSubmit}
              className="block w-full rounded-full border border-primary bg-primary p-[9px] text-sm text-center font-medium text-white transition hover:bg-opacity-90"
            >
              신청하기 {/* Optional icon section */}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalFeeModify;
