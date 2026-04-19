import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// IMPORT CSS & LIBS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

// IMPORT DỮ LIỆU
import { productsData, categories } from "./data/homeData.js";

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
import AdminDashboard from "./pages/admin/dasdboard.jsx";
import StoreLocator from "./pages/map/StoreLocator.jsx";
import Checkout from "./pages/pay/Checkout";

// COMPONENT TRANG CHỦ (Để xử lý hiệu ứng trồi lên)
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Mỗi khi pathname (đường dẫn) thay đổi, cuộn về đầu trang ngay lập tức
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const HomeContent = () => {
  const categoryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Chỉ lấy các item trong categoryRef để không ảnh hưởng đến sản phẩm nổi bật
          if (categoryRef.current) {
            const items = categoryRef.current.querySelectorAll(".category-fade-item");
            if (entry.isIntersecting) {
              items.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.2}s`;
                item.classList.add("visible");
              });
            } else {
              items.forEach((item, index) => {
                const reverseIndex = items.length - 1 - index;
                item.style.transitionDelay = `${reverseIndex * 0.1}s`;
                item.classList.remove("visible");
              });
            }
          }
        });
      },
      {
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0.1,
      }
    );

    if (categoryRef.current) observer.observe(categoryRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="container-fluid px-custom">
      <section className="mt-4">
        <BannerSlider />
      </section>

      {/* PHẦN 1: 4 SẢN PHẨM NỔI BẬT */}
      <section className="mt-5 container">
        <h2 className="text-center mb-5 fw-bold" style={{ letterSpacing: '2px' }}>SẢN PHẨM NỔI BẬT</h2>
        <div className="row g-4 justify-content-center">
          {productsData &&
            productsData.slice(0, 4).map((item) => ( // Lấy đúng 4 cái đầu tiên
              <div className="col-12 col-md-6 col-lg-3" key={item.id}>
                {/* ProductCard bây giờ đã có logic hover và xem nhanh */}
                <ProductCard product={item} />
              </div>
            ))}
        </div>
      </section>

      {/* PHẦN 2: 6 DANH MỤC TRÒN */}
      <div className="container-fluid px-custom mt-5 mb-5" ref={categoryRef}>
        <div className="row g-4 justify-content-center">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="col-6 col-sm-4 col-md-2 text-center category-fade-item"
            >
              <Link to={cat.path} className="text-decoration-none text-dark category-hover">
                <div className="category-circle-wrapper">
                  <img src={cat.image} alt={cat.name} className="img-fluid w-100 h-100 object-fit-cover" />
                </div>
                <h6 className="category-name">{cat.name}</h6>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <VideoSection />
      <FeatureGrid />
      <ExplorePandora />
    </main>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/dasdboard" element={<AdminDashboard />} />

          <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<HomeContent />} />
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
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/useracc" element={<UserAccount />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/StoreLocator" element={<StoreLocator />} />
                  <Route path="/Checkout" element={<Checkout />} />
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
