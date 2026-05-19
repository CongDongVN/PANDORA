import React from "react";
import { Link } from "react-router-dom";

/**
 * ProductCard Component - Giữ nguyên logic gốc, chỉ thêm hiệu ứng Hover Xem Nhanh
 */
const ProductCard = ({ product }) => {
  const {
    id,
    image,
    name,    
    price,   
    badge,   
    type     
  } = product;

  const processImagePath = (path) => {
    if (!path) return "/assets/img/placeholder.png"; 
    return path.startsWith("./") ? path.substring(1) : path;
  };

  return (
    <Link 
      to={`/product/${id}`} 
      className="text-decoration-none transition-all h-100 d-block"
      style={{ color: "inherit" }}
    >
      {/* Thêm class featured-product-card vào đây */}
      <div className="featured-product-card product-card h-100 border-0 d-flex flex-column bg-white shadow-sm-hover">
        
        {/* KHU VỰC HÌNH ẢNH - Thêm class featured-product-img-wrapper */}
        <div 
          className="featured-product-img-wrapper product-card__image-container position-relative bg-light overflow-hidden" 
          style={{ aspectRatio: "1/1" }}
        >
          <img 
            src={processImagePath(image)} 
            alt={name} 
            className="w-100 h-100 object-fit-contain transition-transform duration-500 img-hover" 
          />

          {/* CHỈ THÊM DUY NHẤT NÚT NÀY Ở ĐÂY */}
          <button className="featured-quick-view-btn">
             Xem nhanh
          </button>
          
          {badge && (
            <div 
              className="product-card__badge position-absolute top-0 start-0 m-2 px-2 py-1 text-white fw-bold shadow-sm" 
              style={{ 
                backgroundColor: "#f48fb1", 
                fontSize: "10px", 
                zIndex: 1, 
                borderRadius: "2px",
                textTransform: "uppercase"
              }}
            >
              {badge}
            </div>
          )}

          <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 1 }}>
              <i className="bi bi-heart text-secondary heart-icon" style={{ fontSize: "1.1rem" }}></i>
          </div>
        </div>

        {/* THÔNG TIN CHI TIẾT - Giữ nguyên hoàn toàn */}
        <div className="product-card__body pt-3 pb-2 d-flex flex-column flex-grow-1">
          <h6 
            className="product-card__title fw-bold mb-2 flex-grow-1 text-uppercase" 
            style={{ 
              fontSize: "13px", 
              color: "#111", 
              lineHeight: "1.5", 
              minHeight: "3em",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {name || "Sản phẩm Pandora"}
          </h6>
          
          <div className="product-card__price-wrapper mt-auto">
             <span 
               className="product-card__price--current fw-bold" 
               style={{ color: "#d61c4e", fontSize: "15px" }}
             >
               {price}
             </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;