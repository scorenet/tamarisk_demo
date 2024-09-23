import React, { useState, useEffect, useRef } from 'react';
import icon_close from "../../images/icon/icon-close.svg"
import icon_delete from "../../images/icon/icon-delete.svg"

interface User {
  id: string;
  date: string;
  type: string;
  content: string;
  status: string;
}

interface ModalInquiryModifyProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
  onDelete: (userId: string) => void; // 삭제 함수 추가
}

const ModalInquiryModify: React.FC<ModalInquiryModifyProps> = ({ user, onClose, onSave, onDelete }) => {
  const [updatedContent, setUpdatedContent] = useState(user.content);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modal = useRef<any>(null);

  const handleSave = () => {
    const updatedUser = { ...user, content: updatedContent };
    onSave(updatedUser);
  };

  // 모달 외부 클릭 시 모달 닫기
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (modalOpen && modal.current && !modal.current.contains(event.target as Node)) {
        setModalOpen(false);
      }
    };
    document.addEventListener('mousedown', clickHandler);
    return () => document.removeEventListener('mousedown', clickHandler);
  }, [modalOpen]);
  

  // Esc 키 입력 시 모달 닫기
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // 상태에 따른 아이콘 색상 설정
  const iconColor = user.status === '응답완료' ? '#DADADA' : '#00B9F0';
  const contentTextColor = user.status === '응답완료' ? 'text-[#DADADA]' : 'text-black dark:text-white';

  return (
    <div 
    ref={modal}
    onFocus={() => setModalOpen(true)}
    onBlur={() => setModalOpen(false)}
    className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-90">
      <div ref={modalRef} className="relative w-full max-w-lg rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-9 md:pt-16 md:pb-10">
        {/* 모달 상단 타이틀과 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <img src={icon_close} />
        </button>

        <h3 className="pb-10 text-xl font-bold text-black dark:text-white sm:text-2xl">
          문의하기
        </h3>

        {/* 문의유형 */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label className="block font-bold text-md text-black dark:text-white">문의유형</label>
            <div className="flex items-center">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <circle cx="4" cy="4" r="4" fill={iconColor} />
              </svg>
              <span className="text-black dark:text-white mr-2">{user.status}</span>
              <button
                onClick={() => onDelete(user.id)}
                className="ml-3 flex items-center text-black hover:text-graydark"
              >
                <img src={icon_delete} />
                삭제하기
              </button>
            </div>
          </div>
          <div className="relative">
            <p className="mt-2 px-4 p-2 text-black text-left bg-[#EFEFEF] border border-[#EFEFEF] rounded">{user.type}</p>
          </div>
        </div>


        {/* 문의내용 */}
        <div className="mb-4">
          <div className="flex">
            <label className="block font-bold text-md text-black text-left dark:text-white">문의내용</label>
          </div>
          <div className="relative mt-2">
            {user.status === '응답대기' ? (
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="px-4 w-full h-24 rounded-lg border border-[#EFEFEF] bg-white py-2 px-3 text-black outline-none focus:border-gray-400 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
              />
            ) : (
              <textarea
                value={user.content}
                readOnly
                className={`px-4 w-full h-24 rounded-lg border border-[#EFEFEF] bg-gray-100 py-2 px-3 ${contentTextColor} outline-none dark:bg-gray-800`}
              />
            )}
          </div>
        </div>

        {/* 버튼들 */}
        <div className="mx-6 mt-6 flex flex-wrap">
          {user.status === '응답대기' && (
            <>
              <div className="2xsm:w-1/2 w-full px-3">
                <button
                  onClick={onClose}
                  className="block w-full rounded-full border border-white bg-butgray p-[9px] text-sm text-center font-medium text-black transition hover:bg-gray"
                >
                  뒤로가기
                </button>
              </div>
              <div className="2xsm:w-1/2 w-full px-3">
                <button
                  onClick={handleSave}
                  className="block w-full rounded-full border border-black bg-black p-[9px] text-sm text-center font-medium text-white transition hover:bg-gray"
                >
                  수정하기
                </button>
              </div>
            </>
          )}
          {user.status === '응답완료' && (
            <div className="2xsm:w-full w-full px-3">
              <button
                onClick={onClose}
                className="block w-full rounded-full border border-white bg-butgray p-[9px] text-sm text-center font-medium text-black transition hover:bg-gray"
              >
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalInquiryModify;
