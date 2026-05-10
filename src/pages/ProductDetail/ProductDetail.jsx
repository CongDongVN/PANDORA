import React, { useEffect, useState } from 'react'; // Thêm useState
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Đảm bảo bạn đã cài đặt axios: npm install axios

import './ProductDetail.css';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';
import ProductReviews from './ProductReviews';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null); // State lưu dữ liệu từ API
//   const [loading, setLoading] = useState(true); // State chờ load dữ liệu

//   // 1. Gọi API khi ID thay đổi
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
        
//         const response = await axios.get(`https://localhost:7221/api/products/${id}`);
//         setProduct(response.data);
//       } catch (error) {
//         console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//     window.scrollTo(0, 0);
//   }, [id]);

//   // 2. Trạng thái Loading
//   if (loading) return <div className="container mt-5 text-center">Đang tải sản phẩm...</div>;

//   // 3. Nếu không tìm thấy sản phẩm
//   if (!product) {
//     return (
//       <div className="container mt-5 pt-5 text-center" style={{ minHeight: '60vh' }}>
//         <h2 className="fw-bold text-danger mb-3">Opps! Không tìm thấy sản phẩm.</h2>
//         <Link to="/" className="btn btn-dark px-4 py-2">Quay lại Trang Chủ</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="product-detail-page container">
//       {/* 1. Breadcrumb */}
//       <nav className="detail-breadcrumb mt-4 mb-4">
//         <Link to="/" className="text-secondary text-decoration-none hover-dark fw-bold">Trang chủ</Link> / 
//         <span className="text-secondary fw-bold"> {product.categoryName} </span> / 
//         <span className="text-dark fw-bold">{product.name}</span>
//       </nav>

//       {/* 2. KHU VỰC NỘI DUNG CHÍNH */}
//       <div className="product-main-layout">
//         <div className="gallery-section-wrapper">
//           {/* Truyền mảng ImageUrls từ API vào Gallery */}
//           <ProductGallery 
//             mainImage={product.imageUrls[0]} 
//             galleryImages={product.imageUrls} 
//           />
//         </div>
        
//         <div className="info-section-wrapper">
//           {/* Truyền object product trực tiếp vào ProductInfo */}
//           <ProductInfo 
//             product={product} 
//           />
//         </div>
//       </div>

//       {/* 3. Sản phẩm liên quan (Truyền ID category để filter ở Backend nếu cần) */}
//       <div className="related-section-wrapper mt-5">
//         <RelatedProducts 
//           currentCategory={product.categoryName} 
//           currentProductId={product.id} 
//         />
//       </div>

//       <div className="reviews-section-wrapper mt-5">
//         <ProductReviews productId={product.id} />
//       </div>
//     </div>
//   );
// };
// ... (các import giữ nguyên)

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Đảm bảo URL này khớp với cấu hình port của Backend .NET của bạn
        const response = await axios.get(`https://localhost:7221/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="container mt-5 text-center">Đang tải sản phẩm...</div>;

  if (!product) {
    return (
      <div className="container mt-5 pt-5 text-center" style={{ minHeight: '60vh' }}>
        <h2 className="fw-bold text-danger mb-3">Opps! Không tìm thấy sản phẩm.</h2>
        <Link to="/" className="btn btn-dark px-4 py-2">Quay lại Trang Chủ</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page container">
      <nav className="detail-breadcrumb mt-4 mb-4">
        <Link to="/" className="text-secondary text-decoration-none hover-dark fw-bold">Trang chủ</Link> / 
        <span className="text-secondary fw-bold"> {product.categoryName} </span> / 
        <span className="text-dark fw-bold">{product.name}</span>
      </nav>

      <div className="product-main-layout">
        <div className="gallery-section-wrapper">
          <ProductGallery 
            // Ảnh chính lấy từ trường PrimaryImageUrl của Backend
            mainImage={product.primaryImageUrl} 
            
            // Lọc bỏ ảnh đại diện ra khỏi danh sách để tránh bị trùng lặp 2 lần
            galleryImages={product.imageUrls.filter(url => url !== product.primaryImageUrl)} 
          />
        </div>
        
        <div className="info-section-wrapper">
          <ProductInfo product={product} />
        </div>
      </div>

      <div className="reviews-section-wrapper mt-5">
        <ProductReviews productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetail;