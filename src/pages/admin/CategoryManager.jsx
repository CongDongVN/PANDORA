import React, { useState } from 'react';
import { BsSearch, BsPlusLg, BsPencilSquare, BsFolder, BsEye, BsX, BsArrowLeft, BsFilter, BsTrash } from 'react-icons/bs';

const CategoryManager = () => {
    // ========================================================================
    // 1. STATE: DỮ LIỆU
    // ========================================================================
    // Danh sách Danh mục
    const [categories, setCategories] = useState([
        { id: 'CAT-01', name: 'Nhẫn', count: 124, status: 'Hoạt động' },
        { id: 'CAT-02', name: 'Dây chuyền', count: 85, status: 'Hoạt động' },
        { id: 'CAT-03', name: 'Bông tai', count: 210, status: 'Hoạt động' },
        { id: 'CAT-04', name: 'Vòng tay', count: 64, status: 'Ẩn' },
        { id: 'CAT-05', name: 'Charm', count: 342, status: 'Hoạt động' },
    ]);

    // Danh sách Sản phẩm phân theo ID Danh mục
    const [products, setProducts] = useState({
        'CAT-01': [ // Nhẫn
            { id: 'PRD-101', name: 'Nhẫn Bạc Đính Đá CZ', qty: 50, material: 'Bạc 925', sold: 120, price: '$45.00', status: 'Còn hàng' },
            { id: 'PRD-102', name: 'Nhẫn Vàng Hồng 14k', qty: 12, material: 'Vàng 14k', sold: 45, price: '$150.00', status: 'Còn hàng' },
            { id: 'PRD-103', name: 'Nhẫn Kim Cương Vô Cực', qty: 0, material: 'Bạch kim', sold: 8, price: '$890.00', status: 'Hết hàng' },
        ],
        'CAT-02': [ // Dây chuyền
            { id: 'PRD-201', name: 'Dây chuyền Trái tim', qty: 30, material: 'Bạc 925', sold: 89, price: '$55.00', status: 'Còn hàng' },
            { id: 'PRD-202', name: 'Dây chuyền Ngọc Trai', qty: 5, material: 'Ngọc trai thật', sold: 21, price: '$200.00', status: 'Còn hàng' },
        ],
        'CAT-03': [ // Bông tai
            { id: 'PRD-301', name: 'Bông tai Nụ Đá Xanh', qty: 100, material: 'Bạc 925', sold: 340, price: '$35.00', status: 'Còn hàng' },
        ],
        'CAT-04': [ // Vòng tay
            { id: 'PRD-401', name: 'Vòng tay Basic Pandora', qty: 80, material: 'Bạc 925', sold: 560, price: '$65.00', status: 'Còn hàng' },
        ],
        'CAT-05': [ // Charm
            { id: 'PRD-501', name: 'Charm Gia đình', qty: 200, material: 'Bạc 925', sold: 890, price: '$25.00', status: 'Còn hàng' },
            { id: 'PRD-502', name: 'Charm Vương miện Vàng', qty: 0, material: 'Vàng 18k', sold: 12, price: '$120.00', status: 'Hết hàng' },
        ]
    });

    // ========================================================================
    // 2. STATE: ĐIỀU HƯỚNG & POPUP
    // ========================================================================
    const [selectedCategory, setSelectedCategory] = useState(null); // chuyển đổi màn hình 
    const [editingCategory, setEditingCategory] = useState(null); // Cho popup sửa Danh mục
    const [editingProduct, setEditingProduct] = useState(null); // Cho popup sửa Sản phẩm

    // --- HÀM LẤY MÀU CHO TRẠNG THÁI ---
    const getStatusStyle = (status) => {
        if (status === 'Hoạt động' || status === 'Còn hàng') return { bg: '#16c09833', color: '#008767', border: '1px solid #008767' };
        if (status === 'Hết hàng' || status === 'Ẩn') return { bg: '#ffc5c5', color: '#df0404', border: '1px solid #df0404' }; 
        return { bg: '#f5f5f5', color: '#777', border: '1px solid #ccc' }; 
    };

    // ========================================================================
    // 3. CÁC HÀM XỬ LÝ SỰ KIỆN (ACTIONS)
    // ========================================================================
    
    // --- CHO DANH MỤC ---
    const handleEditCatClick = (category) => setEditingCategory(category);
    const handleCatInputChange = (e) => setEditingCategory({ ...editingCategory, [e.target.name]: e.target.value });
    const handleSaveCategory = () => {
        setCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
        setEditingCategory(null);
    };

    // --- CHO SẢN PHẨM ---
    const handleViewCategoryDetails = (category) => setSelectedCategory(category); // Chuyển sang trang chi tiết
    const handleBackToCategories = () => setSelectedCategory(null); // Nút quay lại trang danh mục

    const handleEditProductClick = (product) => setEditingProduct(product);
    const handleProductInputChange = (e) => setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
    const handleSaveProduct = () => {
        // Cập nhật sản phẩm trong mảng tương ứng với Category hiện tại
        const catId = selectedCategory.id;
        const updatedProductsArray = products[catId].map(p => 
            p.id === editingProduct.id ? editingProduct : p
        );
        setProducts({ ...products, [catId]: updatedProductsArray });
        setEditingProduct(null);
    };

    // ========================================================================
    // 4. GIAO DIỆN HIỂN THỊ CHI TIẾT DANH SÁCH SẢN PHẨM (MÀN HÌNH 2)
    // ========================================================================
    if (selectedCategory) {
        const currentProducts = products[selectedCategory.id] || [];

        return (
            <div className="card border-0 shadow-sm rounded-4 p-4 position-relative">
                
                {/* Header: Nút Quay lại & Tiêu đề */}
                <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                    <button 
                        className="btn btn-light rounded-circle d-flex justify-content-center align-items-center me-3 shadow-none border" 
                        style={{ width: '40px', height: '40px' }}
                        onClick={handleBackToCategories}
                    >
                        <BsArrowLeft className="fs-5 text-dark" />
                    </button>
                    <div>
                        <h4 className="fw-bold mb-1">
                            Sản phẩm thuộc: <span style={{ color: '#5932ea' }}>{selectedCategory.name}</span>
                        </h4>
                        <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Các loại sản phẩm PANDORA</p>
                    </div>
                </div>

                {/* Thanh công cụ: Tìm kiếm, Lọc, Thêm sản phẩm */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex gap-3 align-items-center">
                        <div className="input-group bg-light rounded-3" style={{ width: '280px', border: 'none' }}>
                            <span className="input-group-text bg-transparent border-0 pe-1"><BsSearch className="text-muted" /></span>
                            <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Tìm mã, tên sản phẩm..." />
                        </div>
                        <button className="btn btn-light border d-flex align-items-center px-3 fw-bold text-muted shadow-none">
                            <BsFilter className="me-2 fs-5" /> Lọc
                        </button>
                    </div>
                    
                    <button className="btn text-white fw-bold d-flex align-items-center px-4" style={{ backgroundColor: '#5932ea', borderRadius: '8px' }}>
                        <BsPlusLg className="me-2 fw-bold" /> Thêm sản phẩm
                    </button>
                </div>

                {/* Bảng danh sách Sản phẩm */}
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th className="text-muted fw-normal border-bottom-0 pb-3">Mã SP</th>
                                <th className="text-muted fw-normal border-bottom-0 pb-3" style={{ minWidth: '200px' }}>Tên sản phẩm</th>
                                <th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Tồn kho</th>
                                <th className="text-muted fw-normal border-bottom-0 pb-3">Chất liệu</th>
                                <th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Đã bán</th>
                                <th className="text-muted fw-normal border-bottom-0 pb-3">Giá</th>
                                <th className="text-muted fw-normal border-bottom-0 pb-3 text-center">Trạng thái</th>
                                <th className="text-muted fw-normal border-bottom-0 pb-3 text-end" style={{ minWidth: '100px' }}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.length === 0 ? (
                                <tr><td colSpan="8" className="text-center py-4 text-muted">Chưa có sản phẩm nào trong danh mục này.</td></tr>
                            ) : (
                                currentProducts.map((product) => {
                                    const statusStyle = getStatusStyle(product.status);
                                    return (
                                        <tr key={product.id}>
                                            <td className="py-3 fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>{product.id}</td>
                                            <td className="py-3 fw-bold text-dark">{product.name}</td>
                                            <td className="py-3 text-center fw-medium">{product.qty}</td>
                                            <td className="py-3 text-muted" style={{ fontSize: '0.9rem' }}>{product.material}</td>
                                            <td className="py-3 text-center text-success fw-bold">{product.sold}</td>
                                            <td className="py-3 fw-bold text-dark">{product.price}</td>
                                            <td className="py-3 text-center">
                                                <span className="px-2 py-1 rounded-1 fw-bold" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: statusStyle.border, fontSize: '0.75rem' }}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="py-3 text-end">
                                                <button className="btn btn-sm btn-light border me-1 shadow-none" title="Chỉnh sửa" onClick={() => handleEditProductClick(product)}>
                                                    <BsPencilSquare className="text-success" />
                                                </button>
                                                <button className="btn btn-sm btn-light border shadow-none" title="Xóa">
                                                    <BsTrash className="text-danger" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* MODAL SỬA SẢN PHẨM */}
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
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Chất liệu</label>
                                    <input type="text" className="form-control shadow-none" name="material" value={editingProduct.material} onChange={handleProductInputChange} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Giá bán</label>
                                    <input type="text" className="form-control shadow-none" name="price" value={editingProduct.price} onChange={handleProductInputChange} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Trạng thái</label>
                                <select className="form-select shadow-none" name="status" value={editingProduct.status} onChange={handleProductInputChange}>
                                    <option value="Còn hàng">Còn hàng</option>
                                    <option value="Hết hàng">Hết hàng</option>
                                    <option value="Ngừng kinh doanh">Ngừng kinh doanh</option>
                                </select>
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
    }

    // ========================================================================
    // 5. GIAO DIỆN HIỂN THỊ DANH SÁCH DANH MỤC TỔNG (MÀN HÌNH 1 - GỐC)
    // ========================================================================
    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 position-relative">
            {/* Header & Thanh công cụ */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1 d-flex align-items-center">
                        <BsFolder className="me-2 text-primary" style={{ color: '#5932ea' }}/> Quản lý Danh mục
                    </h4>
                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Thêm, sửa, xóa và phân loại sản phẩm</p>
                </div>
                <div className="d-flex gap-3">
                    <div className="input-group bg-light rounded-3" style={{ width: '250px', border: 'none' }}>
                        <span className="input-group-text bg-transparent border-0 pe-1"><BsSearch className="text-muted" /></span>
                        <input type="text" className="form-control border-0 bg-transparent shadow-none" placeholder="Tìm danh mục..." />
                    </div>
                    <button className="btn text-white fw-bold d-flex align-items-center px-4" style={{ backgroundColor: '#5932ea', borderRadius: '8px' }}>
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
                                        <span className="px-3 py-1 rounded-1 fw-bold" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, border: statusStyle.border, fontSize: '0.85rem' }}>
                                            {category.status}
                                        </span>
                                    </td>
                                    <td className="py-3 text-end">
                                        {/* NÚT XEM CHI TIẾT: Chuyển sang màn hình danh sách sản phẩm */}
                                        <button 
                                            className="btn btn-sm btn-light border me-2 shadow-none" 
                                            title="Xem chi tiết sản phẩm"
                                            onClick={() => handleViewCategoryDetails(category)}
                                        >
                                            <BsEye className="text-primary" />
                                        </button>
                                        <button className="btn btn-sm btn-light border shadow-none" title="Chỉnh sửa danh mục" onClick={() => handleEditCatClick(category)}>
                                            <BsPencilSquare className="text-success" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* MODAL CHỈNH SỬA DANH MỤC */}
            {editingCategory && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: '400px', maxWidth: '90%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                            <h5 className="fw-bold mb-0">Sửa danh mục</h5>
                            <button className="btn btn-sm btn-light rounded-circle" onClick={() => setEditingCategory(null)}><BsX className="fs-4" /></button>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Tên danh mục</label>
                            <input type="text" className="form-control shadow-none" name="name" value={editingCategory.name} onChange={handleCatInputChange} />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-bold text-muted" style={{ fontSize: '0.9rem' }}>Trạng thái</label>
                            <select className="form-select shadow-none" name="status" value={editingCategory.status} onChange={handleCatInputChange}>
                                <option value="Hoạt động">Hoạt động</option>
                                <option value="Ẩn">Ẩn</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                            <button className="btn btn-light fw-bold px-4" onClick={() => setEditingCategory(null)}>Hủy</button>
                            <button className="btn text-white fw-bold px-4" style={{ backgroundColor: '#5932ea' }} onClick={handleSaveCategory}>Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryManager;