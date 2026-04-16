import React from "react";
// Đổi BrowserRouter thành Router để code gọn hơn
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 1. IMPORT CSS & LIBS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

// 2. IMPORT COMPONENTS
import Header from './components/Header/Header'; 
import Footer from './components/Footer/Footer.jsx';
import BannerSlider from "./components/BannerSlider/BannerSlider.jsx";
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import VideoSection from "./components/VideoSection/VideoSection.jsx";
import FeatureGrid from './components/FeatureGrid/FeatureGrid';
import ExplorePandora from './components/ExplorePandora/ExplorePandora';

// 3. IMPORT PAGES
import Collection from "./pages/Collection/collection";
import Jewelry from "./pages/Jewelry/jewelry";
import ProductPage from "./pages/VongTay/vongtay";
import HoaTaiPage from "./pages/HoaTai/hoatai";
import DayChuyenPage from "./pages/DayChuyen/daychuyen";
import CharmPage from "./pages/Charm/charm";
import NhanPage from "./pages/Nhan/nhan";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import LoginPage from './pages/Login/Login.jsx';
import RegisterPage from './pages/Register/Register.jsx';
import Cart from "./pages/shoppingcart/cart.jsx";
import UserAccount from "./pages/detailuser/useracc.jsx";
import AdminDashboard from "./pages/admin/dasdboard.jsx";
import StoreLocator from "./pages/map/StoreLocator.jsx";

// 4. MOCK DATA (Giữ nguyên dữ liệu của bạn)
const productsData = [
  { id: 1, tag: "A Symbol Of VietNam", image: "./assets/img/charm1.png", title: "Bộ Vòng Charm Pandora Trái Tim Việt Nam", originalPrice: "6,570,000₫", salePrice: "6,451,000₫", discount: "-2%" },
  { id: 2, tag: "A Symbol Of VietNam", image: "./assets/img/charm2.png", title: "Charm Bạc Pandora Bản Đồ Việt Nam", salePrice: "2,590,000₫", hasEngraving: true, colors: ["#silver", "#gold"] },
  { id: 3, tag: "A Symbol Of VietNam", image: "./assets/img/charm3.png", title: "Bộ dây chuyền & Charm vị nhà", salePrice: "2,590,000₫", hasEngraving: true, colors: ["#silver", "#gold"] },
  { id: 4, tag: "A Symbol Of VietNam", image: "./assets/img/charm4.png", title: "Bộ dây chuyền & Charm vị nhà", salePrice: "2,590,000₫", hasEngraving: true, colors: ["#silver", "#gold"] }
];

const categoriesData = [
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
        {/* Header nằm TRONG Router để MegaMenu sử dụng được Link */}
        <Header />
        
        <Routes>
          {/* TRANG CHỦ */}
          <Route path="/" element={
            <main className="container-fluid px-custom"> 
              <section className="mt-4">
                <BannerSlider />
              </section>

              <section className="mt-5 container">
                <div className="row g-4 product-list-row">
                  {productsData.map((item) => (
                    <div className="col-12 col-md-6 col-lg-3" key={item.id}>
                      <ProductCard product={item} />
                    </div>
                  ))}
                </div>
              </section>

              <div className="container-fluid px-custom mt-5 mb-5">
                <div className="row g-4 justify-content-center">
                  {categoriesData.map((cat) => (
                    <div key={cat.id} className="col-6 col-sm-4 col-md-2 text-center">
                      <div className="category-item">
                        <div className="category-image-wrapper mb-3">
                          <img src={cat.image} alt={cat.name} className="img-fluid category-img" />
                        </div>
                        <h6 className="category-name" style={{ fontSize: '14px', fontWeight: 'bold' }}>{cat.name}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <VideoSection />
              <FeatureGrid />
              <ExplorePandora />
            </main>
          } />

          {/* CÁC ROUTE KHÁC */}
          <Route path="/collection" element={<Collection />} />
          <Route path="/jewelry" element={<Jewelry />} />
          <Route path="/vong-tay" element={<ProductPage type="vong-tay" />} />
          <Route path="/hoa-tai" element={<HoaTaiPage />} />
          <Route path="/day-chuyen" element={<DayChuyenPage />} />
          <Route path="/charm" element={<CharmPage />} />
          <Route path="/nhan" element={<NhanPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/useracc" element={<UserAccount />} />
          <Route path="/dasdboard" element={<AdminDashboard />} />
          <Route path="/StoreLocator" element={<StoreLocator />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;