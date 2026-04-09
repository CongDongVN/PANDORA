import React, { useState } from 'react';

const ProductReviews = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Hàm render thanh tiến trình
  const renderProgressBar = (starCount) => (
    <div className="progress-bar-container" key={starCount}>
      <div className="d-flex align-items-center gap-1" style={{ width: '45px' }}>
        <span className="fw-bold">{starCount}</span>
        <span style={{ color: '#f48fb1', fontSize: '14px' }}>★</span>
      </div>
      <div className="progress custom-progress rounded-pill">
        <div className="progress-bar bg-warning" style={{ width: '0%' }}></div>
      </div>
      <span className="text-muted" style={{ width: '30px', textAlign: 'right' }}>0</span>
    </div>
  );

  return (
    <div className="product-reviews-component mt-5 pt-5 mb-5 border-top">
      <h3 className="fw-bold mb-4 fs-4 text-uppercase">Đánh giá & Nhận xét</h3>

      {/* HỘP THỐNG KÊ ĐÁNH GIÁ (SUMMARY BOX) */}
      <div className="review-summary-box">
        <div className="row align-items-center text-center text-md-start">
          
          {/* Cột 1: Điểm tổng quan */}
          <div className="col-md-3 border-md-end mb-4 mb-md-0 d-flex flex-column align-items-center justify-content-center">
            <div className="rating-summary-big mb-2">
              0.0 <span className="rating-max">/ 5</span>
            </div>
            <div className="text-pink mb-1 fs-5">
              ★★★★★
            </div>
            <p className="text-muted small mb-0">Chưa có đánh giá nào</p>
          </div>

          {/* Cột 2: Chi tiết 5 thanh tiến trình */}
          <div className="col-md-5 border-md-end mb-4 mb-md-0 px-md-4">
            {[5, 4, 3, 2, 1].map(num => renderProgressBar(num))}
          </div>

          {/* Cột 3: Tương tác của người dùng */}
          <div className="col-md-4 text-center px-md-4">
            <h6 className="fw-bold mb-3">Chia sẻ nhận xét của bạn</h6>
            
            {/* Các ngôi sao tròn có thể bấm */}
            <div className="star-interaction-area">
              {[1, 2, 3, 4, 5].map((idx) => {
                const isActive = idx <= (hover || rating);
                return (
                  <div
                    key={idx}
                    onClick={() => setRating(idx)}
                    onMouseEnter={() => setHover(idx)}
                    onMouseLeave={() => setHover(0)}
                    className={`star-box ${isActive ? 'active' : 'inactive'}`}
                  >
                    <span className="fs-5">{isActive ? '★' : '★'}</span>
                  </div>
                );
              })}
            </div>
            
            <p className="text-muted small mb-3">Bạn đánh giá sản phẩm này bao nhiêu sao?</p>
            <button className="btn btn-dark w-100 rounded-pill fw-bold">VIẾT ĐÁNH GIÁ</button>
          </div>

        </div>
      </div>
      {/* KẾT THÚC HỘP THỐNG KÊ */}

    </div>
  );
};

export default ProductReviews;