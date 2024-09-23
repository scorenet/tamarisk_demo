import React, { useState } from 'react';
import DropdownsYear from '../Dropdowns/DropdownsYear';
import ButtonsGroupOne from '../ButtonsGroups/ButtonsGroupOne';
import IconInfo from '../../images/icon/icon-info.svg';
import PopOver from '../Popovers/PopoversLeft';

const DataStatsDefault: React.FC = () => {
  // Popover 표시 상태를 관리하는 state
  const [showPopOver, setShowPopOver] = useState(false);

  // Popover를 토글하는 함수
  const handleIconClick = () => {
    setShowPopOver(!showPopOver);
  };

  return (
    <div>
      <div className="grid gap-4 sm:gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 전체통계 */}
          <div className="rounded-[8px] border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-Start justify-between">
              {/* 왼쪽 섹션 */}
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white">
                  Total
                </h3>
              </div>

              {/* 오른쪽 퍼센트 박스 */}
              <div className="flex flex-col items-end">
                <div className="rounded-md bg-primary p-1 text-xs font-medium text-white mb-2">
                  <span>00.0%</span>
                </div>
                <div>
                  <span className="text-title-lg font-bold text-black dark:text-white">
                    999,999,999.99
                  </span>
                  <span className="text-gray-500 text-sm">tCO2e</span>
                </div>
              </div>
            </div>
          </div>

          {/* 배출권 환산비용 */}
          <div className="relative rounded-[8px] border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-start justify-between">
              {/* 왼쪽 섹션 */}
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white">
                  배출권 환산 비용
                </h3>
              </div>

              {/* 오른쪽 숫자 박스 */}
              <div className="flex flex-col items-end">
                {/* 빈 박스 추가로 위치 맞춤 */}
                <div className="h-6 mb-2"></div>
                <div>
                  <span className="text-title-lg font-bold text-black dark:text-white">
                    999,999,999.99
                  </span>
                  <span className="text-gray-500 text-sm">원</span>
                </div>
              </div>
            </div>

            {/* 오른쪽 상단 아이콘 및 PopOver */}
            <div className="absolute top-3 right-3">
            <PopOver />
            </div>
          </div>
        </div>

        
        {/* 각 스코프 별 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Scope1 */}
          <div className="rounded-[8px] border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-Start justify-between">
              {/* 왼쪽 섹션 */}
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white">
                  Scope 1
                </h3>
              </div>

              {/* 오른쪽 퍼센트 박스 */}
              <div className="flex flex-col items-end">
                <div className="rounded-md bg-primary p-1 text-xs font-medium text-white mb-2">
                  <span>00.0%</span>
                </div>
                <div>
                  <span className="text-title-lg font-bold text-black dark:text-white">
                    999,999,999.99
                  </span>
                  <span className="text-gray-500 text-sm">tCO2e</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scope2 */}
          <div className="rounded-[8px] border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-Start justify-between">
              {/* 왼쪽 섹션 */}
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white">
                  Scope 2
                </h3>
              </div>

              {/* 오른쪽 퍼센트 박스 */}
              <div className="flex flex-col items-end">
                <div className="rounded-md bg-primary p-1 text-xs font-medium text-white mb-2">
                  <span>00.0%</span>
                </div>
                <div>
                  <span className="text-title-lg font-bold text-black dark:text-white">
                    999,999,999.99
                  </span>
                  <span className="text-gray-500 text-sm">tCO2e</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scope3 */}
          <div className="rounded-[8px] border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-Start justify-between">
              {/* 왼쪽 섹션 */}
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white">
                  Scope 3
                </h3>
              </div>

              {/* 오른쪽 퍼센트 박스 */}
              <div className="flex flex-col items-end">
                <div className="rounded-md bg-primary p-1 text-xs font-medium text-white mb-2">
                  <span>00.0%</span>
                </div>
                <div>
                  <span className="text-title-lg font-bold text-black dark:text-white">
                    999,999,999.99
                  </span>
                  <span className="text-gray-500 text-sm">tCO2e</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DataStatsDefault;
