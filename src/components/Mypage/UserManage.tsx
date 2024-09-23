import React, { useEffect, useState } from 'react';
import TableFive from '../Tables/TableDefault';
import ModalUserManage from '../Modals/ModalUserManage';
import { Link } from 'react-router-dom'; 
import IconPlus from '../../images/icon/icon-plus.svg'

interface ManagerData {
  id: string;
  num: string;
  role: string;
  name: string;
  email: string;
  time: string;
  password: string;  
}

const UserManage: React.FC = () => {
  const [ManagerData, setManagerData] = useState<ManagerData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<ManagerData | null>(null);

  const column2 = [
    { name: '연번', key: 'num' },
    { name: '권한', key: 'role' },
    { name: '담당자명', key: 'name' },
    { name: '아이디', key: 'email' },
    { name: '최종접속시간', key: 'time' },
  ];

  const fetchManagerData = async (): Promise<ManagerData[]> => {
    return new Promise<ManagerData[]>((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', num: '1', role: 'CEO', name: '홍길동', email: 'hong@company.com', password: 'password1', time: '2024-09-01 10:00' },
          { id: '2', num: '2', role: '대리', name: '이영희', email: 'lee@company.com', password: 'password2', time: '2024-09-01 11:00' },
          // More data can be added here...
        ]);
      }, 1000);
    });
  };

  const handleManagerIconClick = (rowData: ManagerData, action?: string) => {
    if (action === 'Action 1') {
        // 수정하기 액션
        setSelectedData(rowData);
        setIsModalOpen(true);
    } else if (action === 'Action 2') {
        // 삭제하기 액션
        const confirmed = window.confirm('정말로 삭제하시겠습니까?');
        if (confirmed) {
            setManagerData((prevData) => prevData.filter((data) => data.id !== rowData.id));
        }
    }
  };


  useEffect(() => {
    const loadData = async () => {
      const Manager = await fetchManagerData();
      setManagerData(Manager);
    };

    loadData();
  }, []);

  const handleModalSubmit = (formData: FormData) => {
    const newData = {
      id: selectedData ? selectedData.id : (ManagerData.length + 1).toString(),
      num: selectedData ? selectedData.num : (ManagerData.length + 1).toString(),
      role: formData.get('role') as string,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string, 
      time: new Date().toLocaleString(),
    };

    if (selectedData) {
      setManagerData((prevData) =>
        prevData.map((data) => (data.id === selectedData.id ? newData : data))
      );
    } else {
      setManagerData((prevData) => [...prevData, newData]);
    }

    setIsModalOpen(false);
    setSelectedData(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  return (
    <div className="rounded-[8px] border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-10">
        <h3 className="font-bold text-black text-xl dark:text-white">담당자 관리</h3>
      </div>
      <div className="items-center px-9 p-4">
        <TableFive columns={column2} data={ManagerData} showIcon={true} onIconClick={handleManagerIconClick} />
      </div>
      <div className="flex items-center justify-center pb-10">
        <div className="text-center text-lg">
          <button
            className="flex items-center justify-center text-[#999999] px-6 text-md hover:text-graydark transition"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={IconPlus} className='mr-3'/>
            담당자 등록하기
          </button>
        </div>
      </div>
      {isModalOpen && (
        <ModalUserManage
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          selectedData={selectedData || undefined} 
        />
      )}
      <div className="px-4 py-4 sm:px-6 xl:px-10">
        <Link
            to="/Unsubscribe"
            className="flex font-bold text-[#999999] text-md dark:text-white gap-1">
            <span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.875 0.5625H9.40625C10.2187 0.5625 10.9062 1.25 10.9062 2.0625V4.21875C10.9062 4.59375 10.5938 4.90625 10.2188 4.90625C9.84375 4.90625 9.5 4.59375 9.5 4.21875V2.03125C9.5 1.96875 9.46875 1.9375 9.40625 1.9375H5.875C5.125 1.9375 4.53125 2.53125 4.53125 3.28125V16.6875C4.53125 17.4375 5.125 18.0313 5.875 18.0313H9.40625C9.46875 18.0313 9.5 18 9.5 17.9375V15.7813C9.5 15.4063 9.8125 15.0938 10.2188 15.0938C10.625 15.0938 10.9062 15.4063 10.9062 15.7813V17.9375C10.9062 18.75 10.2187 19.4375 9.40625 19.4375H5.875C4.34375 19.4375 3.125 18.1875 3.125 16.6875V3.3125C3.125 1.78125 4.375 0.5625 5.875 0.5625Z" fill="#999999"/>
              <path d="M14.5 10.6875H8.90625C8.53125 10.6875 8.21875 10.375 8.21875 10C8.21875 9.625 8.53125 9.3125 8.90625 9.3125H14.4687L12.5312 7.34375C12.25 7.0625 12.25 6.625 12.5312 6.34375C12.8125 6.0625 13.25 6.0625 13.5312 6.34375L16.6563 9.53125C16.9375 9.8125 16.9375 10.25 16.6563 10.5313L13.5312 13.7188C13.4062 13.8438 13.2188 13.9375 13.0312 13.9375C12.8438 13.9375 12.6875 13.875 12.5312 13.75C12.25 13.4688 12.25 13.0312 12.5312 12.75L14.5 10.6875Z" fill="#999999"/>
              </svg>
            </span>
            회원탈퇴
        </Link>
      </div>
    </div>
  );
};

export default UserManage;
