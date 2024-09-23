import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';

const GreenCar: React.FC = () => {
  const [scale, setScale] = useState(1);

  // 창 크기에 맞춰 scale 값을 설정하는 함수
  const updateScale = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // iframe의 기본 크기 (1920x1080)
    const iframeWidth = 1920;
    const iframeHeight = 1080;

    // 가로와 세로 비율 중 작은 값을 선택하여 축소 비율을 설정
    const scaleWidth = screenWidth / iframeWidth;
    const scaleHeight = screenHeight / iframeHeight;
    const newScale = Math.min(scaleWidth, scaleHeight); // 작은 비율을 선택하여 비율 유지를 위함

    setScale(newScale);
  };

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale); // 창 크기 변경 시 다시 계산
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <DefaultLayout>
       <div className="flex flex-col gap-10">
          <div className="max-h-[84vh] rounded-[8px] border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
              <h1 className="font-bold text-xl text-black dark:text-white">전기차 그린계산기</h1>
            </div>
            <div className="flex justify-center py-8 px-10" style={{ height: 'calc(90vh - 100px)' }}>
              {/* 화면에 맞춰 iframe을 감싸는 div */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: `1430px`, // 비율에 맞춘 width
                  height: `850px`, // 비율에 맞춘 height
                }}
              >
                {/* iframe 자체 */}
              <iframe
                src="https://www.ecobell.co.kr/sub/green_calculator.php"
                style={{
                  width: '1330px', // 기본 크기
                  height: '850px', // 기본 크기
                  border: 'none',
                  position: 'absolute',
                  top: '-110px', // 위쪽에서 숨기기 없이 위치 설정
                  left: '0px', // 왼쪽에서 숨기기 없이 위치 설정
                }}
                title="Specific Area of External Site"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default GreenCar;
