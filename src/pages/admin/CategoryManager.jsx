import React, { useState } from 'react';
import { BsSearch, BsPlusLg, BsPencilSquare, BsFolder, BsX, BsTrash } from 'react-icons/bs';

const CategoryManager = () => {
    // 1. STATE: DỮ LIỆU DANH MỤC
    const [categories, setCategories] = useState([
        { id: 'CAT-01', name: 'Nhẫn', count: 124, status: 'Hoạt động' },
        { id: 'CAT-02', name: 'Dây chuyền', count: 85, status: 'Hoạt động' },
        { id: 'CAT-03', name: 'Bông tai', count: 210, status: 'Hoạt động' },
        { id: 'CAT-04', name: 'Vòng tay', count: 64, status: 'Ẩn' },
        { id: 'CAT-05', name: 'Charm', count: 342, status: 'Hoạt động' },
    ]);

    const [editingCategory, setEditingCategory] = useState(null); 

    // --- HÀM LẤY MÀU SẮC TRẠNG THÁI ---
    const getStatusStyle = (status) => {
        if (status === 'Hoạt động') return { bg: '#16c09833', color: '#008767', border: '1px solid #008767' };
        if (status === 'Ẩn') return { bg: '#ffc5c5', color: '#df0404', border: '1px solid #df0404' }; 
        return { bg: '#f5f5f5', color: '#777', border: '1px solid #ccc' }; 
    };

    // =========================================================
    // HÀM MỚI: CHUYỂN ĐỔI TRẠNG THÁI KHI CLICK
    // =========================================================
    const handleToggleStatus = (id) => {
        setCategories(categories.map(c => 
            c.id === id ? { ...c, status: c.status === 'Hoạt động' ? 'Ẩn' : 'Hoạt động' } : c
        ));
    };

    // --- CÁC HÀM XỬ LÝ SỬA ---
    const handleEditCatClick = (category) => setEditingCategory(category);
    const handleCatInputChange = (e) => setEditingCategory({ ...editingCategory, [e.target.name]: e.target.value });
    const handleSaveCategory = () => {
        setCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
        setEditingCategory(null);
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 position-relative">
            {/* Header & Thanh công cụ */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1 d-flex align-items-center">
                        <BsFolder className="me-2 text-primary" style={{ color: '#5932ea' }}/> Quản lý Danh mục
                    </h4>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Thêm, sửa, xóa và phân loại</p>
                </div>
                <div className="d-flex gap-3">
                    <div className="input-group bg-light rounded-3" style={{ width: '250px', border: 'none' }}>
                        <span className="input-group-text bg-transparent border-0 pe-1"><BsSearch className="text-muted" /></span>
                        <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Tìm danh mục..." />
                    </div>
                    <button className="btn text-white fw-bold d-flex align-items-center px-4 shadow-none" style={{ backgroundColor: '#5932ea', borderRadius: '8px' }}>
                        <BsPlusLg className="me-2 fw-bold" /> Thêm danh mục
                    </button>
                </div>
            </div>

            {/* Bảng Danh mục */}
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th className="text-muted fw-normal border-bottom-0 pb-3">Mã DM</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3">Tên danh mục</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Số sản phẩm</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Trạng thái</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-end">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => {
                            const statusStyle = getStatusStyle(category.status);
                            return (
                                <tr key={index}>
                                    <td className="py-3 fw-bold text-secondary">{category.id}</td>
                                    <td className="py-3 fw-bold fs-6 text-dark">{category.name}</td>
                                    <td className="py-3 text-center">
                                        <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fs-6">{category.count}</span>
                                    </td>
                                    <td className="py-3 text-center">
                                        {/* NÚT CLICK ĐỂ ĐỔI TRẠNG THÁI */}
                                        <span 
                                            className="px-3 py-1 rounded-1 fw-bold" 
                                            onClick={() => handleToggleStatus(category.id)}
                                            title="Click để chuyển trạng thái"
                                            style={{ 
                                                backgroundColor: statusStyle.bg, 
                                                color: statusStyle.color, 
                                                border: statusStyle.border, 
                                                fontSize: '0.85rem',
                                                cursor: 'pointer',
                                                userSelect: 'none'
                                            }}
                                        >
                                            {category.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-end">
                                        <button 
                                            className="btn btn-sm btn-light border me-2 shadow-none" 
                                            title="Sửa danh mục"
                                            onClick={() => handleEditCatClick(category)}
                                        >
                                            <BsPencilSquare className="text-success" />
                                        </button>
                                        <button className="btn btn-sm btn-light border shadow-none" title="Xóa danh mục">
                                            <BsTrash className="text-danger" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* ===================================================================== */}
            {/* MODAL SỬA DANH MỤC */}
            {/* ===================================================================== */}
            {editingCategory && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: '400px', maxWidth: '90%' }}>
                        
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                            <h5 className="fw-bold mb-0">Sửa danh mục</h5>
                            <button className="btn btn-sm btn-light rounded-circle" onClick={() => setEditingCategory(null)}>
                                <BsX className="fs-4" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Tên danh mục</label>
                            <input 
                                type="text" 
                                className="form-control shadow-none" 
                                name="name" 
                                value={editingCategory.name} 
                                onChange={handleCatInputChange} 
                            />
                        </div>
                        
                        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                            <button className="btn btn-light fw-bold px-4" onClick={() => setEditingCategory(null)}>Hủy</button>
                            <button className="btn text-white fw-bold px-4 shadow-none" style={{ backgroundColor: '#5932ea' }} onClick={handleSaveCategory}>
                                Lưu thay đổi
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryManager;