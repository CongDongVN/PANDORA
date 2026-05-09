import React, { useState, useEffect } from 'react';
import { BsPersonCircle, BsBarChartFill, BsCart3, BsTruck, BsPlusCircle, BsHeart } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; // Import thêm Spinner để làm hiệu ứng loading
import UserBanner from './UserBanner';

const UserAccount = () => {
    const navigate = useNavigate();

    // 1. Khởi tạo state rỗng thay vì dùng file tĩnh
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: 'Chưa cập nhật',
        gender: 'Chưa cập nhật', // Backend của bạn chưa có trường này
        birthdate: 'Chưa cập nhật', // Backend của bạn chưa có trường này
        membershipStatus: 'Đồng',
        address: '', 
        orders: [],
        addresses: [],
        favoriteItems: []
    });

    const [isLoading, setIsLoading] = useState(true);

    // 2. Lấy dữ liệu user thực tế từ Backend khi trang được tải
    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem('user');
            
            if (!storedUser) {
                // Nếu chưa đăng nhập, ép văng ra trang login
                navigate('/login');
                return;
            }

            const parsedUser = JSON.parse(storedUser);
            const userId = parsedUser.userId; // Lấy userId đã lưu lúc đăng nhập

            try {
                // LƯU Ý: Thay xxxx bằng port backend C# của bạn
                const response = await fetch(`https://localhost:7221/api/Auth/${userId}`);
                
                if (response.ok) {
                    const dbUser = await response.json();
                    
                    // Cập nhật state với dữ liệu từ database
                    setUserData(prev => ({
                        ...prev,
                        firstName: dbUser.fristName || '', // Chú ý: fristName là do backend của bạn đang viết sai chính tả
                        lastName: dbUser.lastName || '',
                        email: dbUser.email || '',
                        phone: dbUser.phone || 'Chưa cập nhật',
                        membershipStatus: dbUser.membership || 'Đồng',
                        address: dbUser.address || '',
                        // Tạm thời gán địa chỉ mặc định vào mảng để hiển thị
                        addresses: dbUser.address ? [dbUser.address] : [] 
                    }));
                } else {
                    console.error("Không tìm thấy thông tin user trong DB");
                }
            } catch (error) {
                console.error("Lỗi kết nối API:", error);
            } finally {
                setIsLoading(false); // Tắt loading sau khi gọi xong
            }
        };

        fetchUserData();
    }, [navigate]);

    const lineStyle = { backgroundColor: '#e9ecef', height: '1.5px', border: 'none', opacity: 1 };
    const boxSpacing = { marginBottom: '36px' }; 

    // 3. Hàm xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Nếu đang tải dữ liệu thì hiển thị màn hình Loading chờ
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Đang tải dữ liệu...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>          
            {/* banner */}
            <UserBanner firstName={userData.firstName} lastName={userData.lastName} />

            {/* nội dung trang cá nhân */}
            <div className="container py-5" style={{ maxWidth: '1100px' }}>
                <h2 className="mb-4 fw-bold">Trang cá nhân</h2>
                <div className="row" style={{ '--bs-gutter-x': '36px' }}>
                    
                    {/* -- cột trái -- */}
                    <div className="col-md-6">
                        
                        {/* 1: Thông tin tài khoản */}
                        <div className="card shadow-sm border-0" style={boxSpacing}>
                            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-4 px-4 pb-0">
                                <h5 className="mb-0 text-uppercase fw-bold text-dark fs-6">
                                    <BsPersonCircle className="me-2 fs-5" style={{ color: '#555' }} /> THÔNG TIN TÀI KHOẢN
                                </h5>
                                <a href="#edit" className="text-decoration-none text-dark fw-bold text-decoration-underline" style={{ fontSize: '0.85rem' }}>Chỉnh sửa</a>
                            </div>
                            
                            <div className="card-body p-4">
                                <hr className="mt-0 mb-4" style={lineStyle} />
                                
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <p className="mb-1 text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Họ</p>
                                        <p className="fw-bold fs-6 mb-0">{userData.firstName || '--'}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-1 text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Giới tính</p>
                                        <p className="fw-bold fs-6 mb-0 text-muted">{userData.gender}</p>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <p className="mb-1 text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Tên</p>
                                        <p className="fw-bold fs-6 mb-0">{userData.lastName || '--'}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-1 text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Sinh nhật</p>
                                        <p className="fw-normal fs-6 text-muted mb-0">{userData.birthdate}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <p className="mb-1 text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Email</p>
                                        <p className="fw-bold fs-6 mb-0">{userData.email || '--'}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-1 text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Số điện thoại</p>
                                        <p className="fw-normal fs-6 text-muted mb-0">{userData.phone || '--'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2: Chương trình thành viên */}
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                                <h5 className="mb-0 text-uppercase fw-bold text-dark d-flex align-items-center fs-6">
                                    <BsBarChartFill className="me-2 fs-5" style={{ color: '#555' }} /> CHƯƠNG TRÌNH THÀNH VIÊN
                                </h5>
                            </div>
                            <div className="card-body p-4 pt-2">
                                <hr className="my-4" style={lineStyle} />
                                <p className="fs-6 fw-bold mb-0">Hạng thành viên của bạn là: <span className="fw-bold text-uppercase">{userData.membershipStatus}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* -- cột phải -- */}
                    <div className="col-md-6">
                        
                        {/* 3: Lịch sử mua hàng */}
                        <div className="card shadow-sm border-0" style={boxSpacing}>
                            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-4 px-4 pb-0">
                                <h5 className="mb-0 text-uppercase fw-bold text-dark fs-6">
                                    <BsCart3 className="me-2 fs-5" style={{ color: '#555' }} /> LỊCH SỬ MUA HÀNG
                                </h5>
                                <a href="#history" className="text-decoration-none text-dark fw-bold text-decoration-underline" style={{ fontSize: '0.85rem' }}>Xem tất cả</a>
                            </div>
                            <div className="card-body p-4 pt-2">
                                <hr className="my-4" style={lineStyle} />
                                {userData.orders.length === 0 ? (
                                    <p className="text-dark fw-bold mb-0 fs-6">Bạn chưa có đơn hàng nào. Tiếp tục mua hàng!</p>
                                ) : (
                                    <p>Đang tải đơn hàng...</p>
                                )}
                            </div>
                        </div>

                        {/* 4: Danh sách địa chỉ */}
                        <div className="card shadow-sm border-0" style={boxSpacing}>
                            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-4 px-4 pb-0">
                                <h5 className="mb-0 text-uppercase fw-bold text-dark fs-6">
                                    <BsTruck className="me-2 fs-5" style={{ color: '#555' }} /> DANH SÁCH ĐỊA CHỈ
                                </h5>
                                <a href="#address" className="text-decoration-none text-dark fw-bold text-decoration-underline" style={{ fontSize: '0.85rem' }}>Xem tất cả</a>
                            </div>
                            <div className="card-body p-4">
                                <hr className="mt-1 mb-5" style={lineStyle} />
                                
                                {userData.addresses.length === 0 ? (
                                    <div className="mb-4">
                                        <p className="text-dark fw-bold mb-0 fs-6 text-muted">Chưa có thông tin địa chỉ.</p>
                                    </div>
                                ) : (
                                    <div className="mb-4">
                                        <p className="fw-bold mb-1">{userData.firstName} {userData.lastName}</p>
                                        <p className="text-muted mb-0">{userData.addresses[0]}</p>
                                        <p className="text-muted mb-0">{userData.phone}</p>
                                    </div>
                                )}
                                
                                <button 
                                    className="btn w-100 d-flex flex-column align-items-center justify-content-center py-4 shadow-none"
                                    style={{ border: '1px dashed #ddd', backgroundColor: '#fff' }}
                                >
                                    <BsPlusCircle className="fs-3 text-dark mb-2" style={{ fontWeight: '100' }} />
                                    <span className="text-dark fw-bold" style={{ fontSize: '0.85rem' }}>Thêm địa chỉ mới</span>
                                </button>
                            </div>
                        </div>

                        {/* 5: Sản phẩm yêu thích */}
                        <div className="card shadow-sm border-0" style={boxSpacing}>
                            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-4 px-4 pb-0">
                                <h5 className="mb-0 text-uppercase fw-bold text-dark fs-6">
                                    <BsHeart className="me-2 fs-5" style={{ color: '#555' }} /> SẢN PHẨM YÊU THÍCH
                                </h5>
                                <a href="#favorite" className="text-decoration-none text-dark fw-bold text-decoration-underline" style={{ fontSize: '0.85rem' }}>Xem tất cả</a>
                            </div>
                            <div className="card-body p-4 pt-2">
                                <hr className="my-4" style={lineStyle} />
                                {userData.favoriteItems.length === 0 ? (
                                    <p className="text-dark fw-bold mb-0 fs-6">Bạn chưa có sản phẩm yêu thích nào trong danh sách!</p>
                                ) : (
                                    <p>Đang tải sản phẩm yêu thích...</p>
                                )}
                            </div>
                        </div>

                        {/* NÚT ĐĂNG XUẤT */}
                        <div className="d-flex justify-content-end mb-4">
                            <button 
                                onClick={handleLogout}
                                className="btn shadow-none"
                                style={{ 
                                    border: '1px solid #d8d8d8', 
                                    backgroundColor: '#fff', 
                                    color: '#000', 
                                    fontWeight: 'bold', 
                                    fontSize: '0.85rem',
                                    padding: '10px 24px',
                                    borderRadius: '3px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => { e.target.style.backgroundColor = '#f1f1f1'; }}
                                onMouseOut={(e) => { e.target.style.backgroundColor = '#fff'; }}
                            >
                                ĐĂNG XUẤT
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccount;