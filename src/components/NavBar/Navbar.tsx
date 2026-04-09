import React, { useState } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import MegaMenu from '../Header/MegaMenu'; // Import file vừa tạo ở trên

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="border-bottom bg-white">
      <div className="container">
        <ul className="nav d-flex list-unstyled m-0 p-0" style={{ gap: '2rem' }}>
          
          {/* Thẻ li chứa sự kiện Hover */}
          <li 
            className="nav-item"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <a href="#" className="nav-link px-0 py-3 text-dark fw-bold small d-flex align-items-center">
              BỘ SƯU TẬP MỚI <ChevronDown size={12} className="ms-1" />
            </a>

            {/* Nếu showMenu là true thì hiện Component MegaMenu */}
            {showMenu && <MegaMenu />}
          </li>

          <li className="nav-item">
            <a href="#" className="nav-link px-0 py-3 text-dark fw-bold small">TRANG SỨC</a>
          </li>
          {/* ... các mục khác */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;