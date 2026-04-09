import React from "react";
import CategoryList from "../Product/CategoryList";
import SidebarFilter from "../Product/SidebarFilter";
import ProductList from "../Product/ProductList";
import "../Product/product.css";

const CharmPage = () => {
  // 1. Chỉ định rõ loại danh mục cho trang này là 'charm'
  const categoryType = "charm";

  // 2. Cài đặt đường dẫn ảnh banner dành riêng cho trang Charm
  const currentBanner = "/banners/banner-charm.jpg";

  return (
    <div className="product-page-container">
      {/* KHU VỰC BANNER */}
      <section className="banner-section mb-4">
        <img src={currentBanner} alt="Banner Charm" className="w-100 d-block" />
      </section>

      <div className="container">
        {/* KHU VỰC DANH MỤC CON */}
        <section className="category-section">
          {/* Truyền tờ giấy ghi chú 'charm' cho CategoryList */}
          <CategoryList categoryType={categoryType} />
        </section>

        {/* KHU VỰC NỘI DUNG CHÍNH (Sidebar + Lưới sản phẩm) */}
        <section className="main-content-section d-flex align-items-start gap-4 mt-4">
          {/* Bộ lọc bên trái */}
          <aside className="sidebar" style={{ width: "25%" }}>
            <SidebarFilter />
          </aside>

          {/* Danh sách sản phẩm bên phải */}
          <main className="product-list-area" style={{ width: "75%" }}>
            {/* Truyền tờ giấy ghi chú 'vong-tay' cho ProductList */}
            <ProductList categoryType={categoryType} />
          </main>
        </section>
      </div>
    </div>
  );
};

export default CharmPage;
