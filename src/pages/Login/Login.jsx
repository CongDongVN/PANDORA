import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Tab, Tabs } from 'react-bootstrap';
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // 2. Khởi tạo navigate

  // 3. Hàm xử lý khi chọn Tab
  const handleTabSelect = (key) => {
    if (key === 'register') {
      navigate('/register'); // Chuyển sang trang đăng ký
    }
  };

  return (
    <div className="login-page-container py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="login-main-title">TÀI KHOẢN CỦA TÔI</h2>
          <p className="login-subtitle">Đăng nhập ngay để nhận các ưu đãi độc quyền từ Pandora</p>
        </div>

        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            {/* 4. Thêm onSelect vào Tabs */}
            <Tabs 
              defaultActiveKey="login" 
              id="login-register-tabs" 
              className="mb-4 custom-tabs" 
              justify
              onSelect={handleTabSelect} 
            >
              <Tab eventKey="login" title="ĐĂNG NHẬP">
                <div className="auth-card p-4">
                  <Form>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Label className="floating-label">Email *</Form.Label>
                      <Form.Control type="email" required className="custom-input" />
                    </Form.Group>

                    <Form.Group className="mb-2 position-relative">
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

                    <div className="text-end mb-4">
                      <a href="#forgot" className="forgot-link text-dark fw-bold">Quên mật khẩu?</a>
                    </div>

                    <Button variant="dark" className="w-100 login-btn mb-4 py-2 fw-bold">
                      ĐĂNG NHẬP
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
              
              {/* Tab này để trống vì khi bấm vào onSelect sẽ điều hướng đi luôn */}
              <Tab eventKey="register" title="ĐĂNG KÝ"></Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;