import React from 'react';
// Import thẻ Link để điều hướng không tải lại trang
import { Link } from 'react-router-dom';

const MegaMenu = () => {
  // Danh sách sản phẩm khớp chính xác với Path trong App.jsx của bạn
  const categories = [
    { name: 'Bộ sưu tập', path: '/collection' },
    { name: 'Trang sức', path: '/jewelry' }, // Khớp với path="/vong-tay"
    { name: 'Vòng tay', path: '/vong-tay' },
    { name: 'Charms', path: '/charm' }, // Khớp với path="/charm"
    { name: 'Dây chuyền', path: '/day-chuyen' },
    { name: 'Hoa tai', path: '/hoa-tai' },
    { name: 'Nhẫn', path: '/nhan' },
  ];

  return (
    <div 
      className="bg-white border-top border-bottom shadow-sm"
      style={{ 
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        zIndex: 1000,
        padding: '40px 0',
      }}
    >
      <div className="container">
        <div className="row">
          {/* Cột 1: TẤT CẢ SẢN PHẨM */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-4">TẤT CẢ SẢN PHẨM</h6>
            <ul className="list-unstyled lh-lg" style={{ fontSize: '14px' }}>
              {categories.map((item, index) => (
                <li key={index}>
                  {/* Sử dụng Link thay cho thẻ a */}
                  <Link 
                    to={item.path} 
                    className="text-decoration-none text-dark hover-pink"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 2: TIỆN ÍCH HỆ THỐNG (Ví dụ kết nối với code đồng đội) */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-4">TÀI KHOẢN & GIỎ HÀNG</h6>
            <ul className="list-unstyled lh-lg" style={{ fontSize: '14px' }}>
              <li><Link to="/useracc" className="text-decoration-none text-dark">Trang cá nhân</Link></li>
              <li><Link to="/cart" className="text-decoration-none text-dark">Giỏ hàng của tôi</Link></li>
              <li><Link to="/StoreLocator" className="text-decoration-none text-dark">Hệ thống cửa hàng</Link></li>
            </ul>
          </div>

          {/* Cột 3: ADMIN (Chỉ ví dụ) */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-4">QUẢN TRỊ</h6>
            <Link to="/dasdboard" className="btn btn-sm btn-outline-dark">Đến Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;