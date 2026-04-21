import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BsSearch, BsPlusLg, BsPencilSquare, BsTrash, BsBox, BsX,
} from "react-icons/bs";

const ProductManager = () => {
  // 1. QUẢN LÝ STATES
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    categoryId: 0,
    sku: "",
    description: "",
    mainImageUrl: "",
  });

  // ĐỊA CHỈ API GỐC (Sửa lỗi dính chữ /Products)
  const API_BASE = "https://localhost:7221/api";

  // 2. KẾT NỐI DỮ LIỆU BAN ĐẦU
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Gọi đồng thời cả Products và Categories theo đúng route
        const [prodRes, catRes] = await Promise.all([
          axios.get(`${API_BASE}/Products`),
          axios.get(`${API_BASE}/Categories`),
        ]);

        setProducts(prodRes.data);
        setCategories(catRes.data);

        // Tự động gán CategoryId đầu tiên cho Form để tránh lỗi Foreign Key
        if (catRes.data.length > 0) {
          const firstCatId = catRes.data[0].id || catRes.data[0].Id;
          setCurrentProduct((prev) => ({ ...prev, categoryId: firstCatId }));
        }
      } catch (err) {
        console.error("Lỗi kết nối API:", err);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  // Hàm tải lại danh sách sản phẩm để cập nhật trạng thái "Còn hàng/Hết hàng"
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/Products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi tải danh sách sản phẩm:", err);
    }
  };

  // 3. CÁC HÀM XỬ LÝ (CRUD)
  const handleOpenAdd = () => {
    setIsEditing(false);
    const defaultCatId = categories.length > 0 ? (categories[0].id || categories[0].Id) : 0;
    setCurrentProduct({
      id: 0, name: "", price: 0, stock: 0,
      categoryId: defaultCatId,
      sku: "", description: "", mainImageUrl: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct({
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
      categoryId: product.categoryId || product.CategoryId,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!currentProduct.name || currentProduct.price < 0 || !currentProduct.categoryId) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const payload = {
      ...currentProduct,
      price: parseFloat(currentProduct.price),
      stock: parseInt(currentProduct.stock),
      categoryId: parseInt(currentProduct.categoryId),
    };

    try {
      if (isEditing) {
        await axios.put(`${API_BASE}/Products/${currentProduct.id || currentProduct.Id}`, payload);
      } else {
        await axios.post(`${API_BASE}/Products`, payload);
      }

      setIsModalOpen(false);
      // Backend sẽ tự tính toán Status dựa trên Stock mới gửi lên
      await fetchProducts(); 
      alert("Cập nhật kho thành công!");
    } catch (err) {
      alert("Lỗi: " + (err.response?.data?.message || "Kiểm tra lại dữ liệu nhập vào."));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`${API_BASE}/Products/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Không thể xóa sản phẩm.");
      }
    }
  };

  // 4. UI HELPER
  const getStatusBadge = (status) => {
    const styles = {
      "Còn hàng": "bg-success-subtle text-success border-success",
      "Hết hàng": "bg-danger-subtle text-danger border-danger",
      "Ngừng kinh doanh": "bg-secondary-subtle text-secondary border-secondary",
    };
    return `badge border ${styles[status] || "bg-light text-dark"}`;
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1"><BsBox className="me-2 text-primary" /> Quản lý kho Pandora</h4>
          <p className="text-muted small mb-0">Trạng thái tự động cập nhật dựa trên tồn kho</p>
        </div>
        <div className="d-flex gap-2">
          <div className="input-group bg-light rounded-3" style={{ width: "250px" }}>
            <span className="input-group-text bg-transparent border-0"><BsSearch className="text-muted" /></span>
            <input 
              type="text" className="form-control border-0 bg-transparent shadow-none" 
              placeholder="Tìm sản phẩm..." onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <button className="btn text-white fw-bold px-4" style={{ backgroundColor: "#5932ea" }} onClick={handleOpenAdd}>
            <BsPlusLg className="me-2" /> Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>SKU</th>
              <th style={{ minWidth: "200px" }}>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th className="text-center">Số lượng</th>
              <th>Giá bán</th>
              <th className="text-center">Trạng thái</th>
              <th className="text-end">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center py-5">Đang đồng bộ dữ liệu...</td></tr>
            ) : (
              products
                .filter((p) => (p.name || p.Name).toLowerCase().includes(searchTerm.toLowerCase()))
                .map((p) => (
                  <tr key={p.id || p.Id}>
                    <td className="text-muted small fw-bold">{p.sku || p.SKU}</td>
                    <td className="fw-bold">{p.name || p.Name}</td>
                    <td><span className="badge bg-light text-dark border">{p.categoryName || p.CategoryName}</span></td>
                    <td className="text-center fw-bold">{p.stock || p.Stock}</td>
                    <td className="text-primary fw-bold">{Number(p.price || p.Price).toLocaleString()}đ</td>
                    <td className="text-center">
                      <span className={getStatusBadge(p.status || p.Status)}>
                        {p.status || p.Status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-light border me-2" onClick={() => handleOpenEdit(p)}><BsPencilSquare className="text-success" /></button>
                      <button className="btn btn-sm btn-light border" onClick={() => handleDelete(p.id || p.Id)}><BsTrash className="text-danger" /></button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-bottom-0 pb-0">
                <h5 className="fw-bold">{isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h5>
                <button className="btn-close shadow-none" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body py-4">
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Tên sản phẩm</label>
                  <input type="text" className="form-control shadow-none" value={currentProduct.name} onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })} />
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted">Giá bán (VNĐ)</label>
                    <input type="number" className="form-control shadow-none" value={currentProduct.price} onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })} />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted">Số lượng tồn kho</label>
                    <input type="number" className="form-control shadow-none" value={currentProduct.stock} onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Danh mục sản phẩm</label>
                  <select 
                    className="form-select shadow-none" 
                    value={currentProduct.categoryId} 
                    onChange={(e) => setCurrentProduct({ ...currentProduct, categoryId: e.target.value })}
                  >
                    {categories.length === 0 ? (
                      <option value="0">--- Không tìm thấy danh mục ---</option>
                    ) : (
                      categories.map((cat) => (
                        <option key={cat.id || cat.Id} value={cat.id || cat.Id}>{cat.name || cat.Name}</option>
                      ))
                    )}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Mã SKU</label>
                  <input type="text" className="form-control shadow-none" value={currentProduct.sku} onChange={(e) => setCurrentProduct({ ...currentProduct, sku: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer border-top-0 pt-0">
                <button className="btn btn-light fw-bold px-4" onClick={() => setIsModalOpen(false)}>Hủy</button>
                <button className="btn text-white fw-bold px-4" style={{ backgroundColor: "#5932ea" }} onClick={handleSave}>
                  {isEditing ? "Lưu thay đổi" : "Thêm vào kho"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;