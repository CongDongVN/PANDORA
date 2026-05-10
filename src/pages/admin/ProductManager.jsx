import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  BsSearch, BsPlusLg, BsPencilSquare, BsTrash, BsBox, BsImage, BsCheckCircleFill, BsXCircleFill
} from "react-icons/bs";

const ProductManager = () => {
  // --- STATE QUẢN LÝ ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 1. STATE CHO ẢNH ĐẠI DIỆN (Chỉ 1 file)
  const [primaryFile, setPrimaryFile] = useState(null);
  const [primaryPreviewUrl, setPrimaryPreviewUrl] = useState("");

  // 2. STATE CHO ẢNH MÔ TẢ (Nhiều file)
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [previewUrls, setPreviewUrls] = useState([]);     
  const [existingImages, setExistingImages] = useState([]); 

  const [currentProduct, setCurrentProduct] = useState({
    id: 0, name: "", price: 0, stock: 0, categoryId: 0, sku: "", description: "",
  });

  const API_BASE = "https://localhost:7221/api";

  // --- LẤY DỮ LIỆU ---
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/Products`);
      setProducts(res.data);
    } catch (err) { console.error(err); }
  }, [API_BASE]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [pRes, cRes] = await Promise.all([
          axios.get(`${API_BASE}/Products`),
          axios.get(`${API_BASE}/Categories`)
        ]);
        setProducts(pRes.data);
        setCategories(cRes.data);
        if (cRes.data.length > 0) {
          setCurrentProduct(prev => ({ ...prev, categoryId: cRes.data[0].id || cRes.data[0].Id }));
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    init();
  }, [fetchProducts]);

  // --- XỬ LÝ ẢNH ĐẠI DIỆN ---
  const handlePrimaryFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrimaryFile(file);
      setPrimaryPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removePrimaryFile = () => {
    setPrimaryFile(null);
    setPrimaryPreviewUrl("");
  };

  // --- XỬ LÝ ẢNH MÔ TẢ ---
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...urls]);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = async (imageId) => {
    if (window.confirm("Bạn có chắc muốn xóa ảnh này vĩnh viễn?")) {
      try {
        await axios.delete(`${API_BASE}/Products/delete-image/${imageId}`);
        setExistingImages(existingImages.filter(img => img.id !== imageId));
      } catch (err) {
        alert("Không thể xóa ảnh cũ! Vui lòng kiểm tra lại Backend.");
      }
    }
  };

  // --- CRUD FUNCTIONS ---
  const handleDelete = async (id) => {
    if (window.confirm("Xóa sản phẩm và tất cả ảnh liên quan?")) {
      await axios.delete(`${API_BASE}/Products/${id}`);
      fetchProducts();
    }
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    
    // Reset toàn bộ state ảnh
    setPrimaryFile(null); setPrimaryPreviewUrl("");
    setSelectedFiles([]); setPreviewUrls([]); setExistingImages([]);
    
    setCurrentProduct({ id: 0, name: "", price: 0, stock: 0, categoryId: categories[0]?.id || 0, sku: "", description: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
      sku: product.sku,
      description: product.description || ""
    });
    
    // Phân tách ảnh cũ: Ảnh chính và Ảnh mô tả để hiển thị
    const allImages = product.images || [];
    const mainImgUrl = product.primaryImageUrl; 
    
    // Hiển thị ảnh chính hiện tại lên ô Review (Chỉ lấy URL để xem, file = null)
    setPrimaryFile(null);
    setPrimaryPreviewUrl(mainImgUrl || "");

    setExistingImages(allImages); 
    setSelectedFiles([]);
    setPreviewUrls([]);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const fd = new FormData();
    
    fd.append("Id", currentProduct.id);
    fd.append("Name", currentProduct.name);
    fd.append("Price", Number(currentProduct.price));
    fd.append("Stock", Number(currentProduct.stock));
    fd.append("CategoryId", currentProduct.categoryId);
    fd.append("Description", currentProduct.description || "");
    fd.append("SKU", currentProduct.sku);

    // Append Ảnh Đại Diện
    if (primaryFile) {
      fd.append("PrimaryImage", primaryFile);
    }

    // Append Ảnh Mô Tả
    if (selectedFiles.length > 0) {
      selectedFiles.forEach(file => fd.append("Images", file));
    }

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      
      if (isEditing) {
        await axios.put(`${API_BASE}/Products/${currentProduct.id}`, fd, config);
      } else {
        if (!primaryFile) {
          alert("Vui lòng chọn ảnh đại diện cho sản phẩm mới!");
          return;
        }
        await axios.post(`${API_BASE}/Products`, fd, config);
      }

      setIsModalOpen(false);
      fetchProducts();
      alert("Cập nhật kho thành công!");
    } catch (err) {
      console.error("Chi tiết lỗi:", err.response?.data);
      alert("Không thể cập nhật. Kiểm tra lại dữ liệu nhập vào!");
    }
  };

  return (
    <div className="p-4 bg-white rounded-4 shadow-sm">
      <div className="d-flex justify-content-between mb-4">
        <h4 className="fw-bold"><BsBox className="text-primary me-2"/> Quản lý kho Pandora</h4>
        <button className="btn btn-primary px-4 fw-bold" onClick={handleOpenAdd}><BsPlusLg/> Thêm sản phẩm</button>
      </div>

      <table className="table align-middle">
        <thead className="table-light">
          <tr>
            <th>Ảnh chính</th>
            <th>Tên / SKU</th>
            <th>Giá bán</th>
            <th>Số lượng</th>
            <th className="text-end">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>
                <img 
                  src={p.primaryImageUrl || "https://via.placeholder.com/50"} 
                  width="50" height="50" 
                  className="rounded shadow-sm" 
                  style={{objectFit:'cover'}} 
                  alt="thumb" 
                />
              </td>
              <td>
                <div className="fw-bold">{p.name}</div>
                <small className="text-muted">{p.sku}</small>
              </td>
              <td className="text-primary fw-bold">{Number(p.price).toLocaleString()}đ</td>
              <td>{p.stock}</td>
              <td className="text-end">
                <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleOpenEdit(p)}><BsPencilSquare/></button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}><BsTrash/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal d-block" style={{backgroundColor:'rgba(0,0,0,0.6)', zIndex: 1050}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0">
                <h5 className="fw-bold">{isEditing ? `Sửa: ${currentProduct.sku}` : "Thêm sản phẩm mới"}</h5>
                <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body" style={{maxHeight:'75vh', overflowY:'auto'}}>
                <div className="row g-3">
                  <div className="col-md-8">
                    <label className="fw-bold small">Tên sản phẩm</label>
                    <input type="text" className="form-control shadow-none" value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-bold small">Mã SKU</label>
                    <input 
                      type="text" 
                      className={`form-control shadow-none ${isEditing ? 'bg-light text-muted' : ''}`} 
                      value={currentProduct.sku} 
                      onChange={e => !isEditing && setCurrentProduct({...currentProduct, sku: e.target.value})}
                      readOnly={isEditing}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-bold small">Giá bán (đ)</label>
                    <input type="number" className="form-control shadow-none" value={currentProduct.price} onChange={e => setCurrentProduct({...currentProduct, price: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-bold small">Tồn kho</label>
                    <input type="number" className="form-control shadow-none" value={currentProduct.stock} onChange={e => setCurrentProduct({...currentProduct, stock: e.target.value})} />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-bold small">Danh mục</label>
                    <select 
                      className="form-select shadow-none" 
                      value={currentProduct.categoryId || ''} 
                      onChange={e => setCurrentProduct({...currentProduct, categoryId: e.target.value})}
                    >
                      <option value="" disabled>-- Chọn danh mục --</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* KHU VỰC QUẢN LÝ HÌNH ẢNH MỚI */}
                  <div className="col-12 mt-4">
                    <div className="row g-3">
                      
                      {/* 1. ẢNH ĐẠI DIỆN */}
                      <div className="col-md-4">
                        <label className="fw-bold small text-primary mb-2">Ảnh Đại Diện (Bắt buộc)</label>
                        <div className="border border-primary rounded p-3 bg-light text-center" style={{ borderStyle: 'dashed !important' }}>
                          <input 
                            type="file" 
                            accept="image/*"
                            className="form-control mb-3 shadow-none form-control-sm" 
                            onChange={handlePrimaryFileChange} 
                          />
                          {primaryPreviewUrl ? (
                            <div className="position-relative d-inline-block shadow-sm border bg-white rounded" style={{ width: '120px', height: '120px' }}>
                              <img src={primaryPreviewUrl} alt="Primary" className="w-100 h-100 object-fit-cover rounded border" />
                              {/* Chỉ hiện nút Xóa nếu là file mới (chưa phải url từ server) */}
                              {primaryFile && (
                                <BsXCircleFill 
                                  className="position-absolute top-0 end-0 text-danger bg-white rounded-circle fs-5"
                                  style={{ cursor: 'pointer', transform: 'translate(30%, -30%)' }}
                                  onClick={removePrimaryFile} 
                                />
                              )}
                              <span className="position-absolute bottom-0 start-0 badge bg-primary w-100" style={{borderRadius: '0 0 4px 4px'}}>MAIN</span>
                            </div>
                          ) : (
                            <div className="text-muted small py-4">Chưa chọn ảnh đại diện</div>
                          )}
                        </div>
                      </div>

                      {/* 2. ẢNH MÔ TẢ */}
                      <div className="col-md-8">
                         <label className="fw-bold small text-muted mb-2">Ảnh Mô Tả Sản Phẩm (Tùy chọn)</label>
                         <div className="border rounded p-3 bg-light h-100">
                          <input 
                            type="file" 
                            multiple 
                            accept="image/*"
                            className="form-control mb-3 shadow-none form-control-sm" 
                            onChange={handleFileChange} 
                          />
                          
                          <div className="d-flex flex-wrap gap-3">
                            {/* Ảnh mô tả cũ */}
                            {isEditing && existingImages.filter(img => !img.isPrimary).map((img) => (
                              <div key={img.id} className="position-relative shadow-sm border p-1 bg-white rounded" style={{ width: '70px', height: '70px' }}>
                                <img src={`https://localhost:7221/outputs/${img.imageUrl}`} alt="existing" className="w-100 h-100 object-fit-cover rounded border" />
                                <BsXCircleFill 
                                  className="position-absolute top-0 end-0 text-danger bg-white rounded-circle"
                                  style={{ cursor: 'pointer', transform: 'translate(40%, -40%)' }}
                                  onClick={() => handleDeleteExistingImage(img.id)} 
                                />
                              </div>
                            ))}

                            {/* Ảnh mô tả mới */}
                            {previewUrls.map((url, i) => (
                              <div key={i} className="position-relative shadow-sm border p-1 bg-white rounded" style={{ width: '70px', height: '70px' }}>
                                <img src={url} alt="new preview" className="w-100 h-100 object-fit-cover rounded border border-success" />
                                <BsXCircleFill 
                                  className="position-absolute top-0 end-0 text-success bg-white rounded-circle"
                                  style={{ cursor: 'pointer', transform: 'translate(40%, -40%)' }}
                                  onClick={() => removeFile(i)} 
                                />
                                <span className="position-absolute bottom-0 start-0 badge bg-success w-100" style={{fontSize:'8px', borderRadius: '0 0 4px 4px'}}>MỚI</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <label className="fw-bold small text-muted">Mô tả sản phẩm</label>
                    <textarea className="form-control shadow-none" rows="4" value={currentProduct.description} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-light px-4" onClick={() => setIsModalOpen(false)}>Đóng</button>
                <button className="btn btn-primary px-5 fw-bold" onClick={handleSave}>CẬP NHẬT KHO</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;