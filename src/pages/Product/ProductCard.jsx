import React from 'react';
// 1. Nhập công cụ Link
import { Link } from 'react-router-dom';
import './product.css';

const ProductCard = ({ product }) => {
  return (
    // 2. Bọc toàn bộ bằng thẻ Link để có thể click chuyển trang
    <Link 
      to={`/product/${product.id}`} 
      style={{ textDecoration: 'none', color: 'inherit' }} // Giữ nguyên màu chữ, không bị gạch chân
      onClick={() => window.scrollTo(0, 0)} // Cuộn lên đầu khi sang trang mới
    >
      <div className="product-card">
        <div className="product-image-area">
          {/* Nhãn sản phẩm (Badge) */}
          {product.badge && (
            <span className="badge">{product.badge}</span>
          )}
          
          {/* Nút thả tim (Wishlist) */}
          <button 
            className="wishlist-btn"
            onClick={(e) => {
              // 3. Ngăn chặn chuyển trang khi chỉ muốn bấm thả tim (Đúng chuẩn)
              e.preventDefault(); 
              alert('Đã thêm vào mục yêu thích!');
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          {/* NÚT XEM NHANH: Đã xóa thuộc tính onClick chặn chuyển trang */}
          <button className="quick-view-btn">
            XEM NHANH
          </button>

          {/* Ảnh sản phẩm */}
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }} 
          />
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">{product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;