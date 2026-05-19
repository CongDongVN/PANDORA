import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// 1. Import Bootstrap TRƯỚC để thiết lập khung cơ bản
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Nếu bạn có dùng icon

// 2. Import CSS của dự án SAU để có quyền ưu tiên cao hơn (ghi đè Bootstrap)
import "./index.css";
import "./App.css";

// 3. Import Component chính của ứng dụng
import App from "./App.jsx";

// 4. Tìm phần tử gốc trong file index.html và render ứng dụng
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
