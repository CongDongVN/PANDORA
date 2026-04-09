import React, { useState } from 'react';
import { BsSearch, BsEye, BsBoxSeam, BsX, BsFilter } from 'react-icons/bs';

const OrderManager = () => {
    // Dữ liệu mô phỏng cho Đơn hàng (Có thêm mảng 'items' để xem chi tiết)
    const [orders, setOrders] = useState([
        { 
            id: 'ORD-001', customer: 'Jane Cooper', date: '25/10/2023', total: '$125.00', status: 'Hoàn thành',
            items: [{ name: 'Nhẫn Bạc Pandora', qty: 1, price: '$125.00' }]
        },
        { 
            id: 'ORD-002', customer: 'Floyd Miles', date: '26/10/2023', total: '$205.00', status: 'Đang giao',
            items: [{ name: 'Dây chuyền Trái tim', qty: 1, price: '$150.00' }, { name: 'Charm Bạc', qty: 1, price: '$55.00' }]
        },
        { 
            id: 'ORD-003', customer: 'Ronald Richards', date: '26/10/2023', total: '$89.50', status: 'Huỷ',
            items: [{ name: 'Bông tai đính đá', qty: 1, price: '$89.50' }]
        },
        { 
            id: 'ORD-004', customer: 'Marvin McKinney', date: '27/10/2023', total: '$150.00', status: 'Chờ xác nhận',
            items: [{ name: 'Vòng tay Basic', qty: 2, price: '$75.00' }]
        },
    ]);

    // State quản lý việc mở/đóng cửa sổ Popup Chi tiết
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Hàm render màu sắc cho Trạng thái
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Hoàn thành': return { bg: '#16c09833', color: '#008767', border: '1px solid #008767' };
            case 'Huỷ': return { bg: '#ffc5c5', color: '#df0404', border: '1px solid #df0404' };
            case 'Đang giao': return { bg: '#e7edff', color: '#396aff', border: '1px solid #396aff' };
            default: return { bg: '#f5f5f5', color: '#555', border: '1px solid #ccc' }; // Chờ xác nhận
        }
    };

    // Hàm mở popup xem chi tiết
    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    // Hàm đóng popup
    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    // Hàm thay đổi trạng thái đơn hàng (Mô phỏng)
    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        // Cập nhật state (Trong thực tế, chỗ này sẽ gọi API để báo Backend cập nhật)
        const updatedOrders = orders.map(o => 
            o.id === selectedOrder.id ? { ...o, status: newStatus } : o
        );
        setOrders(updatedOrders);
        setSelectedOrder({ ...selectedOrder, status: newStatus });
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 position-relative">
            
            {/* --- HEADER & THANH CÔNG CỤ --- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1 d-flex align-items-center">
                        <BsBoxSeam className="me-2 text-primary" style={{ color: '#5932ea' }}/> 
                        Quản lý Đơn hàng
                    </h4>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Theo dõi và cập nhật trạng thái đơn hàng</p>
                </div>

                <div className="d-flex gap-3">
                    <div className="input-group bg-light rounded-3" style={{ width: '250px', border: 'none' }}>
                        <span className="input-group-text bg-transparent border-0 pe-1">
                            <BsSearch className="text-muted" />
                        </span>
                        <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Tìm mã đơn, tên KH..." />
                    </div>
                    <button className="btn btn-light border d-flex align-items-center px-3 fw-bold text-muted shadow-none">
                        <BsFilter className="me-2 fs-5" /> Lọc
                    </button>
                </div>
            </div>

            {/* --- BẢNG ĐƠN HÀNG --- */}
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
                                    <td className="py-3 fw-bold fs-6">{order.customer}</td>
                                    <td className="py-3 text-muted">{order.date}</td>
                                    <td className="py-3 fw-bold">{order.total}</td>
                                    <td className="py-3 text-center">
                                        <span 
                                            className="px-3 py-1 rounded-1 fw-bold" 
                                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: statusStyle.border, fontSize: '0.85rem' }}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-end">
                                        <button 
                                            className="btn btn-sm btn-light border shadow-none" 
                                            title="Xem chi tiết"
                                            onClick={() => handleViewDetails(order)}
                                        >
                                            <BsEye className="text-primary" /> Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* --- POPUP (MODAL) CHI TIẾT ĐƠN HÀNG --- */}
            {selectedOrder && (
                <div 
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1050 }}
                >
                    <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: '500px', maxWidth: '90%' }}>
                        
                        {/* Header của Popup */}
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                            <h5 className="fw-bold mb-0">Chi tiết đơn {selectedOrder.id}</h5>
                            <button className="btn btn-sm btn-light rounded-circle" onClick={handleCloseModal}>
                                <BsX className="fs-4" />
                            </button>
                        </div>

                        {/* Thông tin chung */}
                        <div className="mb-4">
                            <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>Khách hàng: <span className="fw-bold text-dark">{selectedOrder.customer}</span></p>
                            <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>Ngày đặt: <span className="fw-bold text-dark">{selectedOrder.date}</span></p>
                        </div>

                        {/* Danh sách sản phẩm đã mua */}
                        <h6 className="fw-bold mb-3">Sản phẩm:</h6>
                        <ul className="list-group mb-4">
                            {selectedOrder.items.map((item, idx) => (
                                <li key={idx} className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2 border-bottom">
                                    <div>
                                        <p className="mb-0 fw-bold">{item.name}</p>
                                        <small className="text-muted">Số lượng: {item.qty}</small>
                                    </div>
                                    <span className="fw-bold">{item.price}</span>
                                </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pt-3">
                                <span className="fw-bold fs-5">Tổng cộng:</span>
                                <span className="fw-bold fs-5 text-danger">{selectedOrder.total}</span>
                            </li>
                        </ul>

                        {/* Cập nhật trạng thái */}
                        <h6 className="fw-bold mb-2">Cập nhật trạng thái:</h6>
                        <select 
                            className="form-select shadow-none fw-bold mb-3" 
                            value={selectedOrder.status}
                            onChange={handleStatusChange}
                            style={{ cursor: 'pointer' }}
                        >
                            <option value="Chờ xác nhận">Chờ xác nhận</option>
                            <option value="Đang giao">Đang giao</option>
                            <option value="Hoàn thành">Hoàn thành</option>
                            <option value="Huỷ">Huỷ</option>
                        </select>
                        
                    </div>
                </div>
            )}

        </div>
    );
};

export default OrderManager;