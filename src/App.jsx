import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    </BrowserRouter>
  );
}

export default App;