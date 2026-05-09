import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { favoriteItems } from '../../data/cartData'; // Giữ lại data yêu thích để demo slider
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    // --- TRẠNG THÁI DỮ LIỆU ---
    const [cart, setCart] = useState({ items: [], totalAmount: 0 });
    const [loading, setLoading] = useState(true);
    const userId = 1; // Giả định ID người dùng đang đăng nhập là 1

    // --- 1. LẤY DỮ LIỆU TỪ DATABASE ---
    const fetchCart = async () => {
        try {
            const response = await axios.get(`https://localhost:7221/api/Cart/${userId}`); // Thay port của bạn vào đây
            setCart(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // --- 2. HÀM CẬP NHẬT SỐ LƯỢNG (TĂNG/GIẢM) ---
    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await axios.put(`https://localhost:7221/api/Cart/update-quantity`, {
                userId: userId,
                productId: productId,
                quantity: newQuantity
            });
            fetchCart(); // Tải lại dữ liệu để cập nhật tổng tiền
        } catch (error) {
            alert("Không thể cập nhật số lượng");
        }
    };

    // --- 3. HÀM XÓA SẢN PHẨM ---
    const removeItem = async (productId) => {
        try {
            await axios.delete(`https://localhost:7221/api/Cart/remove/${userId}/${productId}`);
            fetchCart();
        } catch (error) {
            alert("Lỗi khi xóa sản phẩm");
        }
    };

    // Hàm cuộn slider yêu thích
    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = 300;
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (loading) return <div className="text-center mt-5">Đang tải giỏ hàng...</div>;

    return (
        <div id="cart-page-unique" className="container-fluid mt-5 cart-page">
            <div className="cart-wrapper">
                <div className="row">
                    {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM THỰC TẾ TỪ DB */}
                    <div className="col-lg-8 main-content-section">
                        <div className="cart-header mb-4">
                            <h2 className="fw-bold text-uppercase">
                                GIỎ HÀNG ({cart.items.length} SẢN PHẨM)
                            </h2>
                            <hr className="header-divider" />
                        </div>

                        {cart.items.length === 0 ? (
                            <div className="text-center py-5">
                                <h5>Giỏ hàng trống</h5>
                                <button className="btn btn-outline-dark mt-3" onClick={() => navigate('/')}>Tiếp tục mua sắm</button>
                            </div>
                        ) : (
                            cart.items.map((item) => (
                                <div key={item.productId} className="cart-item-row pb-4 mb-4 border-bottom">
                                    <div className="row">
                                        <div className="col-3">
                                            <img src={item.productImage} alt={item.productName} className="img-fluid bg-light" />
                                        </div>
                                        <div className="col-9">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h6 className="fw-bold product-name">{item.productName}</h6>
                                                <div className="text-end">
                                                    <div className="fw-bold text-primary">{(item.price).toLocaleString()}₫</div>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-end align-items-center mt-3">
                                                <div className="quantity-control d-flex align-items-center border">
                                                    <button 
                                                        className="btn btn-sm btn-light border-end"
                                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                    >-</button>
                                                    <input type="text" className="form-control form-control-sm text-center border-0" value={item.quantity} style={{ width: '40px' }} readOnly />
                                                    <button 
                                                        className="btn btn-sm btn-light border-start"
                                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                    >+</button>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-end mt-3 action-links">
                                                <button className="btn btn-link btn-sm text-dark" onClick={() => removeItem(item.productId)}>
                                                    <i className="bi bi-trash"></i> Xoá
                                                </button>
                                            </div>
                                            
                                            {/* Thành tiền cho từng sản phẩm */}
                                            <div className="text-end small text-muted mt-1">
                                                Thành tiền: <strong>{(item.price * item.quantity).toLocaleString()}₫</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* SECTION YÊU THÍCH (GIỮ NGUYÊN GIAO DIỆN) */}
                        <div className="favorite-products-section mt-5 pt-4 border-top position-relative">
                            <h4 className="fw-bold mb-4">Sản Phẩm Được Yêu Thích</h4>
                            <div className="position-relative favorite-slider-wrapper">
                                <button className="slider-btn prev-btn" onClick={() => scroll('left')}><i className="bi bi-chevron-left"></i></button>
                                <button className="slider-btn next-btn" onClick={() => scroll('right')}><i className="bi bi-chevron-right"></i></button>
                                <div className="row flex-nowrap overflow-auto gx-3 slider-track" ref={sliderRef}>
                                    {favoriteItems.map((item) => (
                                        <div key={item.id} className="col-4 col-md-3">
                                            <div className="product-card">
                                                <div className="img-wrapper position-relative bg-light p-3 text-center" style={{ height: '180px' }}>
                                                    <img src={item.image} className="img-fluid h-100 object-fit-contain" alt={item.name} />
                                                </div>
                                                <div className="product-info mt-2">
                                                    <p className="small fw-bold mb-1">{item.name}</p>
                                                    <p className="fw-bold mb-0">{item.price.toLocaleString()}₫</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG - TÍNH TIỀN CHUẨN */}
                    <div className="col-lg-4">
                        <div className="summary-box p-4 bg-light">
                            <h5 className="fw-bold mb-4">ĐƠN HÀNG</h5>
                            
                            <div className="d-flex justify-content-between align-items-center text-muted small mt-4">
                                <span>Tổng tiền hàng ({cart.items.length} sản phẩm)</span>
                                <span className="fw-bold text-dark">{cart.totalAmount.toLocaleString()}₫</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-4 mb-4">
                                <h5 className="fw-bold mb-0">Tổng thanh toán:</h5>
                                <h5 className="fw-bold mb-0 text-danger" style={{ fontSize: '1.5rem' }}>
                                    {cart.totalAmount.toLocaleString()}₫
                                </h5>
                            </div>

                            <button 
                                className="btn btn-dark w-100 rounded-0 py-3 fw-bold text-uppercase"
                                onClick={() => navigate('/Checkout')}
                                disabled={cart.items.length === 0}
                            >
                                Thanh toán ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;