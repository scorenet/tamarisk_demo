import React, { useState,  useRef } from 'react';
import icon_close from "../../images/icon/icon-close.svg";

interface ModalFindIDProps {
  isOpen: boolean;
  onClose: () => void;
}

const dummyData = [
  { companyName: '테스트기업', businessNumber: '1234567890',  email: 'test1@example.com', password: 'aaaa1234' },
  { companyName: '예시회사', businessNumber: '0987654321', email: 'test2@example.com', password: 'bbbb1234' }
];

const ModalFindID: React.FC<ModalFindIDProps> = ({ isOpen, onClose }) => {
  const modal = useRef<HTMLDivElement>(null);
  
  const [companyName, setCompanyName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [email, setEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [companyNameError, setCompanyNameError] = useState<string | null>(null);
  const [businessNumberError, setBusinessNumberError] = useState<string | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null); // 체크박스 경고 메시지 상태
  const [isCheckedBeforeSubmit, setIsCheckedBeforeSubmit] = useState(false); // 체크박스 확인 전 검색을 막기 위한 상태
  const [isDisabled, setIsDisabled] = useState(false); // 필드 비활성화 상태

  const clickHandler = (event: MouseEvent) => {
    if (modal.current && !modal.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  const keyHandler = ({ keyCode }: KeyboardEvent) => {
    if (keyCode === 27) {
      handleClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', clickHandler);
      document.addEventListener('keydown', keyHandler);
    }

    return () => {
      document.removeEventListener('mousedown', clickHandler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [isOpen]);

  const handleSearch = () => {
    let hasError = false;

    setIsCheckedBeforeSubmit(true);
  
    if (!companyName) {
      setCompanyNameError('기업명을 입력하세요.');
      hasError = true;
    } else {
      setCompanyNameError(null);
    }
  
    if (!businessNumber) {
      setBusinessNumberError('사업자등록번호를 입력하세요.');
      hasError = true;
    } else {
      setBusinessNumberError(null);
    }
  
    if (!consentChecked) {
      setConsentError('개인정보 수집 동의가 필요합니다.');
      hasError = true;
    } else {
      setConsentError(null);
    }
  
    if (hasError) {
      return;
    }
  
    const foundCompany = dummyData.find(
      (data) => data.companyName === companyName && data.businessNumber === businessNumber
    );
  
    if (foundCompany) {
      setEmail(foundCompany.email);
      setErrorMessage(null);
      setIsDisabled(true); // 검색 완료 후 비활성화
    } else {
      setEmail(null);
      setErrorMessage('가입되어있지 않은 기업입니다');
    }
  };

  const handleClose = () => {
    setCompanyName('');
    setBusinessNumber('');
    setEmail(null);
    setErrorMessage(null);
    setCompanyNameError(null);
    setBusinessNumberError(null);
    setConsentChecked(false);
    setIsDisabled(false); // 필드 비활성화 상태 초기화
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
      <div
        ref={modal}
        className="relative md:px-9 w-full max-w-lg rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:pt-16 md:pb-10"
      >
        <button onClick={handleClose} className="absolute top-4 right-4">
          <img src={icon_close} alt="close icon" />
        </button>

        <h3 className="pb-10 text-xl font-bold text-black dark:text-white sm:text-2xl">
          아이디 찾기
        </h3>

        <form className="w-full">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-bold text-md text-black text-left dark:text-white">
                기업명 <span className="text-red">*</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => { setCompanyName(e.target.value)
                setErrorMessage(null);}}
                placeholder="기업명을 입력하세요" 
                className={`w-full rounded-lg border border-borgray py-[9px] px-6 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${isDisabled ? 'bg-butgray' : 'bg-transparent'}`} 
                disabled={isDisabled} // 필드 비활성화
              />
              {companyNameError && (
                <p className="text-left text-red text-xs mt-1">{companyNameError}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-bold text-md text-black text-left dark:text-white">
                사업자등록번호 <span className="text-red">*</span>
              </label>
              <input
                type="text"
                value={businessNumber}
                onChange={(e) =>{ setBusinessNumber(e.target.value)
                setBusinessNumber(e.target.value);
                setErrorMessage(null);}}
                placeholder="사업자등록번호를 입력하세요"
                className={`w-full rounded-lg border border-borgray py-[9px] px-6 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${isDisabled ? 'bg-butgray' : 'bg-transparent'}`} 
                disabled={isDisabled} // 필드 비활성화
              />
              {businessNumberError && (
                <p className="text-left text-red text-xs mt-1">{businessNumberError}</p>
              )}
            </div>
          </div>

          {email && (
            <p className="rounded-lg border border-green-600/50 bg-transparent py-[9px] px-6 text-sm text-left text-green-600 text-sm mt-4">가입된 이메일 : {email}</p>
          )}
          {errorMessage && (
            <p className="text-left text-red text-xs mt-2 ml-2">{errorMessage}</p>
          )}

          <div className="flex mt-4">
            <input
              type="checkbox"
              className="mr-2 mb-6"
              checked={consentChecked}
              onChange={() => {
                setConsentChecked(!consentChecked);
                setConsentError(null); // 체크박스가 변경되면 경고 메시지 초기화
              }}
              disabled={isDisabled} // 검색 후 비활성화
            />
            <div className="flex-col">
              <p className="text-left text-xs text-subgray">
                문의하기에 대한 회신 이외에는 개인정보를 사용하지 않습니다.
              </p>
              <p className="text-left text-xs text-subgray">
                개인정보 수집에 동의합니다.
              </p>
            </div>
          </div>
            {/* 검색 전까지는 경고 메시지 표시 안 함 */}
            {isCheckedBeforeSubmit && consentError && (
              <p className="text-center text-red text-xs">{consentError}</p>
            )}

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
                type="button"
                onClick={email ? handleClose : handleSearch}
                className="block w-full rounded-full border border-black bg-black p-[9px] text-sm text-center font-medium text-white transition hover:bg-opacity-90"
              >
                {email ? '확인' : '검색하기'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFindID;
