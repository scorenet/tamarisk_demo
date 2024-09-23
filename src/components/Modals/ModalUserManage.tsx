import React, { useState, useEffect, useRef } from 'react';
import icon_close from "../../images/icon/icon-close.svg";

interface ModalUserManageProps {
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  selectedData?: {
    role: string;
    name: string;
    email: string;
    password: string;
  };
}

const ModalUserManage: React.FC<ModalUserManageProps> = ({ onClose, onSubmit, selectedData }) => {
  const [formValues, setFormValues] = useState({
    role: selectedData?.role || '',
    name: selectedData?.name || '',
    email: selectedData?.email || '',
    password: selectedData?.password || '',
    confirmPassword: selectedData?.password || '',
  });

  const [errors, setErrors] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (selectedData) {
      console.log('Selected Data:', selectedData);
    }
  }, [selectedData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (validate()) {
      const formData = new FormData();
      formData.append('role', formValues.role);
      formData.append('name', formValues.name);
      formData.append('email', formValues.email);
      formData.append('password', formValues.password);

      onSubmit(formData);
      if (selectedData) {
        console.log('User_Modified');
      } else {
        console.log('User_Created');
      }
  
      onClose(); // 등록, 수정 로그 출력
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (!formValues.role) {
      newErrors.role = '담당자 권한을 선택하세요';
      valid = false;
    } else {
      newErrors.role = '';
    }

    if (!formValues.name) {
      newErrors.name = '담당자명을 입력하세요';
      valid = false;
    } else {
      newErrors.name = '';
    }

    if (!formValues.email) {
      newErrors.email = '아이디를 입력하세요';
      valid = false;
    } else {
      newErrors.email = '';
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/;

    if (!formValues.password) {
      newErrors.password = '비밀번호를 입력하세요';
      valid = false;
    } else if (formValues.password.length < 10 || formValues.password.length > 20) {
      newErrors.password = '비밀번호는 10~20자 사이여야 합니다';
      valid = false;
    } else if (!passwordRegex.test(formValues.password)) {
      newErrors.password = '문자, 숫자, 특수문자가 모두 포함되어야 합니다';
      valid = false;
    } else {
      newErrors.password = '';
    }

    if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
      valid = false;
    } else {
      newErrors.confirmPassword = '';
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <div className="fixed left-0 top-0 z-9999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5">
      <div ref={useRef(null)} className="relative md:px-9 w-full max-w-lg rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:pt-16 md:pb-10">
        <button onClick={onClose} className="absolute top-4 right-4">
          <img src={icon_close} alt="Close" />
        </button>

        <h3 className="pb-10 text-xl font-bold text-black dark:text-white sm:text-2xl">{selectedData ? '담당자 수정하기' : '담당자 등록하기'}</h3>

        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-left font-bold mb-2 text-md text-black dark:text-white">
              담당자 권한 <span className="text-red">*</span>
            </label>
            <select
              name="role"
              value={formValues.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-borgray bg-transparent py-[7px] px-4 text-sm text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white"
            >
              <option value="" disabled>담당자의 권한을 선택하세요</option>
              <option value="데이터매니저">데이터 담당자</option>
              <option value="CEO">CEO 전용</option>
            </select>
            {errors.role && <p className="text-left text-xs text-red">{errors.role}</p>}
          </div>

          <div className="w-1/2 pl-2">
            <label className="block text-left font-bold mb-2 text-md text-black dark:text-white">
              담당자명 <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="담당자명을 입력하세요"
              className="w-full rounded-lg border border-borgray bg-transparent py-[7px] px-4 text-sm text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            {errors.name && <p className="text-left text-xs text-red">{errors.name}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-left font-bold mb-2 text-md text-black dark:text-white">
            아이디 <span className="text-red">*</span>
          </label>
          {selectedData ? (
            <input
              type="text"
              name="email"
              value={formValues.email}
              readOnly
              className="w-full rounded-lg border border-borgray bg-gray py-[7px] px-4 text-sm text-black dark:bg-form-input dark:text-white"
            />
          ) : (
            <input
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              className="w-full rounded-lg border border-borgray bg-transparent py-[7px] px-4 text-sm text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          )}
          {errors.email && <p className="text-left text-xs text-red">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-left font-bold mb-2 text-md text-black dark:text-white">
            비밀번호 <span className="text-red">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="대, 소문자 특수문자 조합으로 10~20자리로 설정해주세요"
            className="w-full rounded-lg border border-borgray bg-transparent py-[7px] px-4 text-sm text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />
          {errors.password && <p className="text-left text-xs text-red">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-left font-bold mb-2 text-md text-black dark:text-white">
            비밀번호 확인 <span className="text-red">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            placeholder="사용하실 비밀번호를 확인하세요"
            className="w-full rounded-lg border border-borgray bg-transparent py-[7px] px-4 text-sm text-black outline-none focus:border-graydark dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />
          {errors.confirmPassword && <p className="text-left text-xs text-red">{errors.confirmPassword}</p>}
        </div>

        <div className="mx-6 mt-6 flex flex-wrap">
          <div className="w-1/2 px-3">
            <button
              onClick={onClose}
              className="block w-full rounded-full border border-white bg-butgray p-[9px] text-sm text-center font-medium text-black transition hover:bg-gray"
            >
              뒤로가기
            </button>
          </div>
          <div className="w-1/2 px-3">
            <button
              onClick={handleSubmit}
              className="block w-full rounded-full border border-black bg-black p-[9px] text-sm text-center font-medium text-white transition hover:bg-opacity-90"
            >
              {selectedData ? '수정하기' : '등록하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUserManage;
