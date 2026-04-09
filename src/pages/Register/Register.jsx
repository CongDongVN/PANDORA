import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Tab, Tabs } from 'react-bootstrap';
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Hàm xử lý chuyển trang khi click vào Tab
  const handleTabSelect = (key) => {
    if (key === 'login') {
      navigate('/login');
    }
  };

  return (
    <div className="login-page-container py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="login-main-title">TÀI KHOẢN CỦA TÔI</h2>
          <p className="login-subtitle">Đăng ký ngay để nhận các ưu đãi độc quyền từ Pandora</p>
        </div>

        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Tabs 
              activeKey="register" 
              id="login-register-tabs" 
              className="mb-4 custom-tabs" 
              justify
              onSelect={handleTabSelect}
            >
              {/* Tab Đăng nhập để trống để Navigate */}
              <Tab eventKey="login" title="ĐĂNG NHẬP"></Tab>

              <Tab eventKey="register" title="ĐĂNG KÝ">
                <div className="auth-card p-4">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3 position-relative">
                          <Form.Label className="floating-label">Họ</Form.Label>
                          <Form.Control type="text" className="custom-input" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3 position-relative">
                          <Form.Label className="floating-label">Tên</Form.Label>
                          <Form.Control type="text" className="custom-input" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3 position-relative">
                      <Form.Label className="floating-label">Số điện thoại</Form.Label>
                      <Form.Control type="tel" className="custom-input" />
                    </Form.Group>

                    <Form.Group className="mb-3 position-relative">
                      <Form.Label className="floating-label">Email *</Form.Label>
                      <Form.Control type="email" required className="custom-input" />
                    </Form.Group>

                    <Form.Group className="mb-3 position-relative">
                      <Form.Label className="floating-label">Địa chỉ</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="" 
                        className="custom-input" 
                      />
                    </Form.Group>

                    <Form.Group className="mb-4 position-relative">
                      <Form.Label className="floating-label">Mật khẩu *</Form.Label>
                      <div className="password-wrapper">
                        <Form.Control 
                          type={showPassword ? "text" : "password"} 
                          required 
                          className="custom-input" 
                        />
                        <span className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </Form.Group>

                    <Button variant="dark" className="w-100 login-btn mb-4 py-2 fw-bold">
                      ĐĂNG KÝ TÀI KHOẢN
                    </Button>

                    <div className="text-center mb-4 divider-text">
                      <span>Hoặc</span>
                    </div>

                    <Button className="w-100 google-btn mb-3 py-2 d-flex align-items-center justify-content-center">
                      <FaGoogle className="me-2 text-primary" /> ĐĂNG NHẬP GOOGLE
                    </Button>

                    <Button className="w-100 facebook-btn py-2 d-flex align-items-center justify-content-center text-white">
                      <FaFacebook className="me-2" /> ĐĂNG NHẬP FACEBOOK
                    </Button>
                  </Form>
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;