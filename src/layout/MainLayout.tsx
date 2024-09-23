import React, { ReactNode } from 'react';
import backgroundImage from '../images/cover/login_img.png';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <div 
    className="dark:bg-boxdark-2 dark:text-bodydark"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh', // Ensure it covers full height
    }}
    >
          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="max-w-[520px]2xl:max-w-[520px] 2xl:max-h-[464px]">
                {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default MainLayout;
