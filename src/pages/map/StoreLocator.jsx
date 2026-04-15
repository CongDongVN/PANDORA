import React, { useState } from 'react';
import './storelocator.css';

const StoreLocator = () => {
    // 1. Tạo State để lưu trữ Tỉnh/Thành phố đang được chọn
    const [selectedProvince, setSelectedProvince] = useState('');

    // 2. Dữ liệu: Bản đồ (Mapping) giữa Tỉnh và các Quận/Huyện
    const locationData = {
        hanoi: [
            { id: 'hn_badinh', name: 'Ba Đình' },
            { id: 'hn_hoankiem', name: 'Hoàn Kiếm' },
            { id: 'hn_tayho', name: 'Tây Hồ' },
            { id: 'hn_haibatrung', name: 'Hai Bà Trưng' },
            { id: 'hn_caugiay', name: 'Cầu Giấy' },
            { id: 'hn_dongda', name: 'Đống Đa' }
        ],
        hcm: [
            { id: 'hcm_q1', name: 'Quận 1' },
            { id: 'hcm_q3', name: 'Quận 3' },
            { id: 'hcm_q7', name: 'Quận 7' },
            { id: 'hcm_tanphu', name: 'Tân Phú' },
            { id: 'hcm_thuduc', name: 'TP. Thủ Đức' },
            { id: 'hcm_binhthanh', name: 'Bình Thạnh' }
        ],
        danang: [
            { id: 'dn_haichau', name: 'Hải Châu' },
            { id: 'dn_sontra', name: 'Sơn Trà' },
            { id: 'dn_thanhkhe', name: 'Thanh Khê' },
            { id: 'dn_nguhanhson', name: 'Ngũ Hành Sơn' }
        ],
        khanhhoa: [
            { id: 'kh_nhatrang', name: 'Nha Trang' },
            { id: 'kh_camranh', name: 'Cam Ranh' },
            { id: 'kh_ninhhoa', name: 'Ninh Hòa' },
            { id: 'kh_dienkhanh', name: 'Diên Khánh' }
        ],
        cantho: [
            { id: 'ct_ninhkieu', name: 'Ninh Kiều' },
            { id: 'ct_cairang', name: 'Cái Răng' },
            { id: 'ct_binhthuy', name: 'Bình Thủy' },
            { id: 'ct_omon', name: 'Ô Môn' }
        ]
    };

    // Dữ liệu cửa hàng (Có thể giữ nguyên như cũ)
    const stores = [
        {
            id: 1,
            name: 'Pandora Vincom Bà Triệu',
            hours: 'T2-CN | 09:00 - 22:00',
            phone: '(024) 7108 7789',
            address: 'L01-11, tầng L1, Vincom Centre Bà Triệu, 191 Bà Triệu, Phường Hai Bà Trưng, Hà Nội'
        },
        {
            id: 2,
            name: 'Pandora Lotte Tây Hồ',
            hours: 'T2-CN | 09:00 - 22:00',
            phone: '(024) 3938 7840',
            address: 'Lô 144, Tầng 1, Lotte Tây Hồ, 272 Võ Chí Công, Phường Tây Hồ, Hà Nội'
        },
        {
            id: 3,
            name: 'Pandora SC Vivocity',
            hours: 'T2-CN | 10:00 - 22:00',
            phone: '(028) 3620 5555',
            address: 'Tầng 1, SC VivoCity, 1058 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh'
        },
        {
            id: 4,
            name: 'Pandora Aeonmall Tân Phú',
            hours: 'T2-CN | 09:00 - 22:00',
            phone: '(028) 3535 4164',
            address: 'Lô G18, Tầng trệt, Khu thương mại Aeonmall Tân Phú Celadon, số 30 đường Tân Thắng, Tân Phú, TP.HCM'
        }
    ];

    // Hàm xử lý sự kiện khi người dùng đổi Tỉnh/Thành phố
    const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
    };

    return (
        <div className="container py-5">
            <div className="row g-4 locator-row">

                <div className="col-12 col-lg-4 d-flex flex-column h-100">

                    <div className="mb-4">
                        <div className="mb-3">
                            <label className="form-label text-muted small fw-bold mb-1" style={{ fontSize: '12px' }}>CHỌN TỈNH/THÀNH PHỐ</label>
                            <select
                                className="form-select shadow-sm border-light custom-select"
                                value={selectedProvince} // Gán giá trị bằng state
                                onChange={handleProvinceChange} // Bắt sự kiện khi thay đổi
                            >
                                <option value="">Chọn tỉnh thành...</option>
                                <option value="hanoi">Hà Nội</option>
                                <option value="hcm">TP. Hồ Chí Minh</option>
                                <option value="danang">Đà Nẵng</option>
                                <option value="khanhhoa">Khánh Hòa</option>
                                <option value="cantho">Cần Thơ</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label text-muted small fw-bold mb-1" style={{ fontSize: '12px' }}>CHỌN QUẬN/HUYỆN</label>
                            <select
                                className="form-select shadow-sm border-light custom-select"
                                disabled={!selectedProvince} // Nếu chưa chọn tỉnh thì khóa ô này lại
                            >
                                <option value="">Chọn Quận/Huyện...</option>

                                {/* 3. Logic hiển thị: Nếu đã chọn tỉnh, lấy danh sách quận huyện tương ứng ra để map() thành các thẻ option */}
                                {selectedProvince && locationData[selectedProvince].map((district) => (
                                    <option key={district.id} value={district.id}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <h5 className="fw-bold mb-3 text-dark">Cửa hàng mở cửa</h5>

                    <div className="store-list-box flex-grow-1 p-3">
                        {stores.map((store) => (
                            <div key={store.id} className="mb-4">
                                <h6 className="fw-bold mb-2 text-dark" style={{ fontSize: '15px' }}>
                                    <span className="me-2 text-danger">📍</span>
                                    {store.name}
                                </h6>
                                <div className="mb-2">
                                    <span className="badge bg-danger rounded-1 px-2 py-1" style={{ fontSize: '11px' }}>
                                        {store.hours}
                                    </span>
                                </div>
                                <p className="small text-dark mb-1" style={{ lineHeight: '1.6', fontSize: '13px' }}>
                                    <strong>Hotline:</strong> {store.phone}<br />
                                    {store.address}
                                </p>
                                <a href="#" className="text-dark fw-medium text-decoration-none small direction-link" style={{ fontSize: '13px' }}>
                                    → Chỉ đường
                                </a>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="col-12 col-lg-8 h-100">
                    <div className="map-wrapper shadow-sm border border-light h-100">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2785089311684!2d106.6974261148008!3d10.789965292312674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3542a63751%3A0xe543632ab30dc0c!2sDiamond%20Plaza!5e0!3m2!1sen!2s!4v1655866000000!5m2!1sen!2s"
                            className="w-100 h-100 border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StoreLocator;