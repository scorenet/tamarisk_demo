import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailVerification from './EmailVerificationSignUp'; 
import PasswordInput from './PasswordInput';
import TermsAgreement from './TermsAgreement';
import ModalInquiry from '../../components/Modals/ModalInquiry'; 
import MemberInfo from './Memberinfo';  // MemberInfo 컴포넌트를 가져옵니다.
import LogoLight from '../../images/logo/logo.svg';
import Icon1 from '../../images/icon/icon-signup1.svg';
import Icon2 from '../../images/icon/icon-signup2.svg';
import Icon3 from '../../images/icon/icon-signup3.svg';
import Sideimage from '../../images/cover/login_side_img.png';
import SignLayout from '../../layout/MainLayout';
import { FaEllipsisH } from 'react-icons/fa';

const SignUp = (): JSX.Element => {
  const [step, setStep] = useState(1);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [newPassword, setNewPassword] = useState(''); // 새 비밀번호 상태
  const [canProceedToNextStep, setCanProceedToNextStep] = useState(false); // 동의 여부 확인
  const [memberInfo, setMemberInfo] = useState({}); // 회원 정보를 저장하는 상태 추가
  const [isMemberInfoValid, setIsMemberInfoValid] = useState(false); // 필수 입력 필드의 유효성 상태
  const [showWarning, setShowWarning] = useState(false); // 경고 메시지 표시 상태
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 화면 너비 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const navigate = useNavigate();

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 문의 데이터를 처리하는 함수 (모달에서 데이터 제출 시 호출됨)
  const handleInquirySubmit = (data: { date: string; type: string; content: string; status: string }) => {
    console.log("문의 등록 데이터:", data);
    closeModal();  // 문의가 제출되면 모달을 닫음
  };

  // 이메일 인증 완료 시 호출
  const handleEmailVerified = () => {
    setIsEmailVerified(true);
  };

  // 비밀번호가 유효할 때 호출
  const handlePasswordValid = (isValid: boolean) => {
    setIsPasswordValid(isValid);
  };

  // 모든 필수 동의 항목에 동의 시 호출
  const handleTermsAgreed = (canProceed: boolean) => {
    setCanProceedToNextStep(canProceed);
  };

  // MemberInfo에서 입력된 데이터를 받아 업데이트
  const handleMemberInfoUpdate = (updatedInfo: any, isValid: boolean) => {
    setMemberInfo(updatedInfo);
    setIsMemberInfoValid(isValid); // 필수 입력 필드가 모두 입력되었는지 확인
  };

  // 다음으로 버튼 클릭 시 필수 항목이 모두 입력되었는지 확인
  const handleNextStep = () => {
    if (isMemberInfoValid) {
      setShowWarning(false);
      setStep(4); // 다음 스텝으로 이동
    } else {
      setShowWarning(true); // 경고 메시지 표시
    }
  };

  // 회원가입 완료 후 비밀번호와 이메일을 콘솔에 출력
  const handleSignUpComplete = () => {
    console.log('회원 정보:', memberInfo);
    navigate('/dashboard'); // 회원가입 완료 후 페이지 이동
  };

  // Step Indicator Component
  const StepIndicator = ({ step }: { step: number }): JSX.Element => (
    <div className="flex justify-center items-center mb-6">
      {[1, 2, 3, 4].map((num, index) => (
        <React.Fragment key={num}>
          {/* Step Circles */}
          <div
            className={`w-10 h-10 flex items-center border justify-center rounded-full mx-1 ${
              step >= num ? 'bg-primary text-white border-primary' : 'bg-white text-[#999999] border-[#999999]'
            }`}
          >
            {num}
          </div>
          
          {/* Dots between the circles */}
          {index < 3 && (
            <FaEllipsisH
              className={`mx-2 text-md ${
                step >= num ? 'text-primary' : 'text-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // 화면 크기 변화 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 화면 너비가 660px 이하인 경우 텍스트 크기 줄이기
  const isSmallScreen = windowWidth < 660;
  const textSize = isSmallScreen ? 'text-sm' : 'text-lg';

  // 버튼을 공통으로 관리하는 함수
  const renderButtons = (): JSX.Element => {
    const previousStep = () => {
      if (step === 1) {
        navigate('/');  // Step 1일 때 "/"로 이동
      } else if (step > 1) {
        setStep(step - 1);
      }
    };

    const nextStep = () => {
      if (step === 1 && canProceedToNextStep) {
        setStep(2);
      } else if (step === 2 && isEmailVerified && isPasswordValid) {
        setStep(3);
      } else if (step === 3 && isMemberInfoValid) {
        handleNextStep();
      } else if (step === 4) {
        handleSignUpComplete();
      }
    };

    return (
      <div className="flex justify-between mt-6">
        <button
          type="button"
          className={`block w-1/4 rounded-full border p-[9px] text-sm text-center font-medium text-white transition ${
            step === 1 ? 'bg-butgray text-gray-600' : 'border-butgray bg-butgray hover:bg-opacity-90'
          }`}
          onClick={previousStep}
        >
          이전
        </button>

        <button
          type="button"
          className={`block w-1/4 rounded-full border p-[9px] text-sm text-center font-medium text-white transition ${
            (step === 1 && !canProceedToNextStep) ||
            (step === 2 && (!isEmailVerified || !isPasswordValid)) ||
            (step === 3 && !isMemberInfoValid)
              ? 'border-gray-300 bg-gray-300 cursor-not-allowed'
              : 'border-primary bg-primary hover:bg-opacity-90'
          }`}
          onClick={nextStep}
          disabled={
            (step === 1 && !canProceedToNextStep) ||
            (step === 2 && (!isEmailVerified || !isPasswordValid)) ||
            (step === 3 && !isMemberInfoValid)
          }
        >
          {step === 4 ? '시작하기' : '다음으로'}
        </button>
      </div>
    );
  };

  return (
    <SignLayout>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-wrap w-[1660px] h-[860px] rounded-[8px] bg-white shadow-default dark:bg-boxdark overflow-hidden">
          {/* Left Side - Info */}
          <div className="flex hidden h-full w-full items-center 2xl:block 2xl:w-2/5"
              style={{
                backgroundImage: `url(${Sideimage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '870px', // Ensure it covers full height
              }}>
            <div className="flex flex-col justify-center h-full py-10 px-30 text-center">
              {/* Logo */}
              <img className="max-h-[48px] my-10" src={LogoLight} alt="Logo" />

              {/* Main Heading */}
              <p className="border-t border-stroke font-bold text-center text-white text-2xl py-10">
                프리미엄 멤버십만의 특별함
              </p>

              {/* Section 1 */}
              <div className="flex items-start mb-10">
                <div className="flex items-center justify-center mt-3 p-2 w-[72px] h-12 bg-black bg-opacity-60 rounded-full">
                  <img src={Icon1} alt="Icon" className="h-6 w-6" />
                </div>
                <div className="ml-4 text-left">
                  <p className="text-white font-bold text-md mb-1">1. 스마트한 배출원 관리</p>
                  <p className="text-[#cccccc] text-sm">
                    기업별 맞춤형 관리를 통해 스마트한 탄소 배출량 및 탄소 자산 관리가 가능합니다.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="flex items-start mb-10">
                <div className="flex items-center justify-center mt-3 p-2 w-[72px] h-12 bg-black bg-opacity-60 rounded-full">
                  <img src={Icon2} alt="Icon" className="h-6 w-6" />
                </div>
                <div className="ml-4 text-left">
                  <p className="text-white font-bold text-md mb-1">2. 맞춤형 배출항목 관리</p>
                  <p className="text-[#cccccc] text-sm">
                    배출원별 배출항목을 세분화하여 직관적이고 마이크로한 탄소 자산 관리를 시작하세요.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="flex items-start border-b border-stroke pb-10">
                <div className="flex items-center justify-center mt-3 p-2 w-[72px] h-12 bg-black bg-opacity-60 rounded-full">
                  <img src={Icon3} alt="Icon" className="h-6 w-6 object-cover" />
                </div>
                <div className="ml-4 text-left">
                  <p className="text-white font-bold text-md mb-1">3. 연간 탄소배출량 리포트</p>
                  <p className="text-[#cccccc] text-sm">
                    연간 탄소배출량을 스코프 1, 2, 3별로 실시간 대시보드로 탄소배출량 리포트를 제공합니다.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <p className="mt-4 text-[#666666] text-sm">© 2024 ecoasset All rights reserved.</p>

              <div className="flex justify-center">
                {/* 문의하기 버튼 */}
                <button
                  onClick={openModal} // 클릭 시 모달 열기
                  className="mt-10 px-22 bg-primary text-white py-2 rounded-full hover:bg-opacity-90"
                >
                  문의하기
                </button>

                {/* ModalInquiry 컴포넌트를 모달 상태에 연결 */}
                <ModalInquiry
                  modalOpen={isModalOpen}
                  onClose={closeModal}
                  onSubmit={handleInquirySubmit}  // 모달에서 데이터 제출 시 호출될 함수
                />
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex w-full 2xl:w-3/5 xl:border-l-2 pt-20 items-center justify-center border-stroke" style={{ minHeight: '600px', maxHeight: '660px' }}>
            <div className="w-full max-w-[666px] p-12 h-full flex flex-col justify-between">
              
              <div className="flex-grow">
                <StepIndicator step={step} />
                <h2 className={`flex mt-5 mb-2 items-center justify-center text-2xl font-bold text-black dark:text-white ${textSize}`}>
                  국내 최초 탄소자산관리 플랫폼에 오신걸 환영합니다
                </h2>

                {step === 1 && (
                  <>
                    <h2 className={`mb-9 text-center text-2xl font-bold ${textSize}`}>
                      전체 동의에는 필수 및 선택 정보에 대한 동의가 포함되어 있습니다. 선택 항목에 대한 동의를 거부하시는 경우에도 서비스 이용이 가능합니다.</h2>
                    <TermsAgreement onAgreed={handleTermsAgreed} />
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className={`mb-9 text-center text-2xl font-bold ${textSize}`}>사용하실 이메일을 입력해주세요</h2>
                    <EmailVerification onVerified={handleEmailVerified} />

                    {isEmailVerified && (
                      <PasswordInput onPasswordValid={handlePasswordValid} setNewPassword={setNewPassword} />
                    )}
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className={`mb-3 text-center text-2xl font-bold ${textSize}`}>기업 정보를 입력해주세요</h2>
                    <div className='pl-8'>
                      <MemberInfo onUpdate={handleMemberInfoUpdate} />
                    </div>

                    {showWarning && (
                      <p className="text-xs text-center text-red mt-2">필수항목을 모두 입력하세요</p>
                    )}
                  </>
                )}

                {step === 4 && (
                  <>
                    <h2 className={`mb-9 text-2xl text-center font-bold ${textSize}`}>정보는 [마이페이지]에서 수정 가능합니다.</h2>
                    <p className={`mb-2 text-2xl text-black text-center font-bold ${textSize}`}>환영합니다</p>
                    <p className={`mb-9 text-2xl text-black text-center font-bold ${textSize}`}>에코에셋에서 기업탄소 자산관리를 시작하세요</p>
                  </>
                )}
              </div>

              {/* 공통 버튼 섹션 */}
              {renderButtons()}
            </div>
          </div>
        </div>
      </div>
    </SignLayout>
  );
};

export default SignUp;
