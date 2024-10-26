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
    const [quantity, setQuantity] = useState<number>(1);
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
            navigate(`/payment/${productId}`, { state: { quantity } });
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 1 && value <= (productDetail?.stockQuantity || 1)) {
            setQuantity(value);
        }
    };

    const increaseQuantity = () => {
        if (quantity < (productDetail?.stockQuantity || 1)) {
            setQuantity(prev => prev + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
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
                    <div className="quantity-control">
                        <label htmlFor="quantity">Quantity:</label>
                        <div className="quantity-input">
                            <button onClick={decreaseQuantity}>-</button>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                min="1"
                                max={productDetail.stockQuantity}
                                onChange={handleQuantityChange}
                            />
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                    </div>
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
