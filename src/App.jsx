import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ĐÃ XÓA 'Link' ĐỂ TRÁNH LỖI WARNING

// Import các trang
import Collection from './pages/Collection/collection';
import Jewelry from './pages/Jewelry/jewelry';
import ProductPage from "./pages/VongTay/vongtay";
import HoaTaiPage from "./pages/HoaTai/hoatai";
import DayChuyenPage from "./pages/DayChuyen/daychuyen";
import CharmPage from "./pages/Charm/charm";
import NhanPage from "./pages/Nhan/nhan";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

// CSS chung
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* Đã xóa thanh Menu Test. 
        Component Header thực tế sẽ được chèn vào đây hoặc bọc bên ngoài Routes bởi người phụ trách.
      */}
      <Routes>
        {/* 2 Trang Tổng hợp: Hiển thị 5 loại sản phẩm */}
        <Route path="/collection" element={<Collection />} />
        <Route path="/jewelry" element={<Jewelry />} />

        {/* 5 Trang Đơn lẻ */}
        <Route path="/vong-tay" element={<ProductPage type="vong-tay" />} />
        <Route path="/hoa-tai" element={<HoaTaiPage />} />
        <Route path="/day-chuyen" element={<DayChuyenPage />} />
        <Route path="/charm" element={<CharmPage />} />
        <Route path="/nhan" element={<NhanPage />} />

        {/* ĐƯỜNG DẪN CHI TIẾT SẢN PHẨM: Đã khớp với Link /product/id */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Mặc định vào trang chủ */}
        <Route path="/" element={<ProductPage type="vong-tay" />} />
      </Routes>
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Cart from './pages/shoppingcart/cart.jsx'
import UserAccount from './pages/detailuser/useracc.jsx';
import AdminDashboard from './pages/admin/dasdboard.jsx'
import StoreLocator from './pages/map/StoreLocator.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Thêm các công cụ từ thư viện react-router-dom
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