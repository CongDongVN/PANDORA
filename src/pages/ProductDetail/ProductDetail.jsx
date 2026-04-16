import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Import CSS
import './ProductDetail.css';

// Import dữ liệu
import { products } from '../../data/categoriesData';
import { productDetails } from '../../data/productDetailsData';

// Import 4 Component con (Bạn đã xác nhận là chúng ổn)
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';
import ProductReviews from './ProductReviews';

const ProductDetail = () => {
  const { id } = useParams();
  const productId = Number(id);
  
  // Tìm sản phẩm
  const basicInfo = products.find((item) => item.id === productId);
  
  // Dữ liệu chi tiết, có thể là array hoặc object
  const detailInfo = productDetails ? productDetails[productId] : null;

  // Cuộn lên đầu trang khi chuyển sản phẩm
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!basicInfo) {
    return (
      <div className="container mt-5 pt-5 text-center" style={{ minHeight: '60vh' }}>
        <h2 className="fw-bold text-danger mb-3">Opps! Không tìm thấy sản phẩm.</h2>
        <Link to="/" className="btn btn-dark px-4 py-2">Quay lại Trang Chủ</Link>
      </div>
    );
  }

  return (
    /* ĐÃ SỬA: Đảm bảo class tổng là product-detail-page */
    <div className="product-detail-page container">
      
      {/* 1. Breadcrumb (Đồng bộ với CSS) */}
      <nav className="detail-breadcrumb mt-4 mb-4">
        <Link to="/" className="text-secondary text-decoration-none hover-dark fw-bold">Trang chủ</Link> / 
        <Link to={`/${basicInfo.type}`} className="text-secondary text-decoration-none hover-dark fw-bold"> {basicInfo.type.replace('-', ' ')}</Link> / 
        <span className="text-dark fw-bold">{basicInfo.name}</span>
      </nav>

      {/* 2. KHU VỰC NỘI DUNG CHÍNH (MAIN SECTION)
          ĐÃ SỬA: Thay đổi 'row' thành 'product-main-layout' để chia cột
      */}
      <div className="product-main-layout">
        
        {/* ĐÃ SỬA: Thay đổi 'col-md-6' thành 'gallery-section-wrapper' */}
        <div className="gallery-section-wrapper">
          <ProductGallery 
            mainImage={basicInfo.image} 
            galleryImages={detailInfo ? detailInfo.gallery : []} 
          />
        </div>
        
        {/* ĐÃ SỬA: Thay đổi 'col-md-6' thành 'info-section-wrapper' */}
        <div className="info-section-wrapper">
          <ProductInfo 
            basicInfo={basicInfo} 
            detailInfo={detailInfo} 
          />
        </div>
      </div>

      {/* 3. Khu vực Sản phẩm liên quan */}
      <div className="related-section-wrapper mt-5">
        <RelatedProducts currentCategory={basicInfo.type} currentProductId={basicInfo.id} />
      </div>

      {/* 4. Khu vực Đánh giá */}
      <div className="reviews-section-wrapper mt-5">
        <ProductReviews />
      </div>

    </div>
  );
};

export default ProductDetail;