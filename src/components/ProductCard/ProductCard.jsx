import React from 'react';

const ProductCard = ({ product }) => {
  const { 
    image, 
    title, 
    salePrice, 
    originalPrice, 
    discount, 
    tag, 
    hasEngraving, 
    colors 
  } = product;

  return (
    <div className="product-card h-100 border-0 d-flex flex-column" style={{ background: '#fff' }}>
      {/* Phần hình ảnh và Badge */}
      <div className="product-card__image-container position-relative bg-light overflow-hidden" 
           style={{ aspectRatio: '1/1' }}>
        <img 
          src={image} 
          alt={title} 
          className="w-100 h-100 object-fit-contain transition-all" 
        />
        
        {/* Badge của bộ sưu tập */}
        {tag && (
          <div className="product-card__badge position-absolute top-0 start-0 m-2 px-2 py-1 text-white fw-bold shadow-sm"
               style={{ backgroundColor: '#f4a4ac', fontSize: '10px', zIndex: 1 }}>
            {tag}
          </div>
        )}

        {/* Nút yêu thích */}
        <button className="product-card__wishlist position-absolute top-0 end-0 m-2 border-0 bg-transparent" style={{ zIndex: 1 }}>
          <i className="bi bi-heart text-secondary" style={{ fontSize: '1.2rem' }}></i>
        </button>
      </div>

      {/* Phần thông tin chi tiết */}
      <div className="product-card__body pt-3 pb-2 d-flex flex-column flex-grow-1">
        
        {/* Lựa chọn màu sắc */}
        {colors && colors.length > 0 && (
          <div className="product-card__colors d-flex gap-2 mb-2">
            {colors.map((color, idx) => (
              <div 
                key={idx} 
                className="rounded-circle border border-secondary-subtle shadow-sm" 
                style={{ width: '14px', height: '14px', backgroundColor: color, cursor: 'pointer' }}
              ></div>
            ))}
          </div>
        )}

        {/* Nhãn khắc thông điệp */}
        {hasEngraving && (
          <div className="product-card__engraving mb-1 fw-bold" style={{ color: '#d61c4e', fontSize: '10px' }}>
            <span className="text-muted me-1">✎</span> KHẮC THÔNG ĐIỆP
          </div>
        )}

        {/* Tiêu đề sản phẩm */}
        <h6 className="product-card__title fw-bold mb-3 flex-grow-1" 
            style={{ fontSize: '14px', color: '#222', lineHeight: '1.4' }}>
          {title}
        </h6>

        {/* Cụm giá tiền */}
        <div className="product-card__price-wrapper d-flex align-items-center gap-2 mt-auto">
          <span className="product-card__price--current fw-bold" style={{ color: '#d61c4e' }}>
            {salePrice}
          </span>
          {originalPrice && (
            <small className="product-card__price--original text-muted text-decoration-line-through">
              {originalPrice}
            </small>
          )}
          {discount && (
            <span className="product-card__discount badge rounded-0 px-1" 
                  style={{ backgroundColor: '#d61c4e', fontSize: '10px' }}>
              {discount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;