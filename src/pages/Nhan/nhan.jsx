import React from "react";
import CategoryList from "../Product/CategoryList";
import SidebarFilter from "../Product/SidebarFilter";
import ProductList from "../Product/ProductList";
import "../Product/product.css";

const NhanPage = () => { // Đổi tên Component tương ứng (VongTayPage, CharmPage...)
  const categoryType = "nhan"; // Đổi 'nhan', 'charm', 'day-chuyen'...
  const currentBanner = "/banners/banner-nhan.jpg";

  return (
    <div className="product-page-container">
      {/* 1. KHU VỰC BANNER */}
      <section className="banner-section mb-4">
        <img src={currentBanner} alt={`Banner ${categoryType}`} className="img-fluid w-100 d-block" />
      </section>

      <div className="container">
        {/* 2. KHU VỰC DANH MỤC TRÒN */}
        <section className="category-section">
          <CategoryList categoryType={categoryType} />
        </section>

        {/* 3. KHU VỰC CHÍNH (Sử dụng chuẩn Bootstrap Grid cho Reponsive) */}
        <section className="product-main-layout mt-5">
          <div className="row">
            
            {/* CỘT TRÁI: SIDEBAR (Chiếm 3/12) */}
            <aside className="col-lg-3 col-md-4 mb-4">
              {/* Class .sidebar-filter-wrapper ở trong file CSS đã có sẵn sticky */}
              <SidebarFilter />
            </aside>

            {/* CỘT PHẢI: LƯỚI SẢN PHẨM (Chiếm 9/12) */}
            <main className="col-lg-9 col-md-8">
              <ProductList categoryType={categoryType} />
            </main>
            
          </div>
        </section>
      </div>
    </div>
  );
};

export default NhanPage;