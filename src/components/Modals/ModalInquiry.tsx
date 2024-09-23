import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import icon_close from "../../images/icon/icon-close.svg";

interface ModalInquiryProps {
  onSubmit: (data: { date: string; type: string; content: string; status: string }) => void;
  modalOpen: boolean;
  onClose: () => void;  // 모달을 닫는 함수를 부모로부터 전달받음
}

const ModalInquiry: React.FC<ModalInquiryProps> = ({ onSubmit, modalOpen, onClose }) => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    manager: '',
    email: '',
    phone: '',
    content: '',
  });
  const [errors, setErrors] = useState({
    type: '',
    name: '',
    email: '',
    phone: '',
  });
  const modal = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 폼 데이터 초기화 함수
  const resetFormData = () => {
    setFormData({
      type: '',
      name: '',
      manager: '',
      email: '',
      phone: '',
      content: '',
    });
    setErrors({
      type: '',
      name: '',
      email: '',
      phone: '',
    });
  };

  // 문의 등록 함수
  const submitInquiry = () => {
    if (!formData.type || !formData.name || !formData.email || !formData.phone) {
      setErrors({
        type: formData.type ? '' : '문의유형을 선택하세요',
        name: formData.name ? '' : '기업명을 입력하세요',
        email: formData.email ? '' : '이메일을 입력하세요',
        phone: formData.phone ? '' : '전화번호를 입력하세요',
      });
      return;
    }

    const inquiryData = {
      date: new Date().toISOString().split('T')[0], // 현재 날짜
      type: formData.type,
      content: formData.content || '문의 내용을 입력하지 않았습니다.',
      status: '응답대기', // 기본 상태
    };

    // 부모 컴포넌트로 데이터 전달
    onSubmit(inquiryData);

    // 등록 완료 메시지
    window.alert('문의가 등록되었습니다.');

    // 폼 데이터 초기화
    resetFormData();

    // 모달 닫기
    onClose();
  };

  const modalContent = (
    <div className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
      <div ref={modal} className="relative w-full max-w-lg rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark">
        <button onClick={onClose} className="absolute top-4 right-4">
          <img src={icon_close} alt="close" />
        </button>

        <h3 className="pb-10 text-xl font-bold text-black dark:text-white sm:text-2xl">문의하기</h3>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
              문의유형 <span className="text-red">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
              <option value="" disabled>문의 유형을 선택하세요</option>
              <option value="join">가입문의</option>
              <option value="membership">프리미엄 멤버십</option>
              <option value="issue">오류 및 불편사항</option>
              <option value="etc">기타</option>
            </select>
            {errors.type && <p className="text-left text-xs text-red">{errors.type}</p>}
          </div>

          <div className="flex flex-row space-x-4">
            <div className="w-1/2">
              <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
                기업명 <span className="text-red">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="기업명을 입력하세요"
                className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.name && <p className="text-left text-xs text-red">{errors.name}</p>}
            </div>

            <div className="w-1/2">
              <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">담당자</label>
              <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                placeholder="담당자명을 입력하세요"
                className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-row space-x-4">
            <div className="w-1/2">
              <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">
                이메일 <span className="text-red">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.email && <p className="text-left text-xs text-red">{errors.email}</p>}
            </div>

            <div className="w-1/2">
              <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">전화번호 <span className="text-red">*</span></label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="전화번호를 입력하세요"
                className="w-full rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.phone && <p className="text-left text-xs text-red">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="flex mb-2 block font-bold text-md text-black text-left dark:text-white">문의 내용</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="문의하실 내용을 입력하세요"
              className="w-full min-h-[200px] rounded-lg border border-borgray bg-transparent py-[9px] pl-6 pr-10 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
          </div>
          <div className="flex mt-2">
            <input type="checkbox" className="mr-2 mb-4" />
            <div className='flex-col'>
                <p className="text-left text-xs text-subgray">
                문의하기에 대한 회신 이외에는 개인정보를 사용하지 않습니다.</p>
                <p className="text-left text-xs text-subgray">개인정보 수집에 동의합니다.</p>
            </div>
          </div>

          <div className="flex flex-row justify-between mt-6 mx-6">
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
                onClick={submitInquiry} // 문의 등록 함수 호출
                className="block w-full rounded-full border border-black bg-black p-[9px] text-sm text-center font-medium text-white transition hover:bg-opacity-90"
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return modalOpen ? ReactDOM.createPortal(modalContent, document.body) : null;
};

export default ModalInquiry;
