import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface EmailVerificationPWProps {
  onVerified: () => void; // 이메일 인증 완료 시 호출
  isEmailStored: boolean; // 이메일이 저장된지 여부 확인
}

// forwardRef를 사용하여 외부에서 인증 확인 기능을 호출할 수 있도록 변경
const EmailVerificationPW = forwardRef(({ onVerified, isEmailStored }: EmailVerificationPWProps, ref) => {
  const [inputVerificationCode, setInputVerificationCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [timer, setTimer] = useState(0); // 타이머 상태
  const [timerExpired, setTimerExpired] = useState(false); // 타이머 만료 상태

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
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 랜덤 코드 생성
    setVerificationCode(code); // 새로운 인증번호 저장
    setVerificationSent(true);
    setMessage('인증번호가 이메일로 전송되었습니다.');
    console.log('인증 코드:', code); // 실제로는 이메일을 보내는 로직 필요
    startTimer(); // 타이머 시작
  };

  const verifyCode = () => {
    if (timerExpired) {
        setVerificationError('인증 코드가 만료되었습니다. 다시 전송해주세요.');
      return false;
    }
    if (inputVerificationCode === verificationCode) {
      onVerified(); // 인증 완료 시 부모 컴포넌트에 알림
      return true;
    } else {
        setVerificationError('인증번호를 정확하게 입력해주세요.');
      return false;
    }
  };

  useEffect(() => {
    // 이메일이 저장된 상태라면, 바로 인증 코드를 전송
    if (isEmailStored) {
      sendVerificationCode();
    }
  }, [isEmailStored]);

  // useImperativeHandle을 사용하여 외부에서 verifyCode를 호출할 수 있도록 함
  useImperativeHandle(ref, () => ({
    verifyCode,
  }));

  return (
    <div>
      {isEmailStored ? (
        <>
        {message && <p className="mt-2 ml-2 text-xs text-left text-blue-500">{message}</p>}

            {/* 인증번호 입력 필드 */}
            <div className="relative flex mt-4 gap-2">
            <input
                type="text"
                placeholder="인증번호를 입력하세요"
                value={inputVerificationCode}
                onChange={(e) => setInputVerificationCode(e.target.value)}
                className="w-4/5 rounded-lg border border-borgray bg-transparent py-[9px] px-6 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary relative"
            />

            {/* 타이머 표시 (인풋 박스 내부에 위치) */}
            {timer > 0 && (
                <span className="absolute right-30 top-1/2 transform -translate-y-1/2 text-red text-sm">
                0{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </span>
            )}

            {/* 재전송 버튼은 타이머 만료 여부와 관계없이 항상 표시 */}
            <button
                type="button"
                className="w-1/5 rounded-[8px] border border-black bg-black py-[9px] text-sm text-center font-medium text-white transition hover:bg-opacity-90"
                onClick={sendVerificationCode}
            >
                재전송
            </button>
            </div>
            {verificationError && <p className="mt-2 ml-2 text-xs text-left text-red">{verificationError}</p>}
        </>
      ) : (
        // 이메일이 저장되지 않은 경우 경고 메시지 출력
        <p className="mt-4 text-red">이메일이 저장되어 있지 않습니다.</p>
      )}
    </div>
  );
});

export default EmailVerificationPW;
