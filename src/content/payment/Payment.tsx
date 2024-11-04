import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import Header from '../../home/Header';
import Footer from '../../home/Footer';
import '../css/Payment.css';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import LoginModal from "./modal/LoginModal";

interface Product {
    id: number;
    name: string;
    price: number;
    stockQuantity: number;
}

const Payment: React.FC = () => {
    const {productId} = useParams<{ productId: string }>();
    const location = useLocation();
    const initialQuantity = location.state?.quantity || 1;
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(initialQuantity);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);

    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
        if (productId) {
            fetchProductInfo(Number(productId));
        }
    }, [productId]);

    const fetchProductInfo = async (productId: number) => {
        try {
            const response = await axios.get<Product>(`/product/detail/${productId}`);
            setProduct(response.data);
            setTotalPrice(response.data.price * quantity);
        } catch (error) {
            console.error("제품 정보 요청 중 에러 발생:", error);
        }
    };

    const handleKakaoPayment = async () => {
        try {
            if (!accessToken) {
                setShowModal(true);
                return;
            }

            const response = await axios.post(
                '/payment/kakaoPayReady',
                {
                    quantity: quantity,
                    productId: Number(productId),
                },
                {
                    headers: {
                        Authorization: `${accessToken}`,
                    },
                }
            );

            console.log("결제 준비 중 응답:", response.data);

            const {redirectUrl, tid} = response.data;
            window.localStorage.setItem("tid", tid);
            window.location.href = redirectUrl;

        } catch (error) {
            console.error("결제 준비 중 에러 발생:", error);
        }
    };


    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.min(Number(e.target.value), product?.stockQuantity || 1);
        setQuantity(newQuantity);
        if (product) {
            setTotalPrice(product.price * newQuantity);
        }
    };

    return (
        <div className="payment-page">
            <div className="payment-container">
                <div className="payment-info">
                    <label htmlFor="quantity">상품 개수:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        min="1"
                        max={product ? product.stockQuantity : 1}
                        onChange={handleQuantityChange}
                    />
                </div>
                {product && (
                    <div className="payment-summary">
                        <p>상품명: {product.name}</p>
                        <p>단가: {product.price.toLocaleString()}원</p>
                        <p>총 결제 금액: {totalPrice.toLocaleString()}원</p>
                    </div>
                )}
                <div className="payment-action">
                    <div className="kakaoPay" onClick={handleKakaoPayment}>
                        카카오페이
                    </div>
                    <div className="normal" onClick={handleKakaoPayment}>
                        결제 요청
                    </div>
                </div>
            </div>

            <LoginModal show={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}

export default Payment;
