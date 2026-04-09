import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const footerData = [
    {
      title: 'Khám phá',
      links: ['Charms', 'Vòng tay', 'Dây chuyền', 'Hoa tai', 'Nhẫn', 'Combo'],
    },
    {
      title: 'Chăm sóc khách hàng',
      links: [
        'Câu hỏi thường gặp', 'Chính sách bảo mật', 'Chính sách thanh toán',
        'Chính sách giao nhận', 'Chính sách đổi hàng', 'Chính sách thành viên',
        'Hướng dẫn làm sạch trang sức', 'Hướng dẫn tạo tài khoản login',
        'Hướng dẫn bảo dưỡng trang sức', 'Hướng dẫn đo size trang sức'
      ],
    },
    {
      title: 'Dịch vụ giao hàng',
      links: ['Giao hàng tiết kiệm', 'Ahamove', 'Kiểm tra đơn hàng'],
    },
    {
      title: 'Hệ thống cửa hàng',
      links: ['Cửa hàng toàn quốc'],
    },
    {
      title: 'Về chúng tôi',
      links: [
        'Về Pandora', 'Câu chuyện Pandora', 'Về Tập Đoàn Norbreeze',
        'Tuyển dụng', 'Liên hệ', 'Cửa hàng toàn quốc', 'Blogs'
      ],
    },
  ];

  return (
    <footer className="footer-container pt-5 pb-3">
      <Container>
        {/* Phần danh mục link */}
        <Row className="mb-5">
          {footerData.map((section, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={true} className="mb-4">
              <h6 className="footer-title">{section.title}</h6>
              <ul className="list-unstyled footer-list">
                {section.links.map((link, idx) => (
                  <li key={idx} className="mb-2">
                    <a href={`#${link}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>

        <hr className="footer-divider" />

        {/* Phần bản quyền và Social */}
        <Row className="align-items-center pt-3">
          <Col md={8} className="d-flex align-items-center flex-wrap">
            <span className="copyright-text me-3">
              © Pandora Jewelry, LLC. All rights reserved.
            </span>
            <img 
              src="https://cdn.pando.ra/static/images/logo-da-thong-bao-bo-cong-thuong.png" // Thay bằng link ảnh thật của bạn
              alt="Đã thông báo bộ công thương"
              className="bct-logo"
              style={{ height: '35px' }}
            />
          </Col>
          <Col md={4} className="text-md-end text-start mt-3 mt-md-0">
            <a href="#facebook" className="social-icon me-3"><FaFacebookF /></a>
            <a href="#instagram" className="social-icon"><FaInstagram /></a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;