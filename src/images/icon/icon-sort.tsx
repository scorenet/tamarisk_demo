import React from 'react';

// 정렬 아이콘을 위한 컴포넌트
const SortIconUp: React.FC = () => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 0L0 5H10L5 0Z" fill="white" />
  </svg>
);

const SortIconDown: React.FC = () => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 14L10 9L0 9L5 14Z" fill="white" />
  </svg>
);

export { SortIconUp, SortIconDown };