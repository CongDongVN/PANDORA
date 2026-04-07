import React, { useRef } from 'react';
import { cartItems, favoriteItems } from '../data/cartData';
import './Cart.css';

const Cart = () => {
    // tham chiếu đến khung chứa sản phẩm để cuộn
    const sliderRef = useRef(null);

    // cuộn sang trái/phải
    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = 300; // Mỗi lần bấm sẽ trượt 300px
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth' // Trượt mượt mà
            });
        }
    };
    return (
        <div id="cart-page-unique" className="container-fluid mt-5 cart-page">
            <div className="cart-wrapper">
                <div className="row">
                    {/* Cột trái: Danh sách sản phẩm  */}
                    <div className="col-lg-8 main-content-section">
                        <div className="cart-header mb-4">
                            <h2 className="fw-bold text-uppercase">
                                GIỎ HÀNG ({cartItems.length} SẢN PHẨM)
                            </h2>
                            <hr className="header-divider" />
                        </div>

                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item-row pb-4 mb-4 border-bottom">
                                <div className="row">
                                    <div className="col-3">
                                        <img src={item.image} alt={item.name} className="img-fluid bg-light" />
                                    </div>
                                    <div className="col-9">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <h6 className="fw-bold product-name">{item.name}</h6>
                                            <div className="text-end">
                                                <div className="fw-bold">{item.price.toLocaleString()}₫</div>
                                                {item.originalPrice && (
                                                    <div className="text-muted text-decoration-line-through small">
                                                        {item.originalPrice.toLocaleString()}₫
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Căn lề phải cho thuộc tính sản phẩm */}
                                        <div className="product-attributes text-start">
                                            {item.attributes.map((attr, idx) => (
                                                <p key={idx} className="small mb-0 text-muted">
                                                    <strong>{attr.label}:</strong> {attr.value}
                                                </p>
                                            ))}
                                        </div>

                                        <div className="d-flex justify-content-end align-items-center mt-3">
                                            <div className="quantity-control d-flex align-items-center border">
                                                <button className="btn btn-sm btn-light border-end">-</button>
                                                <input type="text" className="form-control form-control-sm text-center border-0" value={item.quantity} style={{ width: '40px' }} readOnly />
                                                <button className="btn btn-sm btn-light border-start">+</button>
                                            </div>
                                        </div>

                                        {item.stockWarning && (
                                            <div className="text-danger text-end small fw-bold mt-2">{item.stockWarning}</div>
                                        )}

                                        <div className="d-flex justify-content-end mt-3 action-links">
                                            <button className="btn btn-link btn-sm text-dark"><i className="bi bi-pencil-square"></i> Chỉnh sửa</button>
                                            <button className="btn btn-link btn-sm text-dark ms-3"><i className="bi bi-heart"></i> Yêu thích</button>
                                            <button className="btn btn-link btn-sm text-dark ms-3"><i className="bi bi-trash"></i> Xoá</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* SECTION: SẢN PHẨM ĐƯỢC YÊU THÍCH */}
                        <div className="favorite-products-section mt-5 pt-4 border-top position-relative">
                            <h4 className="fw-bold mb-4">Sản Phẩm Được Yêu Thích</h4>

                            <div className="position-relative favorite-slider-wrapper">
                                {/* Nút bấm được nhấc ra ngoài wrapper để không bị trôi theo nội dung */}
                                <button className="slider-btn prev-btn" onClick={() => scroll('left')}>
                                    <i className="bi bi-chevron-left"></i>
                                </button>

                                <button className="slider-btn next-btn" onClick={() => scroll('right')}>
                                    <i className="bi bi-chevron-right"></i>
                                </button>

                                {/* Khung chứa các sản phẩm, thuộc tính ref*/}
                                <div className="row flex-nowrap overflow-auto gx-3 slider-track" ref={sliderRef}>

                                    {/* Render tự động từ mảng data */}
                                    {favoriteItems.map((item) => (
                                        <div key={item.id} className="col-4 col-md-3"> {/* Chỉnh độ rộng của mỗi card ở đây */}
                                            <div className="product-card">
                                                <div className="img-wrapper position-relative bg-light p-3 text-center" style={{ height: '200px' }}>
                                                    <img src={item.image} className="img-fluid h-100 object-fit-contain" alt={item.name} />
                                                    <i className="bi bi-heart position-absolute top-0 end-0 m-2 cursor-pointer"></i>
                                                </div>
                                                <div className="product-info mt-3">
                                                    <p className="small fw-bold mb-1 product-title">{item.name}</p>
                                                    <div className="stars text-pink small mb-1">
                                                        {/* Hiển thị 5 sao cứng tạm thời, thực tế có thể map theo item.rating */}
                                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                                        <i className="bi bi-star-fill"></i> <span className="text-dark">({item.reviews})</span>
                                                    </div>
                                                    <p className="fw-bold mb-0">{item.price.toLocaleString()}₫</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pagination dots */}
                            <div className="d-flex justify-content-center mt-4 pagination-dots">
                                <span className="dot active"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                    </div> {/* End cột trái mă */}

                    {/* Cột phải: Thông tin đơn hàng */}
                    <div className="col-lg-4">
                        <div className="summary-box p-4 bg-light">
                            <h5 className="fw-bold mb-4">ĐƠN HÀNG</h5>

                            <div className="promo-code mb-4">
                                <label className="small fw-bold mb-2">Mã giảm giá</label>
                                <input type="text" className="form-control form-control-sm rounded-0 mb-2" placeholder="Nhập mã giảm giá" />

                                <button className="btn btn-dark btn-sm rounded-0 w-100 text-uppercase py-2">Áp dụng</button>
                            </div>

                            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
                                <span className="fw-bold small">Gói quà tặng</span>
                                <button className="btn btn-link btn-sm p-0 text-dark fw-bold text-decoration-underline">Thêm</button>
                            </div>

                            <div className="d-flex justify-content-between align-items-center text-muted small mt-4">
                                <span className="summary-label">Tổng tiền hàng (3 sản phẩm)</span>
                                <span className="summary-value fw-bold text-dark">208,760,000₫</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center text-muted small my-2">
                                <span className="summary-label">Tổng giảm giá</span>
                                <span className="summary-value">657,000₫</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center text-muted small mb-4">
                                <span className="summary-label">Giảm giá Voucher</span>
                                <span className="summary-value">0₫</span>
                            </div>

                            <div className="form-check border-top pt-3 mb-3">
                                <input className="form-check-input" type="checkbox" id="vat" />
                                <label className="form-check-label small" htmlFor="vat">Xuất hoá đơn cho đơn hàng</label>
                            </div>

                            <div className="mb-4">
                                <label className="small fw-bold mb-2">Ghi chú đơn hàng</label>
                                <textarea className="form-control rounded-0" rows="3"></textarea>
                            </div>

                            {/* Tổng thanh toán trên cùng 1 dòng */}
                            <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-4">
                                <h5 className="fw-bold mb-0" style={{ fontSize: '1.2rem' }}>Tổng thanh toán:</h5>
                                <h5 className="fw-bold mb-0" style={{ fontSize: '1.2rem' }}>12,763,000₫</h5>
                            </div>

                            {/* Điều khoản và Nút bấm */}
                            <div className="terms-section d-flex align-items-start mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input me-2 flex-shrink-0"
                                    defaultChecked
                                    style={{ marginTop: '4px' }}
                                />
                                <p className="small mb-0 text-start" style={{ fontSize: '0.75rem', lineHeight: '1.5' }}>
                                    Khi bấm nút "Thanh toán" đồng nghĩa Khách hàng đã hiểu và đồng ý các
                                    <a href="#" className="text-dark fw-bold ms-1 text-decoration-underline">
                                        Điều khoản dịch vụ
                                    </a> của Pandora Việt Nam.
                                </p>
                            </div>

                            <button className="btn btn-dark w-100 accordion rounded-0 py-2 fw-bold text-uppercase mb-3">
                                Thanh toán
                            </button>

                            <div className="text-center">
                                <span className="small text-muted">hoặc</span>
                                <div className="mt-2">
                                    <a href="#" className="text-dark fw-bold small text-decoration-underline">Tiếp tục mua hàng</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Cart;