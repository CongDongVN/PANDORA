import React from 'react';

const VideoSection = () => {
  return (
    <section className="video-section mt-5 mb-5">
      <div className="container-fluid px-0"> 
        {/* px-0 để video có thể tràn viền nếu muốn, 
            hoặc giữ px-custom nếu muốn thẳng hàng với bên trên */}
        <div className="video-wrapper" style={{ width: '100%', position: 'relative' }}>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <source src="/assets/video/Vid1.mp4" type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
          
          {/* Lớp phủ chữ nếu bạn muốn (tùy chọn) */}
          <div className="video-overlay text-center" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white'
          }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 'bold' }}>
              BE LOVE. BE PANDORA.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;