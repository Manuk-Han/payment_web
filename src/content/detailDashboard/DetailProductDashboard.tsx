import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../css/DetailProductDashboard.css';

interface ProductProps {
    id: number;
}

interface ProductDetail {
    productId: number;
    name: string;
    price: number;
    stockQuantity: number;
}

const DetailProductDashboard: React.FC<ProductProps> = ({id}) => {
    const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/product/detail/' + id)
            .then(response => response.json())
            .then(data => {
                setProductDetail(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const handleBuyClick = (productId) => {
        navigate('/payment/' + productId);
    };

    return (
        <div className="product-dashboard">
            <h2 className="product-title">Product Detail</h2>
            {productDetail ? (
                <div className="product-details">
                    <p><strong>Name:</strong> {productDetail.name}</p>
                    <p><strong>Price:</strong> ${productDetail.price.toFixed(2)}</p>
                    <p><strong>Stock Remaining:</strong> {productDetail.stockQuantity} items</p>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
            <button className="buy-button" onClick={() => handleBuyClick(productDetail.productId)}>Buy</button>
        </div>
    );
};

export default DetailProductDashboard;
