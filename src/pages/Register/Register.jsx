import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Tab, Tabs, Alert, Spinner } from 'react-bootstrap';
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 1. Khởi tạo state lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    address: '',
    password: ''
  });

  // Khởi tạo state thông báo
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hàm cập nhật state khi người dùng gõ vào input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTabSelect = (key) => {
    if (key === 'login') {
      navigate('/login');
    }
  };

  // 2. Hàm xử lý Đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    // Map dữ liệu form khớp chính xác với DTO của Backend C#
    const payload = {
      FristName: formData.firstName, // Khớp với lỗi chính tả 'FristName' trong C#
      LastName: formData.lastName,
      Phone: formData.phone,
      Email: formData.email,
      Address: formData.address,
      passwordHash: formData.password // C# mong đợi biến tên là 'passwordHash'
    };

    try {
      // Đổi 'xxxx' thành Port backend C# của bạn đang chạy
      const response = await fetch('https://localhost:7221/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Backend đôi khi trả về text lỗi thẳng (VD: "Email đã tồn tại") thay vì JSON
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
        setSuccessMsg(data.message || 'Đăng ký thành công!');
        
        // Tự động chuyển về trang đăng nhập sau 2 giây
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Xử lý lỗi từ backend (400 BadRequest)
        setErrorMsg(data.message || data || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
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
              <Tab eventKey="login" title="ĐĂNG NHẬP"></Tab>

              <Tab eventKey="register" title="ĐĂNG KÝ">
                <div className="auth-card p-4">
                  {/* 3. Hiển thị thông báo */}
                  {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                  {successMsg && <Alert variant="success">{successMsg}</Alert>}

                  {/* 4. Đưa hàm xử lý vào form */}
                  <Form onSubmit={handleRegister}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3 position-relative">
                          <Form.Label className="floating-label">Họ</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="custom-input" 
                            disabled={isLoading}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3 position-relative">
                          <Form.Label className="floating-label">Tên</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="custom-input" 
                            disabled={isLoading}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3 position-relative">
                      <Form.Label className="floating-label">Số điện thoại</Form.Label>
                      <Form.Control 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="custom-input" 
                        disabled={isLoading}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 position-relative">
                      <Form.Label className="floating-label">Email *</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email"
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        className="custom-input" 
                        disabled={isLoading}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 position-relative">
                      <Form.Label className="floating-label">Địa chỉ</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="custom-input" 
                        disabled={isLoading}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4 position-relative">
                      <Form.Label className="floating-label">Mật khẩu *</Form.Label>
                      <div className="password-wrapper">
                        <Form.Control 
                          type={showPassword ? "text" : "password"} 
                          name="password"
                          required 
                          value={formData.password}
                          onChange={handleChange}
                          className="custom-input" 
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
                        "ĐĂNG KÝ TÀI KHOẢN"
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
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;