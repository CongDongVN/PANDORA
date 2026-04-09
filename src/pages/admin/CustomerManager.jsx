import React, { useState } from 'react';
import { BsSearch, BsFilter, BsPeople, BsPencilSquare, BsShieldLock, BsEnvelope, BsX, BsEye } from 'react-icons/bs';

const CustomerManager = () => {
    // 1. STATE: Dữ liệu khách hàng (Đã bổ sung thêm ngày sinh, số lượng mua, tổng tiền và mật khẩu)
    const [customers, setCustomers] = useState([
        { id: 'CUS-001', name: 'Jane Cooper', phone: '(225) 555-0118', email: 'jane@microsoft.com', membership: 'Silver', status: 'Hoạt động', dob: '12/05/1995', totalItems: 24, totalSpent: '$1,250.00', password: 'hashedpassword1' },
        { id: 'CUS-002', name: 'Floyd Miles', phone: '(205) 555-0100', email: 'floyd@yahoo.com', membership: 'Bronze', status: 'Bị khóa', dob: '08/11/1998', totalItems: 3, totalSpent: '$150.00', password: 'hashedpassword2' },
        { id: 'CUS-003', name: 'Ronald Richards', phone: '(302) 555-0107', email: 'ronald@adobe.com', membership: 'Gold', status: 'Hoạt động', dob: '23/02/1990', totalItems: 56, totalSpent: '$3,890.50', password: 'hashedpassword3' },
        { id: 'CUS-004', name: 'Marvin McKinney', phone: '(252) 555-0126', email: 'marvin@tesla.com', membership: 'VIP', status: 'Hoạt động', dob: '15/09/1985', totalItems: 120, totalSpent: '$9,500.00', password: 'hashedpassword4' },
        { id: 'CUS-005', name: 'Jerome Bell', phone: '(629) 555-0129', email: 'jerome@google.com', membership: 'Bronze', status: 'Hoạt động', dob: '30/01/2000', totalItems: 1, totalSpent: '$65.00', password: 'hashedpassword5' },
        { id: 'CUS-006', name: 'Kathryn Murphy', phone: '(406) 555-0120', email: 'kathryn@microsoft.com', membership: 'Silver', status: 'Hoạt động', dob: '19/07/1993', totalItems: 15, totalSpent: '$890.00', password: 'hashedpassword6' },
    ]);

    // 2. STATE: Quản lý Popup
    const [editingCustomer, setEditingCustomer] = useState(null); // nút Sửa
    const [viewingCustomer, setViewingCustomer] = useState(null); // nút Xem chi tiết 

    // --- CÁC HÀM XỬ LÝ GIAO DIỆN ---
    const getStatusStyle = (status) => {
        if (status === 'Hoạt động') return { bg: '#16c09833', color: '#008767', border: '1px solid #008767' };
        return { bg: '#ffc5c5', color: '#df0404', border: '1px solid #df0404' }; 
    };

    const getMembershipStyle = (tier) => {
        switch(tier) {
            case 'VIP': return { color: '#d32f2f', bg: '#ffebee', border: '1px solid #d32f2f' }; 
            case 'Gold': return { color: '#f57f17', bg: '#fffde7', border: '1px solid #f57f17' }; 
            case 'Silver': return { color: '#455a64', bg: '#cfd8dc', border: '1px solid #455a64' }; 
            default: return { color: '#8d6e63', bg: '#efebe9', border: '1px solid #8d6e63' }; 
        }
    };

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    // Hàm tính tuổi từ ngày sinh (Định dạng DD/MM/YYYY)
    const calculateAge = (dobString) => {
        if (!dobString) return '';
        const [day, month, year] = dobString.split('/');
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // --- CÁC HÀM CHỨC NĂNG ---
    const handleEditClick = (customer) => setEditingCustomer(customer);
    const handleViewClick = (customer) => setViewingCustomer(customer); // Mở popup xem chi tiết

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingCustomer({ ...editingCustomer, [name]: value });
    };

    const handleSaveChanges = () => {
        const updatedCustomers = customers.map(c => c.id === editingCustomer.id ? editingCustomer : c);
        setCustomers(updatedCustomers); 
        setEditingCustomer(null); 
    };

    const handleToggleStatus = (id) => {
        const updatedCustomers = customers.map(c => {
            if (c.id === id) return { ...c, status: c.status === 'Hoạt động' ? 'Bị khóa' : 'Hoạt động' };
            return c;
        });
        setCustomers(updatedCustomers);
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 position-relative">
            
            {/* --- HEADER & THANH CÔNG CỤ --- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1 d-flex align-items-center">
                        <BsPeople className="me-2 text-primary" style={{ color: '#5932ea' }}/> 
                        Tất cả Khách hàng
                    </h4>
                    <p className="text-success mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Thành viên đang hoạt động</p>
                </div>

                <div className="d-flex gap-3 align-items-center">
                    <div className="input-group bg-light rounded-3" style={{ width: '250px', border: 'none' }}>
                        <span className="input-group-text bg-transparent border-0 pe-1">
                            <BsSearch className="text-muted" />
                        </span>
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
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-end" style={{ minWidth: '180px' }}>Hành động</th>
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
                                            <div 
                                                className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold me-3"
                                                style={{ width: '40px', height: '40px', backgroundColor: '#5932ea', fontSize: '0.9rem' }}
                                            >
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
                                        <span className="px-2 py-1 rounded-1 fw-bold" style={{ backgroundColor: memStyle.bg, color: memStyle.color, border: memStyle.border, fontSize: '0.75rem' }}>
                                            {customer.membership}
                                        </span>
                                    </td>
                                    <td className="py-3 text-center">
                                        <span className="px-3 py-1 rounded-1 fw-bold" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: statusStyle.border, fontSize: '0.85rem' }}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-end">
                                        {/* Nút Xem chi tiết */}
                                        <button 
                                            className="btn btn-sm btn-light border me-2 shadow-none" 
                                            title="Xem chi tiết"
                                            onClick={() => handleViewClick(customer)}
                                        >
                                            <BsEye className="text-primary" />
                                        </button>
                                        {/* Nút Sửa */}
                                        <button 
                                            className="btn btn-sm btn-light border me-2 shadow-none" 
                                            title="Chỉnh sửa"
                                            onClick={() => handleEditClick(customer)}
                                        >
                                            <BsPencilSquare className="text-success" />
                                        </button>
                                        {/* Nút Khóa / Mở khóa */}
                                        <button 
                                            className="btn btn-sm btn-light border shadow-none" 
                                            title={customer.status === 'Hoạt động' ? "Khóa tài khoản" : "Mở khóa"}
                                            onClick={() => handleToggleStatus(customer.id)}
                                        >
                                            <BsShieldLock className={customer.status === 'Hoạt động' ? "text-danger" : "text-warning"} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* ===================================================================== */}
            {/* 1. POPUP XEM CHI TIẾT KHÁCH HÀNG  */}
            {/* ===================================================================== */}
            {viewingCustomer && (
                <div 
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} 
                >
                    <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: '550px', maxWidth: '90%' }}>
                        
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                            <h5 className="fw-bold mb-0">Chi tiết khách hàng</h5>
                            <button className="btn btn-sm btn-light rounded-circle" onClick={() => setViewingCustomer(null)}>
                                <BsX className="fs-4" />
                            </button>
                        </div>

                        {/* Phẩn 1: Thông tin khách hàng */}
                        <h6 className="fw-bold text-uppercase mb-3" style={{ color: '#5932ea', fontSize: '0.85rem', letterSpacing: '1px' }}>
                            1. Thông tin khách hàng
                        </h6>
                        <div className="bg-light p-3 rounded-3 mb-4">
                            <div className="row mb-2">
                                <div className="col-4 text-muted fw-bold" style={{ fontSize: '0.9rem' }}>Họ và tên:</div>
                                <div className="col-8 fw-bold">{viewingCustomer.name}</div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 text-muted fw-bold" style={{ fontSize: '0.9rem' }}>Ngày sinh:</div>
                                <div className="col-8">
                                    {viewingCustomer.dob} <span className="text-primary fw-bold">({calculateAge(viewingCustomer.dob)} tuổi)</span>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 text-muted fw-bold" style={{ fontSize: '0.9rem' }}>Hạng hiện tại:</div>
                                <div className="col-8">
                                    <span className="badge bg-dark text-white rounded-pill px-3">{viewingCustomer.membership}</span>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 text-muted fw-bold" style={{ fontSize: '0.9rem' }}>Đã mua:</div>
                                <div className="col-8">{viewingCustomer.totalItems} sản phẩm</div>
                            </div>
                            <div className="row">
                                <div className="col-4 text-muted fw-bold" style={{ fontSize: '0.9rem' }}>Tổng chi tiêu:</div>
                                <div className="col-8 fw-bold text-success fs-5">{viewingCustomer.totalSpent}</div>
                            </div>
                        </div>

                        {/* Phần 2: Thông tin tài khoản */}
                        <h6 className="fw-bold text-uppercase mb-3" style={{ color: '#5932ea', fontSize: '0.85rem', letterSpacing: '1px' }}>
                            2. Thông tin tài khoản
                        </h6>
                        <div className="bg-light p-3 rounded-3 mb-4">
                            <div className="row mb-2">
                                <div className="col-4 text-muted fw-bold" style={{ fontSize: '0.9rem' }}>Số điện thoại:</div>
                                <div className="col-8">{viewingCustomer.phone}</div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-4 text-muted fw-bold" style={{ fontSize: '0.9rem' }}>Email:</div>
                                <div className="col-8 text-primary text-decoration-underline">{viewingCustomer.email}</div>
                            </div>
                            <div className="row">
                                <div className="col-4 text-muted fw-bold" style={{ fontSize: '0.9rem' }}>Mật khẩu:</div>
                                <div className="col-8 fs-5" style={{ letterSpacing: '2px', lineHeight: '1' }}>••••••••••</div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end pt-2">
                            <button className="btn text-white fw-bold px-4" style={{ backgroundColor: '#5932ea' }} onClick={() => setViewingCustomer(null)}>
                                Đóng
                            </button>
                        </div>

                    </div>
                </div>
            )}


            {/* ===================================================================== */}
            {/* 2. POPUP CHỈNH SỬA KHÁCH HÀNG  */}
            {/* ===================================================================== */}
            {editingCustomer && (
                <div 
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
                >
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
                        <div className="mb-3">
                            <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Email</label>
                            <input type="email" className="form-control shadow-none" name="email" value={editingCustomer.email} onChange={handleInputChange} />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Hạng thành viên</label>
                            <select className="form-select shadow-none" name="membership" value={editingCustomer.membership} onChange={handleInputChange} >
                                <option value="Bronze">Bronze (Đồng)</option>
                                <option value="Silver">Silver (Bạc)</option>
                                <option value="Gold">Gold (Vàng kim)</option>
                                <option value="VIP">VIP (Cao cấp)</option>
                            </select>
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