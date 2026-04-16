import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import các trang của bạn
import AdminDashboard from './pages/admin/dasdboard'; // Giữ nguyên tên file bạn đặt
import UserAccount from './pages/detailuser/useracc';
import Cart from './pages/shoppingcart/cart'; // Giả sử tên component
import StoreLocator from './pages/map/StoreLocator'; // Giả sử tên component
import Checkout from './pages/pay/Checkout'; // Import trang Checkout chúng ta vừa làm

// Nhớ import Header và Footer vào đây nhé (Sửa lại đường dẫn nếu cần)
// import Header from './components/Header'; 
// import Footer from './components/Footer'; 

// TẠO BỘ KHUNG (LAYOUT) CHO KHÁCH HÀNG
const ClientLayout = ({ children }) => {
  return (
    <>
      {/* <Header /> */} {/* Tạm thời bỏ comment khi bạn import Header */}
      <div style={{ minHeight: '60vh' }}>
         {children} 
      </div>
      {/* <Footer /> */} {/* Tạm thời bỏ comment khi bạn import Footer */}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>

          {/* ======================================================= */}
          {/* 1. KHU VỰC ADMIN (KHÔNG CÓ HEADER/FOOTER VƯỚNG VÍU)     */}
          {/* ======================================================= */}
          <Route path="/dasdboard" element={<AdminDashboard />} />


          {/* ======================================================= */}
          {/* 2. KHU VỰC KHÁCH HÀNG (CÓ HEADER & FOOTER ĐẦY ĐỦ)       */}
          {/* ======================================================= */}
          <Route path="/*" element={
            <ClientLayout>
              <Routes>
                <Route path="/useracc" element={<UserAccount />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/StoreLocator" element={<StoreLocator />} />
                <Route path="/Checkout" element={<Checkout />} />
                
                {/* Tự động chuyển hướng về useracc nếu gõ localhost:5173 */}
                <Route path="/" element={<Navigate to="/useracc" replace />} />
              </Routes>
            </ClientLayout>
          } />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;