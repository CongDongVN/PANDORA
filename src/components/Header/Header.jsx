import React, { useState } from 'react'; // 1. Thêm useState vào đây
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, Heart, GeoAlt, Person, Bag, X, ChevronDown } from 'react-bootstrap-icons';
import MegaMenu from './MegaMenu'; // 2. Đảm bảo bạn đã import file MegaMenu riêng

const PandoraHeader = () => {
  // 3. Khai báo state để quản lý ẩn hiện
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const navItems = [
    'BỘ SƯU TẬP MỚI', 'TRANG SỨC', 'VÒNG TAY', 
    'CHARMS', 'DÂY CHUYỀN', 'HOA TAI', 'NHẪN', 'QUÀ TẶNG'
  ];

  return (
    <header className="w-100 bg-white">
      {/* --- 1. Top Bar --- */}
      <div style={{ backgroundColor: '#ff9dae' }} className="py-2">
        <div className="container d-flex justify-content-center align-items-center position-relative">
          <p className="m-0 small text-uppercase text-dark" style={{ letterSpacing: '1px', fontSize: '12px' }}>
            <span className="fw-normal">Khắc thông điệp - Chạm cảm xúc</span> &nbsp; 
            <a href="#" className="fw-bold text-dark border-bottom border-dark text-decoration-none">KHÁM PHÁ NGAY</a>
          </p>
          <button type="button" className="btn border-0 position-absolute end-0 p-0 me-2">
            <X size={20} className="text-dark" />
          </button>
        </div>
      </div>

      {/* --- 2. Main Header --- */}
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-4">
            <h1 className="fw-bolder m-0" style={{ fontFamily: 'Times New Roman, serif', letterSpacing: '6px', fontSize: '32px' }}>
              PANDORA
            </h1>
          </div>
          <div className="col-md-8 d-flex justify-content-end align-items-center">
            <div className="position-relative me-4" style={{ width: '100%', maxWidth: '300px' }}>
              <input type="text" className="form-control rounded-0 border-dark-subtle pe-5 py-2" placeholder="Bạn cần tìm gì?" />
              <Search size={18} className="position-absolute end-0 top-50 translate-middle-y me-3 text-secondary" />
            </div>
            <div className="d-flex gap-4 align-items-center text-dark">
              <Heart size={22} /> <GeoAlt size={22} /> <Person size={24} />
              <div className="position-relative">
                <Bag size={22} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark" style={{ fontSize: '9px', padding: '4px 6px' }}>1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. Thanh Menu Navigation --- */}
      <nav className="border-top border-bottom bg-white sticky-top">
        <div className="container position-relative"> {/* Thêm position-relative ở đây */}
          <ul className="nav d-flex align-items-center list-unstyled m-0 p-0 text-uppercase" style={{ gap: '1.5rem' }}>
            
            {navItems.map((item, index) => (
              <li 
                key={index} 
                className="nav-item"
                // 4. Thêm sự kiện Hover vào đây
                onMouseEnter={() => item === 'BỘ SƯU TẬP MỚI' && setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <a href="#" className="nav-link px-0 py-3 text-dark fw-bold small d-flex align-items-center" style={{ fontSize: '12px' }}>
                  {item}
                  <ChevronDown size={12} className="ms-1 text-secondary" />
                </a>

                {/* 5. Hiển thị MegaMenu nếu là mục "BỘ SƯU TẬP MỚI" và đang hover */}
                {item === 'BỘ SƯU TẬP MỚI' && showMegaMenu && <MegaMenu />}
              </li>
            ))}

          </ul>
        </div>
      </nav>
    </header>
  );
};

export default PandoraHeader;