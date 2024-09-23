import React, { useEffect, useState } from 'react';
import TableFive from '../Tables/TableDefault';
import Pagination from '../Paginations/Pagination';
import { SortIconUp, SortIconDown } from '../../images/icon/icon-sort';
import ModalInquiryModify from '../Modals/ModalInquiryModify'; 

interface User {
  id: string;
  date: string;
  type: string;
  content: string;
  status: string;
}

const Inquiry: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 표시할 항목 수

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key as keyof User] < b[key as keyof User]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key as keyof User] > b[key as keyof User]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const renderColumnHeader = (column: { name: string; key: string; sortable?: boolean }) => (
    <div className="flex items-center justify-center">
      {column.name}
      {column.sortable && (
        <button onClick={() => handleSort(column.key)} className="ml-2">
          {sortConfig?.key === column.key && sortConfig.direction === 'asc' ? (
            <SortIconUp />
          ) : (
            <SortIconDown />
          )}
        </button>
      )}
    </div>
  );

  const columns = [
    {
      name: '날짜',
      key: 'date',
      sortable: true,
      render: (rowData: User) => (
        <span className={rowData.status === '응답완료' ? 'text-[#DADADA]' : ''}>
          {rowData.date}
        </span>
      ),
    },
    {
      name: '문의유형',
      key: 'type',
      sortable: true,
      render: (rowData: User) => (
        <span className={rowData.status === '응답완료' ? 'text-[#DADADA]' : ''}>
          {rowData.type}
        </span>
      ),
    },
    {
      name: '문의내용',
      key: 'content',
      render: (rowData: User) => (
        <span className={rowData.status === '응답완료' ? 'text-[#DADADA]' : ''}>
          {rowData.content}
        </span>
      ),
    },
    {
      name: '상태',
      key: 'status',
      sortable: true,
      render: (rowData: User) => {
        const isCompleted = rowData.status === '응답완료';
        const iconColor = isCompleted ? '#DADADA' : '#00B9F0';
        const textClass = isCompleted ? 'text-[#DADADA]' : 'text-black dark:text-white';

        return (
          <div className={`flex items-center justify-center ${textClass}`}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <circle cx="4" cy="4" r="4" fill={iconColor} />
            </svg>
            <span>{rowData.status}</span>
          </div>
        );
      },
    },
  ];

  const fetchUsersFromDB = async () => {
    return new Promise<User[]>((resolve) => {
      setTimeout(() => {
        const dummyData = [
          { id: '1', date: '2024-08-01', type: '가입문의', content: '회원가입 하고 싶습니다. 어떻게 하면 될까요', status: '응답완료' },
          { id: '2', date: '2024-08-23', type: '프리미엄멤버십', content: '프리미엄 멤버십 문의합니다. 결제 방법 알려주세요', status: '응답대기' },
          // ... 생략된 데이터
        ];
        resolve(dummyData);
      }, 1000);
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const users = await fetchUsersFromDB();
      setData(users);
    };

    loadData();
  }, []);

  const handleIconClick = (rowData: User, action?: string) => {
    if (action === 'Action 1') {
      // 수정하기 액션
      setSelectedUser(rowData);
      setModalOpen(true);
    } else if (action === 'Action 2') {
      // 삭제하기 액션
      const confirmed = window.confirm('정말로 삭제하시겠습니까?');
      if (confirmed) {
        setData((prevData) => prevData.filter((user) => user.id !== rowData.id));
      }
    }
  };

  const handleDelete = (userId: string) => {
    const confirmed = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmed) {
      setData((prevData) => prevData.filter((user) => user.id !== userId));
      setModalOpen(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null); // 모달을 닫을 때 선택된 데이터 초기화
  };

  const handleSave = (updatedUser: User) => {
    setData((prevData) => [
      updatedUser, // 새로운 데이터를 맨 앞에 추가
      ...prevData.filter((user) => user.id !== updatedUser.id), // 기존 데이터를 필터링하여 배열에 추가
    ]);
    closeModal(); // 저장 후 모달 닫기
  };

  // 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="rounded-[8px] border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-10">
        <h3 className="font-bold text-black text-xl dark:text-white">문의하기 내역</h3>
      </div>
      <div className="items-center px-9 p-4">
        <TableFive
          columns={columns.map(column => ({ ...column, name: renderColumnHeader(column) }))}
          data={currentItems}
          showIcon={true}
          onIconClick={handleIconClick} // 아이콘 클릭 시 모달 열기 또는 삭제
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && selectedUser && (
        <ModalInquiryModify
          user={selectedUser}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete} // 삭제 함수 전달
        />
      )}
    </div>
  );
};

export default Inquiry;
