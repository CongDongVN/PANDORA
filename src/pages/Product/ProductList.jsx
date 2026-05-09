import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./product.css";

// 1. Chuyển hàm helper ra ngoài component để tránh khởi tạo lại mỗi lần render
const slugify = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD") // Chuẩn hóa Unicode để tách dấu
    .replace(/[\u0300-\u036f]/g, "") // Xóa các ký tự dấu
    .replace(/[đĐ]/g, "d")
    .replace(/([^0-9a-z-\s])/g, "")
    .replace(/(\s+)/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const ProductList = ({ categoryType }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  // 2. Hàm gọi API được bọc trong useCallback để tối ưu hiệu năng
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://localhost:7221/api/Products");
      const allData = Array.isArray(response.data) ? response.data : [];

      if (!categoryType) {
        setProducts(allData);
      } else {
        const targetSlug = slugify(categoryType);
        
        // Lọc linh hoạt cho mọi loại sản phẩm (Nhẫn, Dây chuyền, Hoa tai...)
        const filtered = allData.filter((p) => {
          const apiSlug = slugify(p.categoryName || "");
          // So sánh khớp hoàn toàn hoặc chứa nhau để hỗ trợ số ít/số nhiều (Charm/Charms)
          return apiSlug === targetSlug || apiSlug.includes(targetSlug) || targetSlug.includes(apiSlug);
        });
        
        setProducts(filtered);
      }
    } catch (error) {
      console.error("Lỗi API:", error);
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  }, [categoryType]);

  useEffect(() => {
    setVisibleCount(12); // Reset khi đổi danh mục
    fetchProducts();
  }, [fetchProducts]);

  // 3. Sử dụng useMemo để tính toán danh sách hiển thị, giúp app mượt hơn
  const productsToShow = useMemo(() => {
    return products.slice(0, visibleCount);
  }, [products, visibleCount]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 12);

  // Giao diện Loading chuyên nghiệp hơn
  if (loading) {
    return (
      <div className="text-center py-5 my-5">
        <div className="spinner-grow text-dark" role="status"></div>
        <p className="mt-3 text-uppercase fw-bold" style={{ fontSize: '12px', letterSpacing: '2px' }}>
          Đang tải dữ liệu...
        </p>
      </div>
    );
  }

  return (
    <div className="product-list-area">
      {/* Header Section */}
      <div className="product-list-topbar mb-4 d-flex justify-content-between align-items-end border-bottom pb-3">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <li className="breadcrumb-item">Trang chủ</li>
              <li className="breadcrumb-item active" aria-current="page">
                {categoryType || "Tất cả sản phẩm"}
              </li>
            </ol>
          </nav>
          <h2 className="h3 mb-0 fw-bold text-uppercase">
            {categoryType || "Bộ sưu tập mới"}
          </h2>
        </div>
        <span className="text-muted" style={{ fontSize: "13px" }}>
          Hiển thị <strong>{productsToShow.length}</strong> / {products.length} sản phẩm
        </span>
      </div>

      {/* Grid Sản phẩm */}
      <div className="product-list-grid">
        {products.length > 0 ? (
          productsToShow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="text-center w-100 py-5 my-5 border" style={{ gridColumn: "1 / -1", backgroundColor: "#f9f9f9" }}>
             <i className="bi bi-search mb-3 d-block" style={{ fontSize: '2.5rem', color: '#ccc' }}></i>
             <h5 className="fw-bold">KHÔNG TÌM THẤY SẢN PHẨM</h5>
             <p className="text-muted small">Chúng tôi chưa có sản phẩm nào cho danh mục "{categoryType}".</p>
             <button className="btn btn-outline-dark btn-sm mt-3 px-4" onClick={() => window.location.href = "/products"}>
                QUAY LẠI CỬA HÀNG
             </button>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < products.length && (
        <div className="mt-5 text-center">
          <button 
            className="btn btn-dark px-5 py-2 position-relative" 
            onClick={handleLoadMore} 
            style={{ borderRadius: '0', fontSize: '13px', fontWeight: '600', letterSpacing: '2px' }}
          >
            XEM THÊM
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;