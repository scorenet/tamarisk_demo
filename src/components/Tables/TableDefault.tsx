import React, { useState } from 'react';
import DropdownMenu from '../Dropdowns/Dropdownmenu'; // 드롭다운 메뉴 컴포넌트

interface TableDefaultProps<T extends { id: string }> {
  columns: { name: string | JSX.Element; key: string; render?: (rowData: T) => React.ReactNode }[];
  data: T[];
  showIcon?: boolean;
  onIconClick?: (rowData: T, action?: string) => void; // 액션은 선택적
  hideBody?: boolean; // tbody를 숨길지 결정하는 속성
  rowClassName?: (rowData: T) => string; // 각 행에 클래스명을 동적으로 할당할 수 있는 속성
}

const TableDefault = <T extends { id: string }>({
  columns,
  data,
  showIcon = true,
  onIconClick,
  hideBody = false,
  rowClassName,
}: TableDefaultProps<T>) => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const toggleDropdown = (key: string) => {
    setDropdownOpen(prev => (prev === key ? null : key));
  };

  return (
    <div className="overflow-hidden rounded-[8px]">
      <div className="pb-10 max-w-full overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-[#BABABA] dark:bg-meta-4">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="py-2 text-sm text-center text-white dark:text-white font-bold"
                >
                  {column.name}
                </th>
              ))}
              {showIcon && <th className="py-2 text-sm text-right text-white dark:text-white font-bold"></th>}
            </tr>
          </thead>
          {!hideBody && (
            <tbody className="bg-white dark:bg-boxdark">
              {data.map(item => (
                <tr
                  key={item.id}
                  className={`${rowClassName ? rowClassName(item) : ''} border-t border-gray2 dark:border-gray2`}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="py-2 text-sm text-center text-black dark:text-white">
                      {column.render ? column.render(item) : (item[column.key] as React.ReactNode)}
                    </td>
                  ))}
                  {showIcon && (
                    <td className="py-2 text-sm text-right relative">
                      <DropdownMenu
                        isOpen={dropdownOpen === item.id}
                        onToggle={() => toggleDropdown(item.id)}
                        onIconClick={(action) => onIconClick?.(item, action)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          )}
          <tfoot>
            <tr>
              <td colSpan={columns.length + (showIcon ? 1 : 0)} className="border-t border-gray2 dark:border-gray2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TableDefault;
