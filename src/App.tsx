import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import ECommerce from './pages/Dashboard/ECommerce';
import Analytics from './pages/Dashboard/Analytics';
import CRM from './pages/Dashboard/CRM';
import BasicChart from './pages/Chart/BasicChart';
import AdvancedChart from './pages/Chart/AdvancedChart';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import EcoMypage from './pages/Pages/EcoMypage';
import EcoNotice from './pages/Pages/EcoNotice';
import Unsubscribe from './pages/Pages/Unsubscribe';
import SignUp from './pages/Authentication/SignUp';
import SignIn from './pages/Authentication/SignIn';
import GreenCar from './pages/Pages/GreenCar';
import MaterialConversion from './pages/Pages/MaterialConversion';
import Product from './components/Product/Product';
import ProductData from './components/Product/ProductData';
import Energy from './components/Energy/Energy';
import EnergyData from './components/Energy/EnergyData';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
      <Route
          index
          element={
            <>
              <PageTitle title="eco-ASSET | 로그인" />
              <SignIn/>
            </>
          }
        />
        <Route
        path="/dashboard"
          element={
            <>
              <PageTitle title="eco-ASSET | 대시보드" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            <>
              <PageTitle title="Analytics Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Analytics />
            </>
          }
        />
        <Route
          path="/dashboard/crm"
          element={
            <>
              <PageTitle title="CRM Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <CRM />
            </>
          }
        />
        <Route
          path="/chart/basic-chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <BasicChart />
            </>
          }
        />
        <Route
          path="/chart/advanced-chart"
          element={
            <>
              <PageTitle title="Advanced Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AdvancedChart />
            </>
          }
        />
        <Route
          path="/renewable-energy/items"
          element={
            <>
              <PageTitle title="eco-ASSET | 재생에너지 관리 - 발전소 관리" />
              <Energy />
            </>
          }
        />
        <Route
          path="/renewable-energy/data"
          element={
            <>
              <PageTitle title="eco-ASSET | 재생에너지 관리 - 발전량 데이터 관리" />
              <EnergyData />
            </>
          }
        />
        <Route
          path="/product-manager/items"
          element={
            <>
              <PageTitle title="eco-ASSET | 제품단위 탄소관리 - 제품별 관리" />
              <Product />
            </>
          }
        />
        <Route
          path="/product-manager/data"
          element={
            <>
              <PageTitle title="eco-ASSET | 제품단위 탄소관리 - 제품별 데이터 관리" />
              <ProductData />
            </>
          }
        />
        <Route
          path="/greencar"
          element={
            <>
              <PageTitle title="eco-ASSET | 전기차 그린계산기" />
              <GreenCar />
            </>
          }
        />
        <Route
          path="/material"
          element={
            <>
              <PageTitle title="eco-ASSET | 소재변환 그린계산기" />
              <MaterialConversion />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="eco-ASSET | 회원가입" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/mypage"
          element={
            <>
              <PageTitle title="eco-ASSET | 마이페이지" />
              <EcoMypage />
            </>
          }
        />
        <Route
          path="/notice"
          element={
            <>
              <PageTitle title="eco-ASSET | 공지사항" />
              <EcoNotice />
            </>
          }
        />
         <Route 
           path="/unsubscribe" 
           element={
            <>
            <PageTitle title="eco-ASSET | 회원 탈퇴" />
            <Unsubscribe />
            </>
           }
        />
      </Routes>
    </>
  );
}

export default App;
