import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Đảm bảo đã cài axios: npm install axios

const ProductInfo = ({ product }) => {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();

  // Giả định UserId là 1 (Sau này bạn sẽ lấy từ AuthContext hoặc LocalStorage)
  const userId = 1; 

  if (!product) return null;

  // --- HÀM XỬ LÝ THÊM VÀO GIỎ HÀNG ---
  const handleAddToCart = async () => {
    try {
      const response = await axios.post("https://localhost:7221/api/Cart/add", {
        userId: userId,
        productId: product.id,
        quantity: 1 // Mặc định mỗi lần bấm là thêm 1 sản phẩm
      });

      if (response.status === 200) {
        // Sau khi thêm thành công, chuyển hướng sang trang Cart để thấy kết quả lập tức
        navigate("/cart");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Không thể thêm vào giỏ hàng. Vui lòng thử lại!");
    }
  };

  const toggleSection = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  return (
    <div className="product-info-component px-md-3">
      <h2 className="fw-bold fs-3 mb-2">{product.name}</h2>
      <h3 className="fw-bold fs-4 mb-4">
        {product.price?.toLocaleString()} đ
      </h3>

      <p className="status-stock" style={{ color: "#d61c4e", fontWeight: "600" }}>
        Trạng thái: {product.status || "Sẵn có"} (Còn {product.stock} sản phẩm)
      </p>

      <div className="d-flex flex-column gap-3">
        {/* Nút Mua ngay: Thêm vào giỏ rồi sang Checkout luôn */}
        <button 
          className="btn btn-dark w-100" 
          style={{ borderRadius: 0, fontWeight: "bold", padding: "12px 0" }}
          onClick={handleAddToCart} 
        >
          Mua ngay
        </button>

        {/* Nút Thêm vào giỏ: Gọi hàm handleAddToCart */}
        <button 
          className="btn btn-outline-dark w-100" 
          style={{ borderRadius: 0, fontWeight: "bold", padding: "12px 0" }}
          onClick={handleAddToCart}
        >
          Thêm vào giỏ
        </button>
      </div>

      <div className="accordion-custom mt-4">
        <div className="accordion-item-custom border-top py-3">
          <div 
            className="accordion-header-custom d-flex justify-content-between align-items-center" 
            style={{ cursor: "pointer" }} 
            onClick={() => toggleSection("details")}
          >
            <h6 className="fw-bold m-0 text-uppercase" style={{ fontSize: "14px" }}>Chi tiết sản phẩm</h6>
            <span className="fs-4">{openSection === "details" ? "−" : "+"}</span>
          </div>
          {openSection === "details" && (
            <div className="accordion-content-custom pt-3" style={{ fontSize: "14px", lineHeight: "1.7" }}>
              <div 
                className="product-description-html"
                dangerouslySetInnerHTML={{ __html: product.description || "Thông tin đang cập nhật..." }} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;