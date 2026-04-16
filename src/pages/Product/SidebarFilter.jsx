import React, { useState, useRef, useEffect } from 'react';

const SidebarFilter = () => {
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

  // Icon Dấu Cọng (+) khi đóng, Dấu Trừ (-) khi mở
  const renderIcon = (isOpen) => {
    return isOpen ? (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    ) : (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    );
  };

  return (
    <div className="sidebar-filter-wrapper">
      
      {/* 0. KHU VỰC SẮP XẾP (SORT) - Giống ảnh mẫu */}
      <div className="sort-container" ref={sortRef} onClick={() => setIsSortOpen(!isSortOpen)}>
        <span className="sort-label">Sắp xếp</span>
        <div className="sort-value">
          {sortValue}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        {/* Dropdown menu (ẩn/hiện) */}
        {isSortOpen && (
          <div className="sort-dropdown">
            {sortOptions.map((opt, idx) => (
              <div key={idx} className="sort-option-item" onClick={() => setSortValue(opt)}>
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 1. LOẠI SẢN PHẨM */}
      <div className="filter-widget">
        <div className="filter-widget-header" onClick={() => toggleSection('type')}>
          <h5 className="filter-widget-title">Loại sản phẩm</h5>
          {renderIcon(openSections.type)}
        </div>
        
        {openSections.type && (
          <div className="filter-widget-content">
            <div className="filter-checkbox-item">
              <input type="checkbox" id="type-vongtay" />
              <label htmlFor="type-vongtay">Vòng tay</label>
            </div>
          </div>
        )}
      </div>

      {/* 2. CHẤT LIỆU (Có chấm màu) */}
      <div className="filter-widget">
        <div className="filter-widget-header" onClick={() => toggleSection('material')}>
          <h5 className="filter-widget-title">Chất liệu</h5>
          {renderIcon(openSections.material)}
        </div>
        
        {openSections.material && (
          <div className="filter-widget-content material-list">
            {[
              { id: 'bac', label: 'Bạc', colorClass: 'bg-silver' },
              { id: 'vang14k', label: 'Mạ vàng 14k', colorClass: 'bg-gold' },
              { id: 'vanghong', label: 'Mạ vàng hồng 14k', colorClass: 'bg-rosegold' }
            ].map((m) => (
              <div key={m.id} className="material-item" onClick={() => toggleMaterial(m.id)}>
                <span className={`material-dot ${m.colorClass} ${selectedMaterials.includes(m.id) ? 'active' : ''}`}></span>
                <label className={selectedMaterials.includes(m.id) ? 'fw-bold' : ''}>{m.label}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. SIZE (Lưới 5 cột) */}
      <div className="filter-widget">
        <div className="filter-widget-header" onClick={() => toggleSection('size')}>
          <h5 className="filter-widget-title">Size</h5>
          {renderIcon(openSections.size)}
        </div>
        
        {openSections.size && (
          <div className="filter-widget-content">
            <div className="size-grid">
              {['one size', '16', '17', '18', '19', '21', '23', '45', '48', '50', '52', '54', '46', '58', '60'].map((size, index) => (
                <div 
                  key={index}
                  className={`size-btn ${selectedSizes.includes(size) ? 'active' : ''}`}
                  onClick={() => toggleSize(size)}
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
        <div className="filter-widget-header" onClick={() => toggleSection('price')}>
          <h5 className="filter-widget-title">Mức giá</h5>
          {renderIcon(openSections.price)}
        </div>
        
        {openSections.price && (
          <div className="filter-widget-content">
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