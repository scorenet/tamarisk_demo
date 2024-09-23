import React, { useState } from 'react';
import PlusCard from '../Cards/PlusCardProduct';
import ModalPlusCard from '../Modals/ModalPlusCardProduct';
import PlusButton from '../Cards/PlusButton';
import Pagination from '../Paginations/Pagination';
import IconPlus from '../../images/icon/icon-plus.svg';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import CardButton from '../Button/CardButton';
import ListButton from '../Button/ListButton';
import TableDefault from '../Tables/TableDefault';

interface ProductData {
  id: string;
  productName: string;
  mainCategory: string;
  subCategory: string;
  reduction: string;
  unit: string;
}

const ProductManage: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([
    {
      id: '10001001',
      productName: '청소기',
      mainCategory: '가전제품',
      subCategory: '청소용품',
      reduction: '5',
      unit: 'kg',
    },
    {
      id: '10001002',
      productName: '세탁기',
      mainCategory: '가전제품',
      subCategory: '세탁용품',
      reduction: '3',
      unit: 'ea',
    },
    {
      id: '10001003',
      productName: '청소기',
      mainCategory: '가전제품',
      subCategory: '청소용품',
      reduction: '5',
      unit: 'kg',
    },
    {
      id: '10001004',
      productName: '세탁기',
      mainCategory: '가전제품',
      subCategory: '세탁용품',
      reduction: '3',
      unit: 'ea',
    },
    {
      id: '10001005',
      productName: '청소기',
      mainCategory: '가전제품',
      subCategory: '청소용품',
      reduction: '5',
      unit: 'kg',
    },
    {
      id: '10001006',
      productName: '청소기',
      mainCategory: '가전제품',
      subCategory: '청소용품',
      reduction: '5',
      unit: 'kg',
    },


  ]);

  // 카테고리 및 단위에 대한 더미 데이터 추가
  const mainCategories = ['가전제품', '가구', '전자기기']; // 메인 카테고리
  const subCategories = ['청소용품', '욕실용품', '세탁용품']; // 서브 카테고리
  const units = ['kg', 'ea']; // 단위

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card'); // 뷰 모드 상태 추가
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

  // 제품 저장 함수 수정
  const handleSaveProduct = (data: Omit<ProductData, 'id'>) => {
    if (editingProduct) {
      // 수정 모드일 때
      setProducts(products.map(product => (product.id === editingProduct.id ? { ...product, ...data } : product)));
    } else {
      // 새 제품 추가 모드일 때
      const newProduct = { id: Date.now().toString(), ...data, unit: data.unit };
      // 새로 등록된 제품을 배열의 맨 앞에 추가
      setProducts([newProduct, ...products]);
    }
    handleCloseModal();
  };

  // 제품 수정 함수 추가
  const handleEditProduct = (product: ProductData) => {
    setEditingProduct(product); // 수정할 제품을 상태로 설정
    setIsModalOpen(true); // 모달을 열기
    console.log('모달 열기 상태 설정됨');
  };

  // 제품 삭제
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // 페이지 변경 함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 제품명을 클릭하면 ProductDataManage로 전환하는 함수
  const handleProductClick = (product: ProductData) => {
    navigate('/product-manager/data', { state: { products } });
  };

  const handleManagerIconClick = (rowData: ProductData, action?: string) => {
    console.log('handleManagerIconClick 호출됨:', rowData, action);
    if (action === 'Action 1') {
      console.log('action이 edit일 때 실행됨');
      handleEditProduct(rowData); // 모달 열림 상태 변경
    } else if (action === 'Action 2') {
      console.log('action이 delete일 때 실행됨');
      handleDeleteProduct(rowData.id);
    }
  };

  // 현재 페이지에 맞는 제품 목록 가져오기
  let currentProducts: ProductData[] = [];

  if (viewMode === 'card') {
    // 카드 뷰: 첫 페이지는 5개의 제품, 2번째 페이지부터 6번째 제품부터 표시
    if (currentPage === 1) {
      currentProducts = products.slice(0, productsPerPage - 1); // 첫 페이지에 5개 표시
    } else {
      const indexOfFirstProduct = (currentPage - 1) * productsPerPage - 1;
      const indexOfLastProduct = Math.min(indexOfFirstProduct + productsPerPage, products.length);
      currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    }
  } else {
    // 리스트 뷰: 한 페이지당 10개의 제품 표시
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
    { name: '대분류', key: 'mainCategory' },
    { name: '중분류', key: 'subCategory' },
    { name: '제품명', key: 'productName',
      render: (rowData: ProductData) => (
        <div
          className="cursor-pointer text-black hover:text-primary"
          onClick={() => handleProductClick(rowData)}
        >
          {rowData.productName}
        </div>
      ),
     },
    { name: '산정단위', key: 'unit' },
    { name: '탄소 감축량', key: 'reduction',
      render: (rowData: ProductData) => (
        <div className={`flex flex-wrap justify-center h-6 rounded-[4px] font-bold text-sm text-white ${rowData.unit === 'ea' ? 'bg-[#00bfff]' : 'bg-[#13C296]'}`}
        >
          - {rowData.reduction} tCO2e
        </div>
      ), 
    },
  ];

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10 min-h-[84vh] relative"> {/* 페이지 전체를 화면 크기에 맞춤 */}
        <div className="flex-grow rounded-[8px] border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap justify-between border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
            <h1 className="font-bold text-xl text-black dark:text-white">제품단위 탄소관리</h1>
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
                    <span>제품 등록하기</span>
                  </PlusButton>
                )}
                {currentProducts.map((product) => (
                  <PlusCard
                    key={product.id}
                    productId={product.id}
                    productName={product.productName}
                    mainCategory={product.mainCategory}
                    subCategory={product.subCategory}
                    unit={product.unit}
                    reduction={product.reduction}
                    onEdit={() => handleEditProduct(product)}
                    onDelete={() => handleDeleteProduct(product.id)}
                    onProductClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            ) : (
              <>
                <TableDefault
                  columns={columns}
                  data={currentProducts} // 리스트 뷰의 currentProducts 전달
                  showIcon={true} // 아이콘을 활성화
                  onIconClick={handleManagerIconClick} // 아이콘 클릭 시 호출
                />
                <div className="flex items-center justify-center">
                  <div className="text-center text-lg">
                    <button
                      className="flex items-center justify-center text-[#999999] px-6 text-md hover:text-graydark transition"
                      onClick={handleOpenModal}  // 클릭 시 모달 열기
                    >
                      <img src={IconPlus} className="mr-3" alt="Plus Icon" />
                      제품 등록하기
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
          <ModalPlusCard
            title={editingProduct ? '제품 수정하기' : '제품 등록하기'}
            onClose={handleCloseModal}
            onSave={handleSaveProduct}
            mainCategories={mainCategories} // 메인 카테고리 전달
            subCategories={subCategories} // 서브 카테고리 전달
            units={units} // 단위 전달
            existingData={editingProduct || undefined}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProductManage;
