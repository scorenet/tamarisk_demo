import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartDonuetState {
  series: number[];
}

const ChartDonuet: React.FC = () => {
  const [state, setState] = useState<ChartDonuetState>({
    series: [74.5, 23.7, 1.8], // Scope별 데이터
  });

  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: ['#13C296', '#1FC1F1', '#F2994A'], // Scope 1, 2, 3에 대한 색상
    labels: ['Scope 1', 'Scope 2', 'Scope 3'], // Scope 레이블
    legend: {
      show: false, // 범례 숨김
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%', // 도넛의 크기 조정
        },
      },
    },
    dataLabels: {
      enabled: false, // 데이터 라벨을 활성화하여 그래프 내부에 퍼센트 표시
      formatter: function (val: any) {
        return val.toFixed(1) + '%'; // 퍼센트 포맷 적용
      },
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 250,
          },
        },
      },
    ],
  };

  return (
    <div className="w-full sm:px-7.5 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-2">
        <div id="chartDonuet" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={state.series} type="donut" />
        </div>
      </div>

      {/* 범례 섹션 */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block h-4 w-4 rounded-full bg-scope1"></span>
            <span className="font-medium text-black-2 dark:text-white">Scope 1</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block h-4 w-4 rounded-full bg-primary"></span>
            <span className="font-medium text-black-2 dark:text-white">Scope 2</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block h-4 w-4 rounded-full bg-scope3"></span>
            <span className="font-medium text-black-2 dark:text-white">Scope 3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDonuet;
