import React, { useState } from "react"; // BƯỚC QUAN TRỌNG: Import thêm useState
import ProductCard from "./ProductCard";
import { products } from "../../data/categoriesData";
import "./product.css";

const ProductList = ({ categoryType, data }) => {
  // 1. TẠO STATE QUẢN LÝ SỐ LƯỢNG HIỂN THỊ (Mặc định là 12)
  const [visibleCount, setVisibleCount] = useState(12);

  // Logic lọc dữ liệu (Giữ nguyên của bạn)
  let filteredProducts = data;
  if (!filteredProducts) {
    filteredProducts = categoryType
      ? products.filter((product) => product.type === categoryType)
      : products;
  }

  // 2. CHỈ LẤY ĐÚNG SỐ LƯỢNG SẢN PHẨM CẦN HIỂN THỊ
  // Hàm slice(0, 12) sẽ cắt từ vị trí 0 đến 12. Khi bấm xem thêm nó sẽ cắt từ 0 đến 24...
  const productsToShow = filteredProducts.slice(0, visibleCount);

  // 3. HÀM XỬ LÝ KHI BẤM NÚT "XEM THÊM"
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12); // Cộng thêm 12 vào số lượng hiện tại
  };

  return (
    <div className="product-list-area">
      {/* THANH TOPBAR */}
      <div className="product-list-topbar mb-3">
        <span
          className="product-count"
          style={{ fontSize: "14px", fontWeight: "500", color: "#555" }}
        >
          Đang hiển thị{" "}
          <strong style={{ color: "#111" }}>{productsToShow.length}</strong> /{" "}
          {filteredProducts.length} sản phẩm
        </span>
      </div>

      {/* LƯỚI SẢN PHẨM */}
      <div className="product-list-grid">
        {productsToShow.length > 0 ? (
          // Chú ý: Map qua mảng productsToShow thay vì mảng gốc
          productsToShow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div
            className="text-center w-100 py-5"
            style={{ gridColumn: "1 / -1" }}
          >
            <p className="text-muted">Không tìm thấy sản phẩm nào.</p>
          </div>
        )}
      </div>

      {/* 4. HIỂN THỊ NÚT XEM THÊM */}
      {/* Chỉ hiển thị nút này nếu số lượng đang hiện nhỏ hơn tổng số sản phẩm */}
      {visibleCount < filteredProducts.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            XEM THÊM
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
