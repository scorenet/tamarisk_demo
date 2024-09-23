import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import ModalInquiry from '../../components/Modals/ModalInquiry';

const Unsubscribe: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 관리

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleUnsubscribe = () => {
    if (isChecked) {
      alert('회원탈퇴가 진행되었습니다.');
      // 회원탈퇴 로직 추가
    } else {
      alert('안내 사항에 동의해주세요.');
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setModalOpen(false); // 모달 닫기
  };

  const handleInquirySubmit = (data: { date: string; type: string; content: string; status: string }) => {
    console.log('문의 데이터 제출됨:', data);
    handleCloseModal();
  };

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-10">
          <h2 className="font-bold text-black text-xl dark:text-white">회원탈퇴</h2>
        </div>

        <div className="items-center px-4 pt-4">
          <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-10">
            <p className="font-bold text-primary text-md font-bold mb-4">회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.</p>
            <p className="mb-2 text-sm font-bold text-black">1) 탈퇴 후 회원정보 및 서비스의 이용 기록은 모두 삭제됩니다.</p>

            <ul className="list-disc text-xs pl-5 mb-6">
              <li>회원정보 및 메일 서비스 이용기록은 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.</li>
              <li>삭제되는 내용을 확인하시고 필요한 데이터는 미리 백업을 해주세요. </li>
              <li>
                또는 회원 마스터 아이디의 변경을 원하시는 경우 에코에셋에{' '}
                <button className="text-primary underline" onClick={handleOpenModal}>
                  문의하기
                </button>
                로 연락주시면 변경해드리겠습니다.
              </li>
            </ul>

            <table className="min-w-1/2 my-6 table-auto text-xs test-gray6 border-collapse">
              <tbody>
                <tr>
                  <td className="px-6 py-2 font-bold bg-[#FBFBFB] w-1/4">아이디</td>
                  <td className="px-6 py-2">아이디로 사용하신 이메일 계정 삭제</td>
                </tr>
                <tr>
                  <td className="px-6 py-2 font-bold bg-[#FBFBFB]">프리미엄 멤버십</td>
                  <td className="px-6 py-2">프리미엄 멤버십으로 이용하던 모든 서비스 등</td>
                </tr>
                <tr>
                  <td className="px-6 py-2 font-bold bg-[#FBFBFB]">배출원 / 배출항목</td>
                  <td className="px-6 py-2">저장한 배출원 및 배출항목</td>
                </tr>
                <tr>
                  <td className="px-6 py-2 font-bold bg-[#FBFBFB]">탄소 배출량 데이터</td>
                  <td className="px-6 py-2">관리 및 저장한 탄소 배출량 데이터 및 연간 탄소배출량 리포트 등</td>
                </tr>
              </tbody>
            </table>

            <p className="mb-2 text-sm font-bold text-black">2) 탈퇴 후에도 문의하신 내용이나 이용했던 내역은 그대로 남아 있습니다.</p>

            <ul className="list-disc text-xs pl-5 mb-6">
              <li>회원이었던 당시에 문의하셨던 내용이나 회원으로 이용했던 내역(프리미엄 멤버십 포함) 등의 기록은 삭제되지 않습니다. </li>
              <li>에코에셋의 향후 업데이트 및 고도화에 참고하는 자료로 이용됩니다. </li>
              <li>특별히 삭제를 원하시는 경우 에코에셋에 문의하기로 연락주시면 삭제해드리겠습니다. </li>
            </ul>

            <p className="mb-2 text-sm font-bold text-black">3) 탈퇴 후에는 에코에셋에서 제공하는 서비스를 더 이상 이용하실 수 없습니다.</p>

            <ul className="list-disc text-xs pl-5 mb-4">
              <li>
                에코에셋에서 제공하는 서비스와 관련한 약관 및 환불정책 등은{' '}
                <a href="#" className="text-primary underline">
                  사이트 이용약관
                </a>{' '}
                및{' '}
                <a href="#" className="text-primary underline">
                  개인정보처리방침
                </a>
                에서 확인할 수 있습니다.
              </li>
            </ul>
          </div>
        </div>

        <div className="items-center px-4 pt-6">
          <div className="flex px-4 pb-6 sm:px-6 xl:px-10">
            <input
              type="checkbox"
              id="agreement"
              className="flex w-4 h-4"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="agreement" className="flex ml-2 text-xs text-gray-700 dark:text-gray-300">
              안내 사항을 모두 확인했으며, 이에 동의합니다.
            </label>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleUnsubscribe}
              className={`w-60 h-10 mb-6 rounded-full text-[#999999] hover:bg-gray ${
                isChecked ? 'bg-primary text-white' : 'bg-butgray cursor-not-allowed'
              }`}
              disabled={!isChecked}
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </div>

      {/* ModalInquiry 모달 */}
      {isModalOpen &&  
        <ModalInquiry
          modalOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleInquirySubmit}
        />}
    </DefaultLayout>
  );
};

export default Unsubscribe;
