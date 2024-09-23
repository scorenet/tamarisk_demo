import React, { useRef, useState } from 'react';
import icon_close from "../../images/icon/icon-close.svg";
import EmailVerificationPW from '../../pages/Authentication/EmailVerificationPW';
import PasswordInput from '../../pages/Authentication/PasswordInput'; // 비밀번호 입력 컴포넌트

interface ModalFindPWProps {
  isOpen: boolean;
  onClose: () => void;
}

const dummyData = [
    { companyName: '테스트기업', businessNumber: '1234567890', email: 'test1@example.com', password: 'aaaa1234' },
    { companyName: '예시회사', businessNumber: '0987654321', email: 'test2@example.com', password: 'bbbb1234' }
];

const ModalFindPW: React.FC<ModalFindPWProps> = ({ isOpen, onClose }) => {
  const modal = useRef<HTMLDivElement>(null);
  const verificationRef = useRef<any>(null); // EmailVerificationPW를 참조하는 ref
  const [step, setStep] = useState(1); // 단계별 화면 전환
  const [email, setEmail] = useState(''); // 입력한 이메일 상태
  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태
  const [currentUser, setCurrentUser] = useState<any>(null); // 현재 사용자 정보
  const [isPasswordValid, setIsPasswordValid] = useState(false); // 비밀번호가 유효한지 여부
  const [newPassword, setNewPassword] = useState(''); // 새 비밀번호 상태
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
  const [isEmailButtonDisabled, setIsEmailButtonDisabled] = useState(false); // 이메일 인증 버튼 비활성화 상태

  // 모달이 닫힐 때 상태 초기화
  const handleClose = () => {
    setStep(1); // 첫 번째 스텝으로 초기화
    setCurrentUser(null); // 사용자 정보 초기화
    setEmail(''); // 이메일 초기화
    setNewPassword(''); // 새 비밀번호 초기화
    setErrorMessage(''); // 에러 메시지 초기화
    setIsEmailValid(false); // 이메일 유효성 초기화
    setIsEmailButtonDisabled(false); // 이메일 인증 버튼 활성화 상태 초기화
    onClose(); // 부모에서 전달받은 모달 닫기 함수 호출
  };

  // 이메일 유효성 검사 및 인증 코드 전송
  const handleSendVerificationCode = () => {
    const user = dummyData.find((u) => u.email === email);
    if (!user) {
      // 저장된 이메일이 아닌 경우
      setErrorMessage('가입되지 않은 이메일입니다.');
      setIsEmailValid(false);
    } else {
      // 저장된 이메일일 경우 인증 코드 전송
      setCurrentUser(user); // 인증된 사용자 설정
      setIsEmailValid(true); // 이메일 유효성 상태 true로 변경
      setErrorMessage(''); // 에러 메시지 초기화
      setIsEmailButtonDisabled(true); // 이메일 인증 버튼 비활성화
    }
  };

  // 이메일 인증 완료 시 호출
  const handleEmailVerified = () => {
    setStep(2); // 인증 완료 후 비밀번호 변경 화면으로 이동
  };

  // 비밀번호가 유효한지 여부를 받음
  const handlePasswordValid = (isValid: boolean) => {
    setIsPasswordValid(isValid);
  };

  // 비밀번호 변경 처리
  const handlePasswordChange = () => {
    if (currentUser && isPasswordValid) {
      console.log('이메일:', currentUser.email);
      console.log('변경된 비밀번호:', newPassword); // 변경된 비밀번호 출력
      currentUser.password = newPassword;
      setErrorMessage('');
      handleClose(); // 비밀번호 변경 후 모달 닫기
    } else {
      setErrorMessage('비밀번호가 유효하지 않습니다.');
    }
  };

  // "인증하기" 버튼 클릭 시, 인증 확인 기능을 호출
  const handleVerification = () => {
    if (verificationRef.current) {
      const isVerified = verificationRef.current.verifyCode(); // EmailVerificationPW의 verifyCode 호출
      if (isVerified) {
        setStep(2); // 인증 성공 시 다음 단계로 이동
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
      <div ref={modal} className="relative md:px-9 w-full max-w-[520px] rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:pt-16 md:pb-10">
        <button onClick={handleClose} className="absolute top-4 right-4">
          <img src={icon_close} alt="close icon" />
        </button>

        <h3 className="pb-6 text-xl font-bold text-black dark:text-white sm:text-2xl">
          비밀번호 찾기
        </h3>

        {step === 1 && (
          <>
            {/* 이메일 입력 및 저장된 이메일 확인 */}
            <div className="mt-2">
              <label className="mb-2 block font-bold text-md text-black text-left dark:text-white">
                가입하신 아이디<span className="text-red">*</span>
              </label>
              <div className='flex gap-2'>
                <input
                  type="email"
                  placeholder="가입하신 이메일을 입력하세요"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailValid(false);
                    setErrorMessage('');
                    setIsEmailButtonDisabled(false); // 입력이 변경될 때 버튼 다시 활성화
                  }}
                  className="w-4/5 rounded-lg border border-borgray bg-transparent py-[9px] px-6 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleSendVerificationCode}
                  className={`w-1/5 rounded-[8px] py-[9px] text-sm text-center font-medium text-white transition hover:bg-opacity-90 ${
                    isEmailButtonDisabled ? 'bg-butgray' : 'bg-black'
                  }`} // 비활성화 시 색상 변경
                  disabled={isEmailButtonDisabled} // 버튼 비활성화 처리
                >
                  이메일인증
                </button>
              </div>
              {errorMessage && <p className="mt-2 ml-2 text-xs text-left text-red">{errorMessage}</p>}
            </div>

            {/* 인증 코드 전송 성공 시 이메일 인증 컴포넌트 표시 */}
            {isEmailValid && (
              <>
                <EmailVerificationPW ref={verificationRef} onVerified={handleEmailVerified} isEmailStored={isEmailValid} />
              </>
            )}
          </>
        )}

        {step === 2 && (
          <>
            {/* 비밀번호 입력 및 확인 컴포넌트 */}
            <PasswordInput onPasswordValid={handlePasswordValid} setNewPassword={setNewPassword} />
          </>
        )}

        {/* 뒤로가기 및 인증하기/수정하기 버튼 */}
        <div className="flex flex-row justify-between mt-15 mx-6">
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
              onClick={step === 2 ? handlePasswordChange : handleVerification} // 인증하기 또는 비밀번호 수정하기 버튼
              className="block w-full rounded-full border border-black bg-black p-[9px] text-sm text-center font-medium text-white transition hover:bg-opacity-90"
            >
              {step === 2 ? '비밀번호 수정하기' : '인증하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFindPW;
