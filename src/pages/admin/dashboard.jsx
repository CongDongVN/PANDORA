import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { 
    BsGrid, BsBoxSeam, BsTags, BsPeople, BsSearch, BsBox, 
    BsCurrencyDollar, BsReceipt, BsPersonCheck, BsArrowUpShort,
    BsThreeDotsVertical, BsCartX, BsTrophy, BsCalendarDate
} from "react-icons/bs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

import CategoryManager from './CategoryManager';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager'; 
import CustomerManager from './CustomerManager';

const AdminDashboard = () => {
    const { tab } = useParams(); 
    const navigate = useNavigate(); 
    const activeTab = tab || 'dashboard'; 

    // ================= DỮ LIỆU MÔ PHỎNG =================
    const chartData = [
        { name: 'T2', revenue: 1200 }, { name: 'T3', revenue: 2100 }, 
        { name: 'T4', revenue: 1800 }, { name: 'T5', revenue: 3200 }, 
        { name: 'T6', revenue: 4500 }, { name: 'T7', revenue: 5800 }, 
        { name: 'CN', revenue: 6200 },
    ];

    const topProducts = [
        { id: 1, name: "Nhẫn Bạc Đính Đá CZ", sold: 120, revenue: "$5,400", img: "💍" },
        { id: 2, name: "Charm Gia đình", sold: 89, revenue: "$2,225", img: "✨" },
        { id: 3, name: "Vòng tay Basic", sold: 65, revenue: "$4,225", img: "📿" },
        { id: 4, name: "Dây chuyền Trái tim", sold: 42, revenue: "$2,310", img: "💎" },
        { id: 5, name: "Bông tai Nụ Đá Xanh", sold: 30, revenue: "$1,050", img: "🎀" },
    ];

    const recentOrders = [
        { id: "#ORD-001", customer: "Jane Cooper", product: "Nhẫn Bạc Pandora", total: "$125.00", status: "Hoàn thành" },
        { id: "#ORD-002", customer: "Floyd Miles", product: "Dây chuyền Trái tim", total: "$205.00", status: "Đang giao" },
        { id: "#ORD-003", customer: "Ronald Richards", product: "Bông tai đính đá", total: "$89.50", status: "Huỷ" },
        { id: "#ORD-004", customer: "Marvin McKinney", product: "Vòng tay Basic", total: "$150.00", status: "Chờ xác nhận" },
    ];

    const regionDataLastMonth = [{ name: 'Miền Bắc', value: 3800 }, { name: 'Miền Trung', value: 2500 }, { name: 'Miền Nam', value: 3200 }];
    const regionDataThisMonth = [{ name: 'Miền Bắc', value: 4500 }, { name: 'Miền Trung', value: 2100 }, { name: 'Miền Nam', value: 3900 }];
    const PIE_COLORS = ['#5932ea', '#ffc107', '#00ac4e'];

    const categoryData = [
        { name: 'Nhẫn', revenue: 15000 }, { name: 'Dây chuyền', revenue: 12000 },
        { name: 'Bông tai', revenue: 8500 }, { name: 'Vòng tay', revenue: 10500 }, { name: 'Charm', revenue: 18000 },
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
        <div style={{ backgroundColor: '#f4f4f9', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            
            {/* ================= SIDEBAR CỐ ĐỊNH (FIXED TRÁI) ================= */}
            {/* Đã sửa position: 'fixed', ép nó dính chặt vào góc trên cùng bên trái */}
            <div className="bg-white shadow-sm d-flex flex-column custom-scrollbar" 
                 style={{ width: '280px', height: '100vh', position: 'fixed', top: 0, left: 0, overflowY: 'auto', padding: '24px', zIndex: 100 }}>
                
                <div className="d-flex align-items-center mb-5 mt-2 px-2">
                    <div className="bg-dark rounded text-white d-flex justify-content-center align-items-center me-2" style={{ width: '36px', height: '36px' }}><span className="fw-bold fs-5">P</span></div>
                    <h4 className="fw-bold mb-0" style={{ letterSpacing: '0.5px' }}>PANDORA <span className="fs-6 text-muted fw-normal">v.01</span></h4>
                </div>

                <ul className="nav flex-column gap-2 mb-auto">
                    {[
                        { id: 'dashboard', icon: <BsGrid />, label: 'Tổng quan' },
                        { id: 'orders', icon: <BsBoxSeam />, label: 'Quản lý Đơn hàng' },
                        { id: 'categories', icon: <BsTags />, label: 'Quản lý Danh mục' },
                        { id: 'products', icon: <BsBox />, label: 'Quản lý Sản phẩm' }, 
                        { id: 'users', icon: <BsPeople />, label: 'Quản lý Người dùng' }, 
                    ].map((item) => (
                        <li className="nav-item" key={item.id}>
                            <button 
                                onClick={() => navigate(`/admin/${item.id}`)} 
                                className={`nav-link d-flex align-items-center w-100 border-0 text-start ${activeTab === item.id ? 'active' : ''}`}
                                style={{ 
                                    padding: '12px 16px', borderRadius: '10px',
                                    backgroundColor: activeTab === item.id ? '#5932ea' : 'transparent',
                                    color: activeTab === item.id ? 'white' : '#9197b3',
                                    fontWeight: '500', transition: 'all 0.3s ease'
                                }}
                            >
                                <span className="fs-5 me-3">{item.icon}</span>{item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="mt-5 p-3 rounded-4 d-flex align-items-center" style={{ backgroundColor: '#f8f9fc', border: '1px solid #eef0f5', cursor: 'pointer' }}>
                    <div className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold me-3 shadow-sm" style={{ width: '42px', height: '42px', backgroundColor: '#5932ea', fontSize: '1.1rem' }}>AD</div>
                    <div className="flex-grow-1">
                        <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.95rem' }}>Quản trị viên</h6>
                        <small className="text-muted" style={{ fontSize: '0.8rem' }}>Super Admin</small>
                    </div>
                    <BsThreeDotsVertical className="text-muted" />
                </div>
            </div>

            {/* ================= NỘI DUNG CHÍNH (ĐẨY SANG PHẢI 280PX) ================= */}
            {/* Đã thêm marginLeft: '280px' để chừa chỗ cho Sidebar */}
            <div className="p-5" style={{ marginLeft: '280px' }}>
                
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h2 className="fw-bold mb-0">Xin chào Admin 👋,</h2>
                    <div className="input-group bg-white rounded-3 shadow-sm" style={{ width: '300px', border: 'none' }}>
                        <span className="input-group-text bg-transparent border-0 pe-1"><BsSearch className="text-muted" /></span>
                        <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Tìm kiếm nhanh..." />
                    </div>
                </div>

                {/* --- 1. TAB TỔNG QUAN --- */}
                {activeTab === 'dashboard' && (
                    <>
                        <div className="row mb-4">
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div><p className="text-muted mb-1 fw-bold" style={{ fontSize: '0.85rem' }}>TỔNG DOANH THU</p><h3 className="fw-bold mb-0">$124,563</h3></div>
                                        <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ width: '45px', height: '45px', backgroundColor: '#d3ffe7', color: '#00ac4e', fontSize: '1.2rem' }}><BsCurrencyDollar /></div>
                                    </div>
                                    <p className="mb-0 text-success fw-bold" style={{ fontSize: '0.85rem' }}><BsArrowUpShort className="fs-5"/> 16% <span className="text-muted fw-normal">so với tháng trước</span></p>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div><p className="text-muted mb-1 fw-bold" style={{ fontSize: '0.85rem' }}>ĐƠN HÀNG</p><h3 className="fw-bold mb-0">1,893</h3></div>
                                        <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ width: '45px', height: '45px', backgroundColor: '#e7edff', color: '#396aff', fontSize: '1.2rem' }}><BsReceipt /></div>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2 pt-2 border-top" style={{ fontSize: '0.8rem' }}>
                                        <span className="text-success fw-bold">✓ Giao: 1.5K</span>
                                        <span className="text-warning fw-bold">⏳ Xử lý: 300</span>
                                        <span className="text-danger fw-bold">✖ Hủy: 93</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div><p className="text-muted mb-1 fw-bold" style={{ fontSize: '0.85rem' }}>CHƯA THANH TOÁN</p><h3 className="fw-bold mb-0">342 <span className="fs-6 text-muted fw-normal">đơn</span></h3></div>
                                        <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ width: '45px', height: '45px', backgroundColor: '#ffc5c5', color: '#df0404', fontSize: '1.2rem' }}><BsCartX /></div>
                                    </div>
                                    <p className="mb-0 text-danger fw-bold" style={{ fontSize: '0.85rem' }}><BsArrowUpShort className="fs-5"/> 8% <span className="text-muted fw-normal">tỷ lệ rớt đơn tuần này</span></p>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div><p className="text-muted mb-1 fw-bold" style={{ fontSize: '0.85rem' }}>KHÁCH HÀNG MỚI</p><h3 className="fw-bold mb-0">189</h3></div>
                                        <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ width: '45px', height: '45px', backgroundColor: '#fff3cd', color: '#ffc107', fontSize: '1.2rem' }}><BsPersonCheck /></div>
                                    </div>
                                    <p className="mb-0 text-success fw-bold" style={{ fontSize: '0.85rem' }}><BsArrowUpShort className="fs-5"/> 5% <span className="text-muted fw-normal">so với tháng trước</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-xl-8 mb-4 mb-xl-0">
                                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div><h5 className="fw-bold mb-0">Tổng quan Doanh thu</h5><p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Thu nhập theo thời gian thực</p></div>
                                        <select className="form-select form-select-sm shadow-none w-auto fw-bold bg-light border-0 text-muted">
                                            <option value="week">Tuần này</option><option value="month">Tháng này</option><option value="year">Năm nay</option>
                                        </select>
                                    </div>
                                    <div style={{ width: '100%', height: '300px' }}>
                                        <ResponsiveContainer>
                                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#5932ea" stopOpacity={0.3}/><stop offset="95%" stopColor="#5932ea" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                                                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                                <Area type="monotone" dataKey="revenue" stroke="#5932ea" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-center mb-4"><h5 className="fw-bold mb-0 d-flex align-items-center"><BsTrophy className="me-2 text-warning" /> Top Bán Chạy</h5></div>
                                    <div className="d-flex flex-column gap-3">
                                        {topProducts.map((product, index) => (
                                            <div key={product.id} className="d-flex align-items-center p-2 rounded-3" style={{ backgroundColor: index === 0 ? '#fffdf5' : 'transparent', border: index === 0 ? '1px solid #ffe8a1' : 'none' }}>
                                                <div className="d-flex justify-content-center align-items-center rounded-3 bg-light me-3 fs-3" style={{ width: '50px', height: '50px' }}>{product.img}</div>
                                                <div className="flex-grow-1"><h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '0.9rem' }}>{product.name}</h6><p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>Đã bán: <span className="fw-bold text-dark">{product.sold}</span></p></div>
                                                <div className="text-end"><h6 className="fw-bold text-success mb-0">{product.revenue}</h6>{index === 0 && <span className="badge bg-warning text-dark px-2 py-0 mt-1" style={{ fontSize: '0.65rem' }}>#1 HOT</span>}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-xl-5 mb-4 mb-xl-0">
                                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div><h5 className="fw-bold mb-0">Tỷ trọng khu vực</h5><p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Doanh thu theo 3 miền</p></div>
                                        <div className="d-flex gap-2">
                                            <select className="form-select form-select-sm shadow-none w-auto bg-light border-0 text-muted fw-bold"><option>Tất cả tháng</option><option>Tháng 9</option></select>
                                            <select className="form-select form-select-sm shadow-none w-auto bg-light border-0 text-muted fw-bold"><option>2023</option><option>2024</option></select>
                                        </div>
                                    </div>
                                    <div className="row h-100 align-items-center">
                                        <div className="col-6 text-center">
                                            <p className="fw-bold text-muted mb-0" style={{ fontSize: '0.9rem' }}>Tháng trước</p>
                                            <div style={{ height: '220px' }}>
                                                <ResponsiveContainer><PieChart><Pie data={regionDataLastMonth} innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">{regionDataLastMonth.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />))}</Pie><Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} /></PieChart></ResponsiveContainer>
                                            </div>
                                        </div>
                                        <div className="col-6 text-center">
                                            <p className="fw-bold text-dark mb-0" style={{ fontSize: '0.9rem' }}>Tháng này</p>
                                            <div style={{ height: '220px' }}>
                                                <ResponsiveContainer><PieChart><Pie data={regionDataThisMonth} innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">{regionDataThisMonth.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />))}</Pie><Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} /></PieChart></ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-4 mt-2">
                                        <div className="d-flex align-items-center"><div style={{ width: '12px', height: '12px', backgroundColor: '#5932ea', borderRadius: '50%', marginRight: '8px' }}></div><span className="text-muted fw-bold" style={{ fontSize: '0.85rem' }}>Miền Bắc</span></div>
                                        <div className="d-flex align-items-center"><div style={{ width: '12px', height: '12px', backgroundColor: '#ffc107', borderRadius: '50%', marginRight: '8px' }}></div><span className="text-muted fw-bold" style={{ fontSize: '0.85rem' }}>Miền Trung</span></div>
                                        <div className="d-flex align-items-center"><div style={{ width: '12px', height: '12px', backgroundColor: '#00ac4e', borderRadius: '50%', marginRight: '8px' }}></div><span className="text-muted fw-bold" style={{ fontSize: '0.85rem' }}>Miền Nam</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-7">
                                <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div><h5 className="fw-bold mb-0">Doanh thu theo danh mục</h5><p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Phân tích hiệu suất sản phẩm</p></div>
                                        <div className="d-flex gap-2">
                                            <select className="form-select form-select-sm shadow-none w-auto bg-light border-0 text-muted fw-bold"><option>Tháng 10</option><option>Tháng 11</option></select>
                                            <select className="form-select form-select-sm shadow-none w-auto bg-light border-0 text-muted fw-bold"><option>2023</option><option>2024</option></select>
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', height: '260px' }}>
                                        <ResponsiveContainer>
                                            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barSize={35}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#777', fontSize: 13, fontWeight: 'bold'}} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                                <Bar dataKey="revenue" fill="#5932ea" radius={[6, 6, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div><h5 className="fw-bold mb-1">Đơn hàng gần đây</h5><p className="text-success mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Theo dõi các đơn hàng mới nhất</p></div>
                                <div className="input-group bg-light rounded-3 px-2 py-1 w-auto" style={{ border: '1px solid #eee' }}><span className="input-group-text bg-transparent border-0 pe-2"><BsCalendarDate className="text-primary" /></span><input type="date" className="form-control form-control-sm border-0 bg-transparent shadow-none text-muted fw-bold" /></div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead>
                                        <tr><th className="text-muted fw-normal border-bottom-0 pb-3">Mã đơn</th><th className="text-muted fw-normal border-bottom-0 pb-3">Khách hàng</th><th className="text-muted fw-normal border-bottom-0 pb-3">Sản phẩm</th><th className="text-muted fw-normal border-bottom-0 pb-3">Tổng tiền</th><th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Trạng thái</th></tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order, index) => {
                                            const statusStyle = getStatusStyle(order.status);
                                            return (
                                                <tr key={index}>
                                                    <td className="py-3 fw-bold">{order.id}</td><td className="py-3">{order.customer}</td><td className="py-3">{order.product}</td><td className="py-3 fw-bold">{order.total}</td>
                                                    <td className="py-3 text-center"><span className="px-3 py-1 rounded-1 fw-bold" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: statusStyle.border, fontSize: '0.85rem' }}>{order.status}</span></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* --- 2. CÁC TAB KHÁC --- */}
                

                {activeTab === 'categories' && <CategoryManager />}
                {activeTab === 'products' && <ProductManager />} 
                {activeTab === 'orders' && <OrderManager />}
                {activeTab === 'users' && <CustomerManager />}

            </div>
        </div>
    );
};

export default AdminDashboard;