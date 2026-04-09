import React, { useState, useRef, useEffect } from 'react';

const SidebarFilter = () => {
  // --- GIỮ NGUYÊN LOGIC ---
  const [openSections, setOpenSections] = useState({
    type: true, material: true, size: true, price: true
  });
  
  const [sortValue, setSortValue] = useState('Sản phẩm nổi bật');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const sortOptions = ['Sản phẩm nổi bật', 'Sản phẩm mới', 'Bán chạy nhất', 'Giá cao nhất', 'Giá thấp nhất'];

  const toggleSection = (sectionName) => {
    setOpenSections((prev) => ({ ...prev, [sectionName]: !prev[sectionName] }));
  };

  const toggleMaterial = (materialCode) => {
    setSelectedMaterials(prev => 
      prev.includes(materialCode) ? prev.filter(item => item !== materialCode) : [...prev, materialCode]
    );
  };

  const toggleSize = (sizeValue) => {
    setSelectedSizes(prev => 
      prev.includes(sizeValue) ? prev.filter(item => item !== sizeValue) : [...prev, sizeValue]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderIcon = (isOpen) => {
    return isOpen ? (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    ) : (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    );
  };

  return (
    /* ĐÃ SỬA: class bọc ngoài khớp với file CSS khổng lồ */
    <div className="sidebar-filter">
      
      {/* 1. LOẠI SẢN PHẨM */}
      <div className="filter-widget">
        <div className="d-flex justify-content-between align-items-center cursor-pointer" onClick={() => toggleSection('type')}>
          <h5 className="filter-widget-title mb-0">Loại sản phẩm</h5>
          {renderIcon(openSections.type)}
        </div>
        
        {openSections.type && (
          <div className="pt-3">
            <div className="filter-checkbox-item">
              <input type="checkbox" id="type-vongtay" />
              <label htmlFor="type-vongtay">Vòng tay</label>
            </div>
          </div>
        )}
      </div>

      {/* 2. CHẤT LIỆU */}
      <div className="filter-widget">
        <div className="d-flex justify-content-between align-items-center cursor-pointer" onClick={() => toggleSection('material')}>
          <h5 className="filter-widget-title mb-0">Chất liệu</h5>
          {renderIcon(openSections.material)}
        </div>
        
        {openSections.material && (
          <div className="pt-3">
            {[
              { id: 'bac', label: 'Bạc' },
              { id: 'vang14k', label: 'Mạ vàng 14k' },
              { id: 'vanghong', label: 'Mạ vàng hồng 14k' },
              { id: 'twotone', label: 'Twotone' }
            ].map((m) => (
              <div key={m.id} className="filter-checkbox-item" onClick={() => toggleMaterial(m.id)}>
                <input 
                    type="checkbox" 
                    checked={selectedMaterials.includes(m.id)} 
                    readOnly 
                />
                <label>{m.label}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. SIZE */}
      <div className="filter-widget">
        <div className="d-flex justify-content-between align-items-center cursor-pointer" onClick={() => toggleSection('size')}>
          <h5 className="filter-widget-title mb-0">Size</h5>
          {renderIcon(openSections.size)}
        </div>
        
        {openSections.size && (
          <div className="pt-3">
             {/* Sử dụng class size-grid đã có trong CSS của bạn */}
            <div className="size-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {['one size', '16', '17', '18', '19', '21', '23', '48', '50', '52', '54', '56', '45', '60'].map((size, index) => (
                <div 
                  key={index}
                  className={`size-btn ${selectedSizes.includes(size) ? 'active' : ''}`}
                  onClick={() => toggleSize(size)}
                  style={{ 
                    border: '1px solid #ddd', 
                    textAlign: 'center', 
                    padding: '5px', 
                    fontSize: '12px', 
                    cursor: 'pointer',
                    backgroundColor: selectedSizes.includes(size) ? '#111' : '#fff',
                    color: selectedSizes.includes(size) ? '#fff' : '#111'
                  }}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. MỨC GIÁ */}
      <div className="filter-widget border-0">
        <div className="d-flex justify-content-between align-items-center cursor-pointer" onClick={() => toggleSection('price')}>
          <h5 className="filter-widget-title mb-0">Mức giá</h5>
          {renderIcon(openSections.price)}
        </div>
        
        {openSections.price && (
          <div className="pt-3">
            {[
              'Dưới 1.000.000₫', '1.000.001₫ - 2.500.000₫', '2.500.001₫ - 5.000.000₫', '5.000.001₫ - 7.000.000₫', 'Trên 7.000.001₫'
            ].map((price, index) => (
              <div className="filter-checkbox-item" key={index}>
                <input type="checkbox" id={`price-${index}`} />
                <label htmlFor={`price-${index}`}>{price}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarFilter;