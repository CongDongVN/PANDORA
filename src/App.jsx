import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Cart from './pages/shoppingcart/cart.jsx'
import UserAccount from './pages/detailuser/useracc.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Thêm các công cụ từ thư viện react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    // Bọc toàn bộ ứng dụng bằng BrowserRouter
    <BrowserRouter>
      <div className="App">
        
        {/* Routes đóng vai trò như một cái công tắc, sẽ chuyển đổi hiển thị dựa vào URL */}
        <Routes>
          
          {/* Định nghĩa đường dẫn mở component UserAccount */}
          <Route path="/useracc" element={<UserAccount />} />
          
          {/* Định nghĩa đường dẫn mở component Cart */}
          <Route path="/cart" element={<Cart />} />

          {/*Nếu người dùng chỉ gõ localhost:5173 (không có đuôi), sẽ tự động chuyển hướng về /useracc */}
          <Route path="/" element={<Navigate to="/useracc" replace />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;