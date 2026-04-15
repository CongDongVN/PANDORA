import React from 'react';

const MegaMenu = () => {
  return (
    <div 
      className="bg-white border-top border-bottom shadow-sm"
      style={{ 
  // --- CÁC THUỘC TÍNH QUAN TRỌNG ĐỂ FULL-WIDTH ---
        position: 'absolute',
        top: '100%',        // Nằm ngay dưới thanh nav
        left: '50%',        // Di chuyển sang phải 50% chiều rộng thẻ cha
        transform: 'translateX(-50%)', // Di chuyển ngược lại sang trái 50% chiều rộng chính nó
        width: '100vw',     // Rộng 100% chiều rộng trình duyệt
        zIndex: 1000,
        // -----------------------------------------------
        padding: '40px 0',
        borderTop: '1px solid #eee'
  }}
    >
      <div className="container mega-menu-container">
        <div className="row">
          {/* Cột 1: TẤT CẢ SẢN PHẨM */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-4">TẤT CẢ SẢN PHẨM</h6>
            <ul className="list-unstyled lh-lg" style={{ fontSize: '14px' }}>
              <li><a href="#" className="text-decoration-none text-dark hover-pink">Vòng tay</a></li>
              <li><a href="#" className="text-decoration-none text-dark hover-pink">Charms</a></li>
              <li><a href="#" className="text-decoration-none text-dark hover-pink">Dây chuyền</a></li>
              <li><a href="#" className="text-decoration-none text-dark hover-pink">Hoa tai</a></li>
              <li><a href="#" className="text-decoration-none text-dark hover-pink">Nhẫn</a></li>
            </ul>
          </div>

          {/* Cột 2: MỨC GIÁ */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-4">MỨC GIÁ</h6>
            <ul className="list-unstyled lh-lg" style={{ fontSize: '14px' }}>
              <li><a href="#" className="text-decoration-none text-dark">Dưới 990.000đ</a></li>
              <li><a href="#" className="text-decoration-none text-dark">Dưới 2 Triệu</a></li>
              <li><a href="#" className="text-decoration-none text-dark">Từ 2-4 Triệu</a></li>
              <li><a href="#" className="text-decoration-none text-dark">Từ 4-6 Triệu</a></li>
              <li><a href="#" className="text-decoration-none text-dark">Từ 6-10 Triệu</a></li>
              <li><a href="#" className="text-decoration-none text-dark">Trên 10 Triệu</a></li>
            </ul>
          </div>

          {/* Cột 3: MONO X YOU */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-4">MONO X YOU</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;