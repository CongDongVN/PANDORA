import React, { useState } from 'react';
import { 
    BsGrid, BsBoxSeam, BsTags, BsPeople, BsSearch, 
    BsCurrencyDollar, BsReceipt, BsPersonCheck, BsArrowUpShort, BsArrowDownShort,
    BsThreeDotsVertical 
} from "react-icons/bs";

// Import các Component chúng ta đã tạo
import CategoryManager from './CategoryManager';
import OrderManager from './OrderManager';
import CustomerManager from './CustomerManager';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const statsData = [
        { title: "Tổng doanh thu", value: "$124,563", increase: true, percent: "16%", icon: <BsCurrencyDollar />, bgColor: "#d3ffe7", color: "#00ac4e" },
        { title: "Tổng đơn hàng", value: "1,893", increase: false, percent: "1%", icon: <BsReceipt />, bgColor: "#ffc5c5", color: "#df0404" },
        { title: "Khách hàng mới", value: "189", increase: true, percent: "5%", icon: <BsPersonCheck />, bgColor: "#e7edff", color: "#396aff" },
    ];

    const recentOrders = [
        { id: "#ORD-001", customer: "Jane Cooper", product: "Nhẫn Bạc Pandora", total: "$125.00", status: "Hoàn thành" },
        { id: "#ORD-002", customer: "Floyd Miles", product: "Dây chuyền Trái tim", total: "$205.00", status: "Đang giao" },
        { id: "#ORD-003", customer: "Ronald Richards", product: "Bông tai đính đá", total: "$89.50", status: "Huỷ" },
        { id: "#ORD-004", customer: "Marvin McKinney", product: "Vòng tay Basic", total: "$150.00", status: "Chờ xác nhận" },
        { id: "#ORD-005", customer: "Jerome Bell", product: "Charm Vương miện", total: "$65.00", status: "Hoàn thành" },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Hoàn thành': return { bg: '#16c09833', color: '#008767', border: '1px solid #008767' };
            case 'Huỷ': return { bg: '#ffc5c5', color: '#df0404', border: '1px solid #df0404' };
            case 'Đang giao': return { bg: '#e7edff', color: '#396aff', border: '1px solid #396aff' };
            default: return { bg: '#f5f5f5', color: '#555', border: '1px solid #ccc' }; 
        }
    };

    return (
        <div className="d-flex" style={{ backgroundColor: '#f4f4f9', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            
            {/* ================= SIDEBAR ================= */}
            <div 
                className="bg-white shadow-sm d-flex flex-column custom-scrollbar" 
                style={{ 
                    width: '280px', 
                    height: '100vh',       
                    position: 'sticky',    
                    top: 0,                
                    overflowY: 'auto',     
                    padding: '24px',
                    zIndex: 100          
                }}
            >
                {/* Logo */}
                <div className="d-flex align-items-center mb-5 mt-2 px-2">
                    <div className="bg-dark rounded text-white d-flex justify-content-center align-items-center me-2" style={{ width: '36px', height: '36px' }}>
                        <span className="fw-bold fs-5">P</span>
                    </div>
                    <h4 className="fw-bold mb-0" style={{ letterSpacing: '0.5px' }}>PANDORA <span className="fs-6 text-muted fw-normal">v.01</span></h4>
                </div>

                {/* Menu Items */}
                <ul className="nav flex-column gap-2 mb-auto">
                    {[
                        { id: 'dashboard', icon: <BsGrid />, label: 'Tổng quan' },
                        { id: 'orders', icon: <BsBoxSeam />, label: 'Quản lý Đơn Hàng' },
                        { id: 'categories', icon: <BsTags />, label: 'Quản lý Danh Mục' },
                        { id: 'users', icon: <BsPeople />, label: 'Quản lý Người Dùng' }, 
                    ].map((item) => (
                        <li className="nav-item" key={item.id}>
                            <button 
                                onClick={() => setActiveTab(item.id)}
                                className={`nav-link d-flex align-items-center w-100 border-0 text-start ${activeTab === item.id ? 'active' : ''}`}
                                style={{ 
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    backgroundColor: activeTab === item.id ? '#5932ea' : 'transparent',
                                    color: activeTab === item.id ? 'white' : '#9197b3',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <span className="fs-5 me-3">{item.icon}</span>
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* ================= TÀI KHOẢN ADMIN ================= */}
                <div 
                    className="mt-5 p-3 rounded-4 d-flex align-items-center" 
                    style={{ backgroundColor: '#f8f9fc', border: '1px solid #eef0f5', cursor: 'pointer' }}
                >
                    <div 
                        className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold me-3 shadow-sm"
                        style={{ width: '42px', height: '42px', backgroundColor: '#5932ea', fontSize: '1.1rem' }}
                    >
                        AD
                    </div>
                    <div className="flex-grow-1">
                        <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.95rem' }}>Quản trị viên</h6>
                        <small className="text-muted" style={{ fontSize: '0.8rem' }}>Super Admin</small>
                    </div>
                    <BsThreeDotsVertical className="text-muted" />
                </div>
            </div>


            {/* ================= NỘI DUNG CHÍNH ================= */}
            <div className="flex-grow-1 p-5">
                
                {/* Header (Top bar) */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h2 className="fw-bold mb-0">Xin chào Admin 👋</h2>
                    <div className="input-group bg-white rounded-3 shadow-sm" style={{ width: '300px', border: 'none' }}>
                        <span className="input-group-text bg-transparent border-0 pe-1" id="search-addon">
                            <BsSearch className="text-muted" />
                        </span>
                        <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Tìm kiếm..." />
                    </div>
                </div>

                {/* HIỂN THỊ NỘI DUNG DỰA VÀO TAB */}
                {activeTab === 'dashboard' && (
                    <>
                        <div className="row mb-5">
                            {statsData.map((stat, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center">
                                        <div className="rounded-circle d-flex justify-content-center align-items-center me-4" 
                                            style={{ width: '80px', height: '80px', backgroundColor: stat.bgColor, color: stat.color, fontSize: '2rem' }}>
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <p className="text-muted mb-1 fs-6">{stat.title}</p>
                                            <h3 className="fw-bold mb-1">{stat.value}</h3>
                                            <p className="mb-0" style={{ fontSize: '0.85rem' }}>
                                                <span className={`fw-bold ${stat.increase ? 'text-success' : 'text-danger'}`}>
                                                    {stat.increase ? <BsArrowUpShort className="fs-5"/> : <BsArrowDownShort className="fs-5"/>} 
                                                    {stat.percent}
                                                </span> so với tháng trước
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h4 className="fw-bold mb-1">Đơn hàng gần đây</h4>
                                    <p className="text-success mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Theo dõi các đơn hàng mới nhất</p>
                                </div>
                                <div className="bg-light px-3 py-2 rounded-2 text-muted" style={{ fontSize: '0.9rem' }}>
                                    Lọc theo: <span className="fw-bold text-dark">Mới nhất</span>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-muted fw-normal border-bottom-0 pb-3">Mã đơn</th>
                                            <th className="text-muted fw-normal border-bottom-0 pb-3">Khách hàng</th>
                                            <th className="text-muted fw-normal border-bottom-0 pb-3">Sản phẩm</th>
                                            <th className="text-muted fw-normal border-bottom-0 pb-3">Tổng tiền</th>
                                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order, index) => {
                                            const statusStyle = getStatusStyle(order.status);
                                            return (
                                                <tr key={index}>
                                                    <td className="py-3 fw-bold">{order.id}</td>
                                                    <td className="py-3">{order.customer}</td>
                                                    <td className="py-3">{order.product}</td>
                                                    <td className="py-3 fw-bold">{order.total}</td>
                                                    <td className="py-3 text-center">
                                                        <span className="px-3 py-1 rounded-1 fw-bold" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: statusStyle.border, fontSize: '0.85rem' }}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'orders' && <OrderManager />}
                {activeTab === 'categories' && <CategoryManager />}
                {activeTab === 'users' && <CustomerManager />}

            </div>
        </div>
    );
};

export default AdminDashboard;