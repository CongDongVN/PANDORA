import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/categoriesData';
import ProductCard from '../Product/ProductCard';

const RelatedProducts = ({ currentCategory, currentProductId }) => {
  const [displayList, setDisplayList] = useState([]);
  
  // 1. THÊM MỚI: Biến lưu trữ tên hiệu ứng (class)
  const [animClass, setAnimClass] = useState('');

  useEffect(() => {
    const filtered = products.filter(
      (item) => item.type === currentCategory && item.id !== currentProductId
    );
    setDisplayList(filtered);
  }, [currentCategory, currentProductId]);

  if (displayList.length === 0) return null;

  const slide = (direction) => {
    // 2. KÍCH HOẠT HIỆU ỨNG: Gắn class tương ứng với hướng bấm
    setAnimClass(direction === 'left' ? 'slide-anim-left' : 'slide-anim-right');

    // 3. Tự động xóa class sau 0.3s (đúng bằng thời gian CSS chạy) 
    // để lần bấm tiếp theo hiệu ứng có thể chạy lại
    setTimeout(() => {
      setAnimClass('');
    }, 300);

    // Thuật toán xoay vòng mảng giữ nguyên
    if (direction === 'left') {
      setDisplayList((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    } else {
      setDisplayList((prev) => [...prev.slice(1), prev[0]]);
    }
  };

  const visibleProducts = displayList.slice(0, 4);

  return (
    <div className="related-products-component mt-5 pt-5 mb-5 position-relative">
      <h3 className="text-center text-uppercase fw-bold mb-5 fs-4">Sản phẩm cùng loại</h3>
      
      <button 
        onClick={() => slide('left')} 
        className="btn btn-light rounded-circle position-absolute shadow border"
        style={{ top: '50%', left: '0', transform: 'translateY(-50%)', zIndex: 10, width: '45px', height: '45px' }}
      >
        &#10094;
      </button>

      <button 
        onClick={() => slide('right')} 
        className="btn btn-light rounded-circle position-absolute shadow border"
        style={{ top: '50%', right: '0', transform: 'translateY(-50%)', zIndex: 10, width: '45px', height: '45px' }}
      >
        &#10095;
      </button>

      {/* 4. GẮN HIỆU ỨNG VÀO KHUNG: Chèn biến animClass vào đây */}
      <div className={`slider-container ${animClass}`}>
        {visibleProducts.map((product) => (
          
          <div key={product.id} className="slider-item">
            <div className="card border-0 h-100 product-card-hover">
              
              <div className="slider-img-wrapper">
                <span className="position-absolute top-0 end-0 p-2 fs-5" style={{ cursor: 'pointer', zIndex: 2 }}>♡</span>
                
                <Link to={`/san-pham/${product.id}`} onClick={() => window.scrollTo(0, 0)} style={{ width: '100%', height: '100%' }}>
                  <img src={product.image} alt={product.name} />
                </Link>
                
                <div className="quick-view-box position-absolute bottom-0 start-0 w-100 p-2">
                  <Link 
                    to={`/san-pham/${product.id}`} 
                    onClick={() => window.scrollTo(0, 0)}
                    className="btn w-100 fw-bold rounded-0" 
                    style={{ backgroundColor: '#111', color: '#fff', border: 'none', display: 'block' }}
                  >
                    XEM NHANH
                  </Link>
                </div>
              </div>

              <Link to={`/san-pham/${product.id}`} className="text-decoration-none text-dark" onClick={() => window.scrollTo(0, 0)}>
                <div className="card-body p-0 mt-3">
                  <div className="rounded-circle border border-secondary mb-2" style={{ width: '18px', height: '18px', backgroundColor: '#eaddc5' }}></div>
                  
                  {product.badge && (
                    <span className="badge mb-2 me-2" style={{ backgroundColor: '#f48fb1', fontSize: '10px' }}>
                      {product.badge}
                    </span>
                  )}
                  
                  <h6 className="fw-bold mb-2" style={{ fontSize: '14px', lineHeight: '1.4' }}>{product.name}</h6>
                  <p className="fw-bold mb-0 text-dark" style={{ fontSize: '14px' }}>{product.price}</p>
                </div>
              </Link>

            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;