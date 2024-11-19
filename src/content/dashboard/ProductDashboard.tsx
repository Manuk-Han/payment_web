import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

interface ProductDashboardProps {
    onGoToPayment?: (id: number, qty: number) => void;
}

interface Product {
    productId: number;
    name: string;
}

const ProductDashboard: React.FC<ProductDashboardProps> = ({ onGoToPayment }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    useEffect(() => {
        fetch('http://localhost:8080/product/list')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="product-panel">
            <h1>Product List</h1>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product.productId} className="product-item" onClick={() => handleProductClick(product.productId)}>
                        <div>
                            {product.name}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDashboard;
