import React, { ReactNode } from 'react';


const SignupLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <div className="w-full h-screen">
          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto w-full h-screen">
                {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default SignupLayout;
