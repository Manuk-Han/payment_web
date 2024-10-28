import React, { useState, useEffect } from "react";
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
}

interface PaymentProps {
    productId: number | null;
    quantity: number;
}

const Payment: React.FC<PaymentProps> = ({ productId, quantity }) => {
    const [payUrl, setPayUrl] = useState<string | null>(null);
    const [product, setProduct] = useState<Product | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        if (productId) {
            fetchProductInfo(productId, quantity);
        }
    }, [productId, quantity]);

    const fetchProductInfo = async (productId: number, quantity: number) => {
        try {
            const response = await axios.get<Product>(`http://localhost:8080/product/${productId}`);
            setProduct(response.data);
            setTotalPrice(response.data.price * quantity);
        } catch (error) {
            console.error("제품 정보 요청 중 에러 발생:", error);
        }
    };

    const handlePayment1m = async () => {
        if (productId) {
            try {
                const response = await axios.post<PayUrl>('http://localhost:8080/payment', {
                    quantity: quantity,
                    productId: productId,
                });

                const { next_redirect_pc_url, tid } = response.data;

                console.log("결제 URL:", next_redirect_pc_url);
                console.log("결제 고유 번호(TID):", tid);

                window.localStorage.setItem("tid", tid);
                setPayUrl(next_redirect_pc_url);

            } catch (error) {
                console.error("결제 준비 중 에러 발생:", error);
            }
        } else {
            console.error("유효한 제품 ID가 없습니다.");
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
                        onChange={(e) => {
                            const newQuantity = Number(e.target.value);
                            if (product) {
                                setTotalPrice(product.price * newQuantity);
                            }
                        }}
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
                    <button onClick={handlePayment1m}>결제 요청</button>
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
