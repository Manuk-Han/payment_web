import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../config/axiosInstance';
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

const DetailProductDashboard: React.FC<ProductProps> = ({ id }) => {
    const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`/product/detail/${id}`)
            .then(response => {
                setProductDetail(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch product details:", error);
            });
    }, [id]);

    const handleBuyClick = (productId: number) => {
        if (productId) {
            navigate(`/payment/${productId}`);
        }
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
            <button
                className="buy-button"
                onClick={() => productDetail && handleBuyClick(productDetail.productId)}
                disabled={!productDetail}
            >
                Buy
            </button>
        </div>
    );
};

export default DetailProductDashboard;
