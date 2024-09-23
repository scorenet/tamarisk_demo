import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import TableProduct from '../Tables/TableProductData';
import DropdownsYear from '../Dropdowns/DropdownsYear';

const ProductDataManage: React.FC = () => {
  const location = useLocation();

  // 제품 정보 (제품명, 감축량, 단위 정보 등)
  const productInfo = [
    { id: '10001001', productName: '청소기', reduction: '5', unit: 'kg' },
    { id: '10001002', productName: '세탁기', reduction: '3', unit: 'ea' },
  ];

  // 연도별 월별 데이터만 따로 관리
  const dummyYearlyData = {
    2023: {
      '10001001': { jan: 50, feb: 23, mar: 12, apr: 10, may: 5, jun: 4, jul: 6, aug: 11, sep: 7, oct: 9, nov: 12, dec: 20 },
      '10001002': { jan: 30, feb: 15, mar: 9, apr: 8, may: 3, jun: 2, jul: 4, aug: 6, sep: 5, oct: 7, nov: 8, dec: 10 }
    },
    2022: {
      '10001001': { jan: 40, feb: 20, mar: 10, apr: 8, may: 6, jun: 5, jul: 7, aug: 10, sep: 6, oct: 8, nov: 10, dec: 18 },
      '10001002': { jan: 25, feb: 13, mar: 7, apr: 6, may: 2, jun: 2, jul: 3, aug: 5, sep: 4, oct: 6, nov: 7, dec: 9 }
    }
  };

  const [totalCO2Reduction, setTotalCO2Reduction] = useState(0);
  const [savedCO2Reduction, setSavedCO2Reduction] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2023); // Default year
  const [products, setProducts] = useState<any[]>([]); // 현재 선택된 연도에 따른 제품 데이터
  const [isFirstSave, setIsFirstSave] = useState(true); // 첫 저장 여부 확인을 위한 상태

  // 연도와 제품 정보를 병합하여 최종 데이터를 생성하는 함수
  const mergeProductWithYearlyData = (year: number) => {
    return productInfo.map(product => {
      const yearlyData = dummyYearlyData[year]?.[product.id] || {
        jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0
      }; // 연도별 데이터가 없을 경우 빈 데이터로 처리
      return { ...product, ...yearlyData };
    });
  };

  const handleTotalSumChange = (totalSum: number) => {
    setTotalCO2Reduction(totalSum);
  };

  const handleSaveClick = () => {
    setSavedCO2Reduction(totalCO2Reduction);
    console.log('Total CO2 Reduction saved:', totalCO2Reduction);
  };

  // 컴포넌트가 처음 마운트될 때 한 번만 자동 저장
  useEffect(() => {
    if (isFirstSave && totalCO2Reduction !== 0) {
      handleSaveClick();
      setIsFirstSave(false); // 자동 저장 후 플래그를 false로 설정하여 이후 자동 저장 방지
    }
  }, [totalCO2Reduction, isFirstSave]);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setProducts(mergeProductWithYearlyData(year)); // 선택된 연도에 따라 병합된 데이터 설정
    console.log('Selected Year:', year);
  };

  // 초기 데이터 설정
  useEffect(() => {
    setProducts(mergeProductWithYearlyData(selectedYear));
  }, [selectedYear]);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10 relative">
        <div className="flex-grow border border-stroke rounded-[8px] bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
            <h1 className="font-bold text-xl text-black dark:text-white">제품 데이터 관리</h1>
            <DropdownsYear onYearSelect={handleYearSelect} />
          </div>

          <div className="flex items-center justify-between border border-stroke rounded-[8px] mx-9 m-4 px-4 py-1 dark:border-white sm:px-6 xl:px-9">
            <h1 className="font-bold text-lg text-black dark:text-white">총 탄소 감축량</h1>
            <h1 className="font-bold text-lg text-black dark:text-white">- {savedCO2Reduction.toLocaleString()} tCO2e</h1>
          </div>

          <div className="items-center px-9">
            {products && products.length > 0 ? (
              <div className="overflow-x-auto">
                <TableProduct products={products} onTotalSumChange={handleTotalSumChange} />
              </div>
            ) : (
              <p>전달된 제품 데이터가 없습니다.</p>
            )}
          </div>
          <div className="mx-6 my-1 mb-5 flex justify-end">
            <div className="w-full px-3 sm:w-auto">
              <button
                onClick={handleSaveClick}
                className="block w-[172px] rounded-full border border-black bg-black p-[9px] text-sm text-center font-medium text-white transition hover:bg-opacity-90"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductDataManage;
