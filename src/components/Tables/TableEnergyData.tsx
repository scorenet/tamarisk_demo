import React, { useState, useEffect } from 'react';
import "../../css/TableProduct.css";
import "../../css/scroller.css";

interface EnergyData {
  id: string;
  energyName: string;
  category: string; // 카테고리 필드 추가
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

interface TableEnergyDataProps {
  energyData: EnergyData[];
  onTotalSumChange: (totalSum: number) => void;
}

const TableEnergyData: React.FC<TableEnergyDataProps> = ({ energyData, onTotalSumChange }) => {
  const [tableData, setTableData] = useState<{ [energyId: string]: number[] }>({});

  // 카테고리별로 에너지를 그룹화
  const groupedEnergyData = energyData.reduce((acc, energy) => {
    const category = energy.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(energy);
    return acc;
  }, {} as { [category: string]: EnergyData[] });

  useEffect(() => {
    if (energyData.length > 0) {
      const initialData = energyData.reduce((acc, energy) => {
        acc[energy.id] = [
          energy.jan, energy.feb, energy.mar, energy.apr, energy.may,
          energy.jun, energy.jul, energy.aug, energy.sep, energy.oct,
          energy.nov, energy.dec
        ]; // 각 에너지의 월별 데이터로 초기화
        return acc;
      }, {} as { [energyId: string]: number[] });
      setTableData(initialData);
    }
  }, [energyData]);

  const handleInputChange = (energyId: string, monthIndex: number, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setTableData(prevData => ({
      ...prevData,
      [energyId]: prevData[energyId].map((val, idx) => (idx === monthIndex ? numericValue : val)),
    }));
  };

  const calculateQuarterSum = (energyId: string, quarter: number) => {
    const startMonth = (quarter - 1) * 3;
    return tableData[energyId]?.slice(startMonth, startMonth + 3).reduce((sum, val) => sum + val, 0) || 0;
  };

  const calculateTotalSum = (energyId: string) => {
    return tableData[energyId]?.reduce((sum, val) => sum + val, 0) || 0;
  };

  const calculateCategorySum = (category: string) => {
    return groupedEnergyData[category].reduce((categoryTotal, energy) => {
      const energyTotal = calculateTotalSum(energy.id);
      return categoryTotal + energyTotal;
    }, 0);
  };

  // 총합 계산
  useEffect(() => {
    const totalSum = energyData.reduce((total, energy) => {
      const energyTotal = calculateTotalSum(energy.id);
      return total + energyTotal;
    }, 0);

    onTotalSumChange(totalSum);
  }, [tableData, energyData, onTotalSumChange]);

  const getEmptyColumns = (energyCount: number) => {
    const minColumns = 4;
    if (energyCount < minColumns) {
      return Array(minColumns - energyCount).fill(null);
    }
    return [];
  };

  return (
    <div className="overflow-x-auto pb-4 custom-scrollbar">
      <table className="min-w-full table-auto border-collapse border border-borgray">
        <thead>
          {/* 모든 카테고리를 같은 행에 표시 */}
          <tr>
            <th className="w-head sticky left-0 border border-borgray dark:bg-form-input" rowSpan={2}>월</th>
            {Object.keys(groupedEnergyData).map((category) => (
              <React.Fragment key={category}>
                <th colSpan={groupedEnergyData[category].length} className="w-head text-center border border-borgray dark:bg-form-input">
                  {category}
                </th>
              </React.Fragment>
            ))}
          </tr>
          <tr>
            {Object.keys(groupedEnergyData).map((category) =>
              groupedEnergyData[category].map((energy) => (
                <th key={energy.id} className="w-body text-center border border-borgray dark:bg-form-input">
                  {energy.energyName}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {/* 월별 데이터 */}
          {Array.from({ length: 12 }, (_, monthIndex) => (
            <tr key={monthIndex}>
              <td className="w-head sticky left-0 font-bold text-black text-center bg-white border-b border-borgray dark:bg-transparent dark:text-white">{`${monthIndex + 1}월`}</td>
              {Object.keys(groupedEnergyData).map((category) =>
                groupedEnergyData[category].map((energy) => (
                  <td key={energy.id} className="w-body border border-borgray">
                    <div className="flex items-center justify-center">
                      <input
                        type="number" // 소수점을 입력할 수 있게 설정
                        value={tableData[energy.id]?.[monthIndex] || 0}
                        onChange={e => handleInputChange(energy.id, monthIndex, e.target.value)}
                        className="text-center bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        step="0.01" // 소수점 허용
                        style={{ width: `${String(tableData[energy.id]?.[monthIndex] || 0).length + 2}ch` }}
                      />
                      <span className="text-textgray">kWh</span>
                    </div>
                  </td>
                ))
              )}
            </tr>
          ))}

          {/* 분기 합계 */}
          {[1, 2, 3, 4].map(quarter => (
            <tr key={quarter}>
              <td className="w-head sticky left-0 text-black text-center font-bold bg-butgray border-b border-borgray dark:bg-bodydark1 dark:border-white">{`${quarter}분기`}</td>
              {Object.keys(groupedEnergyData).map((category) =>
                groupedEnergyData[category].map((energy) => (
                  <td key={energy.id} className="w-body text-center pl-1.5 bg-butgray border border-borgray dark:bg-bodydark1 dark:border-white dark:text-black">
                    {calculateQuarterSum(energy.id, quarter).toLocaleString()} 
                    <span className='pl-5'>kWh</span>
                  </td>
                ))
              )}
            </tr>
          ))}

          {/* Total 합계 */}
          <tr>
            <td className="w-head sticky left-0 text-center text-white font-bold bg-tablegray border border-borgray dark:bg-bodydark2" rowSpan={2}>Total</td>
            {Object.keys(groupedEnergyData).map((category) =>
              groupedEnergyData[category].map((energy) => (
                <td key={energy.id} className="w-body pl-1.5 text-center text-white font-bold bg-tablegray border border-borgray dark:bg-bodydark2">
                  {calculateTotalSum(energy.id).toLocaleString()}
                  <span className='pl-5'>kWh</span>
                </td>
              ))
            )}
          </tr>

          {/* 카테고리별 합계 */}
          <tr>
            {Object.keys(groupedEnergyData).map((category) => (
              <td key={category} colSpan={groupedEnergyData[category].length} className="w-body pl-1.5 text-center text-white font-bold bg-tablegray border border-borgray dark:bg-bodydark2">
                {calculateCategorySum(category).toLocaleString()}
                <span className='pl-5'>kWh</span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableEnergyData;
