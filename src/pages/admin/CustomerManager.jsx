import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    BsSearch, BsPeople, BsPencilSquare, BsEnvelope, BsX, BsEye, 
    BsArrowLeft, BsTelephone, BsCalendarDate, BsCartCheck, BsAward, BsClockHistory
} from 'react-icons/bs';

const CustomerManager = () => {
    // 1. KÍCH HOẠT ĐỌC URL
    const { itemId } = useParams(); // Lấy mã CUS-xxx từ thanh địa chỉ
    const navigate = useNavigate();

    // 2. STATE: Dữ liệu khách hàng
    const [customers, setCustomers] = useState([
        { id: 'CUS-001', name: 'Jane Cooper', phone: '(225) 555-0118', email: 'jane@microsoft.com', membership: 'Silver', status: 'Hoạt động', dob: '12/05/1995', totalItems: 24, totalSpent: '$1,250.00', password: 'hashedpassword1' },
        { id: 'CUS-002', name: 'Floyd Miles', phone: '(205) 555-0100', email: 'floyd@yahoo.com', membership: 'Bronze', status: 'Bị khóa', dob: '08/11/1998', totalItems: 3, totalSpent: '$150.00', password: 'hashedpassword2' },
        { id: 'CUS-003', name: 'Ronald Richards', phone: '(302) 555-0107', email: 'ronald@adobe.com', membership: 'Gold', status: 'Hoạt động', dob: '23/02/1990', totalItems: 56, totalSpent: '$3,890.50', password: 'hashedpassword3' },
        { id: 'CUS-004', name: 'Marvin McKinney', phone: '(252) 555-0126', email: 'marvin@tesla.com', membership: 'VIP', status: 'Hoạt động', dob: '15/09/1985', totalItems: 120, totalSpent: '$9,500.00', password: 'hashedpassword4' },
        { id: 'CUS-005', name: 'Jerome Bell', phone: '(629) 555-0129', email: 'jerome@google.com', membership: 'Bronze', status: 'Hoạt động', dob: '30/01/2000', totalItems: 1, totalSpent: '$65.00', password: 'hashedpassword5' },
        { id: 'CUS-006', name: 'Kathryn Murphy', phone: '(406) 555-0120', email: 'kathryn@microsoft.com', membership: 'Silver', status: 'Hoạt động', dob: '19/07/1993', totalItems: 15, totalSpent: '$890.00', password: 'hashedpassword6' },
    ]);

    // Dữ liệu ảo cho Lịch sử mua hàng (Dùng chung cho tất cả khách để minh họa)
    const dummyPurchaseHistory = [
        { orderId: '#ORD-0921', date: '20/10/2023', items: 'Nhẫn Bạc Pandora, Charm Trái Tim...', total: '$180.00', status: 'Hoàn thành' },
        { orderId: '#ORD-0855', date: '15/09/2023', items: 'Vòng tay Basic', total: '$75.00', status: 'Hoàn thành' },
        { orderId: '#ORD-0712', date: '02/08/2023', items: 'Bông tai Nụ Đá Xanh', total: '$45.00', status: 'Hoàn thành' },
    ];

    const [editingCustomer, setEditingCustomer] = useState(null); 

    // --- CÁC HÀM XỬ LÝ GIAO DIỆN ---
    const getStatusStyle = (status) => {
        if (status === 'Hoạt động') return { bg: '#16c09833', color: '#008767', border: '1px solid #008767' };
        return { bg: '#ffc5c5', color: '#df0404', border: '1px solid #df0404' }; // Bị khóa
    };

    const getMembershipStyle = (tier) => {
        switch(tier) {
            case 'VIP': return { color: '#d32f2f', bg: '#ffebee', border: '1px solid #d32f2f' }; 
            case 'Gold': return { color: '#d39e00', bg: '#fffde7', border: '1px solid #d39e00' }; 
            case 'Silver': return { color: '#455a64', bg: '#cfd8dc', border: '1px solid #455a64' }; 
            default: return { color: '#8d6e63', bg: '#efebe9', border: '1px solid #8d6e63' }; // Bronze
        }
    };

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    const calculateAge = (dobString) => {
        if (!dobString) return '';
        const [day, month, year] = dobString.split('/');
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    };

    // =========================================================
    // HÀM MỚI: CHUYỂN ĐỔI TRẠNG THÁI VÀ HẠNG KHI CLICK
    // =========================================================
    const handleToggleStatus = (id) => {
        setCustomers(customers.map(c => c.id === id ? { ...c, status: c.status === 'Hoạt động' ? 'Bị khóa' : 'Hoạt động' } : c));
    };

    const handleToggleMembership = (id) => {
        setCustomers(customers.map(c => {
            if (c.id === id) {
                const tiers = ['Bronze', 'Silver', 'Gold', 'VIP'];
                const nextTier = tiers[(tiers.indexOf(c.membership) + 1) % tiers.length];
                return { ...c, membership: nextTier };
            }
            return c;
        }));
    };

    // ĐIỀU HƯỚNG BẰNG URL
    const handleViewDetails = (customer) => navigate(`/admin/users/${customer.id}`);
    const handleBackToCustomers = () => navigate('/admin/users');

    const handleEditClick = (customer) => setEditingCustomer(customer);
    const handleInputChange = (e) => setEditingCustomer({ ...editingCustomer, [e.target.name]: e.target.value });
    const handleSaveChanges = () => {
        setCustomers(customers.map(c => c.id === editingCustomer.id ? editingCustomer : c));
        setEditingCustomer(null); 
    };

    // TÌM KHÁCH HÀNG ĐANG ĐƯỢC CHỌN QUA URL
    const selectedCustomer = customers.find(c => c.id === itemId);

    // ========================================================================
    // GIAO DIỆN 2: TRANG CHI TIẾT KHÁCH HÀNG (Hiển thị khi URL có mã CUS-xxx)
    // ========================================================================
    if (selectedCustomer) {
        const statusStyle = getStatusStyle(selectedCustomer.status);
        const memStyle = getMembershipStyle(selectedCustomer.membership);

        return (
            <div className="card border-0 shadow-sm rounded-4 p-4 position-relative">
                {/* Header: Nút Quay lại & Avatar */}
                <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                    <button 
                        className="btn btn-light rounded-circle d-flex justify-content-center align-items-center me-4 shadow-none border" 
                        style={{ width: '40px', height: '40px' }}
                        onClick={handleBackToCustomers}
                    >
                        <BsArrowLeft className="fs-5 text-dark" />
                    </button>
                    
                    <div className="d-flex align-items-center w-100">
                        <div className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold me-3 shadow-sm" style={{ width: '60px', height: '60px', backgroundColor: '#5932ea', fontSize: '1.5rem' }}>
                            {getInitials(selectedCustomer.name)}
                        </div>
                        <div>
                            <h4 className="fw-bold mb-1 text-dark">{selectedCustomer.name}</h4>
                            <p className="text-muted mb-0">Mã KH: <span className="text-primary">{selectedCustomer.id}</span></p>
                        </div>
                    </div>
                </div>

                {/* Grid 3 cột thống kê */}
                <div className="row g-4 mb-5">
                    {/* Cột 1: Thông tin cá nhân */}
                    <div className="col-lg-4">
                        <div className="card h-100 border rounded-4 shadow-sm p-4">
                            <h6 className="fw-bold d-flex align-items-center mb-4 text-dark">
                                <BsPeople className="me-2 fs-5" style={{color: '#5932ea'}}/> Thông tin liên hệ
                            </h6>
                            <p className="mb-3 text-muted"><BsEnvelope className="me-2 text-dark"/> {selectedCustomer.email}</p>
                            <p className="mb-3 text-muted"><BsTelephone className="me-2 text-dark"/> {selectedCustomer.phone}</p>
                            <p className="mb-0 text-muted"><BsCalendarDate className="me-2 text-dark"/> {selectedCustomer.dob} <span className="fw-bold text-dark">({calculateAge(selectedCustomer.dob)} tuổi)</span></p>
                        </div>
                    </div>

                    {/* Cột 2: Phân loại tài khoản (Có thể Click) */}
                    <div className="col-lg-4">
                        <div className="card h-100 border rounded-4 shadow-sm p-4">
                            <h6 className="fw-bold d-flex align-items-center mb-4 text-dark">
                                <BsAward className="me-2 fs-5 text-warning"/> Cấp bậc tài khoản
                            </h6>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted fw-bold">Hạng thành viên:</span>
                                <span 
                                    className="px-3 py-1 rounded-2 fw-bold" 
                                    onClick={() => handleToggleMembership(selectedCustomer.id)}
                                    title="Click để đổi hạng"
                                    style={{ backgroundColor: memStyle.bg, color: memStyle.color, border: memStyle.border, cursor: 'pointer', userSelect: 'none' }}
                                >
                                    {selectedCustomer.membership}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-muted fw-bold">Trạng thái:</span>
                                <span 
                                    className="px-3 py-1 rounded-2 fw-bold" 
                                    onClick={() => handleToggleStatus(selectedCustomer.id)}
                                    title="Click để đổi trạng thái"
                                    style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: statusStyle.border, cursor: 'pointer', userSelect: 'none' }}
                                >
                                    {selectedCustomer.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Cột 3: Lịch sử chi tiêu */}
                    <div className="col-lg-4">
                        <div className="card h-100 border rounded-4 shadow-sm p-4 bg-light border-0">
                            <h6 className="fw-bold d-flex align-items-center mb-4 text-dark">
                                <BsCartCheck className="me-2 fs-5 text-success"/> Thống kê chi tiêu
                            </h6>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Tổng sản phẩm đã mua:</span>
                                <span className="fw-bold text-dark fs-5">{selectedCustomer.totalItems}</span>
                            </div>
                            <div className="d-flex justify-content-between pt-3 border-top">
                                <span className="text-muted mt-1">Tổng tiền tích lũy:</span>
                                <span className="fw-bold fs-3" style={{color: '#5932ea'}}>{selectedCustomer.totalSpent}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bảng Lịch sử mua hàng */}
                <h5 className="fw-bold mb-3 d-flex align-items-center">
                    <BsClockHistory className="me-2 text-primary"/> Lịch sử mua hàng gần đây
                </h5>
                <div className="table-responsive border rounded-4 overflow-hidden">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="text-muted fw-bold py-3 ps-4 border-bottom-0">Mã đơn</th>
                                <th className="text-muted fw-bold py-3 border-bottom-0">Ngày mua</th>
                                <th className="text-muted fw-bold py-3 border-bottom-0">Sản phẩm chính</th>
                                <th className="text-muted fw-bold py-3 border-bottom-0 text-center">Trạng thái</th>
                                <th className="text-muted fw-bold py-3 border-bottom-0 text-end pe-4">Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyPurchaseHistory.map((order, idx) => (
                                <tr key={idx}>
                                    <td className="py-3 ps-4 fw-bold text-dark">{order.orderId}</td>
                                    <td className="py-3 text-muted">{order.date}</td>
                                    <td className="py-3 text-muted fst-italic">{order.items}</td>
                                    <td className="py-3 text-center">
                                        <span className="badge bg-success bg-opacity-10 text-success border border-success rounded-1 px-2 py-1">{order.status}</span>
                                    </td>
                                    <td className="py-3 text-end pe-4 fw-bold text-dark">{order.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // ========================================================================
    // GIAO DIỆN 1: TRANG DANH SÁCH KHÁCH HÀNG
    // ========================================================================
    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 position-relative">
            
            {/* --- HEADER & THANH CÔNG CỤ --- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1 d-flex align-items-center">
                        <BsPeople className="me-2 text-primary" style={{ color: '#5932ea' }}/> Tất cả Khách hàng
                    </h4>
                    <p className="text-success mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Quản lý và phân hạng thành viên</p>
                </div>

                <div className="d-flex gap-3 align-items-center">
                    <div className="input-group bg-light rounded-3" style={{ width: '250px', border: 'none' }}>
                        <span className="input-group-text bg-transparent border-0 pe-1"><BsSearch className="text-muted" /></span>
                        <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Tìm kiếm khách hàng..." />
                    </div>
                </div>
            </div>

            {/* --- BẢNG KHÁCH HÀNG --- */}
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th className="text-muted fw-normal border-bottom-0 pb-3">Tên Khách hàng</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3">Số điện thoại</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3">Email</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Hạng</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Trạng thái</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-end" style={{ minWidth: '100px' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => {
                            const statusStyle = getStatusStyle(customer.status);
                            const memStyle = getMembershipStyle(customer.membership);
                            
                            return (
                                <tr key={customer.id}>
                                    <td className="py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold me-3" style={{ width: '40px', height: '40px', backgroundColor: '#5932ea', fontSize: '0.9rem' }}>
                                                {getInitials(customer.name)}
                                            </div>
                                            <div>
                                                <p className="fw-bold mb-0 text-dark">{customer.name}</p>
                                                <small className="text-muted">{customer.id}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 fw-medium text-dark">{customer.phone}</td>
                                    <td className="py-3 text-muted">{customer.email}</td>
                                    <td className="py-3 text-center">
                                        {/* CLICK ĐỔI HẠNG */}
                                        <span 
                                            className="px-2 py-1 rounded-1 fw-bold" 
                                            onClick={() => handleToggleMembership(customer.id)}
                                            title="Click để chuyển hạng"
                                            style={{ backgroundColor: memStyle.bg, color: memStyle.color, border: memStyle.border, fontSize: '0.75rem', cursor: 'pointer', userSelect: 'none' }}
                                        >
                                            {customer.membership}
                                        </span>
                                    </td>
                                    <td className="py-3 text-center">
                                        {/* CLICK ĐỔI TRẠNG THÁI */}
                                        <span 
                                            className="px-3 py-1 rounded-1 fw-bold" 
                                            onClick={() => handleToggleStatus(customer.id)}
                                            title="Click để chuyển trạng thái"
                                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: statusStyle.border, fontSize: '0.85rem', cursor: 'pointer', userSelect: 'none' }}
                                        >
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-end">
                                        {/* NÚT XEM CHI TIẾT (Nhảy trang) */}
                                        <button 
                                            className="btn btn-sm btn-light border me-1 shadow-none" 
                                            title="Xem chi tiết"
                                            onClick={() => handleViewDetails(customer)}
                                        >
                                            <BsEye className="text-primary" />
                                        </button>
                                        {/* NÚT SỬA (Giữ nguyên Popup) */}
                                        <button 
                                            className="btn btn-sm btn-light border shadow-none" 
                                            title="Chỉnh sửa"
                                            onClick={() => handleEditClick(customer)}
                                        >
                                            <BsPencilSquare className="text-success" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* ===================================================================== */}
            {/* MODAL: CHỈNH SỬA KHÁCH HÀNG (Giữ lại để sửa Tên, ĐT, Email) */}
            {/* ===================================================================== */}
            {editingCustomer && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: '450px', maxWidth: '90%' }}>
                        
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                            <h5 className="fw-bold mb-0">Sửa thông tin khách hàng</h5>
                            <button className="btn btn-sm btn-light rounded-circle" onClick={() => setEditingCustomer(null)}>
                                <BsX className="fs-4" />
                            </button>
                        </div>

                        {/* Form điền thông tin */}
                        <div className="mb-3">
                            <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Tên khách hàng</label>
                            <input type="text" className="form-control shadow-none" name="name" value={editingCustomer.name} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Số điện thoại</label>
                            <input type="text" className="form-control shadow-none" name="phone" value={editingCustomer.phone} onChange={handleInputChange} />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Email</label>
                            <input type="email" className="form-control shadow-none" name="email" value={editingCustomer.email} onChange={handleInputChange} />
                        </div>

                        {/* Nút hành động */}
                        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                            <button className="btn btn-light fw-bold px-4" onClick={() => setEditingCustomer(null)}>Hủy</button>
                            <button className="btn text-white fw-bold px-4" style={{ backgroundColor: '#5932ea' }} onClick={handleSaveChanges}>
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerManager;