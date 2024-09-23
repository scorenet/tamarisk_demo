import React, { useState, useEffect, useRef } from 'react';
import icon_close from "../../images/icon/icon-close.svg"

const password = "aaaa1234!"; // 더미 비밀번호

interface ModalPasswordProps {
  onAuthenticationSuccess: () => void;
}

const ModalPassword: React.FC<ModalPasswordProps> = ({ onAuthenticationSuccess }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const trigger = useRef<HTMLButtonElement>(null);
  const modal = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 모달 닫기 및 error 초기화
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (modalOpen && modal.current && !modal.current.contains(event.target as Node)) {
        setModalOpen(false);
        setError(''); // 모달 닫힐 때 error 초기화
      }
    };
    document.addEventListener('mousedown', clickHandler);
    return () => document.removeEventListener('mousedown', clickHandler);
  }, [modalOpen]);

  // ESC 키 누르면 모달 닫기 및 error 초기화
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
      setError(''); // 모달 닫힐 때 error 초기화
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [modalOpen]);

  // 비밀번호 확인 함수
  const handlePasswordCheck = () => {
    if (passwordInput === password) {
      onAuthenticationSuccess(); // 인증 성공 시 부모 컴포넌트의 함수 호출
      setModalOpen(false);
      setError(''); // 인증 성공 시 error 초기화
    } else {
      setError('비밀번호가 올바르지 않습니다.');
      setPasswordInput(''); // 비밀번호 입력 초기화
    }
  };

  // 모달 열기 함수
  const openModal = () => {
    setModalOpen(true);
    setError(''); // 모달 열릴 때 error 초기화
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalOpen(false);
    setError(''); // 모달 닫힐 때 error 초기화
  };

  return (
    <div>
      <button
        ref={trigger}
        onClick={openModal}
        className="flex items-center hover:bg-opacity-90"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.3487 8.75622C20.9869 8.35489 20.4803 8.13599 19.9376 8.13599H19.8291C19.6481 8.13599 19.5034 8.02653 19.4672 7.8806C19.431 7.73466 19.3587 7.62521 19.3225 7.47927C19.2501 7.33333 19.3225 7.1874 19.431 7.07794L19.5034 7.00498C19.9014 6.64013 20.1185 6.12935 20.1185 5.58209C20.1185 5.03483 19.9376 4.52405 19.5396 4.12272L18.1285 2.66335C17.3686 1.8607 16.0661 1.82421 15.2701 2.62687L15.1615 2.69983C15.053 2.80929 14.8721 2.84577 14.6911 2.7728C14.5464 2.69983 14.4017 2.62687 14.2208 2.59038C14.0399 2.51741 13.9313 2.37148 13.9313 2.22554V2.04312C13.9313 0.912106 13.0267 0 11.9051 0H9.87887C9.33613 0 8.82958 0.218906 8.46775 0.583748C8.06974 0.985075 7.88883 1.49585 7.88883 2.00663V2.15257C7.88883 2.29851 7.78028 2.44444 7.63555 2.51741C7.56319 2.5539 7.52701 2.5539 7.45464 2.59038C7.30991 2.66335 7.129 2.62687 7.02045 2.51741L6.94809 2.40796C6.58626 2.00663 6.07971 1.78773 5.53697 1.78773C4.99423 1.78773 4.48768 1.97015 4.08967 2.37148L2.64237 3.79436C1.84636 4.56053 1.81017 5.87396 2.60619 6.67662L2.67855 6.78607C2.7871 6.89552 2.82328 7.07794 2.75092 7.1874C2.67855 7.33333 2.64237 7.44279 2.57001 7.58872C2.49764 7.73466 2.38909 7.80763 2.20818 7.80763H2.09963C1.5569 7.80763 1.05034 7.99005 0.652334 8.39138C0.254326 8.75622 0.0372314 9.267 0.0372314 9.81426L0.00104893 11.8574C-0.0351336 12.9884 0.869429 13.9005 1.99109 13.937H2.09963C2.28055 13.937 2.42528 14.0464 2.46146 14.1924C2.53382 14.3018 2.60619 14.4113 2.64237 14.5572C2.67855 14.7032 2.64237 14.8491 2.53382 14.9585L2.46146 15.0315C2.06345 15.3964 1.84636 15.9071 1.84636 16.4544C1.84636 17.0017 2.02727 17.5124 2.42528 17.9138L3.83639 19.3731C4.59622 20.1758 5.89879 20.2123 6.69481 19.4096L6.80336 19.3366C6.9119 19.2272 7.09282 19.1907 7.27373 19.2637C7.41846 19.3366 7.56319 19.4096 7.7441 19.4461C7.92501 19.5191 8.03356 19.665 8.03356 19.8109V19.9569C8.03356 21.0879 8.93812 22 10.0598 22H12.086C13.2077 22 14.1122 21.0879 14.1122 19.9569V19.8109C14.1122 19.665 14.2208 19.5191 14.3655 19.4461C14.4379 19.4096 14.474 19.4096 14.5464 19.3731C14.7273 19.3002 14.8721 19.3366 14.9806 19.4461L15.053 19.5556C15.4148 19.9569 15.9213 20.1758 16.4641 20.1758C17.0068 20.1758 17.5134 19.9934 17.9114 19.592L19.3587 18.1692C20.1547 17.403 20.1909 16.0896 19.3949 15.2869L19.3225 15.1774C19.2139 15.068 19.1778 14.8856 19.2501 14.7761C19.3225 14.6302 19.3587 14.5207 19.431 14.3748C19.5034 14.2289 19.6481 14.1559 19.7929 14.1559H19.9014H19.9376C21.0231 14.1559 21.9276 13.2803 21.9638 12.1493L22 10.1061C21.9276 9.66833 21.7105 9.12106 21.3487 8.75622ZM20.2632 12.1857C20.2632 12.4046 20.0823 12.5871 19.8652 12.5871H19.7567H19.7205C18.8883 12.5871 18.1285 13.0978 17.839 13.8275C17.8028 13.937 17.7305 14.0464 17.6943 14.1559C17.3686 14.8856 17.5134 15.7977 18.0923 16.3814L18.1647 16.4909C18.3094 16.6368 18.3094 16.8922 18.1647 17.0381L16.7174 18.461C16.6088 18.5705 16.5003 18.5705 16.4279 18.5705C16.3555 18.5705 16.247 18.5705 16.1384 18.461L16.0661 18.3516C15.4872 17.7313 14.6188 17.5489 13.8228 17.9138L13.678 17.9867C12.882 18.3151 12.3755 19.0448 12.3755 19.8839V20.0299C12.3755 20.2488 12.1945 20.4312 11.9775 20.4312H9.95123C9.73414 20.4312 9.55323 20.2488 9.55323 20.0299V19.8839C9.55323 19.0448 9.04667 18.2786 8.25066 17.9867C8.14211 17.9502 7.99738 17.8773 7.88883 17.8408C7.59937 17.6949 7.30991 17.6584 7.02045 17.6584C6.5139 17.6584 6.00734 17.8408 5.60933 18.2421L5.53697 18.2786C5.39224 18.4245 5.13896 18.4245 4.99423 18.2786L3.58312 16.8192C3.47457 16.7098 3.47457 16.6003 3.47457 16.5274C3.47457 16.4544 3.47457 16.3449 3.58312 16.2355L3.65548 16.1625C4.27058 15.5788 4.4515 14.6667 4.12585 13.937C4.08967 13.8275 4.05349 13.7181 3.98112 13.6086C3.69166 12.8425 2.96801 12.2952 2.13582 12.2952H2.02727C1.81017 12.2952 1.62926 12.1128 1.62926 11.8939L1.66544 9.85075C1.66544 9.70481 1.73781 9.63184 1.77399 9.55887C1.81017 9.52239 1.91872 9.44942 2.06345 9.44942H2.172C3.0042 9.4859 3.76403 8.97512 4.08967 8.20895C4.12585 8.0995 4.19822 7.99005 4.2344 7.8806C4.56004 7.15091 4.41531 6.23881 3.83639 5.65506L3.76403 5.54561C3.6193 5.39967 3.6193 5.14428 3.76403 4.99834L5.21133 3.57546C5.31987 3.466 5.42842 3.466 5.50079 3.466C5.57315 3.466 5.6817 3.466 5.79025 3.57546L5.86261 3.68491C6.44153 4.30514 7.30991 4.48756 8.10593 4.1592L8.25066 4.08624C9.04667 3.75788 9.55323 3.02819 9.55323 2.18905V2.04312C9.55323 1.89718 9.62559 1.82421 9.66177 1.75124C9.69796 1.67828 9.8065 1.64179 9.95123 1.64179H11.9775C12.1945 1.64179 12.3755 1.82421 12.3755 2.04312V2.18905C12.3755 3.02819 12.882 3.79436 13.678 4.08624C13.7866 4.12272 13.9313 4.19569 14.0399 4.23217C14.7997 4.59701 15.7042 4.45108 16.3193 3.86733L16.4279 3.79436C16.5726 3.64842 16.8259 3.64842 16.9706 3.79436L18.3818 5.25373C18.4903 5.36318 18.4903 5.47264 18.4903 5.54561C18.4903 5.61857 18.4541 5.72803 18.3818 5.83748L18.3094 5.91045C17.6581 6.45771 17.4772 7.36982 17.7666 8.0995C17.8028 8.20895 17.839 8.31841 17.9114 8.42786C18.2008 9.19403 18.9245 9.74129 19.7567 9.74129H19.8652C20.01 9.74129 20.0823 9.81426 20.1547 9.85075C20.2271 9.88723 20.2632 9.99668 20.2632 10.1426V12.1857Z" fill="#999999"/>
        <path d="M10.9648 6.05664C8.25108 6.05664 6.04395 8.28218 6.04395 11.0185C6.04395 13.7548 8.25108 15.9804 10.9648 15.9804C13.6785 15.9804 15.8856 13.7548 15.8856 11.0185C15.8856 8.28218 13.6785 6.05664 10.9648 6.05664ZM10.9648 14.3386C9.15564 14.3386 7.67216 12.8427 7.67216 11.0185C7.67216 9.19429 9.15564 7.69843 10.9648 7.69843C12.7739 7.69843 14.2574 9.19429 14.2574 11.0185C14.2574 12.8427 12.7739 14.3386 10.9648 14.3386Z" fill="#999999"/>
        </svg>

      </button>
      {modalOpen && (
        <div
          className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
        >
          <div
            ref={modal}
            className="relative md:px-9 w-full max-w-lg rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:pt-16 md:pb-10"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4"
            >
            <img src={icon_close} />  
            </button>

            <h3 className="pb-10 text-xl font-bold text-black dark:text-white sm:text-2xl">
              비밀번호 확인
            </h3>

            <div className="mb-2">
              <label className="mb-2 block font-bold text-md text-black text-left dark:text-white">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="가입하신 비밀번호를 입력하세요"
                  className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                <span
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.2234 17.2559C4.89521 17.2559 1.26815 11.3496 1.1201 11.0996C1.00907 10.9121 1.00907 10.6621 1.1201 10.4746C1.26815 10.2246 4.89521 4.34961 12.2234 4.34961C19.5515 4.34961 23.1786 10.2246 23.3266 10.4746C23.4377 10.6621 23.4377 10.9121 23.3266 11.0996C23.1786 11.3496 19.5515 17.2559 12.2234 17.2559ZM2.8226 10.7871C3.63684 11.9434 6.81978 15.8496 12.2234 15.8496C17.6269 15.8496 20.8099 11.9434 21.6241 10.7871C20.8099 9.63086 17.6269 5.72461 12.2234 5.72461C6.81978 5.72461 3.63684 9.63086 2.8226 10.7871Z" fill="#999999"/>
                  <path d="M12.2234 13.4434C10.4839 13.4434 9.07744 12.2559 9.07744 10.7871C9.07744 9.31836 10.4839 8.13086 12.2234 8.13086C13.9629 8.13086 15.3693 9.31836 15.3693 10.7871C15.3693 12.2559 13.9629 13.4434 12.2234 13.4434ZM12.2234 9.53711C11.4091 9.53711 10.7429 10.0996 10.7429 10.7871C10.7429 11.4746 11.4091 12.0371 12.2234 12.0371C13.0376 12.0371 13.7038 11.4746 13.7038 10.7871C13.7038 10.0996 13.0376 9.53711 12.2234 9.53711Z" fill="#999999"/>
                  </svg>

                </span>
              </div>
              {error && <p className="text-xs text-right text-red mt-2">{error}</p>} {/* 에러 메시지 */}
              <div className="text-left mt-2">
                <p className="text-xs text-subgray dark:text-gray-400 mt-1">
                  ※ 개인정보 보호를 위해 비밀번호를 다시 한 번 확인합니다.
                </p>
                <p className="text-xs text-subgray dark:text-gray-400 mt-1">
                  ※ 타인에게 비밀번호가 노출되지 않도록 주의해 주세요.
                </p>
              </div>
            </div>

            <div className="mx-6 mt-6 flex flex-wrap">
              <div className="2xsm:w-1/2 w-full px-3">
                <button
                  onClick={closeModal}
                  className="block w-full rounded-full border border-white bg-butgray p-[9px] text-sm text-center font-medium text-black transition hover:bg-gray"
                >
                  뒤로가기
                </button>
              </div>
              <div className="2xsm:w-1/2 w-full px-3">
                <button
                  onClick={handlePasswordCheck} // 비밀번호 확인 함수 호출
                  className="block w-full rounded-full border border-black bg-black p-[9px] text-sm text-center font-medium text-white transition hover:bg-opacity-90"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalPassword;
