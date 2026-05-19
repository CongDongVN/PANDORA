import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    BsSearch, BsEye, BsBoxSeam, BsFilter, BsArrowLeft, 
    BsPerson, BsCalendarDate, BsGeoAlt, BsTelephone, 
    BsEnvelope, BsCreditCard, BsTruck, BsChatLeftText
} from 'react-icons/bs';

const OrderManager = () => {
    const { itemId } = useParams(); 
    const navigate = useNavigate();

    // 1. DỮ LIỆU ĐƠN HÀNG (ĐÃ BỔ SUNG RẤT NHIỀU THÔNG TIN CHI TIẾT)
    const [orders, setOrders] = useState([
        { 
            id: 'ORD-001', customer: 'Jane Cooper', date: '25/10/2023 - 14:30', total: '20,560,000đ', status: 'Hoàn thành',
            email: 'jane.cooper@example.com', phone: '0901 234 567',
            address: '14 Ngách 322/3 Ngõ 322 Đường Mỹ Đình, Phường Mỹ Đình 1, Quận Nam Từ Liêm, Hà Nội',
            paymentMethod: 'Chuyển khoản QR (Techcombank)', shippingCarrier: 'Giao hàng Tiêu chuẩn', trackingCode: 'GHTK123456789',
            subtotal: '20,560,000đ', shippingFee: 'Miễn phí', discount: '0đ', note: 'Giao giờ hành chính giúp mình nhé. Bọc quà cẩn thận ạ.',
            items: [
                { name: 'Charm Bạc Pandora Moments', variant: 'Bạc / Onesize / 798825C00', qty: 11, price: '9,790,000đ' },
                { name: 'Nhẫn Pandora ME Trái Tim', variant: 'Bạc / size 48 / 193088C02', qty: 2, price: '3,580,000đ' }
            ]
        },
        { 
            id: 'ORD-002', customer: 'Floyd Miles', date: '26/10/2023 - 09:15', total: '7,190,000đ', status: 'Đang giao',
            email: 'floyd.miles@example.com', phone: '0987 654 321',
            address: 'Tòa nhà Bitexco, Số 2 Hải Triều, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
            paymentMethod: 'Thanh toán khi nhận hàng (COD)', shippingCarrier: 'Ahamove Hỏa tốc', trackingCode: 'AHA987654321',
            subtotal: '7,190,000đ', shippingFee: '50,000đ', discount: '-50,000đ (Freeship)', note: 'Không có ghi chú',
            items: [
                { name: 'Dây Chuyền Pandora Timeless', variant: 'Mạ Vàng 14K / 363365C01', qty: 1, price: '7,190,000đ' }
            ]
        },
        { 
            id: 'ORD-003', customer: 'Ronald Richards', date: '26/10/2023 - 18:45', total: '3,580,000đ', status: 'Huỷ',
            email: 'ronald.r@example.com', phone: '0912 345 678',
            address: 'Số 10 Lê Lợi, Phường Vĩnh Ninh, TP. Huế',
            paymentMethod: 'Ví MoMo', shippingCarrier: 'Giao hàng Tiêu chuẩn', trackingCode: 'Chưa có',
            subtotal: '3,580,000đ', shippingFee: '30,000đ', discount: '0đ', note: 'Khách đổi ý không mua nữa',
            items: [
                { name: 'Nhẫn Pandora ME Trái Tim', variant: 'Bạc / size 50', qty: 1, price: '3,580,000đ' }
            ]
        },
        { 
            id: 'ORD-004', customer: 'Marvin McKinney', date: '27/10/2023 - 10:00', total: '19,580,000đ', status: 'Chờ xác nhận',
            email: 'marvin.mck@example.com', phone: '0945 678 910',
            address: 'Khu dân cư Trung Sơn, Bình Hưng, Bình Chánh, TP. Hồ Chí Minh',
            paymentMethod: 'Thẻ tín dụng (VNPay)', shippingCarrier: 'Giao hàng Tiêu chuẩn', trackingCode: 'Chưa có',
            subtotal: '20,080,000đ', shippingFee: 'Miễn phí', discount: '-500,000đ (Mã: PANDORA500)', note: 'Gọi trước khi giao',
            items: [
                { name: 'Vòng tay Basic Pandora', variant: 'Bạc / Size 17', qty: 2, price: '9,790,000đ' }
            ]
        },
    ]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Hoàn thành': return { bg: '#16c09833', color: '#008767', border: '1px solid #008767' };
            case 'Huỷ': return { bg: '#ffc5c5', color: '#df0404', border: '1px solid #df0404' };
            case 'Đang giao': return { bg: '#e7edff', color: '#396aff', border: '1px solid #396aff' };
            default: return { bg: '#fff3cd', color: '#856404', border: '1px solid #d39e00' }; // Chờ xác nhận
        }
    };

    const handleToggleStatus = (orderId) => {
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                let nextStatus = 'Chờ xác nhận';
                if (order.status === 'Chờ xác nhận') nextStatus = 'Đang giao';
                else if (order.status === 'Đang giao') nextStatus = 'Hoàn thành';
                else if (order.status === 'Hoàn thành') nextStatus = 'Huỷ';
                else if (order.status === 'Huỷ') nextStatus = 'Chờ xác nhận';
                return { ...order, status: nextStatus };
            }
            return order;
        }));
    };

    const handleViewDetails = (order) => navigate(`/admin/orders/${order.id}`);
    const handleBackToOrders = () => navigate('/admin/orders');

    const selectedOrder = orders.find(o => o.id === itemId);

    // ========================================================================
    // GIAO DIỆN 2: TRANG CHI TIẾT ĐƠN HÀNG (FULL THÔNG TIN)
    // ========================================================================
    if (selectedOrder) {
        const statusStyle = getStatusStyle(selectedOrder.status);
        
        return (
            <div className="card border-0 shadow-sm rounded-4 p-4 position-relative">
                {/* Header */}
                <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                    <button 
                        className="btn btn-light rounded-circle d-flex justify-content-center align-items-center me-3 shadow-none border" 
                        style={{ width: '40px', height: '40px' }}
                        onClick={handleBackToOrders}
                    >
                        <BsArrowLeft className="fs-5 text-dark" />
                    </button>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <h4 className="fw-bold mb-1 d-flex align-items-center">
                                Chi tiết đơn hàng: <span className="ms-2" style={{ color: '#5932ea' }}>{selectedOrder.id}</span>
                            </h4>
                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                Ngày đặt: {selectedOrder.date}
                            </p>
                        </div>
                        <div 
                            className="px-4 py-2 rounded-3 fw-bold shadow-sm d-flex align-items-center" 
                            onClick={() => handleToggleStatus(selectedOrder.id)}
                            title="Click để chuyển trạng thái"
                            style={{ 
                                backgroundColor: statusStyle.bg, color: statusStyle.color, border: statusStyle.border,
                                cursor: 'pointer', userSelect: 'none', transition: 'all 0.2s ease'
                            }}
                        >
                            Trạng thái: <span className="ms-1">{selectedOrder.status}</span>
                        </div>
                    </div>
                </div>

                {/* Grid Thông tin chi tiết (Chia 3 cột) */}
                <div className="row g-4 mb-4">
                    {/* Cột 1: Thông tin khách hàng */}
                    <div className="col-lg-4">
                        <div className="card h-100 border rounded-4 shadow-sm p-3">
                            <h6 className="fw-bold d-flex align-items-center mb-3 text-dark">
                                <BsPerson className="me-2 fs-5 text-primary" style={{color: '#5932ea'}}/> Thông tin khách hàng
                            </h6>
                            <p className="mb-2 text-dark fw-medium">{selectedOrder.customer}</p>
                            <p className="mb-2 text-muted" style={{fontSize: '0.9rem'}}><BsEnvelope className="me-2"/>{selectedOrder.email}</p>
                            <p className="mb-0 text-muted" style={{fontSize: '0.9rem'}}><BsTelephone className="me-2"/>{selectedOrder.phone}</p>
                        </div>
                    </div>

                    {/* Cột 2: Địa chỉ giao hàng */}
                    <div className="col-lg-4">
                        <div className="card h-100 border rounded-4 shadow-sm p-3">
                            <h6 className="fw-bold d-flex align-items-center mb-3 text-dark">
                                <BsGeoAlt className="me-2 fs-5 text-danger"/> Địa chỉ giao hàng
                            </h6>
                            <p className="mb-0 text-muted" style={{fontSize: '0.95rem', lineHeight: '1.6'}}>
                                {selectedOrder.address}
                            </p>
                        </div>
                    </div>

                    {/* Cột 3: Thanh toán & Vận chuyển */}
                    <div className="col-lg-4">
                        <div className="card h-100 border rounded-4 shadow-sm p-3">
                            <h6 className="fw-bold d-flex align-items-center mb-3 text-dark">
                                <BsCreditCard className="me-2 fs-5 text-success"/> Thanh toán & Giao hàng
                            </h6>
                            <p className="mb-2 text-muted" style={{fontSize: '0.9rem'}}>
                                <span className="fw-bold text-dark">Thanh toán:</span> {selectedOrder.paymentMethod}
                            </p>
                            <p className="mb-2 text-muted" style={{fontSize: '0.9rem'}}>
                                <span className="fw-bold text-dark">Đơn vị GH:</span> {selectedOrder.shippingCarrier}
                            </p>
                            <p className="mb-0 text-muted" style={{fontSize: '0.9rem'}}>
                                <span className="fw-bold text-dark">Mã vận đơn:</span> <span className="text-primary" style={{cursor: 'pointer'}}>{selectedOrder.trackingCode}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bảng sản phẩm */}
                <div className="card border rounded-4 shadow-sm mb-4 overflow-hidden">
                    <div className="card-header bg-white border-bottom py-3">
                        <h6 className="fw-bold mb-0 text-dark">Sản phẩm đã mua</h6>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="text-muted fw-bold py-3 border-bottom-0 ps-4">Sản phẩm</th>
                                    <th className="text-muted fw-bold py-3 border-bottom-0 text-center">Đơn giá</th>
                                    <th className="text-muted fw-bold py-3 border-bottom-0 text-center">Số lượng</th>
                                    <th className="text-muted fw-bold py-3 border-bottom-0 text-end pe-4">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedOrder.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="py-3 ps-4">
                                            <p className="fw-bold text-dark mb-1">{item.name}</p>
                                            <small className="text-muted">{item.variant}</small>
                                        </td>
                                        <td className="py-3 text-center text-muted fw-medium">{item.price}</td>
                                        <td className="py-3 text-center fw-bold">{item.qty}</td>
                                        <td className="py-3 fw-bold text-dark text-end pe-4">{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Ghi chú & Tính tiền */}
                <div className="row">
                    {/* Ghi chú */}
                    <div className="col-lg-6 mb-3 mb-lg-0">
                        <div className="card h-100 border rounded-4 shadow-sm p-3 bg-light">
                            <h6 className="fw-bold d-flex align-items-center mb-2 text-dark">
                                <BsChatLeftText className="me-2 text-warning"/> Ghi chú của khách hàng
                            </h6>
                            <p className="mb-0 text-muted fst-italic" style={{fontSize: '0.95rem'}}>
                                "{selectedOrder.note}"
                            </p>
                        </div>
                    </div>

                    {/* Bảng tính tổng tiền */}
                    <div className="col-lg-6">
                        <div className="card border rounded-4 shadow-sm p-4">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Tạm tính</span>
                                <span className="fw-medium text-dark">{selectedOrder.subtotal}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Phí vận chuyển</span>
                                <span className="fw-medium text-dark">{selectedOrder.shippingFee}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Giảm giá</span>
                                <span className="fw-medium text-success">{selectedOrder.discount}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                <span className="fw-bold text-dark fs-5">Tổng cộng</span>
                                <span className="fw-bold fs-4" style={{color: '#5932ea'}}>{selectedOrder.total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ========================================================================
    // GIAO DIỆN 1: TRANG DANH SÁCH ĐƠN HÀNG 
    // ========================================================================
    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 position-relative">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1 d-flex align-items-center">
                        <BsBoxSeam className="me-2 text-primary" style={{ color: '#5932ea' }}/> Quản lý Đơn hàng
                    </h4>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Theo dõi và cập nhật trạng thái đơn hàng</p>
                </div>
                <div className="d-flex gap-3">
                    <div className="input-group bg-light rounded-3" style={{ width: '250px', border: 'none' }}>
                        <span className="input-group-text bg-transparent border-0 pe-1"><BsSearch className="text-muted" /></span>
                        <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Tìm mã đơn, tên KH..." />
                    </div>
                    <button className="btn btn-light border d-flex align-items-center px-3 fw-bold text-muted shadow-none">
                        <BsFilter className="me-2 fs-5" /> Lọc
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th className="text-muted fw-normal border-bottom-0 pb-3">Mã đơn</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3">Khách hàng</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3">Ngày đặt</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3">Tổng tiền</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Trạng thái</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-end">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const statusStyle = getStatusStyle(order.status);
                            return (
                                <tr key={order.id}>
                                    <td className="py-3 fw-bold text-secondary">{order.id}</td>
                                    <td className="py-3 fw-bold fs-6 text-dark">{order.customer}</td>
                                    <td className="py-3 text-muted">{order.date.split(' - ')[0]}</td>
                                    <td className="py-3 fw-bold text-dark">{order.total}</td>
                                    <td className="py-3 text-center">
                                        <span 
                                            className="px-3 py-1 rounded-1 fw-bold" 
                                            title="Click để chuyển trạng thái"
                                            onClick={() => handleToggleStatus(order.id)}
                                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: statusStyle.border, fontSize: '0.85rem', cursor: 'pointer', userSelect: 'none' }}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-end">
                                        <button className="btn btn-sm btn-light border shadow-none" title="Xem chi tiết đơn hàng" onClick={() => handleViewDetails(order)}>
                                            <BsEye className="text-primary me-1" /> Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManager;