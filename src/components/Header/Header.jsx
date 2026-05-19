import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Search,
  Heart,
  GeoAlt,
  Person,
  Bag,
  ChevronDown,
} from "react-bootstrap-icons";
import MegaMenu from "./MegaMenu";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";

const PandoraHeader = () => {
  // THAY ĐỔI 1: Quản lý activeIndex để biết đang hover vào mục nào (null là không hover)
  const [activeIndex, setActiveIndex] = useState(null);

  const navItems = [
    { name: "BỘ SƯU TẬP MỚI", path: "/collection" },
    { name: "TRANG SỨC", path: "/jewelry" },
    { name: "VÒNG TAY", path: "/vong-tay" },
    { name: "CHARMS", path: "/charm" },
    { name: "DÂY CHUYỀN", path: "/day-chuyen" },
    { name: "HOA TAI", path: "/hoa-tai" },
    { name: "NHẪN", path: "/nhan" },
  ];

  return (
    <header className="header-container w-100 bg-white">
      {/* 1. Phần Top Bar (Nếu có - giữ nguyên) */}

      {/* 2. Main Header (Logo, Search, Icons) */}
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-4">
            <Link to="/" className="text-decoration-none text-dark">
              <h1
                className="fw-bolder m-0"
                style={{
                  fontFamily: "Times New Roman, serif",
                  letterSpacing: "6px",
                  fontSize: "32px",
                }}
              >
                PANDORA
              </h1>
            </Link>
          </div>
          <div className="col-md-8 d-flex justify-content-end align-items-center">
            <div
              className="position-relative me-4"
              style={{ width: "100%", maxWidth: "300px" }}
            >
              <input
                type="text"
                className="form-control rounded-0 border-dark-subtle pe-5 py-2"
                placeholder="Bạn cần tìm gì?"
              />
              <Search
                size={18}
                className="position-absolute end-0 top-50 translate-middle-y me-3 text-secondary"
              />
            </div>
            <div className="d-flex gap-4 align-items-center text-dark">
              <Heart size={22} />
              <Link to="/StoreLocator" className="text-dark">
                <GeoAlt size={22} />
              </Link>
              <Link to="/useracc" className="text-dark">
                <Person size={24} />
              </Link>
              <div className="position-relative">
                <Link to="/cart" className="text-dark">
                  <Bag size={22} />
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                    style={{ fontSize: "9px", padding: "4px 6px" }}
                  >
                    1
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Thanh Menu Navigation (Đã sửa để hiện MegaMenu cho tất cả) */}
      <nav className="header-nav-border bg-white sticky-top border-0">
        <div className="container position-relative">
          <ul
            className="nav d-flex align-items-center list-unstyled m-0 p-0 text-uppercase"
            style={{ gap: "1.5rem" }}
          >
            {navItems.map((item, index) => (
              <li
                key={index}
                className="nav-item"
                // THAY ĐỔI 2: Cập nhật activeIndex khi hover vào bất kỳ item nào
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link px-0 py-3 d-flex align-items-center ${
                      isActive ? "active-pink" : "text-dark fw-bold"
                    }`
                  }
                  style={{ fontSize: "12px" }}
                  // Khi click thì đóng Menu ngay
                  onClick={() => setActiveIndex(null)}
                >
                  {item.name}
                  <ChevronDown size={12} className="ms-1 text-secondary" />
                </NavLink>

                {/* THAY ĐỔI 3: Kiểm tra activeIndex để hiển thị MegaMenu cho từng cái */}
                {activeIndex === index && <MegaMenu />}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default PandoraHeader;