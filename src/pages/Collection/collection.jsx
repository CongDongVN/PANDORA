import React, { useEffect, useState } from 'react';
import { products } from '../../data/categoriesData'; // Giả sử đây là file chứa toàn bộ data
import ProductList from '../Product/ProductList';
import SidebarFilter from '../Product/SidebarFilter';

const Collection = () => {
    // 1. Khởi tạo state dữ liệu ban đầu lấy tất cả 5 loại sản phẩm
    const [displayProducts, setDisplayProducts] = useState(products);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="collection-page container mt-5">
            <h2 className="text-center text-uppercase fw-bold mb-5">Tất cả bộ sưu tập</h2>
            <div className="row">
                {/* 2. Hiển thị Sidebar lọc bên trái */}
                <div className="col-md-3">
                    <SidebarFilter allProducts={products} setDisplayProducts={setDisplayProducts} />
                </div>
                {/* 3. Hiển thị danh sách sản phẩm bên phải */}
                <div className="col-md-9">
                    <ProductList data={displayProducts} />
                </div>
            </div>
        </div>
    );
};

export default Collection;