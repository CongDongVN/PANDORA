import React, { useState } from 'react';
import { BsPersonCircle, BsBarChartFill, BsCart3, BsTruck, BsPlusCircle, BsHeart } from "react-icons/bs";
import { initialUserData } from '../../data/userData';
import UserBanner from './UserBanner';

const UserAccount = () => {
    // SỬ DỤNG DỮ LIỆU ĐÃ IMPORT ĐỂ KHỞI TẠO STATE
    const [userData, setUserData] = useState(initialUserData);
    const lineStyle = { backgroundColor: '#e9ecef', height: '1.5px', border: 'none', opacity: 1 };
    const boxSpacing = { marginBottom: '36px' }; 
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
                                <a href="#" className="text-decoration-none text-dark fw-bold text-decoration-underline" style={{ fontSize: '0.85rem' }}>Chỉnh sửa</a>
                            </div>
                            
                            <div className="card-body p-4">
                                <hr className="mt-0 mb-4" style={lineStyle} />
                                
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <p className="mb-1 text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Họ</p>
                                        <p className="fw-bold fs-6 mb-0">{userData.firstName}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-1 text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Giới tính</p>
                                        <p className="fw-bold fs-6 mb-0">{userData.gender}</p>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <p className="mb-1 text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Tên</p>
                                        <p className="fw-bold fs-6 mb-0">{userData.lastName}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-1 text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Sinh nhật</p>
                                        <p className="fw-normal fs-6 text-muted mb-0">{userData.birthdate}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <p className="mb-1 text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Email</p>
                                        <p className="fw-bold fs-6 mb-0">{userData.email}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-1 text-muted fw-bold" style={{ fontSize: '0.8rem' }}>Số điện thoại</p>
                                        <p className="fw-normal fs-6 text-muted mb-0">{userData.phone}</p>
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
                                <a href="#" className="text-decoration-none text-dark fw-bold text-decoration-underline" style={{ fontSize: '0.85rem' }}>Xem tất cả</a>
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
                                <a href="#" className="text-decoration-none text-dark fw-bold text-decoration-underline" style={{ fontSize: '0.85rem' }}>Xem tất cả</a>
                            </div>
                            <div className="card-body p-4">
                                <hr className="mt-1 mb-5" style={lineStyle} />
                                
                                {userData.addresses.length === 0 ? (
                                    <div className="mb-4">
                                        <div style={{ backgroundColor: '#f5f5f5', height: '10px', width: '100%', marginBottom: '10px', borderRadius: '5px' }}></div>
                                        <div style={{ backgroundColor: '#f5f5f5', height: '10px', width: '80%', marginBottom: '10px', borderRadius: '5px' }}></div>
                                        <div style={{ backgroundColor: '#f5f5f5', height: '10px', width: '60%', marginBottom: '10px', borderRadius: '5px' }}></div>
                                        <div style={{ backgroundColor: '#f5f5f5', height: '10px', width: '40%', borderRadius: '5px' }}></div>
                                    </div>
                                ) : (
                                    <p>Đang tải địa chỉ...</p>
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
                                <a href="#" className="text-decoration-none text-dark fw-bold text-decoration-underline" style={{ fontSize: '0.85rem' }}>Xem tất cả</a>
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

                        {/* nút đăng xuất */}
                        <div className="d-flex justify-content-end mb-4">
                            <button 
                                className="btn shadow-none"
                                style={{ 
                                    border: '1px solid #d8d8d8', 
                                    backgroundColor: '#fff', 
                                    color: '#000', 
                                    fontWeight: 'bold', 
                                    fontSize: '0.85rem',
                                    padding: '10px 24px',
                                    borderRadius: '3px' 
                                }}
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