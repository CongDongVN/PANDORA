import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 1. NẾU bạn cài Bootstrap qua npm, import nó đầu tiên:
import 'bootstrap/dist/css/bootstrap.min.css'

// 2. Import CSS mặc định của dự án (nếu có)
import './index.css'

// 3. QUAN TRỌNG NHẤT: Import App.css nằm DƯỚI CÙNG 
// Điều này giúp CSS chúng ta tự viết có quyền ưu tiên tuyệt đối đè lên Bootstrap
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)