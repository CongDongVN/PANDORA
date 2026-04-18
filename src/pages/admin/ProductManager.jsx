import React, { useState } from 'react';
import {
    BsSearch, BsPlusLg, BsPencilSquare, BsFilter, BsTrash,
    BsCloudUpload, BsFileEarmarkExcel, BsFileEarmarkSpreadsheet, BsBox
} from 'react-icons/bs';
import { BsX } from 'react-icons/bs';

const ProductManager = () => {
    // 1. STATE: DANH SÁCH SẢN PHẨM TỔNG
    const [products, setProducts] = useState([
        { id: 'PRD-101', name: 'Nhẫn Bạc Đính Đá CZ', category: 'Nhẫn', qty: 50, material: 'Bạc 925', sold: 120, price: '1,250,000đ', status: 'Còn hàng' },
        { id: 'PRD-102', name: 'Nhẫn Vàng Hồng 14k', category: 'Nhẫn', qty: 12, material: 'Vàng 14k', sold: 45, price: '3,150,000đ', status: 'Còn hàng' },
        { id: 'PRD-201', name: 'Dây chuyền Trái tim', category: 'Dây chuyền', qty: 30, material: 'Bạc 925', sold: 89, price: '2,450,000đ', status: 'Còn hàng' },
        { id: 'PRD-301', name: 'Bông tai Nụ Đá Xanh', category: 'Bông tai', qty: 100, material: 'Bạc 925', sold: 340, price: '950,000đ', status: 'Còn hàng' },
        { id: 'PRD-401', name: 'Vòng tay Basic Pandora', category: 'Vòng tay', qty: 0, material: 'Bạc 925', sold: 560, price: '1,850,000đ', status: 'Hết hàng' },
        { id: 'PRD-501', name: 'Charm Gia đình', category: 'Charm', qty: 200, material: 'Bạc 925', sold: 890, price: '750,000đ', status: 'Còn hàng' },
    ]);

    // 2. STATE: QUẢN LÝ POPUP (MODAL)
    const [editingProduct, setEditingProduct] = useState(null);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', category: 'Nhẫn', qty: '', material: '', price: '', status: 'Còn hàng' });

    // HÀM LẤY MÀU CHO 3 TRẠNG THÁI (Đã tách màu Hết hàng và Ngừng KD cho dễ nhìn)
    const getStatusStyle = (status) => {
        if (status === 'Còn hàng') return { bg: '#16c09833', color: '#008767', border: '1px solid #008767' };
        // Đã đổi mã màu border của Hết hàng thành #d39e00 (Vàng sậm)
        if (status === 'Hết hàng') return { bg: '#fff3cd', color: '#856404', border: '1px solid #d39e00' };
        if (status === 'Ngừng kinh doanh') return { bg: '#ffc5c5', color: '#df0404', border: '1px solid #df0404' };
        return { bg: '#f5f5f5', color: '#777', border: '1px solid #ccc' };
    };
    // =========================================================
    // HÀM MỚI: CHUYỂN ĐỔI TRẠNG THÁI NHANH KHI CLICK
    // =========================================================
    const handleToggleStatus = (productId) => {
        setProducts(products.map(product => {
            if (product.id === productId) {
                let nextStatus = 'Còn hàng';
                if (product.status === 'Còn hàng') nextStatus = 'Hết hàng';
                else if (product.status === 'Hết hàng') nextStatus = 'Ngừng kinh doanh';
                else if (product.status === 'Ngừng kinh doanh') nextStatus = 'Còn hàng';

                return { ...product, status: nextStatus };
            }
            return product;
        }));
    };

    // 3. CÁC HÀM XỬ LÝ KHÁC
    const handleEditProductClick = (product) => setEditingProduct(product);
    const handleProductInputChange = (e) => setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
    const handleSaveProduct = () => {
        setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
        setEditingProduct(null);
    };

    const handleNewProductChange = (e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    const handleSaveNewProduct = () => {
        if (!newProduct.name || !newProduct.price) {
            alert("Vui lòng nhập ít nhất Tên và Giá sản phẩm!"); return;
        }
        const newId = `PRD-${Math.floor(Math.random() * 900) + 100}`;
        const productToAdd = { ...newProduct, id: newId, sold: 0 };
        setProducts([...products, productToAdd]);
        setIsAddingProduct(false);
        setNewProduct({ name: '', category: 'Nhẫn', qty: '', material: '', price: '', status: 'Còn hàng' });
    };

    const simulateImport = (type) => {
        alert(`Đang kết nối tới ${type} để đồng bộ sản phẩm...`);
        setShowImportModal(false);
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 position-relative">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1 d-flex align-items-center">
                        <BsBox className="me-2 text-primary" style={{ color: '#5932ea' }} /> Quản lý Sản phẩm
                    </h4>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Quản lý toàn bộ mặt hàng trong kho</p>
                </div>

                <div className="d-flex gap-2">
                    <div className="input-group bg-light rounded-3 me-2" style={{ width: '250px', border: 'none' }}>
                        <span className="input-group-text bg-transparent border-0 pe-1"><BsSearch className="text-muted" /></span>
                        <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Tìm mã, tên SP..." />
                    </div>
                    <button className="btn fw-bold d-flex align-items-center px-3 shadow-none hover-import" style={{ border: '2px solid #5932ea', color: '#5932ea', borderRadius: '8px', backgroundColor: '#fff' }} onClick={() => setShowImportModal(true)}>
                        <BsCloudUpload className="me-2 fw-bold fs-5" /> Import
                    </button>
                    <button className="btn text-white fw-bold d-flex align-items-center px-4 shadow-none" style={{ backgroundColor: '#5932ea', borderRadius: '8px' }} onClick={() => setIsAddingProduct(true)}>
                        <BsPlusLg className="me-2 fw-bold" /> Thêm SP
                    </button>
                </div>
            </div>

            {/* Bảng danh sách Sản phẩm */}
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th className="text-muted fw-normal border-bottom-0 pb-3">Mã SP</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3" style={{ minWidth: '200px' }}>Tên sản phẩm</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3">Danh mục</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Tồn kho</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Đã bán</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3">Giá</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Trạng thái</th>
                            <th className="text-muted fw-normal border-bottom-0 pb-3 text-end" style={{ minWidth: '100px' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const statusStyle = getStatusStyle(product.status);
                            return (
                                <tr key={product.id}>
                                    <td className="py-3 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>{product.id}</td>
                                    <td className="py-3 fw-bold text-dark">{product.name}</td>
                                    <td className="py-3 text-muted"><span className="badge bg-light text-dark border">{product.category}</span></td>
                                    <td className="py-3 text-center fw-medium">{product.qty}</td>
                                    <td className="py-3 text-center text-success fw-bold">{product.sold}</td>
                                    <td className="py-3 fw-bold text-dark">{product.price}</td>
                                    <td className="py-3 text-center">
                                        {/* NÚT CLICK ĐỂ ĐỔI TRẠNG THÁI NẰM Ở ĐÂY */}
                                        <span
                                            className="px-2 py-1 rounded-1 fw-bold"
                                            title="Click để đổi trạng thái"
                                            onClick={() => handleToggleStatus(product.id)}
                                            style={{
                                                backgroundColor: statusStyle.bg,
                                                color: statusStyle.color,
                                                border: statusStyle.border,
                                                fontSize: '0.75rem',
                                                cursor: 'pointer', // Biến thành hình bàn tay khi di chuột
                                                userSelect: 'none' // Chống bôi đen chữ khi bấm nhanh
                                            }}
                                        >
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-end">
                                        <button className="btn btn-sm btn-light border me-1 shadow-none" onClick={() => handleEditProductClick(product)}><BsPencilSquare className="text-success" /></button>
                                        <button className="btn btn-sm btn-light border shadow-none"><BsTrash className="text-danger" /></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* MODAL 1: THÊM SẢN PHẨM MỚI */}
            {isAddingProduct && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: '500px', maxWidth: '90%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                            <h5 className="fw-bold mb-0 text-dark">Thêm sản phẩm mới</h5>
                            <button className="btn btn-sm btn-light rounded-circle" onClick={() => setIsAddingProduct(false)}><BsX className="fs-4" /></button>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Tên sản phẩm <span className="text-danger">*</span></label>
                            <input type="text" className="form-control shadow-none" name="name" value={newProduct.name} onChange={handleNewProductChange} />
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Danh mục</label>
                                <select className="form-select shadow-none" name="category" value={newProduct.category} onChange={handleNewProductChange}>
                                    <option value="Nhẫn">Nhẫn</option><option value="Dây chuyền">Dây chuyền</option><option value="Bông tai">Bông tai</option><option value="Vòng tay">Vòng tay</option><option value="Charm">Charm</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Giá bán <span className="text-danger">*</span></label>
                                <input type="text" className="form-control shadow-none" name="price" value={newProduct.price} onChange={handleNewProductChange} />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-6">
                                <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Số lượng nhập kho</label>
                                <input type="number" className="form-control shadow-none" name="qty" value={newProduct.qty} onChange={handleNewProductChange} />
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Trạng thái</label>
                                <select className="form-select shadow-none" name="status" value={newProduct.status} onChange={handleNewProductChange}>
                                    <option value="Còn hàng">Còn hàng</option><option value="Hết hàng">Hết hàng</option>
                                </select>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                            <button className="btn btn-light fw-bold px-4" onClick={() => setIsAddingProduct(false)}>Hủy</button>
                            <button className="btn text-white fw-bold px-4" style={{ backgroundColor: '#5932ea' }} onClick={handleSaveNewProduct}>Thêm vào kho</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: TÙY CHỌN IMPORT (Đã bỏ API và MySQL) */}
            {showImportModal && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: '450px', maxWidth: '90%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                            <h5 className="fw-bold mb-0">Chọn nguồn Import dữ liệu</h5>
                            <button className="btn btn-sm btn-light rounded-circle" onClick={() => setShowImportModal(false)}><BsX className="fs-4" /></button>
                        </div>

                        <div className="row g-3 mb-2">
                            <div className="col-6">
                                <button className="btn btn-light border w-100 p-3 d-flex flex-column align-items-center shadow-none hover-import" onClick={() => simulateImport('File Excel')}>
                                    <BsFileEarmarkExcel className="fs-1 mb-2" style={{ color: '#107c41' }} />
                                    <span className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>File Excel</span>
                                </button>
                            </div>
                            <div className="col-6">
                                <button className="btn btn-light border w-100 p-3 d-flex flex-column align-items-center shadow-none hover-import" onClick={() => simulateImport('Google Sheets')}>
                                    <BsFileEarmarkSpreadsheet className="fs-1 mb-2" style={{ color: '#0f9d58' }} />
                                    <span className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>Google Sheets</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 3: SỬA SẢN PHẨM (Đã gỡ bỏ chọn trạng thái vì giờ click trực tiếp rồi) */}
            {editingProduct && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: '450px', maxWidth: '90%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                            <h5 className="fw-bold mb-0">Sửa sản phẩm: <span className="text-primary">{editingProduct.id}</span></h5>
                            <button className="btn btn-sm btn-light rounded-circle" onClick={() => setEditingProduct(null)}><BsX className="fs-4" /></button>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Tên sản phẩm</label>
                            <input type="text" className="form-control shadow-none" name="name" value={editingProduct.name} onChange={handleProductInputChange} />
                        </div>
                        <div className="row mb-4">
                            <div className="col-6">
                                <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Danh mục</label>
                                <select className="form-select shadow-none" name="category" value={editingProduct.category} onChange={handleProductInputChange}>
                                    <option value="Nhẫn">Nhẫn</option><option value="Dây chuyền">Dây chuyền</option><option value="Bông tai">Bông tai</option><option value="Vòng tay">Vòng tay</option><option value="Charm">Charm</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Giá bán</label>
                                <input type="text" className="form-control shadow-none" name="price" value={editingProduct.price} onChange={handleProductInputChange} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                            <button className="btn btn-light fw-bold px-4" onClick={() => setEditingProduct(null)}>Hủy</button>
                            <button className="btn text-white fw-bold px-4" style={{ backgroundColor: '#5932ea' }} onClick={handleSaveProduct}>Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManager;