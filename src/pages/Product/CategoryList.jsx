import React from 'react';
import ProductCard from './ProductCard'; // Đảm bảo import đúng thẻ sản phẩm

const CategoryList = ({ 
  title, 
  data, 
  showCategories = true, // Mặc định là hiện, trang nào muốn ẩn thì truyền false
  categoryType 
}) => {

  // Hàm đổi tên động cho Breadcrumb
  const getDisplayName = (type) => {
    switch (type) {
      case 'vong-tay': return 'Vòng tay';
      case 'hoa-tai': return 'Hoa tai';
      case 'day-chuyen': return 'Dây chuyền';
      case 'charm': return 'Charm';
      case 'nhan': return 'Nhẫn';
      default: return title || 'Sản phẩm';
    }
  };

  return (
    <div className="category-container text-start mb-5 container">
      
      {/* 1. BREADCRUMB - Chỉ hiện khi showCategories = true */}
      {showCategories && (
        <div className="breadcrumb mt-4 mb-4" style={{ fontSize: '14px' }}>
          <span className="text-secondary">Trang chủ</span>
          <span className="mx-2 text-secondary">&gt;</span>
          <strong className="text-dark">{getDisplayName(categoryType)}</strong>
        </div>
      )}

      {/* 2. TIÊU ĐỀ TRANG (Ví dụ: TẤT CẢ BỘ SƯU TẬP) */}
      {!showCategories && (
        <h2 className="text-center text-uppercase fw-bold mt-5 mb-5">{title}</h2>
      )}

      {/* 3. KHU VỰC BỘ LỌC (FILTER) - Luôn hiển thị */}
      <div className="filter-bar mb-4 border-bottom pb-3">
        <button className="btn btn-outline-dark btn-sm fw-bold">BỘ LỌC ▽</button>
      </div>

      {/* 4. DANH SÁCH SẢN PHẨM - Hiển thị 4 cột ngang */}
      <div className="product-list-grid">
        {data && data.length > 0 ? (
          data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center w-100">Đang cập nhật sản phẩm...</p>
        )}
      </div>

    </div>
  );
};

export default CategoryList;