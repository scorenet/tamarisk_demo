import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartRowStickState {
  series: { data: number[] }[];
}

const ChartRowStick: React.FC = () => {
  const [state, setState] = useState<ChartRowStickState>({
    series: [
      {
        data: [13.1, 172.4, 541.5], // 예시 데이터
      },
    ],
  });

  const options: ApexOptions = {
    colors: ['#1DB954'], // 색상 조정 (Scope 3에 대한 색상)
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 250,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true, // 가로 막대 그래프 설정
        barHeight: '35%', // 막대 높이 조정
        borderRadius: 0,
      },
    },
    dataLabels: {
      enabled: false, // 데이터 라벨 비활성화
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Scope 1', 'Scope 2', 'Scope 3'], // 예시로 Scope 설정
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: ['#6B7280'], // 축 레이블 색상
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#6B7280'], // Y축 레이블 색상
          fontSize: '12px',
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
    },
  };

  return (
    <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-6 pt-4">
        <div id="chartRowStick" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartRowStick;
