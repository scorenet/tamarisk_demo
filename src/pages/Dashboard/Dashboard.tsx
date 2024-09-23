import React, { useState } from 'react';
import ChartDonuet from '../../components/Charts/ChartDonuet';
import ChartRowStick from '../../components/Charts/ChartRowStick';
import ChartSeven from '../../components/Charts/ChartSeven';
import DataStatsThree from '../../components/DataStats/DataStatsDefault';
import DefaultLayout from '../../layout/DefaultLayout';
import DropdownsYear from '../../components/Dropdowns/DropdownsYear';
import ButtonsGroupOne from '../../components/ButtonsGroups/ButtonsGroupOne';

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2023); // 기본 연도 설정

  // 연도 선택 시 호출되는 함수
  const handleYearSelect = (year: number) => {
    setSelectedYear(year); // 선택한 연도를 상태로 설정
    console.log(`선택한 연도: ${year}`);
    // 선택한 연도에 따라 다른 데이터를 가져와 차트에 적용 가능
  };

  return (
    <DefaultLayout>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className='flex flex-wrap'>
          <h2 className="flex text-title-sm2 font-bold text-black dark:text-white">
            종합 연간리포트
          </h2>
          <div className='flex'>
            <DropdownsYear onYearSelect={handleYearSelect} />
          </div>
        </div>

        <div className="flex items-center">
          <ButtonsGroupOne />
        </div>
      </div>
      <DataStatsThree />

      {/* 차트 섹션 */}
      <div className="mt-7.5 grid grid-cols-12">
        {/* 타이틀 섹션 */}
        <div className="col-span-12">
          <h2 className="text-title-sm2 font-bold text-black dark:text-white pb-4">
            {selectedYear}년도 스코프별 탄소배출량
          </h2>
        </div>

        {/* 도넛 차트 */}
        <div className="flex col-span-12 xl:col-span-5">
          <ChartDonuet />
        </div>

        {/* 막대 차트 */}
        <div className="flex col-span-12 xl:col-span-7">
          <ChartRowStick />
        </div>
      </div>

      <div className="mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <ChartSeven />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <ChartRowStick />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
