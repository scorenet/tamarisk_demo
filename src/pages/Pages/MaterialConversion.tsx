import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import TableDefault from '../../components/Tables/TableDefault';
import IconClose from '../../images/icon/icon-close.svg';

interface MaterialData {
  id: string;
  comparisonName: string; // 새로 추가된 필드: "원재료", "비교1", "비교2" 등
  category: string;
  amount: string;
  co2Reduction: number;
}

const MaterialConversion: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<MaterialData[]>([]);
  const [selectedOriginalMaterials, setSelectedOriginalMaterials] = useState<string[]>(['', '', '', '']);
  const [selectedPercentages, setSelectedPercentages] = useState<number[]>([0, 0, 0, 0]);
  const [selectedComparisons, setSelectedComparisons] = useState<number[]>([]);
  const [selectedMainMaterial, setSelectedMainMaterial] = useState('');

  // 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // "계산하기" 버튼을 눌렀을 때, 결과 화면 표시
  const handleConfirmModal = () => {
    // 원재료 행 생성
    const mainMaterialData: MaterialData = {
      id: '0',
      comparisonName: '원재료',
      category: selectedMainMaterial,
      amount: '100%',
      co2Reduction: 0, // 원재료의 CO2 저감량
    };

    // 선택된 비교 항목에 대한 데이터 생성
    const comparisonData = selectedComparisons.map((index) => ({
      id: (index + 1).toString(),
      comparisonName: `비교${index + 1}`,
      category: selectedOriginalMaterials[index],
      amount: `${selectedPercentages[index]}%`,
      co2Reduction: selectedPercentages[index] * 0.1,
    }));

    // 원재료 + 비교 항목 데이터를 테이블에 저장
    setSelectedMaterials([mainMaterialData, ...comparisonData]);
    setIsResultVisible(true);
    setIsModalOpen(false);
  };

  // "초기화" 버튼을 눌렀을 때, 첫 번째 화면으로 돌아가기
  const handleReset = () => {
    setIsResultVisible(false);
    setSelectedMaterials([]);
    setSelectedOriginalMaterials(['', '', '', '']);
    setSelectedPercentages([0, 0, 0, 0]);
    setSelectedComparisons([]);
    setSelectedMainMaterial('');
  };

  // 테이블의 데이터 구성
  const columns = [
    { name: '', key: 'comparisonName' as keyof MaterialData }, // 새로 추가된 열
    { name: '구분', key: 'category' as keyof MaterialData },
    { name: '합량', key: 'amount' as keyof MaterialData },
    { name: 'CO2 저감량', key: 'co2Reduction' as keyof MaterialData }
  ];

  const mainMaterialOptions = [
    '폴리에틸렌 | PE',
    '폴리프로필렌 | PP',
    '폴리에틸렌 페레프탈레이트 | PET',
    '폴리스티렌 | PS',
    '폴리비닐 클로라이드 | PVC',
    '폴리카보네이트 | PC',
    '폴리우레탄 | PU',
    '폴리에스테르',
    '아크릴',
    '나일론'
  ];

  const originalMaterialOptions = [
    'PLA',
    '바이오 PET',
    '바이오 PP',
    '바이오 PE',
    'ABS'
  ];

  // Radio 버튼 복수 선택 핸들링
  const handleComparisonChange = (index: number) => {
    if (selectedComparisons.includes(index)) {
      setSelectedComparisons(selectedComparisons.filter((i) => i !== index));
    } else {
      setSelectedComparisons([...selectedComparisons, index]);
    }
  };

  // Percentage input handler
  const handlePercentageChange = (index: number, value: number) => {
    if (value >= 0 && value <= 100) {
      const updatedPercentages = [...selectedPercentages];
      updatedPercentages[index] = value;
      setSelectedPercentages(updatedPercentages);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <div className="max-h-[84vh] rounded-[8px] border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
            <h1 className="font-bold text-xl text-black dark:text-white">소재변환 그린계산기</h1>
          </div>

          {/* 첫 화면 */}
          {!isResultVisible && (
            <div className="h-[78vh] bg-white rounded-[8px] dark:border-strokedark dark:bg-boxdark flex flex-col justify-center items-center">
              <p className="font-bold text-2xl text-black text-center">탄소중립 소재별 온실가스 배출 저감량을 확인해보세요</p>
              <button
                onClick={handleOpenModal}
                className="w-[172px] mt-8 py-2 bg-black text-white rounded-full"
              >
                시작하기
              </button>
            </div>
          )}

          {/* 모달 컴포넌트 */}
          {isModalOpen && (
            <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70">
              <div className="relative w-full max-w-lg rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4"
                >
                  <img src={IconClose} alt="닫기" />
                </button>

                <h3 className="pb-5 text-xl font-bold text-black dark:text-white">
                  재생에너지 등록하기
                </h3>

                {/* 상단 원재료 드롭다운 */}
                <div className="mb-6 text-left">
                  <label className="block mb-2 font-bold text-black dark:text-white">원재료<span className="text-red">*</span></label>
                  <select
                    value={selectedMainMaterial}
                    onChange={(e) => setSelectedMainMaterial(e.target.value)}
                    className="w-full p-2 border border-borgray text-sm rounded-lg bg-transparent dark:bg-graydark border-borgray"
                  >
                    <option value="">원재료를 선택하세요</option>
                    {mainMaterialOptions.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 비교할 4개의 소재 선택 및 퍼센트 입력 */}
                <div className="mb-6 text-left">
                  <label className="block mb-2 font-bold text-black dark:text-white">대분류<span className="text-red">*</span></label>
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="mb-6 text-left flex items-center">
                    <div
                      onClick={() => handleComparisonChange(index)}
                      className="cursor-pointer mr-2"
                    >
                      {selectedComparisons.includes(index) ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="10" cy="10" r="9.5" fill="white" stroke="black" />
                          <circle cx="10" cy="10" r="5" fill="black" />
                        </svg>
                      ) : (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="10" cy="10" r="9.5" fill="white" stroke="black" />
                        </svg>
                      )}
                    </div>
                    <select
                      value={selectedOriginalMaterials[index]}
                      onChange={(e) => {
                        const newMaterials = [...selectedOriginalMaterials];
                        newMaterials[index] = e.target.value;
                        setSelectedOriginalMaterials(newMaterials);
                      }}
                      className="w-1/2 p-2 border border-borgray text-sm rounded-lg bg-transparent dark:bg-graydark mr-4"
                    >
                      <option value="">비교할 재료를 선택하세요</option>
                      {originalMaterialOptions.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={selectedPercentages[index] === null || selectedPercentages[index] === 0 ? '' : selectedPercentages[index]} 
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseInt(e.target.value); // 빈 값은 0으로 처리
                        handlePercentageChange(index, isNaN(value) ? 0 : value); // NaN 처리를 추가
                      }}
                      className="w-1/2 h-[37px] p-2 border border-borgray text-sm rounded-lg  bg-transparent dark:bg-graydark mr-4"
                      placeholder=" 함량(%)"
                      min="0"
                      max="100"
                    />
                  </div>
                ))}
                </div>

                <div className="flex flex-row justify-between mt-6 mx-6">
                  <div className="2xsm:w-1/2 w-full px-3">
                    <button
                      onClick={handleCloseModal}
                      className="block w-full rounded-full border border-white bg-butgray p-[9px] text-sm text-center font-medium text-black transition hover:bg-gray"
                    >
                      뒤로가기
                    </button>
                  </div>
                  <div className="2xsm:w-1/2 w-full px-3">
                    <button
                      onClick={handleConfirmModal}
                      className="block w-full rounded-full border border-black bg-black p-[9px] text-sm text-center font-medium text-white transition hover:bg-opacity-90"
                      disabled={
                        !selectedComparisons.length || 
                        selectedComparisons.some((index) => !selectedOriginalMaterials[index] || !selectedPercentages[index])
                      }
                    >
                      계산하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 결과 화면 */}
          {isResultVisible && (
            <div className="h-[78vh] flex flex-col items-center py-4">
              <div className="w-full max-w-full px-9 p-4"> {/* Adjust table container width */}
                <TableDefault columns={columns} data={selectedMaterials || []} showIcon={false} />
              </div>
              <div className='flex flex-col items-center'>
                <button
                  onClick={handleReset}
                  className="w-[172px] mt-8 py-2 bg-black text-white rounded-full"
                >
                  초기화
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MaterialConversion;
