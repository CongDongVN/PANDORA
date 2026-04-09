import React, { useState } from 'react';

const ProductInfo = ({ basicInfo, detailInfo }) => {
  const [openSection, setOpenSection] = useState(null);
  
  // 1. Tạo biến bộ nhớ để theo dõi trạng thái Yêu thích (Thả tim)
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleSection = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  return (
    <div className="product-info-component px-md-3">
      <h2 className="fw-bold fs-3 mb-3">{basicInfo.name}</h2>
      <h3 className="fw-bold fs-4 mb-4">{basicInfo.price}</h3>

      <p className="status-stock">Chỉ còn 2 sản phẩm</p>

      <div className="d-flex flex-column gap-3">
        <button className="btn btn-outline-dark btn-action">Mua ngay</button>
        <button className="btn btn-outline-dark btn-action">Thêm vào giỏ</button>
      </div>

      {/* 2. KHU VỰC THÊM MỚI: Yêu thích & Gói quà */}
      <div className="extra-actions-container">
        
        {/* Nút: Lưu vào danh mục yêu thích */}
        <div 
          className="action-link-item" 
          onClick={() => setIsFavorite(!isFavorite)} // Bấm vào để đảo ngược trạng thái (True/False)
        >
          {/* Icon Trái tim dạng SVG */}
          <svg 
            className={`wishlist-heart-icon ${isFavorite ? 'active' : 'inactive'}`} 
            width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>Lưu vào danh mục yêu thích</span>
        </div>

        {/* Nút: Gói quà tặng */}
        <div className="action-link-item" onClick={() => alert("Mở bảng thông tin gói quà!")}>
          {/* Icon Hộp quà dạng SVG */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
          </svg>
          <span>Gói quà tặng Xem chi tiết</span>
        </div>

      </div>
      {/* Kết thúc khu vực thêm mới */}

      <div className="service-condition-box">
        <h6 className="fw-bold text-uppercase mb-3">Điều kiện dịch vụ:</h6>
        <div className="condition-text">
          + Bảo hành đổi 1-1 nếu sản phẩm gặp lỗi kỹ thuật...<br />
          + Sản phẩm khắc mua online cần thanh toán 100%...<br />
          + Sản phẩm đã khắc không chấp nhận đổi - trả.
        </div>
      </div>

      <div className="accordion-custom">
        <div className="accordion-item-custom">
          <div className="accordion-header-custom" onClick={() => toggleSection('details')}>
            <h6 className="fw-bold m-0 text-uppercase">Chi tiết sản phẩm</h6>
            <span className="fs-4">{openSection === 'details' ? '−' : '+'}</span>
          </div>
          {openSection === 'details' && (
            <div className="accordion-content-custom">
              <p>{detailInfo?.description || "Đang cập nhật nội dung..."}</p>
              <p>Chất liệu: <strong>{detailInfo?.material || "Bạc 925"}</strong></p>
            </div>
          )}
        </div>

        <div className="accordion-item-custom border-bottom">
          <div className="accordion-header-custom" onClick={() => toggleSection('policy')}>
            <h6 className="fw-bold m-0 text-uppercase">Chính sách giao hàng</h6>
            <span className="fs-4">{openSection === 'policy' ? '−' : '+'}</span>
          </div>
          {openSection === 'policy' && (
            <div className="accordion-content-custom">
              <p>- Miễn phí giao hàng cho đơn từ 2.000.000đ.</p>
              <p>- Đổi trả trong vòng 15 ngày.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;