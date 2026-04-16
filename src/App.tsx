// 1. Import component Header của bạn
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'; 
import BannerSlider from "./components/BannerSlider/BannerSlider.jsx";
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import CategoryList from "./components/CategoryList/CategoryList.jsx";
import VideoSection from "./components/VideoSection/VideoSection.jsx";
import FeatureGrid from './components/FeatureGrid/FeatureGrid';
import ExplorePandora from './components/ExplorePandora/ExplorePandora';
import Footer from './components/Footer/Footer.jsx';
import LoginPage from './pages/Login/Login.jsx';
import RegisterPage from './pages/Register/Register.jsx';
// ... trong function App()
<main className="container-fluid px-custom">
  <BannerSlider />
  <CategoryList />
  
  {/* Chèn phần Feature Grid vào đây */}
  <FeatureGrid />

  <section className="mt-5">
     {/* Product List của bạn */}
  </section>
  
  <VideoSection />
</main>
// Lưu ý: Đường dẫn phải khớp với cấu trúc thư mục của bạn

// 2. Import Bootstrap (nếu chưa import ở index.js)
import 'bootstrap/dist/css/bootstrap.min.css';
const productsData = [
  {
    id: 1,
    tag: "A Symbol Of VietNam",
    image: "./assets/img/charm1.png", // Thay bằng link ảnh thật của bạn
    title: "Bộ Vòng Charm Pandora Trái Tim Việt Nam",
    originalPrice: "6,570,000₫",
    salePrice: "6,451,000₫",
    discount: "-2%"
  },
  {
    id: 2,
    tag: "A Symbol Of VietNam",
    image: "./assets/img/charm2.png",
    title: "Charm Bạc Pandora Bản Đồ Việt Nam",
    salePrice: "2,590,000₫",
    hasEngraving: true,
    colors: ["#silver", "#gold"]
  },
  {
    id: 3,
    tag: "A Symbol Of VietNam",
    image: "./assets/img/charm3.png",
    title: "Bộ dây chuyền & Charm vị nhà, Dù ở đâu",
    salePrice: "2,590,000₫",
    hasEngraving: true,
    colors: ["#silver", "#gold"]
  },
  {
    id: 4,
    tag: "A Symbol Of VietNam",
    image: "./assets/img/charm4.png",
    title: "Bộ dây chuyền & Charm vị nhà, Dù ở đâu",
    salePrice: "2,590,000₫",
    hasEngraving: true,
    colors: ["#silver", "#gold"]
  }
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
        {/* Header luôn hiện ở mọi trang */}
        <Header />
        
        <Routes>
          {/* TRANG CHỦ: Chứa toàn bộ nội dung cũ của bạn */}
          <Route path="/" element={
            <main className="container-fluid px-custom"> 
              <section className="mt-4">
                <BannerSlider />
              </section>

              <section className="mt-5">
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
                  {categories.map((cat) => (
                    <div key={cat.id} className="col-6 col-sm-4 col-md-2 text-center">
                      <div className="category-item">
                        <div className="category-image-wrapper mb-3">
                          <img src={cat.image} alt={cat.name} className="img-fluid category-img" />
                        </div>
                        <h6 className="category-name">{cat.name}</h6>
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

          {/* TRANG ĐĂNG NHẬP: Khi vào đường dẫn /login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        

        {/* Footer luôn hiện ở mọi trang */}
        <Footer />
      </div>
    </Router>
  );
}
export default App;