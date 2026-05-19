import React from 'react';
import { Link } from 'react-router-dom';

const MegaMenu = () => {
  const categories = [
    { name: 'Bộ sưu tập', path: '/collection' },
    { name: 'Trang sức', path: '/jewelry' },
    { name: 'Vòng tay', path: '/vong-tay' },
    { name: 'Charms', path: '/charm' },
    { name: 'Dây chuyền', path: '/day-chuyen' },
    { name: 'Hoa tai', path: '/hoa-tai' },
    { name: 'Nhẫn', path: '/nhan' },
  ];

  return (
    <div 
      className="bg-white shadow-sm mega-menu-custom"
      style={{ 
        position: 'fixed', // Dùng fixed để nó không bị phụ thuộc vào thẻ li cha
        top: 'auto',       // Để nó tự động hít vào dưới Navbar
        left: 0,
        right: 0,
        width: '100vw',
        zIndex: 10000,
        padding: '40px 0',
        borderTop: '1px solid #ff9ea2',
        borderBottom: '3px solid #ff9ea2'
      }}
    >
      <div className="container">
        <div className="row">
          {/* Cột 1: DANH MỤC */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-4" style={{ color: '#ff9ea2' }}>TẤT CẢ SẢN PHẨM</h6>
            <ul className="list-unstyled lh-lg" style={{ fontSize: '14px' }}>
              {categories.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="text-decoration-none text-dark hover-pink">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 2: GỢI Ý (Thêm cho đẹp bố cục) */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-4" style={{ color: '#ff9ea2' }}>TÀI KHOẢN</h6>
            <ul className="list-unstyled lh-lg" style={{ fontSize: '14px' }}>
              <li><Link to="/useracc" className="text-decoration-none text-dark hover-pink">Trang cá nhân</Link></li>
              <li><Link to="/cart" className="text-decoration-none text-dark hover-pink">Giỏ hàng</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;