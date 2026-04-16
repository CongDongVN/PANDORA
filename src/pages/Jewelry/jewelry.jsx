import React, { useEffect, useState } from 'react';
import { products } from '../../data/categoriesData';
import ProductList from '../Product/ProductList';
import SidebarFilter from '../Product/SidebarFilter';

const Jewelry = () => {
    const [displayProducts, setDisplayProducts] = useState(products);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="jewelry-page container mt-4">
            <h2 className="text-center text-uppercase fw-bold mb-4">Trang sức cao cấp</h2>
            <div className="row">
                <div className="col-md-3">
                    <SidebarFilter allProducts={products} setDisplayProducts={setDisplayProducts} />
                </div>
                <div className="col-md-9">
                    {/* Component này sử dụng ProductCard, nhấn vào sẽ chuyển link đến /product/:id */}
                    <ProductList data={displayProducts} />
                </div>
            </div>
        </div>
    );
};

export default Jewelry;