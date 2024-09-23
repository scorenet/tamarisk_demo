import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import TableFive from "../../components/Tables/TableDefault";
import PaginationOne from '../../components/Paginations/Pagination';

interface Notice {
  id: string;
  date: string;
  title: string;
  content: string;
}

const Notice: React.FC = () => {
  const [data, setData] = useState<Notice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null); // 선택된 공지를 저장하는 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 표시할 항목 수

  const renderColumnHeader = (column: { name: string; key: string; sortable?: boolean }) => (
    <div className="flex items-center justify-center">
      {column.name}
    </div>
  );

  const columns = [
    {
      name: '연번',
      key: 'id',
    },
    {
      name: '제목',
      key: 'title',
      render: (rowData: Notice) => (
        <button
          onClick={() => handleNoticeClick(rowData)} // 제목 클릭 시 해당 공지 상세 보기
          className="text-black hover:underline"
        >
          {rowData.title}
        </button>
      ),
    },
    {
      name: '첨부파일',
      key: 'content',
      render: (rowData: Notice) => (
        <span>{rowData.content ? 'O' : ''}</span>
      ), // 첨부파일이 있으면 "O", 없으면 빈 칸
    },
    {
      name: '날짜',
      key: 'date',
    },
  ];

  const fetchNoticesFromDB = async () => {
    return new Promise<Notice[]>((resolve) => {
      setTimeout(() => {
        const dummyData = [
          { id: '5', date: '2024-08-01', title: '업데이트 공지', content: '업데이트 관련 공지 내용입니다.' },
          { id: '4', date: '2024-08-23', title: '프리미엄 멤버십 안내', content: '프리미엄 멤버십 안내 내용입니다.' },
          { id: '3', date: '2024-09-01', title: '이용 약관 변경 안내', content: '이용 약관 변경에 대한 내용입니다.' },
          { id: '2', date: '2024-09-10', title: '정기 점검 일정 안내', content: '정기 점검 일정에 관한 공지입니다.' },
          { id: '1', date: '2024-09-15', title: '추가 서비스 업데이트 안내', content: '새로운 서비스 업데이트에 관한 공지입니다.' },
          // 더 많은 데이터를 추가
        ];
        resolve(dummyData);
      }, 1000);
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const notices = await fetchNoticesFromDB();
      setData(notices);
    };

    loadData();
  }, []);

  // 공지 제목 클릭 시 선택된 공지를 상태로 저장하고 타이틀을 변경
  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    document.title = notice.title; // 페이지 타이틀을 공지 제목으로 변경
  };

  // 목록으로 돌아가기
  const handleBackToList = () => {
    setSelectedNotice(null); // 선택된 공지사항을 null로 설정하여 다시 목록을 보여줌
    document.title = '공지사항'; // 타이틀을 기본값으로 되돌림
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <DefaultLayout>
       <div className="flex flex-col gap-10">
          <div className="max-h-[84vh] h-screen rounded-[8px] border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
              <h1 className="font-bold text-xl text-black dark:text-white">
              {selectedNotice ? selectedNotice.title : '공지사항'}</h1>
             {/* 공지 제목이 있으면 해당 제목을, 없으면 기본 공지사항을 표시 */}
          </div>
          
          <div className="items-center px-9 p-4">
            {/* 선택된 공지가 있을 때 상세 내용 표시, 없을 때 테이블 표시 */}
            {selectedNotice ? (
              <div>
              <div className="border-b border-stroke pb-2 dark:border-strokedark">
                <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{selectedNotice.date}</p>
                  <a
                    href="/path/to/download" // 실제 첨부파일 경로로 변경 필요
                    className="text-sm text-primary hover:underline"
                    download
                  >
                    첨부파일 다운로드.pdf
                  </a>
                </div>
                </div>
                  <div className="border-b border-stroke pb-2 dark:border-strokedark my-6">
                    <p className="mt-4 text-justify leading-relaxed pb-6">{selectedNotice.content}</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleBackToList}
                      className="w-60 h-10 mb-6 bg-butgray rounded-full text-[#999999] hover:bg-gray"
                    >
                      뒤로가기
                    </button>
                  </div>
              </div>
            ) : (
              <>
                <TableFive
                  columns={columns.map((column) => ({ ...column, name: renderColumnHeader(column) }))}
                  data={currentItems}
                  showIcon={false}
                />
                <PaginationOne
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Notice;
