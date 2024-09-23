import React, { useState, useEffect } from 'react';

interface EmailVerificationProps {
  onVerified: (email: string) => void; // 이메일 인증 완료 시 이메일을 전달
}

const EmailVerificationSignUp: React.FC<EmailVerificationProps> = ({ onVerified }) => {
  const [email, setEmail] = useState('');
  const [inputVerificationCode, setInputVerificationCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [timer, setTimer] = useState(0); // 타이머 상태
  const [timerExpired, setTimerExpired] = useState(false); // 타이머 만료 상태
  const [isEmailButtonDisabled, setIsEmailButtonDisabled] = useState(false); // 이메일 인증 버튼 비활성화 상태

  // 이메일 인증 버튼 클릭 후 버튼 이름 변경
  const [buttonText, setButtonText] = useState('이메일 인증');

  const startTimer = () => {
    setTimer(180); // 3분 (180초) 타이머 시작
    setTimerExpired(false); // 타이머가 다시 시작되면 만료 상태 리셋
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
    } else if (timer === 0 && verificationSent) {
      setTimerExpired(true);
      setMessage('인증 코드가 만료되었습니다. 다시 전송해주세요.');
    }
  }, [timer, verificationSent]);

  const sendVerificationCode = () => {
    if (!email) {
      setEmailError('이메일을 입력해 주세요.');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 랜덤 코드 생성
    setVerificationCode(code); // 새로운 인증번호 저장
    setVerificationSent(true);
    setMessage('인증번호가 이메일로 전송되었습니다.');
    console.log('인증 코드:', code); // 실제로는 이메일을 보내는 로직 필요
    startTimer(); // 타이머 시작

    // 버튼 텍스트를 "재전송"으로 변경
    setButtonText('재전송');
  };

  const verifyCode = () => {
    if (timerExpired) {
      setVerificationError('인증 코드가 만료되었습니다. 다시 전송해주세요.');
      return false;
    }
    if (inputVerificationCode === verificationCode) {
      setIsVerified(true);
      setMessage('인증이 완료되었습니다.');
      setEmailError('');
      onVerified(email); // 이메일 전달하여 인증 완료
      return true;
    } else {
      setVerificationError('인증번호를 정확하게 입력해주세요.');
      return false;
    }
  };

  return (
    <div>
      <div className="mb-4">
      <label className="mb-2 block font-bold text-md text-black text-left dark:text-white">
          이메일 <span className="text-red">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="사용하실 이메일을 입력하세요"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            className="flex w-4/5 rounded-lg border border-borgray bg-transparent py-[9px] px-6 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary relative"
          />
          <button
            type="button"
            className="w-1/5 rounded-[8px] py-[9px] bg-black text-white text-sm font-medium transition hover:bg-opacity-90"
            onClick={sendVerificationCode}
          >
            {buttonText} {/* 버튼 텍스트는 상태에 따라 변경 */}
          </button>
        </div>
        {emailError && <p className="mt-2 ml-2 text-xs text-left text-red">{emailError}</p>}
        {message && <p className="mt-2 ml-2 text-xs text-left text-blue-500">{message}</p>}
      </div>

      {verificationSent && (
        <div className="mb-4">
        <label className="mb-2 block font-bold text-md text-black text-left dark:text-white">
          인증 코드 <span className="text-red">*</span>
        </label>
          <div className="relative flex gap-2">
            <input
              type="text"
              placeholder="인증번호를 입력하세요"
              value={inputVerificationCode}
              onChange={(e) => {
                setInputVerificationCode(e.target.value);
                setVerificationError('');
              }}
              className="w-4/5 rounded-lg border border-borgray bg-transparent py-[9px] px-6 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary relative"
            />

            {/* 타이머 표시 (인풋 박스 내부에 위치) */}
            {timer > 0 && (
              <span className="absolute right-35 top-1/2 transform -translate-y-1/2 text-red text-sm">
                0{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </span>
            )}
                      <button
            type="button"
            className="w-1/5 rounded-[8px] py-[9px] border border-primary bg-white text-primary text-sm font-medium transition hover:bg-primary hover:text-white"
            onClick={verifyCode}
          >
            인증 확인
          </button>
          </div>
          {verificationError && <p className="mt-2 ml-2 text-xs text-left text-red">{verificationError}</p>}
        </div>
      )}
    </div>
  );
};

export default EmailVerificationSignUp;
