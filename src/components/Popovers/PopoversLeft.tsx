import React, { useState, useRef, useEffect } from 'react'
import IconInfo from '../../images/icon/icon-info.svg'

const PopoversLeft: React.FC = () => {
  const [popoversOpen, setPopoversOpen] = useState(false);

  const trigger = useRef<any>(null);
  const popovers = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!popovers.current) return;
      if (
        !popoversOpen ||
        popovers.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setPopoversOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!popoversOpen || keyCode !== 27) return;
      setPopoversOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="w-full">
      <div className="text-center">
        <div className="relative inline-block">
          <button
            ref={trigger}
            onClick={() => setPopoversOpen(!popoversOpen)}
            className="inline-flex">
            <img src={IconInfo} alt="Info Icon" className="w-6 h-6" />
          </button>
          <div
            ref={popovers}
            onFocus={() => setPopoversOpen(true)}
            onBlur={() => setPopoversOpen(false)}
            className={`absolute right-full top-0 z-20 mr-3 w-[184px] h-[116px] rounded-[5px] bg-white drop-shadow-5 dark:bg-meta-4 ${
              popoversOpen ? 'block' : 'hidden'
            }`}
          >
            {/* Popover 화살표 */}
            <span className="absolute -right-1.5 top-3 -z-10 h-4 w-4 rotate-45 bg-white dark:bg-meta-4"></span>

            {/* Popover 제목 섹션 */}
            <div className="flex justify-between border-b border-stroke py-1 px-2.5 dark:border-strokedark">
              <h4 className="flex flex-wrap text-left text-sm font-semibold text-black dark:text-white">
                탄소배출권 가격
              </h4>
              <p className="flex flex-wraptext-right text-[8px] text-gray-500">2024.00.00 기준</p>
            </div>

            {/* 통화 정보 섹션 */}
            <div className="px-3 py-2">
              <ul>
                <li className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/40px-Flag_of_South_Korea.svg.png"
                      alt="KRW"
                      className="w-4 h-3 mr-2"
                    />
                    <span className="text-black text-xs dark:text-white font-medium">KRW</span>
                  </div>
                  <span className="text-black text-xs  dark:text-white">000,000 /1t</span>
                </li>
                <li className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                      alt="USD"
                      className="w-4 h-3 mr-2"
                    />
                    <span className="text-black text-xs dark:text-white font-medium">USD</span>
                  </div>
                  <span className="text-black text-xs  dark:text-white">000,000 /1t</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
                      alt="EUR"
                      className="w-4 h-3 mr-2"
                    />
                    <span className="text-black text-xs dark:text-white font-medium">EUR</span>
                  </div>
                  <span className="text-black text-xs dark:text-white">000,000 /1t</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopoversLeft;
