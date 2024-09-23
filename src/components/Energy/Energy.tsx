import React, { useState } from 'react';
import PlusCardEnergy from '../Cards/PlusCardEnergy';
import ModalPlusEnergy from '../Modals/ModalPlusCardEnergy';
import PlusButton from '../Cards/PlusButton';
import Pagination from '../Paginations/Pagination';
import IconPlus from '../../images/icon/icon-plus.svg';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import CardButton from '../Button/CardButton';
import ListButton from '../Button/ListButton';
import TableDefault from '../Tables/TableDefault';

interface EnergyData {
  id: string;
  mainCategory: string;
  energyName: string;
}

const Energy: React.FC = () => {
  const [products, setProducts] = useState<EnergyData[]>([
    {
      id: '10002001',
      energyName: '청주 창고1',
      mainCategory: '태양광 발전',
    },
    {
      id: '10002002',
      energyName: '안성 공장',
      mainCategory: '태양광 발전',
    },
    {
      id: '10002003',
      energyName: '구미 사업장',
      mainCategory: '태양광 발전',
    },
    {
      id: '10002004',
      energyName: '서울사무소',
      mainCategory: '태양광 발전',
    },
    {
      id: '10002005',
      energyName: '춘천 발전소',
      mainCategory: '풍력 발전',
    },
    {
      id: '10002006',
      energyName: '남해 발전소',
      mainCategory: '풍력 발전',
    },
  ]);

  // 카테고리 추가
  const mainCategories = ['태양광 발전', '풍력 발전']; // 메인 카테고리

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<EnergyData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list'); // 뷰 모드 상태 추가
  const navigate = useNavigate();

  const productsPerPage = 6; // 카드 뷰용
  const listProductsPerPage = 10; // 리스트 뷰용

  // 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null); // 편집 모드 초기화
  };

  // 에너지 저장 함수
  const handleSaveProduct = (data: Omit<EnergyData, 'id'>) => {
    if (editingProduct) {
      // 수정 모드일 때
      setProducts(products.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...data } 
          : product
      ));
    } else {
      // 새 에너지 추가 모드일 때
      const newProduct: EnergyData = {
        id: Date.now().toString(), // 새로운 ID 생성
        ...data // 전달받은 데이터
      };
      // 새로 등록된 에너지를 배열의 맨 앞에 추가
      setProducts([newProduct, ...products]);
    }
    handleCloseModal(); // 모달 닫기
  };

  // 에너지 수정 함수
  const handleEditProduct = (product: EnergyData) => {
    setEditingProduct(product); // 수정할 에너지를 상태로 설정
    setIsModalOpen(true); // 모달 열기
  };

  // 에너지 삭제
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // 페이지 변경 함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 에너지명을 클릭하면 EnergyDataManage로 전환하는 함수
  const handleProductClick = (product: EnergyData) => {
    navigate('/renewable-energy/data', { state: { products } });
  };

  const handleManagerIconClick = (rowData: EnergyData, action?: string) => {
    if (action === 'Action 1') {
      handleEditProduct(rowData); // 에너지 수정
    } else if (action === 'Action 2') {
      handleDeleteProduct(rowData.id); // 에너지 삭제
    }
  };

  // 현재 페이지에 맞는 에너지 목록 가져오기
  let currentProducts: EnergyData[] = [];

  if (viewMode === 'card') {
    // 카드 뷰: 첫 페이지는 5개의 에너지, 2번째 페이지부터 6번째 에너지부터 표시
    if (currentPage === 1) {
      currentProducts = products.slice(0, productsPerPage - 1); // 첫 페이지에 5개 표시
    } else {
      const indexOfFirstProduct = (currentPage - 1) * productsPerPage - 1;
      const indexOfLastProduct = Math.min(indexOfFirstProduct + productsPerPage, products.length);
      currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    }
  } else {
    // 리스트 뷰: 한 페이지당 10개의 에너지 표시
    const indexOfLastProduct = currentPage * listProductsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - listProductsPerPage;
    currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  }

  const totalPages = Math.ceil(products.length / (viewMode === 'card' ? productsPerPage - 1 : listProductsPerPage));

  // CardButton을 클릭하면 카드 뷰로 전환
  const handleCardView = () => {
    setViewMode('card');
  };

  // ListButton을 클릭하면 리스트 뷰로 전환
  const handleListView = () => {
    setViewMode('list');
  };

  // TableDefault 컴포넌트의 columns 설정
  const columns = [
    { name: '카테고리', key: 'mainCategory' },
    { name: '재생에너지 발전소명', key: 'energyName' }
  ];

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10 min-h-[84vh] relative"> {/* 페이지 전체를 화면 크기에 맞춤 */}
        <div className="flex-grow rounded-[8px] border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap justify-between border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
            <h1 className="font-bold text-xl text-black dark:text-white">재생에너지 관리</h1>
            <div className="flex flex-wrap justify-center items-center gap-1">
              <CardButton isActive={viewMode === 'card'} onClick={handleCardView} />
              <ListButton isActive={viewMode === 'list'} onClick={handleListView} />
            </div>
          </div>

          <div className="p-4 px-9 relative">
            {viewMode === 'card' ? (
              <div className="grid grid-cols-1 justify-center xl:grid-cols-2 gap-4">
                {currentPage === 1 && (
                  <PlusButton onClick={handleOpenModal}>
                    <img src={IconPlus} alt="Plus Icon" />
                    <span>에너지 등록하기</span>
                  </PlusButton>
                )}
                {currentProducts.map((product) => (
                  <PlusCardEnergy
                    key={product.id}
                    energyId={product.id}
                    energyName={product.energyName}
                    mainCategory={product.mainCategory}
                    onEdit={() => handleEditProduct(product)}
                    onDelete={() => handleDeleteProduct(product.id)}
                    onEnergyClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            ) : (
              <>
                <TableDefault
                  columns={columns}
                  data={currentProducts} // 리스트 뷰의 currentProducts 전달
                  showIcon={true} // 아이콘 활성화
                  onIconClick={handleManagerIconClick} // 아이콘 클릭 시 호출
                />
                <div className="flex items-center justify-center">
                  <div className="text-center text-lg">
                    <button
                      className="flex items-center justify-center text-[#999999] px-6 text-md hover:text-graydark transition"
                      onClick={handleOpenModal}  // 클릭 시 모달 열기
                    >
                      <img src={IconPlus} className="mr-3" alt="Plus Icon" />
                      에너지 등록하기
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 페이지네이션 */}
          <div className="w-full p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        {isModalOpen && (
        <ModalPlusEnergy
            title="재생에너지 수정"
            mainCategories={mainCategories}  // mainCategories로 전달
            existingData={{
                energyName: editingProduct?.energyName || '',  // editingProduct가 있을 경우 energyName 사용
                mainCategory: editingProduct?.mainCategory || '',  // editingProduct가 있을 경우 mainCategory 사용
            }}
            onClose={handleCloseModal}
            onSave={(data: { energyName: string; mainCategory: string }) => handleSaveProduct(data)}  // 타입에 맞게 수정
            />
        )}
      </div>
    </DefaultLayout>
  );
};

export default Energy;
