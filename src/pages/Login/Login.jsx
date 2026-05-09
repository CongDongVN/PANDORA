import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Tab, Tabs, Alert, Spinner } from 'react-bootstrap';
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 1. Khởi tạo state cho Form và thông báo
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabSelect = (key) => {
    if (key === 'register') {
      navigate('/register');
    }
  };

  // 2. Hàm xử lý gọi API Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn trang bị reload khi submit form
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      // LƯU Ý: Thay đổi URL domain/port cho khớp với Backend C# của bạn đang chạy (ví dụ: https://localhost:7123)
      const response = await fetch('https://localhost:7221/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Nếu HTTP status là 200 (Thành công)
        setSuccessMsg(data.message || 'Đăng nhập thành công!');
        
        // Lưu thông tin user vào localStorage (để dùng cho các trang khác)
        localStorage.setItem('user', JSON.stringify(data));

        // Đợi 1.5 giây để người dùng đọc thông báo rồi chuyển hướng sang trang chủ
        setTimeout(() => {
          navigate('/'); // Chuyển đến trang chủ hoặc trang dashboard
        }, 1500);

      } else {
        // Nếu HTTP status lỗi (400, 500...)
        setErrorMsg(data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      setErrorMsg('Lỗi kết nối đến máy chủ. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
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
            <Tabs 
              defaultActiveKey="login" 
              id="login-register-tabs" 
              className="mb-4 custom-tabs" 
              justify
              onSelect={handleTabSelect} 
            >
              <Tab eventKey="login" title="ĐĂNG NHẬP">
                <div className="auth-card p-4">
                  {/* 3. Hiển thị thông báo Lỗi hoặc Thành công */}
                  {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                  {successMsg && <Alert variant="success">{successMsg}</Alert>}

                  {/* 4. Thêm onSubmit vào Form */}
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Label className="floating-label">Email *</Form.Label>
                      <Form.Control 
                        type="email" 
                        required 
                        className="custom-input" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Cập nhật state email
                        disabled={isLoading}
                      />
                    </Form.Group>

                    <Form.Group className="mb-2 position-relative">
                      <Form.Label className="floating-label">Mật khẩu *</Form.Label>
                      <div className="password-wrapper">
                        <Form.Control 
                          type={showPassword ? "text" : "password"} 
                          required 
                          className="custom-input" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} // Cập nhật state password
                          disabled={isLoading}
                        />
                        <span 
                          className="password-icon" 
                          onClick={() => !isLoading && setShowPassword(!showPassword)}
                          style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </Form.Group>

                    <div className="text-end mb-4">
                      <a href="#forgot" className="forgot-link text-dark fw-bold">Quên mật khẩu?</a>
                    </div>

                    {/* 5. Đổi type button thành submit và xử lý Loading */}
                    <Button 
                      variant="dark" 
                      type="submit" 
                      className="w-100 login-btn mb-4 py-2 fw-bold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                          ĐANG XỬ LÝ...
                        </>
                      ) : (
                        "ĐĂNG NHẬP"
                      )}
                    </Button>

                    <div className="text-center mb-4 divider-text">
                      <span>Hoặc</span>
                    </div>

                    <Button 
                      variant="outline-secondary"
                      className="w-100 google-btn mb-3 py-2 d-flex align-items-center justify-content-center"
                      disabled={isLoading}
                    >
                      <FaGoogle className="me-2 text-primary" /> ĐĂNG NHẬP GOOGLE
                    </Button>

                    <Button 
                      variant="primary"
                      className="w-100 facebook-btn py-2 d-flex align-items-center justify-content-center text-white"
                      disabled={isLoading}
                    >
                      <FaFacebook className="me-2" /> ĐĂNG NHẬP FACEBOOK
                    </Button>
                  </Form>
                </div>
              </Tab>
              
              <Tab eventKey="register" title="ĐĂNG KÝ"></Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;