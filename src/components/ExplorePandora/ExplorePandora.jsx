import React from 'react';

const ExplorePandora = () => {
  const exploreData = [
    {
      id: 1,
      image: "/assets/img/Trangsucnangtam.png",
      title: "Trang sức nâng tầm",
      linkText: "MUA NGAY"
    },
    {
      id: 2,
      image: "/assets/img/Chuanguthanhlich.png",
      title: "Chuẩn gu thanh lịch",
      linkText: "XEM NGAY"
    },
    {
      id: 3,
      image: "/assets/img/Thayloiyeuthuong.png",
      title: "Thay lời yêu thương",
      linkText: "XEM NGAY"
    },
    {
      id: 4,
      image: "/assets/img/Manhnhonhiemmau.png",
      title: "Mảnh nhớ nhiệm màu",
      linkText: "XEM NGAY"
    }
  ];

  return (
    <div className="container-fluid px-5 pandora-container my-5">
      {/* Header Section */}
      <div className="brand-header text-center mb-4">
        <p className="kham-pha">KHÁM PHÁ</p>
        <h1 className="brand-logo">PANDORA</h1>
      </div>

      {/* Grid Section */}
      <div className="row">
        {/* ĐỔI TẠI ĐÂY: exploreData thay vì categories */}
        {exploreData.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="category-card">
              <img 
                src={item.image} 
                alt={item.title} 
                className="img-fluid w-100" 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Pandora'; }}
              />
              <h3 className="category-title">{item.title}</h3>
              <a href="#" className="category-link">
                {item.linkText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePandora;