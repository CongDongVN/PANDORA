import React, { useState } from 'react';
import {
    BsTrash3, BsChevronRight, BsQrCode, BsTicketDetailed
} from 'react-icons/bs';

const Checkout = () => {
    // Dữ liệu mô phỏng giỏ hàng
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Charm Bạc Pandora Moments Hình Trái Tim Vô Cực", variant: "Bạc / Onesize / 798825C00", cates: "Cates: UNLOCK LOVE, CRM-BMSM Charm+Vòng...", price: "9,790,000đ", qty: 11, img: "https://vn.pandora.net/wp-content/uploads/2023/01/798825C00-1.jpg", warning: "" },
        { id: 2, name: "Nhẫn Pandora ME Trái Tim Pha Lê Hồng", variant: "Bạc / size 48 / 193088C02", price: "3,580,000đ", qty: 2, img: "https://vn.pandora.net/wp-content/uploads/2023/01/193088C02-1.jpg", warning: "Chỉ còn 1 sản phẩm" },
        { id: 3, name: "Dây Chuyền Pandora Timeless Mạ Vàng 14K Ong Mật Ánh Kim", variant: "Default Title", cates: "Cates: Dây Chuyền Trên 6 Triệu, Dây Chuyền 4-6 Triệu...", price: "7,190,000đ", qty: 1, img: "https://vn.pandora.net/wp-content/uploads/2023/01/363365C01-1.jpg", warning: "" }
    ]);

    // Giữ lại đúng 1 phương thức thanh toán QR
    const [selectedPayment, setSelectedPayment] = useState('qr_techcom');
    const [isOrderHovered, setIsOrderHovered] = useState(false);

    // Màu chủ đạo theo thiết kế
    const PANDORA_PINK = '#f0b4c2';
    const LIGHT_PINK = '#fff9fa';
    const BUTTON_PINK = '#efaebf';
    const HOVER_PINK = '#e399a9';

    const paymentMethods = [
        { id: 'qr_techcom', name: 'Chuyển khoản qua QR - Techcombank', logo: <BsQrCode className="fs-4 text-dark" /> },
    ];

    return (
        <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', fontFamily: "'Inter', sans-serif", paddingBottom: '80px' }}>

            {/* --- CSS NHÚNG TRỰC TIẾP ĐỂ XỬ LÝ VIỀN HỒNG VÀ BO GÓC --- */}
            <style>
                {`
                    .custom-input {
                        border-radius: 12px !important; 
                        border-color: #e0e0e0;
                    }
                    /* Hiệu ứng viền hồng khi click vào ô nhập liệu */
                    .custom-input:focus {
                        border-color: ${PANDORA_PINK} !important;
                        box-shadow: 0 0 0 4px rgba(240, 180, 194, 0.25) !important; 
                    }
                    
                    /* MỚI THÊM: Chỉnh khoảng cách chữ cho rộng rãi, không bị sát nhau */
                    .form-floating > .custom-input {
                        height: 62px !important; /* Làm ô nhập cao lên cho thoáng */
                        padding-top: 2rem !important; /* Đẩy chữ bạn gõ dịch xuống dưới */
                        padding-bottom: 0.5rem !important;
                    }
                    .form-floating > label {
                        padding-top: 1.1rem !important; /* Căn lại cái nhãn ở trên cho cân đối */
                    }
                `}
            </style>
            {/* --- HEADER BANNER HỒNG --- */}
            <div style={{ backgroundColor: PANDORA_PINK, width: '100%', padding: '16px 0' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <h4 className="text-white fw-bold mb-0">Pandora Việt Nam</h4>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="container mt-4" style={{ maxWidth: '1100px' }}>
                <div className="row g-4">

                    {/* ================= CỘT TRÁI (THÔNG TIN) ================= */}
                    <div className="col-lg-7">

                        {/* 1. KHỐI TÀI KHOẢN */}
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="fw-bold mb-0">Tài khoản</h5>
                            <a href="#" className="text-muted text-decoration-none fw-bold" style={{ fontSize: '0.9rem' }}>Đăng xuất</a>
                        </div>
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-3 d-flex align-items-center">
                                <div className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold me-3" style={{ width: '45px', height: '45px', backgroundColor: PANDORA_PINK, fontSize: '1rem' }}>DA</div>
                                <div><p className="fw-bold mb-0 text-dark">Nguyễn Duy An</p><small className="text-muted">ann845521@gmail.com</small></div>
                            </div>
                        </div>

                        {/* 2. KHỐI THÔNG TIN GIAO HÀNG */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4 mt-4">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-4 mt-0">Thông tin giao hàng</h5>

                                <div className="form-floating mb-3">
                                    {/* Đã thêm class custom-input */}
                                    <input type="text" className="form-control shadow-none custom-input" id="fullName" defaultValue="Nguyễn Duy An" placeholder="Họ và tên" />
                                    <label htmlFor="fullName" className="text-muted">Họ và tên</label>
                                </div>

                                <div className="form-floating mb-3 position-relative">
                                    <input type="text" className="form-control shadow-none custom-input" id="phone" placeholder="Nhập số điện thoại" />
                                    <label htmlFor="phone" className="text-muted">Nhập số điện thoại</label>
                                    <div className="position-absolute d-flex align-items-center justify-content-center bg-danger text-white rounded-1" style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', width: '24px', height: '16px', fontSize: '10px' }}>★</div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control shadow-none custom-input" id="country" defaultValue="Việt Nam" placeholder="Quốc gia" />
                                    <label htmlFor="country" className="text-muted">Quốc gia</label>
                                </div>

                                {/* ĐÃ XÓA DEFAULT VALUE CỦA ĐỊA CHỈ */}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control shadow-none custom-input" id="address" placeholder="Địa chỉ, tên đường" />
                                    <label htmlFor="address" className="text-muted">Địa chỉ, tên đường</label>
                                </div>

                                {/* ĐÃ XÓA DEFAULT VALUE CỦA TỈNH/THÀNH */}
                                <div className="form-floating">
                                    <input type="text" className="form-control shadow-none custom-input" id="ward" placeholder="Tỉnh/TP, Quận/Huyện, Phường/Xã" />
                                    <label htmlFor="ward" className="text-muted">Tỉnh/TP, Quận/Huyện, Phường/Xã</label>
                                </div>
                            </div>
                        </div>

                        {/* 3. KHỐI PHƯƠNG THỨC GIAO HÀNG */}
                        <h5 className="fw-bold mb-3 mt-4">Phương thức giao hàng</h5>
                        <div className="card shadow-sm rounded-4 mb-4" style={{ border: `2px solid ${PANDORA_PINK}` }}>
                            <div className="card-body p-3 d-flex align-items-center justify-content-between" style={{ backgroundColor: LIGHT_PINK, borderRadius: '14px' }}>
                                <div className="d-flex align-items-center">
                                    <div className="me-3 d-flex justify-content-center align-items-center rounded-circle" style={{ width: '20px', height: '20px', border: `6px solid ${PANDORA_PINK}`, backgroundColor: 'white' }}></div>
                                    <span className="text-dark" style={{ fontSize: '0.95rem' }}>Giao hàng tiêu chuẩn (3-5 ngày). Hỏa tốc (Liên hệ: 0901884058)</span>
                                </div>
                                <span className="fw-bold text-dark">Miễn phí</span>
                            </div>
                        </div>

                        {/* 4. PHƯƠNG THỨC THANH TOÁN (Chỉ còn QR) */}
                        <h5 className="fw-bold mb-3 mt-4">Phương thức thanh toán</h5>
                        <div className="card shadow-sm rounded-4 mb-4 bg-white overflow-hidden" style={{ border: '1px solid #e0e0e0' }}>
                            {paymentMethods.map((method, index) => {
                                const isSelected = selectedPayment === method.id;
                                return (
                                    <label
                                        key={method.id}
                                        className={`d-flex align-items-center p-3 m-0 ${isSelected ? 'bg-light-pink' : 'bg-white'}`}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: isSelected ? LIGHT_PINK : 'white',
                                            borderBottom: index !== paymentMethods.length - 1 ? '1px solid #e0e0e0' : 'none',
                                            outline: isSelected ? `1px solid ${PANDORA_PINK}` : 'none',
                                            zIndex: isSelected ? 1 : 0,
                                            position: isSelected ? 'relative' : 'static'
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.id}
                                            checked={isSelected}
                                            onChange={(e) => setSelectedPayment(e.target.value)}
                                            className="form-check-input me-3 mt-0 shadow-none"
                                            style={{ width: '20px', height: '20px', accentColor: PANDORA_PINK, cursor: 'pointer', flexShrink: 0 }}
                                        />

                                        <div className="border rounded-2 d-flex justify-content-center align-items-center bg-white me-3" style={{ width: '45px', height: '32px', flexShrink: 0 }}>
                                            {method.logo}
                                        </div>

                                        <div className="flex-grow-1">
                                            <span className="text-dark fw-medium" style={{ fontSize: '0.95rem' }}>{method.name}</span>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>

                        {/* 5. GHI CHÚ ĐƠN HÀNG */}
                        <h5 className="fw-bold mb-3 mt-4">Ghi chú</h5>
                        <div className="card shadow-sm rounded-4 border-0 p-3 mb-4">
                            <textarea
                                className="form-control shadow-none custom-input p-3"
                                placeholder="Nhập ghi chú cho đơn hàng của bạn (ví dụ: Giao giờ hành chính, đóng gói quà tặng...)"
                                rows="5"
                                style={{
                                    backgroundColor: 'transparent',
                                    resize: 'vertical',
                                    minHeight: '130px', /* Ép cứng chiều cao tối thiểu cho to ra */
                                    border: '1px solid #e0e0e0' /* Trả lại viền để lúc click vào hiện viền hồng cho đẹp */
                                }}
                            ></textarea>
                        </div>
                    </div>


                    {/* ================= CỘT PHẢI (GIỎ HÀNG & TÓM TẮT) ================= */}
                    <div className="col-lg-5">
                        <div className="position-sticky" style={{ top: '20px' }}>

                            <h5 className="fw-bold mb-3 d-none d-lg-block">Giỏ hàng</h5>
                            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                                {cartItems.map((item, index) => (
                                    <div key={item.id} className={`d-flex mb-4 ${index !== cartItems.length - 1 ? 'border-bottom pb-4' : ''}`}>
                                        <div className="border rounded-3 p-1 me-3 d-flex justify-content-center align-items-center" style={{ width: '70px', height: '70px', flexShrink: 0, overflow: 'hidden' }}>
                                            <img src={item.img} alt={item.name} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                        </div>
                                        <div className="flex-grow-1 position-relative">
                                            <button className="btn btn-link text-muted p-0 position-absolute end-0 top-0 shadow-none"><BsTrash3 className="fs-5" /></button>
                                            <p className="fw-bold text-dark mb-2 pe-4" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{item.name}</p>
                                            <div className="d-inline-flex align-items-center bg-light text-dark px-2 py-1 rounded-2 mb-2" style={{ fontSize: '0.8rem', cursor: 'pointer' }}>
                                                {item.variant} <BsChevronRight className="ms-1" style={{ fontSize: '0.7rem' }} />
                                            </div>
                                            {item.cates && <p className="text-muted mb-3" style={{ fontSize: '0.75rem', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.cates}</p>}
                                            <div className="d-flex justify-content-between align-items-center mt-2">
                                                <span className="fw-bold fs-6">{item.price}</span>
                                                <div className="d-flex flex-column align-items-end">
                                                    <div className="d-flex align-items-center border rounded-2" style={{ height: '32px' }}>
                                                        <button className="btn btn-sm btn-light border-0 shadow-none px-2 text-muted fw-bold bg-transparent" style={{ width: '30px' }}>−</button>
                                                        <input type="text" className="form-control form-control-sm border-0 text-center fw-bold shadow-none p-0 bg-transparent" value={item.qty} readOnly style={{ width: '30px' }} />
                                                        <button className="btn btn-sm btn-light border-0 shadow-none px-2 text-muted fw-bold bg-transparent" style={{ width: '30px' }}>+</button>
                                                    </div>
                                                    {item.warning && <small className="text-danger mt-1 fw-bold" style={{ fontSize: '0.75rem' }}>{item.warning}</small>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-3 border-top border-2 border-dashed">
                                    <p className="mb-0 text-dark" style={{ fontSize: '0.9rem' }}><span className="fw-bold">order_vat_invoice :</span> Không</p>
                                </div>
                            </div>

                            <div className="card shadow-sm rounded-4 border-0 p-4 mb-4">
                                <h6 className="fw-bold mb-3 text-dark">Mã khuyến mãi</h6>
                                <div className="border rounded-3 p-2 d-flex justify-content-between align-items-center mb-3" style={{ cursor: 'pointer' }}>
                                    <span className="text-muted d-flex align-items-center"><BsTicketDetailed className="me-2 fs-5" /> Chọn mã</span>
                                    <BsChevronRight className="text-muted" style={{ fontSize: '0.9rem' }} />
                                </div>
                                <div className="d-flex gap-2">
                                    {/* Đã áp dụng class custom-input cho mã khuyến mãi để đồng bộ viền hồng */}
                                    <input type="text" className="form-control shadow-none custom-input" placeholder="Nhập mã khuyến mãi" style={{ fontSize: '0.9rem' }} />
                                    <button className="btn text-white fw-bold px-3 rounded-3 shadow-none" style={{ backgroundColor: BUTTON_PINK, whiteSpace: 'nowrap', fontSize: '0.9rem' }}>Áp dụng</button>
                                </div>
                            </div>

                            <div className="card shadow-sm rounded-4 border-0 p-4">
                                <h6 className="fw-bold mb-3 text-dark">Tóm tắt đơn hàng</h6>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-dark" style={{ fontSize: '0.95rem' }}>Tổng tiền hàng</span>
                                    <span className="text-dark fw-medium">20,560,000đ</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-dark" style={{ fontSize: '0.95rem' }}>Phí vận chuyển</span>
                                    <span className="text-dark fw-medium">Miễn phí</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                                    <span className="fw-bold text-dark">Tổng thanh toán</span>
                                    <span className="fs-5 fw-bold text-dark">20,560,000đ</span>
                                </div>
                                <button
                                    className="btn text-white w-100 py-3 mt-4 rounded-3 fw-bold fs-6 shadow-none"
                                    style={{ backgroundColor: isOrderHovered ? HOVER_PINK : BUTTON_PINK, transition: 'background-color 0.2s ease' }}
                                    onMouseEnter={() => setIsOrderHovered(true)}
                                    onMouseLeave={() => setIsOrderHovered(false)}
                                >
                                    Đặt hàng
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;