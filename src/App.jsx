import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// IMPORT CSS & LIBS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

// IMPORT COMPONENTS
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import BannerSlider from "./components/BannerSlider/BannerSlider.jsx";
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import VideoSection from "./components/VideoSection/VideoSection.jsx";
import FeatureGrid from "./components/FeatureGrid/FeatureGrid.jsx";
import ExplorePandora from "./components/ExplorePandora/ExplorePandora.jsx";

// IMPORT PAGES
import Collection from "./pages/Collection/collection";
import Jewelry from "./pages/Jewelry/jewelry";
import ProductPage from "./pages/VongTay/vongtay";
import HoaTaiPage from "./pages/HoaTai/hoatai";
import DayChuyenPage from "./pages/DayChuyen/daychuyen";
import CharmPage from "./pages/Charm/charm";
import NhanPage from "./pages/Nhan/nhan";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import LoginPage from "./pages/Login/Login.jsx";
import RegisterPage from "./pages/Register/Register.jsx";
import Cart from "./pages/shoppingcart/cart.jsx";
import UserAccount from "./pages/detailuser/useracc.jsx";
import AdminDashboard from "./pages/admin/dashboard.jsx";
import StoreLocator from "./pages/map/StoreLocator.jsx";
import Checkout from "./pages/pay/Checkout";
import OrderTracking from "./pages/tiendogiaohang/OrderTracking.jsx";

// DATA (Giữ nguyên của bạn)
const productsData = [
  {
    id: 1,
    tag: "A Symbol Of VietNam",
    image: "./assets/img/charm1.png",
    title: "Bộ Vòng Charm Pandora Trái Tim Việt Nam",
    originalPrice: "6,570,000₫",
    salePrice: "6,451,000₫",
    discount: "-2%",
  },
  {
    id: 2,
    tag: "A Symbol Of VietNam",
    image: "./assets/img/charm2.png",
    title: "Charm Bạc Pandora Bản Đồ Việt Nam",
    salePrice: "2,590,000₫",
    hasEngraving: true,
    colors: ["#silver", "#gold"],
  },
  {
    id: 3,
    tag: "A Symbol Of VietNam",
    image: "./assets/img/charm3.png",
    title: "Bộ dây chuyền & Charm vị nhà",
    salePrice: "2,590,000₫",
    hasEngraving: true,
    colors: ["#silver", "#gold"],
  },
  {
    id: 4,
    tag: "A Symbol Of VietNam",
    image: "./assets/img/charm4.png",
    title: "Bộ dây chuyền & Charm vị nhà",
    salePrice: "2,590,000₫",
    hasEngraving: true,
    colors: ["#silver", "#gold"],
  },
];

const categories = [
  { id: 1, name: "SẢN PHẨM MỚI", image: "./assets/img/Sanphammoi.png" },
  { id: 2, name: "CHARMS", image: "./assets/img/Charms.png" },
  { id: 3, name: "VÒNG TAY", image: "./assets/img/Vongtay.png" },
  { id: 4, name: "NHẪN", image: "./assets/img/Nhan.png" },
  { id: 5, name: "HOA TAI", image: "./assets/img/Hoatai.png" },
  { id: 6, name: "DÂY CHUYỀN", image: "./assets/img/Daychuyen.png" },
];

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 1. KHU VỰC ADMIN: Không có Header/Footer */}
          {/* Tự động chuyển hướng /admin về trang tổng quan */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Đường dẫn động nhận diện từng tab (dashboard, categories, orders...) */}
          <Route path="/admin/:tab" element={<AdminDashboard />} />

          {/* Đường dẫn 3 khúc: Nhận diện chi tiết mục bên trong (VD: /admin/categories/CAT-01) */}
          <Route path="/admin/:tab/:itemId" element={<AdminDashboard />} />

          {/* 2. KHU VỰC KHÁCH HÀNG: Có đầy đủ Header & Footer */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  {/* TRANG CHỦ (Tất cả component trang trí) */}
                  <Route
                    path="/"
                    element={
                      <main className="container-fluid px-custom">
                        <section className="mt-4">
                          <BannerSlider />
                        </section>
                        <section className="mt-5 container">
                          <div className="row g-4">
                            {productsData.map((item) => (
                              <div
                                className="col-12 col-md-6 col-lg-3"
                                key={item.id}
                              >
                                <ProductCard product={item} />
                              </div>
                            ))}
                          </div>
                        </section>
                        <div className="container-fluid px-custom mt-5 mb-5">
                          <div className="row g-4 justify-content-center">
                            {categories.map((cat) => (
                              <div
                                key={cat.id}
                                className="col-6 col-sm-4 col-md-2 text-center"
                              >
                                <img
                                  src={cat.image}
                                  alt={cat.name}
                                  className="img-fluid mb-2"
                                />
                                <h6 className="small fw-bold">{cat.name}</h6>
                              </div>
                            ))}
                          </div>
                        </div>
                        <VideoSection />
                        <FeatureGrid />
                        <ExplorePandora />
                      </main>
                    }
                  />

                  {/* CÁC TRANG CỬA HÀNG */}
                  <Route path="/collection" element={<Collection />} />
                  <Route path="/jewelry" element={<Jewelry />} />
                  <Route
                    path="/vong-tay"
                    element={<ProductPage type="vong-tay" />}
                  />
                  <Route path="/hoa-tai" element={<HoaTaiPage />} />
                  <Route path="/day-chuyen" element={<DayChuyenPage />} />
                  <Route path="/charm" element={<CharmPage />} />
                  <Route path="/nhan" element={<NhanPage />} />
                  <Route path="/product/:id" element={<ProductDetail />} />

                  {/* CÁC TRANG TÀI KHOẢN/HỆ THỐNG */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/useracc" element={<UserAccount />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/StoreLocator" element={<StoreLocator />} />
                  <Route path="/Checkout" element={<Checkout />} />
                  <Route path="/OrderTracking" element={<OrderTracking />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
