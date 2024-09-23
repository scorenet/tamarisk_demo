import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import ModalFindID from '../../components/Modals/ModalFindID'; // 아이디 찾기 모달 컴포넌트
import ModalFindPW from '../../components/Modals/ModalFindPW'; // 비밀번호 찾기 모달 컴포넌트
import LogoDark from '../../images/logo/logo-dark.svg'; // 로고 이미지

const SignIn: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  const [email, setEmail] = useState<string>(''); // 이메일 상태
  const [password, setPassword] = useState<string>(''); // 비밀번호 상태
  const [rememberMe, setRememberMe] = useState<boolean>(false); // '아이디 기억하기' 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 아이디 찾기 모달 열림 상태
  const [isPwModalOpen, setIsPwModalOpen] = useState(false); // 비밀번호 찾기 모달 열림 상태
  const [errorMessage, setErrorMessage] = useState<string>(''); // 오류 메시지 상태

  const DUMMY_EMAIL = 'test@example.com'; // 더미 이메일
  const DUMMY_PASSWORD = 'password123'; // 더미 비밀번호

  // 페이지 로드 시 localStorage에서 이메일 값을 가져옴
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true); // 기억하기 체크박스도 체크되도록 설정
    }
  }, []);

  // '아이디 기억하기' 체크박스가 변경될 때 처리
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  // 이메일 입력이 변경될 때 처리
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 비밀번호 입력이 변경될 때 처리
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 로그인 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // '아이디 기억하기' 체크박스가 선택된 경우에만 이메일을 저장
    if (rememberMe) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }

    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      // 이메일과 비밀번호가 맞으면 대시보드로 이동
      navigate('/dashboard');
    } else {
      // 맞지 않으면 오류 메시지 출력
      setErrorMessage('이메일/비밀번호를 확인해주세요.');
    }
  };

  // 모달 열기 및 닫기 함수 (아이디 찾기)
  const openIDModal = () => {
    setIsModalOpen(true); // 아이디 찾기 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 아이디 찾기 모달 닫기
  };

  // 모달 열기 및 닫기 함수 (비밀번호 찾기)
  const openPwModal = () => {
    setIsPwModalOpen(true); // 비밀번호 찾기 모달 열기
  };

  const closePwModal = () => {
    setIsPwModalOpen(false); // 비밀번호 찾기 모달 닫기
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center h-screen">
        <div className="rounded-[8px] border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full max-w-[520px] p-4 md:p-6 lg:p-10">
          <div className="flex flex-col items-center">
            <img className="h-[28px] mb-8" src={LogoDark} alt="Logo" />

            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2 block font-bold text-md text-black text-left dark:text-white">
                  이메일
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange} // 이메일 입력 변화 핸들링
                    placeholder="이메일을 입력하세요."
                    className="w-full rounded-lg border border-borgray bg-transparent py-[9px] px-6 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block font-bold text-md text-black text-left dark:text-white">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange} // 비밀번호 입력 변화 핸들링
                    placeholder="비밀번호를 입력하세요."
                    className="w-full rounded-lg border border-borgray bg-transparent py-[9px] px-6 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              {errorMessage && (
                <p className="text-red text-xs text-left pb-2">{errorMessage}</p> // 오류 메시지 출력
              )}

              <div className="mb-2 flex items-center justify-between">
                <label className="flex items-center text-sm text-black">
                  <input 
                    type="checkbox" 
                    className="mr-2" 
                    checked={rememberMe} 
                    onChange={handleRememberMeChange} // 체크박스 변경 핸들링
                  />
                  아이디 기억하기
                </label>
                <div>
                  <button type="button" className="text-primary text-sm" onClick={openIDModal}>
                    아이디
                  </button>
                  /
                  <button type="button" className="text-primary text-sm" onClick={openPwModal}>
                    비밀번호 찾기
                  </button>
                </div>
              </div>

              <div className="mt-3 mb-4">
                <button
                  type="submit" // form의 onSubmit이 호출되도록 수정
                  className="w-full cursor-pointer rounded-full border border-primary bg-primary py-[7px] text-white transition hover:bg-opacity-90"
                >
                  로그인
                </button>
              </div>


              <div className="text-center">
                <p className="text-sm text-black">
                  아직회원이 아니신가요?{' '}
                  <Link to="/signup" className="text-primary">
                    회원가입
                  </Link>
                </p>
              </div>
            </form>

            {/* 아이디 찾기 모달 연결 */}
            <ModalFindID isOpen={isModalOpen} onClose={closeModal} />

            {/* 비밀번호 찾기 모달 연결 */}
            <ModalFindPW isOpen={isPwModalOpen} onClose={closePwModal} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignIn;
