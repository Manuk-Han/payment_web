import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import Header from '../../home/Header';
import Footer from '../../home/Footer';
import '../css/Payment.css';

interface PayUrl {
    next_redirect_pc_url: string;
    tid: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    stockQuantity: number;
}

const Payment: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const location = useLocation();
    const initialQuantity = location.state?.quantity || 1;
    const [payUrl, setPayUrl] = useState<string | null>(null);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(initialQuantity); // initialQuantity를 초기값으로 설정
    const [totalPrice, setTotalPrice] = useState<number>(0);

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

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem("Authorization");
            console.log(token)

            const response = await axios.post(
                '/payment/kakaoPayReady',
                {
                    quantity: quantity,
                    productId: Number(productId),
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const { next_redirect_pc_url, tid } = response.data;

            window.localStorage.setItem("tid", tid);
            setPayUrl(next_redirect_pc_url);

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
            <Header />
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
                    <button onClick={handlePayment}>결제 요청</button>
                    {payUrl && (
                        <a href={payUrl} target="_blank" rel="noopener noreferrer">
                            결제 페이지로 이동
                        </a>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Payment;
