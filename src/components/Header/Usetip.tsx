import React from 'react';

interface UsetipProps {
  title: string;
}

const Usetip: React.FC<UsetipProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_171_9142)">
          <path d="M8.17325 7.68676C8.17325 5.62543 6.49899 3.95117 4.43767 3.95117C2.37635 3.95117 0.702087 5.62543 0.702087 7.68676C0.702087 8.81193 1.20167 9.81559 1.98929 10.4997L2.77241 12.4485H6.10743L6.89055 10.4997C7.67818 9.81559 8.17776 8.80743 8.17776 7.68676H8.17325Z" stroke="#666666" strokeLinejoin="round"/>
          <path d="M4.43768 2.44388V0" stroke="#666666" strokeLinejoin="round"/>
          <path d="M1.61123 3.20479L0.391541 1.08496" stroke="#666666" strokeLinejoin="round"/>
          <path d="M7.25964 3.20479L8.48384 1.08496" stroke="#666666" strokeLinejoin="round"/>
          <path d="M4.43768 12.4531V7.79492" stroke="#666666" strokeLinejoin="round"/>
          <path d="M3.08301 7.79492H5.78793" stroke="#666666" strokeLinejoin="round"/>
          <path d="M2.36737 14.0283H6.50802" stroke="#666666" strokeLinejoin="round"/>
          <path d="M2.36737 15.5498H6.50802" stroke="#666666" strokeLinejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_171_9142">
            <rect width="8.87539" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <span>{title}</span>
    </div>
  );
};

export default Usetip;