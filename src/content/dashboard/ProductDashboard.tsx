import React from 'react';
import {useNavigate} from "react-router-dom";

const ProductDashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate('/product/1')
    }

    return (
        <div className="product-panel">
            <ul className="product-list">
                <li className="product-item" onClick={handleProductClick}>🌟 Product 1: High-end Smartphone</li>
                <li className="product-item" onClick={handleProductClick}>💻 Product 2: Gaming Laptop</li>
                <li className="product-item" onClick={handleProductClick}>🎧 Product 3: Wireless Headphones</li>
                <li className="product-item" onClick={handleProductClick}>📷 Product 4: Digital Camera</li>
            </ul>
        </div>
    );
};

export default ProductDashboard;
