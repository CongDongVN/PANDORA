import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Cart from './pages/shoppingcart/cart.jsx'
import UserAccount from './pages/detailuser/useracc.jsx';
import AdminDashboard from './pages/admin/dasdboard.jsx'
import StoreLocator from './pages/map/StoreLocator.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Thêm các công cụ từ thư viện react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    // Bọc toàn bộ ứng dụng bằng BrowserRouter
    <BrowserRouter>
      <div className="App">
        
        <Routes>
          
          {/* đường dẫn mở component AdminDashboard */}
          <Route path="/dasdboard" element={<AdminDashboard />} />
          
          {/* đường dẫn mở component UserAccount */}
          <Route path="/useracc" element={<UserAccount />} />
          
          {/* đường dẫn mở component Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* đường dẫn mở component map */}
          <Route path="/StoreLocator" element={<StoreLocator />} />

          {/*Nếu người dùng chỉ gõ localhost:5173 (không có đuôi), sẽ tự động chuyển hướng về /useracc */}
          <Route path="/" element={<Navigate to="/useracc" replace />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;