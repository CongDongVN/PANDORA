import React, { useState } from 'react';
import { 
    BsChevronLeft, BsReceipt, BsBoxSeam, BsTruck, BsCheck2Circle,
    BsGeoAlt, BsTelephone, BsCreditCard, BsChatLeftText, BsInfoCircle
} from 'react-icons/bs';

const OrderTracking = () => {
    // 1. DỮ LIỆU MÔ PHỎNG ĐƠN HÀNG
    const orderInfo = {
        id: 'ORD-89237492',
        date: '26/10/2023 - 14:30',
        estimatedDelivery: '29/10/2023',
        status: 'Đang vận chuyển', // Trạng thái hiện tại
        currentStep: 3, // 1: Chờ xác nhận, 2: Đóng gói, 3: Đang giao, 4: Hoàn thành
        courier: 'Giao Hàng Nhanh (GHN)',
        trackingCode: 'GHN123987456VN',
        customerName: 'Nguyễn Duy An',
        phone: '0901 234 567',
        address: '14 Ngách 322/3 Ngõ 322 Đường Mỹ Đình, Phường Mỹ Đình 1, Quận Nam Từ Liêm, Hà Nội',
        paymentMethod: 'Thanh toán khi nhận hàng (COD)',
        total: '20,560,000đ',
        items: [
            { name: 'Charm Bạc Pandora Moments', variant: 'Bạc / Onesize', qty: 1, price: '9,790,000đ', img: 'https://vn.pandora.net/wp-content/uploads/2023/01/798825C00-1.jpg' },
            { name: 'Nhẫn Pandora ME Trái Tim', variant: 'Bạc / size 48', qty: 2, price: '3,580,000đ', img: 'https://vn.pandora.net/wp-content/uploads/2023/01/193088C02-1.jpg' }
        ]
    };

    // 2. LỊCH SỬ VẬN CHUYỂN CHI TIẾT
    const trackingLogs = [
        { time: '08:30 - 28/10/2023', status: 'Đơn hàng đang trên đường giao đến bạn', location: 'Shipper Nguyễn Văn A (0987.xxx.xxx)', active: true },
        { time: '20:15 - 27/10/2023', status: 'Đơn hàng đã đến kho phân loại Nam Từ Liêm', location: 'Kho Nam Từ Liêm, Hà Nội', active: false },
        { time: '14:00 - 27/10/2023', status: 'Đơn hàng đã rời bưu cục trung tâm', location: 'Kho Tổng Hà Nội', active: false },
        { time: '09:00 - 27/10/2023', status: 'Đơn vị vận chuyển đã lấy hàng', location: 'Kho Pandora Việt Nam', active: false },
        { time: '16:45 - 26/10/2023', status: 'Người bán đang chuẩn bị hàng', location: 'Kho Pandora Việt Nam', active: false },
        { time: '14:30 - 26/10/2023', status: 'Đơn hàng đã được đặt thành công', location: 'Hệ thống Pandora', active: false },
    ];

    // MÀU CHỦ ĐẠO PANDORA
    const PANDORA_PINK = '#f0b4c2';
    const BUTTON_PINK = '#efaebf';
    const LIGHT_PINK = '#fff9fa';

    return (
        <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', fontFamily: "'Inter', sans-serif", paddingBottom: '80px' }}>
            
            {/* CSS Tự chế cho Trục thời gian dọc (Vertical Timeline) */}
            <style>
                {`
                    .tracking-timeline { position: relative; padding-left: 30px; }
                    .tracking-timeline::before {
                        content: ''; position: absolute; left: 7px; top: 5px; bottom: 0;
                        width: 2px; background-color: #e0e0e0;
                    }
                    .tracking-item { position: relative; margin-bottom: 25px; }
                    .tracking-dot {
                        position: absolute; left: -30px; top: 4px; width: 16px; height: 16px;
                        border-radius: 50%; background-color: #e0e0e0; border: 3px solid #fff;
                        box-shadow: 0 0 0 1px #e0e0e0; z-index: 2;
                    }
                    .tracking-item.active .tracking-dot {
                        background-color: ${PANDORA_PINK}; box-shadow: 0 0 0 2px ${PANDORA_PINK};
                    }
                    .tracking-item.active .tracking-text { color: #333; font-weight: bold; }
                    .step-icon-box {
                        width: 60px; height: 60px; border-radius: 50%; display: flex;
                        justify-content: center; align-items: center; font-size: 1.5rem;
                        background-color: #f5f5f5; color: #aaa; position: relative; z-index: 2;
                    }
                    .step-active .step-icon-box { background-color: ${LIGHT_PINK}; color: ${BUTTON_PINK}; border: 2px solid ${PANDORA_PINK}; }
                    .step-line { flex-grow: 1; height: 4px; background-color: #eee; margin: 0 10px; position: relative; top: -15px;}
                    .step-line.active { background-color: ${PANDORA_PINK}; }
                `}
            </style>

            {/* --- HEADER BANNER --- */}
            <div style={{ backgroundColor: PANDORA_PINK, width: '100%', padding: '16px 0' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <h4 className="text-white fw-bold mb-0">Pandora Việt Nam</h4>
                </div>
            </div>

            <div className="container mt-4" style={{ maxWidth: '1100px' }}>
                
                {/* BACK BUTTON */}
                <button className="btn btn-link text-dark text-decoration-none px-0 mb-3 fw-bold shadow-none d-flex align-items-center">
                    <BsChevronLeft className="me-2" /> Quay lại danh sách đơn hàng
                </button>

                <div className="row g-4">
                    {/* ================= CỘT TRÁI (TIẾN ĐỘ & LỊCH SỬ) ================= */}
                    <div className="col-lg-8">
                        
                        {/* 1. KHỐI TIÊU ĐỀ & TRẠNG THÁI CHUNG */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4 p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h4 className="fw-bold mb-1">Đơn hàng <span style={{ color: BUTTON_PINK }}>{orderInfo.id}</span></h4>
                                    <p className="text-muted mb-0">Ngày đặt: {orderInfo.date}</p>
                                </div>
                                <div className="text-end">
                                    <span className="badge px-3 py-2 rounded-pill fs-6" style={{ backgroundColor: LIGHT_PINK, color: BUTTON_PINK, border: `1px solid ${PANDORA_PINK}` }}>
                                        {orderInfo.status}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-light p-3 rounded-3 d-flex align-items-center">
                                <BsInfoCircle className="text-muted me-2 fs-5" />
                                <span className="text-dark fw-medium">Dự kiến giao hàng: <strong style={{ color: BUTTON_PINK }}>{orderInfo.estimatedDelivery}</strong></span>
                            </div>
                        </div>

                        {/* 2. THANH TIẾN TRÌNH (NGANG) */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4 p-4">
                            <div className="d-flex justify-content-between align-items-center text-center px-lg-4">
                                
                                {/* Step 1 */}
                                <div className={`d-flex flex-column align-items-center step-${orderInfo.currentStep >= 1 ? 'active' : ''}`}>
                                    <div className="step-icon-box mb-2"><BsReceipt /></div>
                                    <span className="fw-bold" style={{ fontSize: '0.85rem' }}>Đã xác nhận</span>
                                </div>
                                <div className={`step-line ${orderInfo.currentStep >= 2 ? 'active' : ''}`}></div>

                                {/* Step 2 */}
                                <div className={`d-flex flex-column align-items-center step-${orderInfo.currentStep >= 2 ? 'active' : ''}`}>
                                    <div className="step-icon-box mb-2"><BsBoxSeam /></div>
                                    <span className="fw-bold" style={{ fontSize: '0.85rem' }}>Đóng gói</span>
                                </div>
                                <div className={`step-line ${orderInfo.currentStep >= 3 ? 'active' : ''}`}></div>

                                {/* Step 3 */}
                                <div className={`d-flex flex-column align-items-center step-${orderInfo.currentStep >= 3 ? 'active' : ''}`}>
                                    <div className="step-icon-box mb-2"><BsTruck /></div>
                                    <span className="fw-bold" style={{ fontSize: '0.85rem' }}>Đang giao</span>
                                </div>
                                <div className={`step-line ${orderInfo.currentStep >= 4 ? 'active' : ''}`}></div>

                                {/* Step 4 */}
                                <div className={`d-flex flex-column align-items-center step-${orderInfo.currentStep >= 4 ? 'active' : ''}`}>
                                    <div className="step-icon-box mb-2"><BsCheck2Circle /></div>
                                    <span className="fw-bold" style={{ fontSize: '0.85rem' }}>Đã giao</span>
                                </div>

                            </div>
                        </div>

                        {/* 3. LỊCH SỬ GIAO HÀNG CHI TIẾT (DỌC) */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4 p-4">
                            <h5 className="fw-bold mb-4 text-dark">Lịch sử cập nhật</h5>
                            
                            <div className="bg-white border rounded-3 p-3 mb-4 d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Đơn vị vận chuyển</p>
                                    <p className="fw-bold text-dark mb-0">{orderInfo.courier}</p>
                                </div>
                                <div className="text-end">
                                    <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Mã vận đơn</p>
                                    <p className="fw-bold mb-0" style={{ color: BUTTON_PINK, cursor: 'pointer' }}>{orderInfo.trackingCode}</p>
                                </div>
                            </div>

                            <div className="tracking-timeline">
                                {trackingLogs.map((log, index) => (
                                    <div key={index} className={`tracking-item ${log.active ? 'active' : ''}`}>
                                        <div className="tracking-dot"></div>
                                        <p className="mb-1 fw-bold tracking-text" style={{ color: log.active ? BUTTON_PINK : '#666' }}>{log.status}</p>
                                        <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>{log.time} • {log.location}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* ================= CỘT PHẢI (TÓM TẮT ĐƠN HÀNG) ================= */}
                    <div className="col-lg-4">
                        
                        {/* THÔNG TIN NHẬN HÀNG */}
                        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                            <h6 className="fw-bold mb-3 text-dark">Thông tin nhận hàng</h6>
                            <p className="fw-bold mb-1">{orderInfo.customerName}</p>
                            <p className="text-muted mb-2"><BsTelephone className="me-2" />{orderInfo.phone}</p>
                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                                <BsGeoAlt className="me-2" />{orderInfo.address}
                            </p>
                            
                            <hr className="my-3 text-muted" />
                            
                            <h6 className="fw-bold mb-2 text-dark">Thanh toán</h6>
                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                <BsCreditCard className="me-2" />{orderInfo.paymentMethod}
                            </p>
                        </div>

                        {/* SẢN PHẨM ĐÃ ĐẶT */}
                        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                            <h6 className="fw-bold mb-3 text-dark">Sản phẩm ({orderInfo.items.length})</h6>
                            
                            {orderInfo.items.map((item, idx) => (
                                <div key={idx} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                                    <div className="border rounded-3 p-1 me-3 d-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px', flexShrink: 0 }}>
                                        <img src={item.img} alt={item.name} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <p className="fw-bold text-dark mb-1" style={{ fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</p>
                                        <p className="text-muted mb-1" style={{ fontSize: '0.75rem' }}>{item.variant} x {item.qty}</p>
                                        <p className="fw-bold mb-0 text-dark" style={{ fontSize: '0.85rem' }}>{item.price}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <span className="text-dark fw-bold">Tổng thanh toán</span>
                                <span className="fs-5 fw-bold" style={{ color: BUTTON_PINK }}>{orderInfo.total}</span>
                            </div>
                        </div>

                        {/* NÚT HỖ TRỢ */}
                        <button className="btn w-100 py-3 rounded-4 fw-bold shadow-none" style={{ backgroundColor: LIGHT_PINK, color: BUTTON_PINK, border: `2px solid ${PANDORA_PINK}` }}>
                            <BsChatLeftText className="me-2" /> Liên hệ chăm sóc khách hàng
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;