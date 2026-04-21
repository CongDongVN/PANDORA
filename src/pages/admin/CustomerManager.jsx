import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Đảm bảo đã cài đặt: npm install axios
import { 
    BsSearch, BsPeople, BsPencilSquare, BsEnvelope, BsX, BsEye, 
    BsArrowLeft, BsTelephone, BsCalendarDate, BsCartCheck, BsAward, BsClockHistory, BsTrash
} from 'react-icons/bs';

const CustomerManager = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();

    // 1. STATE
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const API_URL = 'https://localhost:7221/api/Auth'; // Thay bằng URL API của bạn

    // 2. FETCH DATA TỪ API
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setCustomers(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách khách hàng:", error);
            alert("Không thể kết nối với máy chủ!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // 3. XỬ LÝ XÓA KHÁCH HÀNG
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setCustomers(customers.filter(c => c.id !== id));
                if (itemId) navigate('/admin/users'); // Nếu đang xem chi tiết thì thoát ra
            } catch (error) {
                alert("Xóa thất bại!");
            }
        }
    };

    // 4. CẬP NHẬT TRẠNG THÁI / HẠNG (API PUT)
    const handleQuickUpdate = async (id, updatedFields) => {
        try {
            const customer = customers.find(c => c.id === id);
            const updatedData = { ...customer, ...updatedFields };
            await axios.put(`${API_URL}/${id}`, updatedData);
            setCustomers(customers.map(c => c.id === id ? updatedData : c));
        } catch (error) {
            alert("Cập nhật thất bại!");
        }
    };

    const handleToggleStatus = (id) => {
        const customer = customers.find(c => c.id === id);
        handleQuickUpdate(id, { status: customer.status === 'Hoạt động' ? 'Bị khóa' : 'Hoạt động' });
    };

    const handleToggleMembership = (id) => {
        const customer = customers.find(c => c.id === id);
        const tiers = ['Bronze', 'Silver', 'Gold', 'VIP'];
        const nextTier = tiers[(tiers.indexOf(customer.membership) + 1) % tiers.length];
        handleQuickUpdate(id, { membership: nextTier });
    };

    // 5. LƯU THAY ĐỔI FORM (API PUT)
    const handleSaveChanges = async () => {
        try {
            await axios.put(`${API_URL}/${editingCustomer.id}`, editingCustomer);
            setCustomers(customers.map(c => c.id === editingCustomer.id ? editingCustomer : c));
            setEditingCustomer(null);
        } catch (error) {
            alert("Không thể lưu thay đổi!");
        }
    };

    // --- HELPER FUNCTIONS ---
    const getStatusStyle = (status) => status === 'Hoạt động' 
        ? { bg: '#16c09833', color: '#008767', border: '1px solid #008767' }
        : { bg: '#ffc5c5', color: '#df0404', border: '1px solid #df0404' };

    const getMembershipStyle = (tier) => {
        const styles = {
            VIP: { color: '#d32f2f', bg: '#ffebee', border: '1px solid #d32f2f' },
            Gold: { color: '#d39e00', bg: '#fffde7', border: '1px solid #d39e00' },
            Silver: { color: '#455a64', bg: '#cfd8dc', border: '1px solid #455a64' },
            Bronze: { color: '#8d6e63', bg: '#efebe9', border: '1px solid #8d6e63' }
        };
        return styles[tier] || styles.Bronze;
    };

    // const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : "??";
    const getInitials = (fullName) => {
    if (!fullName) return "??";
    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

    const filteredCustomers = customers.filter(c => {
    // Sử dụng Optional Chaining (?.) và cung cấp giá trị mặc định là chuỗi rỗng
    const name = c?.name ? String(c.name).toLowerCase() : "";
    const id = c?.id ? String(c.id).toLowerCase() : "";
    const search = searchTerm ? searchTerm.toLowerCase() : "";

    return name.includes(search) || id.includes(search);
});

    const selectedCustomer = customers.find(c => c.id === itemId);

    if (loading) return <div className="p-5 text-center">Đang tải dữ liệu...</div>;

    // GIAO DIỆN CHI TIẾT
    if (selectedCustomer) {
        const statusStyle = getStatusStyle(selectedCustomer.status);
        const memStyle = getMembershipStyle(selectedCustomer.membership);
        return (
            <div className="card border-0 shadow-sm rounded-4 p-4">
                <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                    <button className="btn btn-light rounded-circle me-4 border" onClick={() => navigate('/admin/users')}>
                        <BsArrowLeft />
                    </button>
                    <div className="d-flex align-items-center w-100">
                        <div className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold me-3 shadow-sm" style={{ width: '60px', height: '60px', backgroundColor: '#5932ea' }}>
                            {getInitials(selectedCustomer.fullName)}
                        </div>
                        <div>
                            <h4 className="fw-bold mb-1">{selectedCustomer.fullName}</h4>
                            <p className="text-muted mb-0">Mã KH: {selectedCustomer.id}</p>
                        </div>
                        <button className="btn btn-outline-danger ms-auto" onClick={() => handleDelete(selectedCustomer.id)}>
                            <BsTrash className="me-2"/>Xóa khách hàng
                        </button>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="card h-100 border rounded-4 p-4">
                            <h6 className="fw-bold mb-4"><BsPeople className="me-2"/> Thông tin</h6>
                            <p className="text-muted"><BsEnvelope className="me-2"/> {selectedCustomer.email}</p>
                            <p className="text-muted"><BsTelephone className="me-2"/> {selectedCustomer.phone}</p>
                            <p className="text-muted"><BsCalendarDate className="me-2"/> {selectedCustomer.dob}</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card h-100 border rounded-4 p-4 text-center">
                            <h6 className="fw-bold mb-3">Hạng: {selectedCustomer.membership}</h6>
                            <button className="btn btn-sm btn-outline-primary mb-2" onClick={() => handleToggleMembership(selectedCustomer.id)}>Đổi hạng</button>
                            <hr />
                            <h6 className="fw-bold mb-3">Trạng thái: {selectedCustomer.status}</h6>
                            <button className={`btn btn-sm ${selectedCustomer.status === 'Hoạt động' ? 'btn-outline-danger' : 'btn-outline-success'}`} onClick={() => handleToggleStatus(selectedCustomer.id)}>
                                {selectedCustomer.status === 'Hoạt động' ? 'Khóa tài khoản' : 'Mở tài khoản'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // GIAO DIỆN DANH SÁCH
    return (
        <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0"><BsPeople className="me-2" style={{color: '#5932ea'}}/> Quản lý Khách hàng</h4>
                <div className="input-group" style={{ width: '300px' }}>
                    <span className="input-group-text bg-light border-0"><BsSearch /></span>
                    <input 
                        type="text" 
                        className="form-control bg-light border-0 shadow-none" 
                        placeholder="Tìm theo tên hoặc mã..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr className="text-muted">
                            <th>Khách hàng</th>
                            <th>Liên hệ</th>
                            <th className="text-center">Hạng</th>
                            <th className="text-center">Trạng thái</th>
                            <th className="text-end">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold me-3" style={{ width: '40px', height: '40px', backgroundColor: '#5932ea' }}>
                                            {getInitials(customer.fullName)}
                                        </div>
                                        <div>
                                            <div className="fw-bold">{customer.fullName}</div>
                                            <small className="text-muted">{customer.id}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="small">{customer.phone}</div>
                                    <div className="small text-muted">{customer.email}</div>
                                </td>
                                <td className="text-center">
                                    <span className="badge border" style={getMembershipStyle(customer.membership)}>{customer.membership}</span>
                                </td>
                                <td className="text-center">
                                    <span className="badge" style={getStatusStyle(customer.status)}>{customer.status}</span>
                                </td>
                                <td className="text-end">
                                    <button className="btn btn-sm btn-light border me-1" onClick={() => navigate(`/admin/users/${customer.id}`)}><BsEye /></button>
                                    <button className="btn btn-sm btn-light border me-1 text-success" onClick={() => setEditingCustomer(customer)}><BsPencilSquare /></button>
                                    <button className="btn btn-sm btn-light border text-danger" onClick={() => handleDelete(customer.id)}><BsTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL EDIT TÊN/SĐT/EMAIL */}
            {editingCustomer && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: '450px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                            <h5 className="fw-bold mb-0">Sửa thông tin</h5>
                            <button className="btn btn-sm" onClick={() => setEditingCustomer(null)}><BsX className="fs-4" /></button>
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Tên khách hàng</label>
                            <input type="text" className="form-control" value={editingCustomer.name} onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Số điện thoại</label>
                            <input type="text" className="form-control" value={editingCustomer.phone} onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})} />
                        </div>
                        <div className="mb-4">
                            <label className="form-label small fw-bold">Email</label>
                            <input type="email" className="form-control" value={editingCustomer.email} onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})} />
                        </div>
                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-light" onClick={() => setEditingCustomer(null)}>Hủy</button>
                            <button className="btn text-white" style={{ backgroundColor: '#5932ea' }} onClick={handleSaveChanges}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerManager;