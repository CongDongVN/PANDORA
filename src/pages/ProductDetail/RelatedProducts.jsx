import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/categoriesData";

const RelatedProducts = ({ currentCategory, currentProductId }) => {
  const [displayList, setDisplayList] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [hasTransition, setHasTransition] = useState(true);
  
  // Dùng useRef để đo đạc kích thước thực tế của khung
  const trackRef = useRef(null);

  useEffect(() => {
    const filtered = products.filter(
      (item) => item.type === currentCategory && item.id !== currentProductId,
    );
    // Render toàn bộ mảng thay vì chỉ 4 cái để có item trượt nối tiếp
    setDisplayList(filtered);
  }, [currentCategory, currentProductId]);

  if (displayList.length === 0) return null;

  // XỬ LÝ NÚT MŨI TÊN TRÁI (Trượt về trước)
  const handlePrev = () => {
    if (isAnimating || !trackRef.current) return;
    setIsAnimating(true);

    // Đo chiều rộng chính xác của 1 ô sản phẩm (để kéo vừa đủ)
    const itemWidth = trackRef.current.children[0].offsetWidth;

    // Bước 1: Tắt hiệu ứng, chuyển âm thầm item cuối lên đầu, giấu item đó đi
    setHasTransition(false);
    setDisplayList((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    setTranslateX(-itemWidth);

    // Bước 2: Đợi 30ms cho DOM nhận diện, bật lại hiệu ứng và trượt mượt mà ra
    setTimeout(() => {
      setHasTransition(true);
      setTranslateX(0);
    }, 30);

    // Bước 3: Mở khóa nút bấm
    setTimeout(() => {
      setIsAnimating(false);
    }, 430);
  };

  // XỬ LÝ NÚT MŨI TÊN PHẢI (Trượt tiếp theo)
  const handleNext = () => {
    if (isAnimating || !trackRef.current) return;
    setIsAnimating(true);

    const itemWidth = trackRef.current.children[0].offsetWidth;

    // Bước 1: Bật hiệu ứng và trượt khung sang trái 1 nhịp
    setHasTransition(true);
    setTranslateX(-itemWidth);

    // Bước 2: Sau khi trượt xong (400ms), tắt hiệu ứng âm thầm đẩy item đầu xuống cuối
    setTimeout(() => {
      setHasTransition(false);
      setTranslateX(0);
      setDisplayList((prev) => [...prev.slice(1), prev[0]]);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div className="related-products-component mt-5 pt-5 mb-5 position-relative">
      <h3 className="text-center text-uppercase fw-bold mb-5 fs-4">
        Sản phẩm cùng loại
      </h3>

      {/* Nút điều hướng TRÁI */}
      <button
        onClick={handlePrev}
        className="btn btn-light rounded-circle position-absolute shadow border"
        style={{ top: "50%", left: "-20px", transform: "translateY(-50%)", zIndex: 10, width: "45px", height: "45px" }}
      >
        &#10094;
      </button>

      {/* Nút điều hướng PHẢI */}
      <button
        onClick={handleNext}
        className="btn btn-light rounded-circle position-absolute shadow border"
        style={{ top: "50%", right: "-20px", transform: "translateY(-50%)", zIndex: 10, width: "45px", height: "45px" }}
      >
        &#10095;
      </button>

      {/* KHUNG VIEWPORT (Ẩn đi phần sản phẩm bị tràn ra ngoài) */}
      <div className="slider-viewport overflow-hidden px-1">
        
        {/* THANH TRƯỢT CHỨA SẢN PHẨM */}
        <div
          className="row flex-nowrap m-0"
          ref={trackRef}
          style={{
            transition: hasTransition ? "transform 0.4s ease-in-out" : "none",
            transform: `translateX(${translateX}px)`,
          }}
        >
          {displayList.map((product) => (
            // Bootstrap Grid tự động chia: Máy tính 4 cột, Tablet 3 cột, Mobile 2 cột
            <div key={product.id} className="col-6 col-md-4 col-lg-3 px-2 slider-item-container">
              <div className="card border-0 h-100">
                <div className="slider-img-wrapper position-relative overflow-hidden">
                  <span className="position-absolute top-0 end-0 p-2 fs-5" style={{ cursor: "pointer", zIndex: 2 }}>♡</span>

                  <Link to={`/product/${product.id}`} style={{ width: "100%", height: "100%" }}>
                    <img src={product.image} alt={product.name} className="img-fluid" />
                  </Link>

                  <Link to={`/product/${product.id}`} className="related-quick-view-btn text-decoration-none">
                    XEM NHANH
                  </Link>
                </div>

                <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                  <div className="card-body p-0 mt-3">
                    <div className="rounded-circle border border-secondary mb-2" style={{ width: "18px", height: "18px", backgroundColor: "#eaddc5" }}></div>

                    {product.badge && (
                      <span className="badge mb-2 me-2" style={{ backgroundColor: "#f48fb1", fontSize: "10px", borderRadius: "2px" }}>
                        {product.badge}
                      </span>
                    )}

                    <h6 className="fw-bold mb-2 text-uppercase" style={{ fontSize: "13px", lineHeight: "1.4" }}>{product.name}</h6>
                    <p className="fw-bold mb-0" style={{ fontSize: "14px", color: "#111" }}>{product.price}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;