import React from 'react';
import { categories } from '../../data/categoriesData'; 

const CategoryList = ({ 
  title, 
  showCategories = true, 
  categoryType 
}) => {

  const currentSubCategories = categories.filter(cat => cat.type === categoryType);

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
      
      {/* BREADCRUMB */}
      {showCategories && (
        <div className="breadcrumb mt-4 mb-4" style={{ fontSize: '14px' }}>
          <span className="text-secondary">Trang chủ</span>
          <span className="mx-2 text-secondary">&gt;</span>
          <strong className="text-dark">{getDisplayName(categoryType)}</strong>
        </div>
      )}

      {/* DANH MỤC TRÒN */}
      {showCategories && currentSubCategories.length > 0 && (
        <div className="category-showcase-container pt-3">
          <div className="category-grid">
            
            {currentSubCategories.map((cat) => (
              <div key={cat.id} className="d-flex flex-column align-items-center">
                
                <div className="category-box">
                  <img src={cat.image} alt={cat.name} />
                </div>
                
                <div className="category-title">{cat.name}</div>
                
              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  );
};

export default CategoryList;