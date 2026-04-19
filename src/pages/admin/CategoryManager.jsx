import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    BsPlusLg, BsPencilSquare, BsFolder, BsX, BsTrash, BsLink45Deg 
} from 'react-icons/bs';

const API_BASE_URL = "https://localhost:7221/api/Categories"; // Kiểm tra lại Port của bạn

const CategoryManager = () => {
    // ---------------------------------------------------------
    // 1. STATE
    // ---------------------------------------------------------
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    
    // Cấu trúc dữ liệu chuẩn cho Add/Edit
    const initialFormState = { name: '', slug: '', description: '', parentId: null };
    const [formData, setFormData] = useState(initialFormState);
    const [editingId, setEditingId] = useState(null); // null = Add, !null = Edit

    // ---------------------------------------------------------
    // 2. FUNCTIONS (API & LOGIC)
    // ---------------------------------------------------------
    const fetchCategories = async () => {
        try {
            const res = await axios.get(API_BASE_URL);
            setCategories(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Lỗi tải dữ liệu", err);
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, []);

    // Hàm chuyển đổi Tên -> Slug tự động
    const createSlug = (str) => {
        return str.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Bỏ dấu tiếng Việt
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'parentId') newValue = value === "" ? null : parseInt(value);
        
        setFormData(prev => {
            const updated = { ...prev, [name]: newValue };
            // Tự động tạo slug khi gõ name
            if (name === 'name') {
                updated.slug = createSlug(value);
            }
            return updated;
        });
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                // UPDATE (PUT)
                await axios.put(`${API_BASE_URL}/${editingId}`, formData);
            } else {
                // CREATE (POST)
                await axios.post(API_BASE_URL, formData);
            }
            closeModal();
            fetchCategories();
        } catch (err) {
            alert(err.response?.data || "Đã có lỗi xảy ra");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Xác nhận xóa danh mục này?")) {
            try {
                await axios.delete(`${API_BASE_URL}/${id}`);
                fetchCategories();
            } catch (err) {
                alert("Không thể xóa!");
            }
        }
    };

    const openEditModal = (cat) => {
        setEditingId(cat.id);
        setFormData({
            name: cat.name,
            slug: cat.slug,
            description: cat.description || '',
            parentId: cat.parentId
        });
        setShowAddModal(true);
    };

    const closeModal = () => {
        setShowAddModal(false);
        setEditingId(null);
        setFormData(initialFormState);
    };

    // ---------------------------------------------------------
    // 3. RENDER
    // ---------------------------------------------------------
    if (loading) return <div className="p-5 text-center">Đang kết nối API...</div>;

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0"><BsFolder className="me-2"/> Quản lý Danh mục</h4>
                <button className="btn text-white px-4" style={{backgroundColor: '#5932ea'}} 
                        onClick={() => setShowAddModal(true)}>
                    <BsPlusLg className="me-2"/> Thêm mới
                </button>
            </div>

            <table className="table align-middle">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Tên & Slug</th>
                        <th>Mô tả</th>
                        <th>Danh mục cha</th>
                        <th className="text-end">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(cat => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>
                                <div className="fw-bold">{cat.name}</div>
                                <small className="text-muted"><BsLink45Deg/>{cat.slug}</small>
                            </td>
                            <td className="text-muted">{cat.description || "---"}</td>
                            <td>{categories.find(c => c.id === cat.parentId)?.name || "Gốc"}</td>
                            <td className="text-end">
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEditModal(cat)}>
                                    <BsPencilSquare/>
                                </button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cat.id)}>
                                    <BsTrash/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL CHUNG CHO THÊM VÀ SỬA */}
            {showAddModal && (
                <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4 p-3">
                            <div className="modal-header border-0">
                                <h5 className="fw-bold">{editingId ? "Cập nhật danh mục" : "Thêm danh mục mới"}</h5>
                                <button className="btn-close shadow-none" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Tên danh mục</label>
                                    <input type="text" className="form-control" name="name" 
                                           value={formData.name} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Slug (Tự động)</label>
                                    <input type="text" className="form-control bg-light" name="slug" 
                                           value={formData.slug} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Mô tả</label>
                                    <textarea className="form-control" name="description" rows="2"
                                              value={formData.description} onChange={handleInputChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Thuộc danh mục cha</label>
                                    <select className="form-select" name="parentId" 
                                            value={formData.parentId || ""} onChange={handleInputChange}>
                                        <option value="">-- Là danh mục gốc --</option>
                                        {categories.filter(c => c.id !== editingId).map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-light px-4" onClick={closeModal}>Hủy</button>
                                <button className="btn text-white px-4" style={{backgroundColor: '#5932ea'}} 
                                        onClick={handleSave}>Lưu dữ liệu</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryManager;