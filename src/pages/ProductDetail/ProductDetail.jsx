import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Import CSS
import './ProductDetail.css';

// Import dữ liệu từ các nguồn khác nhau
import { products } from '../../data/categoriesData';
import { productDetails } from '../../data/productDetailsData';
import { productsData, categories } from '../../data/homeData'; // Dữ liệu từ trang chủ

// Import 4 Component con
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';
import ProductReviews from './ProductReviews';

const ProductDetail = () => {
  const { id } = useParams();
  const productId = Number(id);

  // --- LOGIC TÌM KIẾM SẢN PHẨM TỪ MỌI NGUỒN ---
  const allPossibleProducts = [
    ...products,      
    ...productsData,  
    ...categories     
  ];

  const basicInfo = allPossibleProducts.find((item) => item.id === productId);
  const detailInfo = productDetails ? productDetails[productId] : null;

  // Cuộn lên đầu trang khi chuyển sản phẩm
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Nếu không tìm thấy sản phẩm
  if (!basicInfo) {
    return (
      <div className="container mt-5 pt-5 text-center" style={{ minHeight: '60vh' }}>
        <h2 className="fw-bold text-danger mb-3">Opps! Không tìm thấy sản phẩm.</h2>
        <Link to="/" className="btn btn-dark px-4 py-2">Quay lại Trang Chủ</Link>
      </div>
    );
  }

  const displayTitle = basicInfo.detailName || basicInfo.name || basicInfo.title;

  return (
    <div className="product-detail-page container">
      
      {/* 1. Breadcrumb */}
      <nav className="detail-breadcrumb mt-4 mb-4">
        <Link to="/" className="text-secondary text-decoration-none hover-dark fw-bold">Trang chủ</Link> / 
        <Link to={`/${basicInfo.type || ''}`} className="text-secondary text-decoration-none hover-dark fw-bold"> 
           {basicInfo.type ? basicInfo.type.replace('-', ' ') : 'Sản phẩm'}
        </Link> / 
        <span className="text-dark fw-bold">{displayTitle}</span>
      </nav>

      {/* 2. KHU VỰC NỘI DUNG CHÍNH */}
      <div className="product-main-layout">
        
        {/* Gallery Section */}
        <div className="gallery-section-wrapper">
          <ProductGallery 
            mainImage={basicInfo.image} 
            galleryImages={detailInfo ? detailInfo.gallery : []} 
          />
        </div>
        
        {/* Info Section - Phần này sẽ được sửa giao diện bên trong file ProductInfo.jsx */}
        <div className="info-section-wrapper">
          <ProductInfo 
            basicInfo={{...basicInfo, name: displayTitle}} 
            detailInfo={detailInfo} 
          />
        </div>
      </div>

      {/* 3. Khu vực Sản phẩm liên quan - Phần này sẽ thêm Hover trong file RelatedProducts.jsx */}
      <div className="related-section-wrapper mt-5">
        <RelatedProducts 
          currentCategory={basicInfo.type} 
          currentProductId={basicInfo.id} 
        />
      </div>

      {/* 4. Khu vực Đánh giá */}
      <div className="reviews-section-wrapper mt-5">
        <ProductReviews />
      </div>

    </div>
  );
};

export default ProductDetail;