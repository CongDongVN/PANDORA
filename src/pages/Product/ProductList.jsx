import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../../data/categoriesData';
import './product.css';

const ProductList = ({ categoryType, data }) => {
  
  // LOGIC CẬP NHẬT: 
  // 1. Nếu trang cha truyền vào 'data' (dùng cho Collection/Jewelry), ta dùng luôn data đó.
  // 2. Nếu không, ta mới thực hiện lọc theo 'categoryType' (dùng cho 5 trang đơn).
  // 3. Nếu cả hai đều không có, ta hiển thị toàn bộ products.
  
  let filteredProducts = data;

  if (!filteredProducts) {
    filteredProducts = categoryType 
      ? products.filter(product => product.type === categoryType)
      : products;
  }

  return (
    <div className="product-list-area">

      {/* THANH TOPBAR: Hiển thị số lượng sản phẩm thực tế sau khi lọc */}
      <div className="product-list-topbar">
        <span className="product-count">
          Đang hiển thị <strong>{filteredProducts.length}</strong> sản phẩm
        </span>
        <select className="sort-dropdown">
          <option value="new">Mới nhất</option>
          <option value="price-asc">Giá: Thấp đến Cao</option>
          <option value="price-desc">Giá: Cao đến Thấp</option>
        </select>
      </div>

      {/* LƯỚI SẢN PHẨM: Ép đúng cấu trúc Grid đã học */}
      <div className="products-grid-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="text-center w-100 py-5">
            <p className="text-muted">Không tìm thấy sản phẩm nào.</p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default ProductList;