import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, Heart, GeoAlt, Person, Bag, X, ChevronDown } from 'react-bootstrap-icons';
import MegaMenu from './MegaMenu';
// 1. Import Link từ react-router-dom
import { Link } from 'react-router-dom';

const PandoraHeader = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  // 2. Chuyển navItems thành mảng các object có chứa path
  // Các path này phải khớp chính xác với file App.jsx của bạn
  const navItems = [
    { name: 'BỘ SƯU TẬP MỚI', path: '/collection' },
    { name: 'TRANG SỨC', path: '/jewelry' },
    { name: 'VÒNG TAY', path: '/vong-tay' },
    { name: 'CHARMS', path: '/charm' },
    { name: 'DÂY CHUYỀN', path: '/day-chuyen' },
    { name: 'HOA TAI', path: '/hoa-tai' },
    { name: 'NHẪN', path: '/nhan' },
    { name: 'QUÀ TẶNG', path: '/collection' }, // Giả định dẫn về collection
  ];

  return (
    <header className="w-100 bg-white">
      {/* ... (Phần Top Bar và Main Header giữ nguyên) ... */}
      
      {/* --- 2. Main Header (Giữ nguyên phần Logo và Search của bạn) --- */}
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-4">
            {/* Click vào Logo để về trang chủ */}
            <Link to="/" className="text-decoration-none text-dark">
              <h1 className="fw-bolder m-0" style={{ fontFamily: 'Times New Roman, serif', letterSpacing: '6px', fontSize: '32px' }}>
                PANDORA
              </h1>
            </Link>
          </div>
          <div className="col-md-8 d-flex justify-content-end align-items-center">
            <div className="position-relative me-4" style={{ width: '100%', maxWidth: '300px' }}>
              <input type="text" className="form-control rounded-0 border-dark-subtle pe-5 py-2" placeholder="Bạn cần tìm gì?" />
              <Search size={18} className="position-absolute end-0 top-50 translate-middle-y me-3 text-secondary" />
            </div>
            <div className="d-flex gap-4 align-items-center text-dark">
              <Heart size={22} /> 
              <Link to="/StoreLocator" className="text-dark"><GeoAlt size={22} /></Link>
              <Link to="/useracc" className="text-dark"><Person size={24} /></Link>
              <div className="position-relative">
                <Link to="/cart" className="text-dark">
                  <Bag size={22} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark" style={{ fontSize: '9px', padding: '4px 6px' }}>1</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. Thanh Menu Navigation (Đã sửa để nhảy trang) --- */}
      <nav className="border-top border-bottom bg-white sticky-top">
        <div className="container position-relative">
          <ul className="nav d-flex align-items-center list-unstyled m-0 p-0 text-uppercase" style={{ gap: '1.5rem' }}>
            
            {navItems.map((item, index) => (
              <li 
                key={index} 
                className="nav-item"
                onMouseEnter={() => item.name === 'BỘ SƯU TẬP MỚI' && setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                {/* 3. Thay thẻ <a> bằng thẻ <Link> */}
                <Link 
                  to={item.path} 
                  className="nav-link px-0 py-3 text-dark fw-bold small d-flex align-items-center" 
                  style={{ fontSize: '12px' }}
                  // Tự động đóng MegaMenu khi click chuyển trang
                  onClick={() => setShowMegaMenu(false)}
                >
                  {item.name}
                  <ChevronDown size={12} className="ms-1 text-secondary" />
                </Link>

                {/* Hiển thị MegaMenu nếu đang hover vào BỘ SƯU TẬP MỚI */}
                {item.name === 'BỘ SƯU TẬP MỚI' && showMegaMenu && <MegaMenu />}
              </li>
            ))}

          </ul>
        </div>
      </nav>
    </header>
  );
};

export default PandoraHeader;