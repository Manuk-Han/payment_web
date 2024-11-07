import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axiosInstance from '../../config/axiosInstance';
import '../css/DetailProductDashboard.css';
import LoginModal from "./modal/LoginModal";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import axios from "axios";
import CartModal from "./modal/CartModal";

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
    const [quantity, setQuantity] = useState<number>(1);
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);

    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

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
            navigate(`/payment/${productId}`, {state: {quantity}});
        }
    };

    const handleAddClick = async (productId: number) => {
        if (!productId || !accessToken) {
            setShowLoginModal(true);
            return;
        }

        const formData = new FormData();
        formData.append("productId", productId.toString());
        formData.append("quantity", quantity.toString());

        const response = await axiosInstance.post(
            '/cart/addProduct',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        if(response.status === 200) {
            setShowCartModal(true);
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
                    <p><strong>Price:</strong> {productDetail.price}원</p>
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
            <div className="buy-button">
                <button
                    className="buy"
                    onClick={() => productDetail && handleBuyClick(productDetail.productId)}
                    disabled={!productDetail}
                >
                    Buy
                </button>
                <button
                    className="add"
                    onClick={() => handleAddClick(productDetail.productId)}
                    disabled={!productDetail}
                >
                    Add to Cart
                </button>
            </div>

            <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
            <CartModal show={showCartModal} onClose={() => setShowCartModal(false)} />
        </div>
    );
};

export default DetailProductDashboard;
