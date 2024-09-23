import React, { useState, useEffect } from 'react';

interface PasswordInputProps {
  onPasswordValid: (isValid: boolean) => void;
  setNewPassword: (password: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onPasswordValid, setNewPassword }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,20}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setNewPassword(value); // 비밀번호를 부모에게 전달

    if (!isValidPassword(value)) {
      setPasswordError('비밀번호는 문자, 숫자, 특수문자를 포함한 10~20자리여야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  useEffect(() => {
    if (isValidPassword(password) && password === confirmPassword) {
      onPasswordValid(true); // 비밀번호가 유효하고 일치할 때 true 전달
    } else {
      onPasswordValid(false); // 비밀번호가 유효하지 않거나 일치하지 않으면 false 전달
    }
  }, [password, confirmPassword, onPasswordValid]);

  return (
    <div>
      <div className="mb-4">
        <label className="mb-2 block font-bold text-md text-black text-left dark:text-white">
          비밀번호 <span className="text-red">*</span>
        </label>
        <input
          type="password"
          placeholder="비밀번호는 대,소문자 특수문자 조합으로 10~20자리로 설정해주세요"
          value={password}
          onChange={handlePasswordChange}
          className="w-full rounded-lg border border-borgray bg-transparent py-[9px] px-6 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        {passwordError && <p className="mt-2 ml-2 text-xs text-left text-red">{passwordError}</p>}
      </div>

      <div className="mb-4">
        <label className="mb-2 block font-bold text-md text-black text-left dark:text-white">
          비밀번호 확인 <span className="text-red">*</span>
        </label>
        <input
          type="password"
          placeholder="사용하실 비밀번호를 확인하세요"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="w-full rounded-lg border border-borgray bg-transparent py-[9px] px-6 text-sm text-black outline-none focus:border-graydark focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        {confirmPasswordError && <p className="mt-2 ml-2 text-xs text-left text-red">{confirmPasswordError}</p>}
      </div>
    </div>
  );
};

export default PasswordInput;
