import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// IMPORT DỮ LIỆU GIỎ HÀNG THẬT
import { cartItems as importedCartItems } from '../../data/cartData';
import { 
    BsChevronLeft, BsReceipt, BsBoxSeam, BsTruck, BsCheck2Circle,
    BsGeoAlt, BsTelephone, BsEnvelope, BsCreditCard, BsChatLeftText, BsInfoCircle
} from 'react-icons/bs';

const OrderTracking = () => {
    const navigate = useNavigate();

    // ĐƯA DỮ LIỆU TỪ CARTDATA VÀO
    const [cartItems, setCartItems] = useState(importedCartItems);

    // 1. DỮ LIỆU MÔ PHỎNG ĐƠN HÀNG (Đã bỏ mảng items fix cứng)
    const orderInfo = {
        id: 'ORD-89237492',
        date: '26/10/2023 - 14:30',
        estimatedDelivery: '29/10/2023',
        status: 'Đang vận chuyển',
        currentStep: 3, 
        courier: 'Giao Hàng Nhanh (GHN)',
        trackingCode: 'GHN123987456VN',
        customerName: 'Nguyễn Duy An',
        phone: '0901 234 567',
        address: '14 Ngách 322/3 Ngõ 322 Đường Mỹ Đình, Nam Từ Liêm, Hà Nội',
        paymentMethod: 'Thanh toán khi nhận hàng (COD)',
    };

    // LỊCH SỬ VẬN CHUYỂN
    const trackingLogs = [
        { time: '08:30 - 28/10/2023', status: 'Đơn hàng đang trên đường giao đến bạn', location: 'Shipper Nguyễn Văn A (0987.xxx.xxx)', active: true },
        { time: '20:15 - 27/10/2023', status: 'Đơn hàng đã đến kho phân loại Nam Từ Liêm', location: 'Kho Nam Từ Liêm, Hà Nội', active: false },
        { time: '14:00 - 27/10/2023', status: 'Đơn hàng đã rời bưu cục trung tâm', location: 'Kho Tổng Hà Nội', active: false },
        { time: '09:00 - 27/10/2023', status: 'Đơn vị vận chuyển đã lấy hàng', location: 'Kho Pandora Việt Nam', active: false },
        { time: '16:45 - 26/10/2023', status: 'Người bán đang chuẩn bị hàng', location: 'Kho Pandora Việt Nam', active: false },
        { time: '14:30 - 26/10/2023', status: 'Đơn hàng đã được đặt thành công', location: 'Hệ thống Pandora', active: false },
    ];

    // MÀU CHỦ ĐẠO PANDORA
    const PANDORA_PINK_ACCENT = '#f0b4c2'; 
    const BUTTON_PINK = '#efaebf';       
    const LIGHT_PINK_BG = '#fff5f7';     
    const TEXT_MUTER = '#999';

    // ========================================================================
    // CÁC HÀM XỬ LÝ DỮ LIỆU TỪ CARTDATA (Giống hệt trang Checkout)
    // ========================================================================
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN') + 'đ';
    };

    const formatVariant = (attributes) => {
        if (!attributes || attributes.length === 0) return "Default Title";
        return attributes.map(attr => attr.value).join(' / ');
    };

    return (
        <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', fontFamily: "'Inter', sans-serif", paddingBottom: '80px' }}>
            
            <style>
                {`
                    /* Vertical Timeline */
                    .tracking-timeline { position: relative; padding-left: 30px; }
                    .tracking-timeline::before {
                        content: ''; position: absolute; left: 7px; top: 5px; bottom: 0;
                        width: 2px; background-color: #eee;
                    }
                    .tracking-item { position: relative; margin-bottom: 25px; }
                    .tracking-dot {
                        position: absolute; left: -30px; top: 4px; width: 16px; height: 16px;
                        border-radius: 50%; background-color: #eee; border: 3px solid #fff;
                        box-shadow: 0 0 0 1px #eee; z-index: 2;
                    }
                    .tracking-item.active .tracking-dot {
                        background-color: ${PANDORA_PINK_ACCENT}; box-shadow: 0 0 0 2px ${PANDORA_PINK_ACCENT};
                    }
                    .tracking-item.active .tracking-text { color: #333; font-weight: bold; }

                    /* Horizontal Steps */
                    .step-icon-box {
                        width: 55px; height: 55px; border-radius: 50%; display: flex;
                        justify-content: center; align-items: center; font-size: 1.3rem;
                        background-color: #f5f5f5; color: ${TEXT_MUTER}; position: relative; z-index: 2;
                        transition: all 0.3s ease;
                    }
                    .step-active .step-icon-box { 
                        background-color: ${LIGHT_PINK_BG}; color: ${BUTTON_PINK}; 
                        border: 2px solid ${PANDORA_PINK_ACCENT};
                        box-shadow: 0 0 10px rgba(239, 174, 191, 0.2);
                    }
                    .step-line { flex-grow: 1; height: 4px; background-color: #eee; margin: 0; position: relative; top: -13px;}
                    .step-line.active { background-color: ${PANDORA_PINK_ACCENT}; }
                `}
            </style>

            {/* --- TOP BANNER --- */}
            <div style={{ backgroundColor: PANDORA_PINK_ACCENT, width: '100%', padding: '16px 0' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <h4 className="text-white fw-bold mb-0">Pandora Việt Nam</h4>
                </div>
            </div>

            <div className="container mt-4" style={{ maxWidth: '1100px' }}>
                
                {/* BACK BUTTON */}
                <button 
                    className="btn btn-link text-dark text-decoration-none px-0 mb-3 fw-bold shadow-none d-flex align-items-center"
                    onClick={() => navigate(-1)} // Tự động quay lại trang trước đó
                >
                    <BsChevronLeft className="me-2" /> Quay lại 
                </button>

                <div className="row g-4">
                    {/* ================= CỘT TRÁI ================= */}
                    <div className="col-lg-8">
                        
                        {/* 1. KHỐI TRẠNG THÁI (Card Trắng) */}
                        <div className="card border-0 rounded-4 mb-4 p-4 shadow-sm bg-white">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h4 className="fw-bold mb-1 text-dark">Đơn hàng <span style={{ color: BUTTON_PINK }}>{orderInfo.id}</span></h4>
                                    <p className="text-muted mb-0" style={{fontSize: '0.9rem'}}>Ngày đặt: {orderInfo.date}</p>
                                </div>
                                <div className="text-end">
                                    <span className="badge px-3 py-2 rounded-pill fs-6" style={{ backgroundColor: LIGHT_PINK_BG, color: BUTTON_PINK, border: `1px solid ${PANDORA_PINK_ACCENT}` }}>
                                        {orderInfo.status}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-light p-3 rounded-3 d-flex align-items-center border-0">
                                <BsInfoCircle className="text-muted me-2 fs-5" />
                                <span className="text-dark fw-medium">Dự kiến giao hàng: <strong style={{ color: BUTTON_PINK }}>{orderInfo.estimatedDelivery}</strong></span>
                            </div>
                        </div>

                        {/* 2. THANH TIẾN TRÌNH */}
                        <div className="card border-0 rounded-4 mb-4 p-4 shadow-sm bg-white">
                            <div className="d-flex justify-content-between align-items-center text-center px-lg-3">
                                {[
                                    { step: 1, icon: <BsReceipt />, label: 'Đã xác nhận' },
                                    { step: 2, icon: <BsBoxSeam />, label: 'Đóng gói' },
                                    { step: 3, icon: <BsTruck />, label: 'Đang giao' },
                                    { step: 4, icon: <BsCheck2Circle />, label: 'Đã giao' },
                                ].map((item, index) => (
                                    <React.Fragment key={item.step}>
                                        <div className={`d-flex flex-column align-items-center step-${orderInfo.currentStep >= item.step ? 'active' : ''}`}>
                                            <div className="step-icon-box mb-2">{item.icon}</div>
                                            <span className="fw-bold text-dark" style={{ fontSize: '0.8rem', opacity: orderInfo.currentStep >= item.step ? 1 : 0.6 }}>{item.label}</span>
                                        </div>
                                        {index < 3 && (
                                            <div className={`step-line ${orderInfo.currentStep >= item.step + 1 ? 'active' : ''}`}></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* 3. LỊCH SỬ GIAO HÀNG */}
                        <div className="card border-0 rounded-4 mb-4 p-4 shadow-sm bg-white">
                            <h5 className="fw-bold mb-4 text-dark">Hành trình đơn hàng</h5>
                            
                            <div className="bg-light rounded-3 p-3 mb-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="mb-1 text-muted" style={{ fontSize: '0.8rem' }}>Đối tác vận chuyển</p>
                                    <p className="fw-bold text-dark mb-0">{orderInfo.courier}</p>
                                </div>
                                <div className="text-end">
                                    <p className="mb-1 text-muted" style={{ fontSize: '0.8rem' }}>Mã vận đơn</p>
                                    <p className="fw-bold mb-0" style={{ color: BUTTON_PINK }}>{orderInfo.trackingCode}</p>
                                </div>
                            </div>

                            <div className="tracking-timeline">
                                {trackingLogs.map((log, index) => (
                                    <div key={index} className={`tracking-item ${log.active ? 'active' : ''}`}>
                                        <div className="tracking-dot"></div>
                                        <p className="mb-1 fw-bold tracking-text" style={{ color: log.active ? BUTTON_PINK : '#666' }}>{log.status}</p>
                                        <p className="mb-0 text-muted" style={{ fontSize: '0.8rem' }}>{log.time} • {log.location}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* ================= CỘT PHẢI ================= */}
                    <div className="col-lg-4">
                        
                        {/* THÔNG TIN NHẬN HÀNG */}
                        <div className="card border-0 rounded-4 p-4 mb-4 shadow-sm bg-white">
                            <h6 className="fw-bold mb-3 text-dark">Thông tin người nhận</h6>
                            <p className="fw-bold mb-1 text-dark">{orderInfo.customerName}</p>
                            <p className="text-muted mb-2"><BsTelephone className="me-2" />{orderInfo.phone}</p>
                            <p className="text-muted mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                                <BsGeoAlt className="me-2 text-danger" />{orderInfo.address}
                            </p>
                            
                            <hr className="my-3 text-muted" />
                            
                            <h6 className="fw-bold mb-2 text-dark">Thanh toán</h6>
                            <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                                <BsCreditCard className="me-2" />{orderInfo.paymentMethod}
                            </p>
                        </div>

                        {/* TÓM TẮT ĐƠN HÀNG DỰA TRÊN DỮ LIỆU THẬT */}
                        <div className="card border-0 rounded-4 p-4 mb-4 shadow-sm bg-white">
                            <h6 className="fw-bold mb-3 text-dark">Tóm tắt đơn hàng ({cartItems.length})</h6>
                            
                            {/* Map từ cartItems thay vì orderInfo.items */}
                            {cartItems.map((item, idx) => (
                                <div key={idx} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                                    <div className="border bg-white rounded-3 p-1 me-3 d-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px', flexShrink: 0 }}>
                                        <img src={item.image} alt={item.name} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="fw-bold text-dark mb-1" style={{ fontSize: '0.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</p>
                                        <p className="text-muted mb-1" style={{ fontSize: '0.7rem' }}>{formatVariant(item.attributes)} x {item.quantity}</p>
                                        <p className="fw-bold mb-0 text-dark" style={{ fontSize: '0.85rem' }}>{formatCurrency(item.price)}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
                                <span className="text-dark fw-bold">Tổng cộng</span>
                                {/* Tính tổng tiền tự động */}
                                <span className="fs-5 fw-bold" style={{ color: BUTTON_PINK }}>{formatCurrency(totalAmount)}</span>
                            </div>
                        </div>

                        {/* NÚT TRỢ GIÚP */}
                        <button className="btn w-100 py-3 rounded-4 fw-bold shadow-none" style={{ backgroundColor: LIGHT_PINK_BG, color: BUTTON_PINK, border: `2px solid ${PANDORA_PINK_ACCENT}` }}>
                            <BsChatLeftText className="me-2" /> Trợ giúp đơn hàng
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;