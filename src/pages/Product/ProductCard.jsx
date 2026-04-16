import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';

const ProductCard = ({ product }) => {
  return (
    // Bọc toàn bộ Card bằng thẻ Link để có thể click ở bất kỳ đâu cũng sang trang Chi tiết
    <Link 
      to={`/product/${product.id}`} 
      style={{ textDecoration: 'none', color: 'inherit' }} 
      onClick={() => window.scrollTo(0, 0)} 
    >
      <div className="product-card">
        
        {/* --- 1. KHU VỰC HÌNH ẢNH (Bọc bởi class chuẩn của CSS) --- */}
        <div className="product-card-img-wrapper">
          
          {/* Nhãn sản phẩm (Badge) - Dùng class chuẩn, nếu data không có badge thì sẽ không hiện */}
          {product.badge && (
            <span className="badge-top-left">{product.badge}</span>
          )}
          
          {/* Nút thả tim (Wishlist) */}
          <button 
            className="wishlist-btn"
            onClick={(e) => {
              e.preventDefault(); // Ngăn chặn việc click tim bị nhảy sang trang khác
              alert('Đã thêm vào mục yêu thích!');
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          {/* Ảnh sản phẩm (Chúng ta bỏ style inline để CSS lo việc căn giữa và lọc viền) */}
          <img src={product.image} alt={product.name} />

          {/* Nút XEM NHANH: Nút này sẽ trượt từ dưới lên khi hover */}
          <button className="quick-view-btn">
            XEM NHANH
          </button>
        </div>

        {/* --- 2. KHU VỰC THÔNG TIN (TÊN, GIÁ) --- */}
        <div className="product-info">
          
          {/* Tag chữ nhật nhỏ */}
          <div className="product-tags">
             {/* Hiện tại mình tạo tag giả định giống target image, bạn có thể truyền từ data vào nếu thích */}
            <span className="tag-item">INBOX ĐẶT HÀNG</span>
          </div>

          {/* Tên sản phẩm - Sẽ tự động ép đậm theo CSS */}
          <h3 className="product-name">{product.name}</h3>
          
          {/* Giá tiền */}
          <div className="product-price">{product.price}</div>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;