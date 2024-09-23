import React from 'react';
import Memberinfo from '../../components/Mypage/Memberinfo';
import MarketingAgree from '../../components/Mypage/MarketingAgree';
import Inquiry from '../../components/Mypage/Inquiry';
import MembershipFee from '../../components/Mypage/MembershipFee';
import DefaultLayout from '../../layout/DefaultLayout';
import UserManage from '../../components/Mypage/UserManage';

const EcoMypage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4 md:gap-4 2xl:gap-4">
        <Memberinfo />
        <MarketingAgree />
        <Inquiry />
        <MembershipFee /> 
        <UserManage />
    </div>
    </DefaultLayout>
  );
};

export default EcoMypage;
