import React from 'react';

const ProductGallery = ({ mainImage, galleryImages }) => {
  // 1. Gộp ảnh chính và các ảnh phụ thành một danh sách duy nhất
  const allImages = [mainImage, ...(galleryImages || [])];

  return (
    <div className="product-gallery-component">
      {/* 2. Tạo lưới Grid. 'g-3' là khoảng cách (gap) giữa các bức ảnh */}
      <div className="row g-3">
        
        {/* 3. Dùng vòng lặp map để in toàn bộ ảnh ra */}
        {allImages.map((imgUrl, index) => (
          <div key={index} className="col-12 col-md-6">
            
            {/* 4. Khung chứa ảnh: Đã xóa style={{...}} và p-4, chỉ gọi class từ file CSS */}
            <div className="gallery-img-wrapper">
              <img 
                src={imgUrl} 
                alt={`Sản phẩm góc nhìn ${index + 1}`} 
              />
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default ProductGallery;