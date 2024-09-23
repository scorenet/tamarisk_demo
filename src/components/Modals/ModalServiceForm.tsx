import React from 'react';
import icon_close from "../../images/icon/icon-close.svg";

interface ModalServiceFormProps {
  title: string;
  isRequired: boolean; // 필수 또는 선택 여부를 동적으로 표시
  content: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmButtonText: string;
  cancelButtonText?: string; // 기본적으로는 '뒤로가기'를 사용하지만 선택사항
}

const ModalServiceForm: React.FC<ModalServiceFormProps> = ({
  title,
  isRequired,
  content,
  onClose,
  onConfirm,
  confirmButtonText,
  cancelButtonText = "뒤로가기",
}) => {
  return (
    <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/70 px-4 py-5">
      <div className="relative w-full max-w-lg rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark">
        <button onClick={onClose} className="absolute top-4 right-4">
          <img src={icon_close} alt="close" />
        </button>

        <h3 className="pb-5 text-xl font-bold text-black dark:text-white sm:text-2xl">
          {isRequired ? "[필수] " : "[선택] "}
          {title}
        </h3>

        <div className="text-left text-sm overflow-auto max-h-[400px] border border-borgray rounded-[8px] p-4 mb-6">
          <p className="leading-relaxed text-justify">{content}</p>
        </div>

        <div className="flex justify-between mt-6 mx-6">
          <div className="w-1/2 px-3">
            <button
              onClick={onClose}
              className="block w-full rounded-full border border-borgray bg-butgray p-3 text-sm text-center font-medium text-black transition hover:bg-gray"
            >
              {cancelButtonText}
            </button>
          </div>
          <div className="w-1/2 px-3">
            <button
              onClick={onConfirm}
              className="block w-full rounded-full border border-black bg-black p-3 text-sm text-center font-medium text-white transition hover:bg-opacity-90"
            >
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalServiceForm;
