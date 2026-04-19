import React, { useState } from 'react';

const ProductInfo = ({ basicInfo, detailInfo }) => {
  const [openSection, setOpenSection] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleSection = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  return (
    <div className="product-info-component px-md-3">
      {/* Tên và Giá giữ nguyên */}
      <h2 className="fw-bold fs-3 mb-3">{basicInfo.name}</h2>
      <h3 className="fw-bold fs-4 mb-4">{basicInfo.price}</h3>

      <p className="status-stock" style={{color: '#d61c4e', fontWeight: '600'}}>Chỉ còn 2 sản phẩm - Sắp hết hàng</p>

      {/* 1. SỬA NÚT BẤM CHUYÊN NGHIỆP HƠN */}
      <div className="d-flex flex-column gap-2 mb-4">
        <button 
          className="btn w-100 py-3 fw-bold text-uppercase" 
          style={{ backgroundColor: '#111', color: '#fff', borderRadius: '0', border: 'none', letterSpacing: '1px' }}
        >
          Thêm vào giỏ hàng
        </button>
        <button 
          className="btn w-100 py-3 fw-bold text-uppercase" 
          style={{ backgroundColor: '#fff', color: '#111', borderRadius: '0', border: '1px solid #111', letterSpacing: '1px' }}
        >
          Mua ngay
        </button>
      </div>

      {/* 2. GIỮ NGUYÊN KHU VỰC THÊM MỚI (Yêu thích & Gói quà) */}
      <div className="extra-actions-container d-flex gap-4 mb-4">
        <div 
          className="action-link-item d-flex align-items-center gap-2" 
          style={{ cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <svg 
            className={`wishlist-heart-icon ${isFavorite ? 'active' : 'inactive'}`} 
            style={{ fill: isFavorite ? '#d61c4e' : 'none', stroke: isFavorite ? '#d61c4e' : '#111' }}
            width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>Lưu vào danh mục yêu thích</span>
        </div>

        <div className="action-link-item d-flex align-items-center gap-2" style={{ cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
          </svg>
          <span>Gói quà tặng <span className="text-decoration-underline">Xem chi tiết</span></span>
        </div>
      </div>

      {/* 3. GIỮ NGUYÊN ĐIỀU KIỆN DỊCH VỤ */}
      <div className="service-condition-box p-3 mb-4" style={{ backgroundColor: '#f6f6f6' }}>
        <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '14px' }}>Điều kiện dịch vụ:</h6>
        <div className="condition-text" style={{ fontSize: '13px', lineHeight: '1.8', fontWeight: '500' }}>
          + Bảo hành đổi 1-1 nếu sản phẩm gặp lỗi kỹ thuật từ nhà sản xuất...<br />
          + Sản phẩm khắc mua online cần thanh toán 100% trước khi thực hiện...<br />
          + Sản phẩm đã khắc theo yêu cầu không chấp nhận đổi - trả.
        </div>
      </div>

      {/* 4. VIẾT LẠI NỘI DUNG ACCORDION THỰC TẾ */}
      <div className="accordion-custom">
        {/* CHI TIẾT SẢN PHẨM */}
        <div className="accordion-item-custom border-top py-3">
          <div className="accordion-header-custom d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }} onClick={() => toggleSection('details')}>
            <h6 className="fw-bold m-0 text-uppercase" style={{ fontSize: '14px' }}>Chi tiết sản phẩm</h6>
            <span className="fs-4">{openSection === 'details' ? '−' : '+'}</span>
          </div>
          {openSection === 'details' && (
            <div className="accordion-content-custom pt-3" style={{ fontSize: '14px', lineHeight: '1.7' }}>
              <p className="mb-2">{detailInfo?.description || "Sản phẩm mang thiết kế tinh xảo, giúp tôn vinh vẻ đẹp cá tính và sang trọng của người sở hữu."}</p>
              <ul className="list-unstyled">
                <li className="mb-1"><strong>Bộ sưu tập:</strong> {detailInfo?.collection || "Pandora Moments"}</li>
                <li className="mb-1"><strong>Kim loại:</strong> {detailInfo?.material || "Bạc Sterling S925"}</li>
                <li className="mb-1"><strong>Đá:</strong> {detailInfo?.stone || "Cubic Zirconia"}</li>
                <li className="mb-1"><strong>Màu sắc:</strong> {detailInfo?.color || "Silver / White"}</li>
                <li><strong>Kích thước:</strong> {detailInfo?.size || "Tiêu chuẩn (Có thể điều chỉnh)"}</li>
              </ul>
            </div>
          )}
        </div>

        {/* CHÍNH SÁCH GIAO HÀNG */}
        <div className="accordion-item-custom border-top border-bottom py-3">
          <div className="accordion-header-custom d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }} onClick={() => toggleSection('policy')}>
            <h6 className="fw-bold m-0 text-uppercase" style={{ fontSize: '14px' }}>Giao hàng và Đổi trả</h6>
            <span className="fs-4">{openSection === 'policy' ? '−' : '+'}</span>
          </div>
          {openSection === 'policy' && (
            <div className="accordion-content-custom pt-3" style={{ fontSize: '14px', lineHeight: '1.7' }}>
              <p className="fw-bold mb-2">Chính sách vận chuyển:</p>
              <ul className="ps-3 mb-3">
                <li>Giao hàng tiêu chuẩn: 3 - 5 ngày làm việc (Miễn phí đơn từ 2.000.000đ).</li>
                <li>Giao hàng hỏa tốc: 2 - 4 giờ (Áp dụng tại nội thành Hà Nội & TP.HCM).</li>
              </ul>
              <p className="fw-bold mb-2">Chính sách đổi trả:</p>
              <ul className="ps-3">
                <li>Hỗ trợ đổi size hoặc mẫu khác trong vòng 15 ngày kể từ ngày nhận hàng.</li>
                <li>Sản phẩm đổi trả phải còn nguyên tem mác, hộp đựng và chưa qua sử dụng.</li>
                <li>Lưu ý: Không áp dụng đổi trả cho sản phẩm thuộc chương trình giảm giá trên 50%.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;