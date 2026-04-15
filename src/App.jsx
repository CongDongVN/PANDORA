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

function App() {
  return (
    // Bọc toàn bộ ứng dụng bằng BrowserRouter
    <BrowserRouter>
      <div className="App">
        
        <Routes>
          
          {/* đường dẫn mở component AdminDashboard */}
          <Route path="/dasdboard" element={<AdminDashboard />} />
          
          {/* đường dẫn mở component UserAccount */}
          <Route path="/useracc" element={<UserAccount />} />
          
          {/* đường dẫn mở component Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* đường dẫn mở component map */}
          <Route path="/StoreLocator" element={<StoreLocator />} />

          {/*Nếu người dùng chỉ gõ localhost:5173 (không có đuôi), sẽ tự động chuyển hướng về /useracc */}
          <Route path="/" element={<Navigate to="/useracc" replace />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;