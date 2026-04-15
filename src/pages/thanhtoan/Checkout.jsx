import React, { useState } from 'react';
import { BsTrash3, BsChevronRight } from 'react-icons/bs';

const Checkout = () => {
    // Dữ liệu mô phỏng giỏ hàng dựa theo đúng ảnh
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Charm Bạc Pandora Moments Hình Trái Tim Vô Cực",
            variant: "Bạc / Onesize / 798825C00",
            cates: "Cates: UNLOCK LOVE, CRM-BMSM Charm+Vòng, CRM-BMSM Charm, LOVE IN RED...",
            price: "9,790,000đ",
            qty: 11,
            img: "https://vn.pandora.net/wp-content/uploads/2023/01/798825C00-1.jpg", // Link ảnh minh hoạ
            warning: ""
        },
        {
            id: 2,
            name: "Nhẫn Pandora ME Trái Tim Pha Lê Hồng",
            variant: "Bạc / size 48 / 193088C02",
            price: "3,580,000đ",
            qty: 2,
            img: "https://vn.pandora.net/wp-content/uploads/2023/01/193088C02-1.jpg",
            warning: "Chỉ còn 1 sản phẩm"
        },
        {
            id: 3,
            name: "Dây Chuyền Pandora Timeless Mạ Vàng 14K Ong Mật Ánh Kim",
            variant: "Default Title",
            cates: "Cates: Dây Chuyền Trên 6 Triệu, Dây Chuyền 4-6 Triệu, Dây Chuyền Mạ Vàng 14K...",
            price: "7,190,000đ",
            qty: 1,
            img: "https://vn.pandora.net/wp-content/uploads/2023/01/363365C01-1.jpg",
            warning: ""
        }
    ]);

    // Màu chủ đạo theo ảnh
    const PANDORA_PINK = '#f0b4c2';

    return (
        <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', fontFamily: "'Inter', sans-serif", paddingBottom: '50px' }}>
            
            {/* --- HEADER BANNER HỒNG --- */}
            <div style={{ backgroundColor: PANDORA_PINK, width: '100%', padding: '16px 0' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <h4 className="text-white fw-bold mb-0">Pandora Việt Nam</h4>
                </div>
            </div>

            {/* --- MAIN CONTENT CHI CHIA 2 CỘT --- */}
            <div className="container mt-4" style={{ maxWidth: '1100px' }}>
                <div className="row g-4">
                    
                    {/* ================= CỘT TRÁI (THÔNG TIN KHÁCH HÀNG) ================= */}
                    <div className="col-lg-7">
                        
                        {/* 1. KHỐI TÀI KHOẢN */}
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="fw-bold mb-0">Tài khoản</h5>
                            <a href="#" className="text-muted text-decoration-none fw-bold" style={{ fontSize: '0.9rem' }}>Đăng xuất</a>
                        </div>
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-3 d-flex align-items-center">
                                <div 
                                    className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold me-3"
                                    style={{ width: '45px', height: '45px', backgroundColor: PANDORA_PINK, fontSize: '1rem' }}
                                >
                                    DA
                                </div>
                                <div>
                                    <p className="fw-bold mb-0 text-dark">Nguyễn Duy An</p>
                                    <small className="text-muted">ann845521@gmail.com</small>
                                </div>
                            </div>
                        </div>

                        {/* 2. KHỐI THÔNG TIN GIAO HÀNG */}
                        <h5 className="fw-bold mb-3 mt-4">Thông tin giao hàng</h5>
                        <div className="card border-0 shadow-sm rounded-4 mb-4 p-3">
                            {/* Input: Họ và tên */}
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control shadow-none rounded-3" id="fullName" defaultValue="Nguyễn Duy An" style={{ borderColor: '#e0e0e0' }} />
                                <label htmlFor="fullName" className="text-muted">Họ và tên</label>
                            </div>
                            
                            {/* Input: Số điện thoại (Có cờ VN) */}
                            <div className="form-floating mb-3 position-relative">
                                <input type="text" className="form-control shadow-none rounded-3" id="phone" placeholder="Nhập số điện thoại" style={{ borderColor: '#e0e0e0' }} />
                                <label htmlFor="phone" className="text-muted">Nhập số điện thoại</label>
                                {/* Cờ Việt Nam ở góc phải */}
                                <div className="position-absolute d-flex align-items-center justify-content-center bg-danger text-white rounded-1" 
                                     style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', width: '24px', height: '16px', fontSize: '10px' }}>
                                    ★
                                </div>
                            </div>

                            {/* Input: Quốc gia */}
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control shadow-none rounded-3" id="country" defaultValue="Vietnam" style={{ borderColor: '#e0e0e0' }} />
                                <label htmlFor="country" className="text-muted">Quốc gia</label>
                            </div>

                            {/* Input: Địa chỉ */}
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control shadow-none rounded-3" id="address" defaultValue="14 Ngách 322/3 Ngõ 322 Đường Mỹ Đình" style={{ borderColor: '#e0e0e0' }} />
                                <label htmlFor="address" className="text-muted">Địa chỉ, tên đường</label>
                            </div>

                            {/* Input: Phường/Xã, Quận/Huyện */}
                            <div className="form-floating">
                                <input type="text" className="form-control shadow-none rounded-3" id="ward" defaultValue="Phường Mỹ Đình 1, Quận Nam Từ Liêm, Hà Nội" style={{ borderColor: '#e0e0e0' }} />
                                <label htmlFor="ward" className="text-muted">Tỉnh/TP, Quận/Huyện, Phường/Xã</label>
                            </div>
                        </div>

                        {/* 3. KHỐI PHƯƠNG THỨC GIAO HÀNG */}
                        <h5 className="fw-bold mb-3 mt-4">Phương thức giao hàng</h5>
                        <div className="card shadow-sm rounded-4 mb-4" style={{ border: `2px solid ${PANDORA_PINK}` }}>
                            <div className="card-body p-3 d-flex align-items-center justify-content-between" style={{ backgroundColor: '#fff9fa', borderRadius: '14px' }}>
                                <div className="d-flex align-items-center">
                                    <div className="me-3 d-flex justify-content-center align-items-center rounded-circle" style={{ width: '20px', height: '20px', border: `6px solid ${PANDORA_PINK}`, backgroundColor: 'white' }}></div>
                                    <span className="text-dark" style={{ fontSize: '0.95rem' }}>Giao hàng tiêu chuẩn (3-5 ngày). Hỏa tốc (Liên hệ: 0901884058)</span>
                                </div>
                                <span className="fw-bold text-dark">Miễn phí</span>
                            </div>
                        </div>

                        {/* 4. PHƯƠNG THỨC THANH TOÁN (Tiêu đề chờ làm tiếp) */}
                        <h5 className="fw-bold mb-3 mt-4">Phương thức thanh toán</h5>
                    </div>


                    {/* ================= CỘT PHẢI (GIỎ HÀNG) ================= */}
                    <div className="col-lg-5">
                        <h5 className="fw-bold mb-3">Giỏ hàng</h5>
                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            
                            {/* Lặp qua danh sách sản phẩm */}
                            {cartItems.map((item, index) => (
                                <div key={item.id} className={`d-flex mb-4 ${index !== cartItems.length - 1 ? 'border-bottom pb-4' : ''}`}>
                                    {/* Ảnh sản phẩm */}
                                    <div className="border rounded-3 p-1 me-3 d-flex justify-content-center align-items-center" style={{ width: '70px', height: '70px', flexShrink: 0, overflow: 'hidden' }}>
                                        <img src={item.img} alt={item.name} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                    </div>
                                    
                                    {/* Chi tiết sản phẩm */}
                                    <div className="flex-grow-1 position-relative">
                                        {/* Nút Xóa (Thùng rác) */}
                                        <button className="btn btn-link text-muted p-0 position-absolute end-0 top-0 shadow-none">
                                            <BsTrash3 className="fs-5" />
                                        </button>

                                        {/* Tên SP */}
                                        <p className="fw-bold text-dark mb-2 pe-4" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{item.name}</p>
                                        
                                        {/* Tag Phân loại */}
                                        <div className="d-inline-flex align-items-center bg-light text-dark px-2 py-1 rounded-2 mb-2" style={{ fontSize: '0.8rem', cursor: 'pointer' }}>
                                            {item.variant} <BsChevronRight className="ms-1" style={{ fontSize: '0.7rem' }} />
                                        </div>

                                        {/* Cates (Dòng chữ nhỏ màu xám) */}
                                        {item.cates && (
                                            <p className="text-muted mb-3" style={{ fontSize: '0.75rem', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {item.cates}
                                            </p>
                                        )}

                                        {/* Giá và Nút Số lượng */}
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <span className="fw-bold fs-6">{item.price}</span>
                                            
                                            <div className="d-flex flex-column align-items-end">
                                                <div className="d-flex align-items-center border rounded-2" style={{ height: '32px' }}>
                                                    <button className="btn btn-sm btn-light border-0 shadow-none px-2 text-muted fw-bold bg-transparent" style={{ width: '30px' }}>−</button>
                                                    <input type="text" className="form-control form-control-sm border-0 text-center fw-bold shadow-none p-0 bg-transparent" value={item.qty} readOnly style={{ width: '30px' }} />
                                                    <button className="btn btn-sm btn-light border-0 shadow-none px-2 text-muted fw-bold bg-transparent" style={{ width: '30px' }}>+</button>
                                                </div>
                                                {/* Dòng cảnh báo (Nếu có) */}
                                                {item.warning && (
                                                    <small className="text-danger mt-1 fw-bold" style={{ fontSize: '0.75rem' }}>{item.warning}</small>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* VAT Invoice (Cuối giỏ hàng) */}
                            <div className="pt-3 border-top border-2 border-dashed">
                                <p className="mb-0 text-dark" style={{ fontSize: '0.9rem' }}>
                                    <span className="fw-bold">order_vat_invoice :</span> Không
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;