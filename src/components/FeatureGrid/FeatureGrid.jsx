import React from 'react';
import './FeatureGrid.css'; // Đảm bảo bạn đã tạo file CSS này

const FeatureGrid = () => {
  return (
    <section className="feature-grid-section container mt-5 mb-5 px-0">
      <div className="row g-4 justify-content-center">
        {/* --- Cột bên trái: Tiêu đề --- */}
        <div className="col-12 col-lg-3 d-flex align-items-start pt-lg-5 feature-title-container">
          <h1 className="display-5 fw-bold text-dark feature-main-title">
            Dẫn Lối<br />Yêu<br />Thương...
          </h1>
        </div>

        {/* --- Cột bên phải: Hệ thống lưới ảnh --- */}
        <div className="col-12 col-lg-9">
          <div className="row g-4">
            {/* Cột nhỏ 1 */}
            <div className="col-6 col-md-4">
              <div className="feature-item mb-4">
                <img src="/assets/img/Khuvuon.png" alt="Khu vườn ký ức" className="img-fluid" />
                <div className="feature-label-overlay">
                  <span className="feature-label-text">KHU VƯỜN KÝ ỨC</span>
                </div>
              </div>
              <div className="feature-item">
                <img src="/assets/img/Vietnamcharm.png" alt="Vietnam Charm" className="img-fluid" />
                {/* --- MỚI: Thêm Label ở đây --- */}
                <div className="feature-label-overlay label-bottom-left">
                  <span className="feature-label-text">TỰ HÀO SẮC VIỆT</span>
                </div>
              </div>
            </div>

            {/* Cột nhỏ 2 (Cột cao ở giữa) */}
            <div className="col-6 col-md-4 order-md-2 order-3">
              <div className="feature-item mb-4">
                <img src="/assets/img/Mokhoa.png" alt="Mở khoá yêu thương" className="img-fluid" />
                <div className="feature-label-overlay">
                  <span className="feature-label-text">MỞ KHOÁ YÊU THƯƠNG</span>
                </div>
              </div>
              <div className="feature-item feature-item-tall">
                <img src="/assets/img/Luugiukhoanhkhac.png" alt="Charms collection" className="img-fluid" />
                {/* --- MỚI: Thêm Label ở đây --- */}
                <div className="feature-label-overlay label-bottom-left">
                  <span className="feature-label-text">LƯU GIỮ KHOẢNH KHẮC</span>
                </div>
              </div>
            </div>

            {/* Cột nhỏ 3 */}
            <div className="col-6 col-md-4 order-md-3 order-2">
              <div className="feature-item mb-4">
                <img src="/assets/img/Trantrong.png" alt="Trân trọng chính mình" className="img-fluid" />
                <div className="feature-label-overlay">
                  <span className="feature-label-text">TRÂN TRỌNG CHÍNH MÌNH</span>
                </div>
              </div>
              <div className="feature-item">
                <img src="/assets/img/Guitron.png" alt="Butterfly" className="img-fluid" />
                {/* --- MỚI: Thêm Label ở đây --- */}
                <div className="feature-label-overlay label-bottom-left">
                  <span className="feature-label-text">GỬI TRỌN TÂM TÌNH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;