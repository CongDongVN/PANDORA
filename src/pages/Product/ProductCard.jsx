import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';

const ProductCard = ({ product }) => {
  // 1. Xử lý ảnh: Kiểm tra kỹ tên trường từ API (có thể là product.image thay vì imageUrls)
  const imageUrl = product.imageUrls && product.imageUrls.length > 0 
    ? encodeURI(product.imageUrls[0]) 
    : 'https://via.placeholder.com/400';

  // 2. Định dạng tiền tệ: Thêm mặc định || 0 để tránh lỗi NaN
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.price || 0);

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="product-card-link" 
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} 
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="product-card">
        <div className="product-card-img-wrapper">
          {/* Badge trạng thái */}
          {product.status && <span className="badge-top-left">{product.status}</span>}
          
          <img src={imageUrl} alt={product.name} loading="lazy" />
          
          {/* Đổi button thành span để tránh lỗi lồng thẻ <a> */}
          <span className="quick-view-btn">XEM NHANH</span>
        </div>

        <div className="product-info">
          <div className="product-tags">
            <span className="tag-item">INBOX ĐẶT HÀNG</span>
          </div>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price">
            {product.price ? formattedPrice : "Liên hệ"}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;