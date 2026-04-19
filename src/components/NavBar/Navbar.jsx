import React, { useState } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import MegaMenu from '../Header/MegaMenu';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const mainLinks = [
    { id: 1, name: "BỘ SƯU TẬP MỚI", hasMega: true },
    { id: 2, name: "TRANG SỨC", hasMega: true },
    { id: 3, name: "VÒNG TAY", hasMega: true },
    { id: 4, name: "CHARMS", hasMega: true },
    { id: 5, name: "NHẪN", hasMega: true },
    { id: 6, name: "DÂY CHUYỀN", hasMega: true },
  ];

  return (
    <nav className="border-bottom bg-white header-nav-border">
      <div className="container">
        <ul className="nav d-flex list-unstyled m-0 p-0" style={{ gap: '2rem', position: 'relative' }}>
          {mainLinks.map((link) => (
            <li
              key={link.id}
              className="nav-item"
              onMouseEnter={() => setActiveMenu(link.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <a href="#" className="nav-link px-0 py-3 text-dark fw-bold small d-flex align-items-center">
                {link.name}
                {link.hasMega && <ChevronDown size={10} className="ms-1" />}
              </a>

              {/* Hiện MegaMenu khi activeMenu khớp với id */}
              {activeMenu === link.id && <MegaMenu />}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;