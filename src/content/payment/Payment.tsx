import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";

interface PayUrl {
    next_redirect_pc_url: string;
    tid: string;
}

const Payment: React.FC = () => {
    const location = useLocation();
    const [payUrl, setPayUrl] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [productId, setProductId] = useState<number | null>(null);

    useEffect(() => {
        if (location.state) {
            const { quantity } = location.state as { quantity: number };
            setQuantity(quantity);
        }
    }, [location.state]);

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
        <div className="payment-container">
            <div className="payment-info">
                <label htmlFor="quantity">상품 개수:</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </div>
            <div className="payment-action">
                <button onClick={handlePayment1m}>결제 요청</button>
                {payUrl && (
                    <a href={payUrl} target="_blank" rel="noopener noreferrer">
                        결제 페이지로 이동
                    </a>
                )}
            </div>
        </div>
    );
};

export default Payment;
