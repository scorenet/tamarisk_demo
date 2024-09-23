import React, { useState, useEffect } from 'react';
import "../../css/TableProduct.css";
import "../../css/scroller.css";

interface ProductData {
  id: string;
  productName: string;
  reduction: string;
  unit: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
}

interface TableProductProps {
  products: ProductData[];
  onTotalSumChange: (totalSum: number) => void;
}

const TableProduct: React.FC<TableProductProps> = ({ products, onTotalSumChange }) => {
  const [tableData, setTableData] = useState<{ [productId: string]: number[] }>({});

  useEffect(() => {
    if (products.length > 0) {
      const initialData = products.reduce((acc, product) => {
        acc[product.id] = [
          product.jan, product.feb, product.mar, product.apr, product.may,
          product.jun, product.jul, product.aug, product.sep, product.oct,
          product.nov, product.dec
        ]; // 각 제품의 월별 데이터로 초기화
        return acc;
      }, {} as { [productId: string]: number[] });
      setTableData(initialData);
    }
  }, [products]);

  const handleInputChange = (productId: string, monthIndex: number, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setTableData(prevData => ({
      ...prevData,
      [productId]: prevData[productId].map((val, idx) => (idx === monthIndex ? numericValue : val)),
    }));
  };

  const calculateQuarterSum = (productId: string, quarter: number) => {
    const startMonth = (quarter - 1) * 3;
    return tableData[productId]?.slice(startMonth, startMonth + 3).reduce((sum, val) => sum + val, 0) || 0;
  };

  const calculateTotalSum = (productId: string) => {
    return tableData[productId]?.reduce((sum, val) => sum + val, 0) || 0;
  };

  const calculateTotalSumWithReduction = (productId: string, reduction: number) => {
    return tableData[productId]?.reduce((sum, val) => sum + val * reduction, 0) || 0;
  };

  useEffect(() => {
    const totalSum = products.reduce((total, product) => {
      const productTotal = calculateTotalSumWithReduction(product.id, parseFloat(product.reduction));
      return total + productTotal;
    }, 0);

    onTotalSumChange(totalSum);
  }, [tableData, products, onTotalSumChange]);

  // 빈 열을 추가하는 함수
  const getEmptyColumns = (productCount: number) => {
    const minColumns = 4; // 최소 3개의 열을 유지
    if (productCount < minColumns) {
      return Array(minColumns - productCount).fill(null);
    }
    return [];
  };

  return (
    <div className="overflow-x-auto pb-4 custom-scrollbar">
      <table className="min-w-full table-auto border-collapse border border-borgray">
        <thead>
          <tr>
            <th className="w-head sticky left-0 border border-borgray dark:bg-form-input">월/제품</th>
            {products.map(product => (
              <th key={product.id} className="w-body text-center border border-borgray dark:bg-form-input">{product.productName}</th>
            ))}
            {getEmptyColumns(products.length).map((_, index) => (
              <th key={`empty-${index}`} className="w-body border border-borgray dark:bg-form-input"></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 12 }, (_, monthIndex) => (
            <tr key={monthIndex}>
              <td className="w-head sticky left-0 font-bold text-black text-center bg-white border-b border-borgray dark:bg-transparent dark:text-white">{`${monthIndex + 1}월`}</td>
              {products.map(product => (
                <td key={product.id} className="w-body border border-borgray">
                  <div className="flex items-center justify-center">
                    <input
                      type="float"
                      value={tableData[product.id]?.[monthIndex] || 0}
                      onChange={e => handleInputChange(product.id, monthIndex, e.target.value)}
                      className="text-center bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      size={String(tableData[product.id]?.[monthIndex] || 0).length}
                      style={{ width: `${String(tableData[product.id]?.[monthIndex] || 0).length + 1}ch` }}
                    />
                    <span className="text-textgray">{product.unit}</span>
                  </div>
                </td>
              ))}
              {getEmptyColumns(products.length).map((_, index) => (
                <td key={`empty-body-${index}`} className="w-body border border-borgray"></td>
              ))}
            </tr>
          ))}

          {[1, 2, 3, 4].map(quarter => (
            <tr key={quarter}>
              <td className="w-head sticky left-0 text-black text-center font-bold bg-butgray border-b border-borgray dark:bg-bodydark1 dark:border-white">{`${quarter}분기`}</td>
              {products.map(product => (
                <td key={product.id} className="w-body pl-1.5 text-center bg-butgray border border-borgray dark:bg-bodydark1 dark:border-white dark:text-black">
                  {calculateQuarterSum(product.id, quarter).toLocaleString()} {product.unit}
                </td>
              ))}
              {getEmptyColumns(products.length).map((_, index) => (
                <td key={`empty-quarter-${index}`} className="w-body border border-borgray bg-butgray dark:bg-bodydark1 dark:border-white"></td>
              ))}
            </tr>
          ))}

          <tr>
            <td className="w-head sticky left-0 text-center text-white font-bold bg-tablegray border border-borgray dark:bg-bodydark2">Total</td>
            {products.map(product => (
              <td key={product.id} className="w-body pl-1.5 text-center text-white font-bold bg-tablegray border border-borgray dark:bg-bodydark2">
                {calculateTotalSum(product.id).toLocaleString()} {product.unit}
              </td>
            ))}
            {getEmptyColumns(products.length).map((_, index) => (
              <td key={`empty-total-${index}`} className="w-body border border-borgray bg-tablegray dark:bg-bodydark2"></td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableProduct;
