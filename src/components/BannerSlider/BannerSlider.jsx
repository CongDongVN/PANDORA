import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerSlider = () => {
  const slides = [
     { id: 1, img: "/assets/img/banner1.png" },

    { id: 2, img: "/assets/img/banner2.jpg" },

    { id: 3, img: "/assets/img/banner3.jpg" },
  ];

  return (
    <div className="banner-container" style={{ 
    width: '100%',            
    position: 'relative',
    overflow: 'hidden'      
}}>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="slide-item" 
              style={{ 
                backgroundImage: `url(${slide.img})`,
                height: '500px', // Tăng nhẹ chiều cao cho sang
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center' // Căn giữa container nội dung
              }}
            >
              {/* --- ĐÂY LÀ PHẦN QUAN TRỌNG: CONTAINER GIỚI HẠN --- */}
              <div style={{ 
                width: '100%',
                // Càng thu nhỏ màn hình (hoặc zoom to), padding-inline càng tăng
                // clamp(min, preferred, max) giúp co giãn linh hoạt
                paddingInline: 'clamp(20px, 10vw, 150px)', 
                maxWidth: '1200px', // Giới hạn chiều rộng cực đại
                margin: '0 auto',
                boxSizing: 'border-box'
              }}>
                <div className="content" style={{ textAlign: 'left' }}>
                  <h2 style={{ 
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)', // Chữ tự nhỏ lại khi màn hình bé
                    fontWeight: 'bold', 
                    color: '#333',
                    textShadow: '1px 1px 2px rgba(255,255,255,0.8)' 
                  }}>
                    {slide.title}
                  </h2>
                
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thanh hồng phía dưới */}
      <div style={{
        backgroundColor: '#ff9ea2',
        color: 'white',
        textAlign: 'center',
        padding: '8px 0',
        fontSize: '14px',
        fontWeight: 'bold',
        letterSpacing: '1px'
      }}>
        I <span style={{color: 'red'}}>❤️</span> VIETNAM
      </div>
    </div>
  );
};

export default BannerSlider;