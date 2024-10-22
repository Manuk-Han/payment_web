import React, { useState } from "react";
import axios from 'axios';

interface PayUrl {
    next_redirect_pc_url: string;
    tid: string;
}

const Payment: React.FC = () => {
    const [payUrl, setPayUrl] = useState<string | null>(null);

    const handlePayment1m = async () => {
        try {
            const response = await axios.post<PayUrl>('http://localhost:8080/payment');

            const { next_redirect_pc_url, tid } = response.data;

            console.log("결제 URL:", next_redirect_pc_url);
            console.log("결제 고유 번호(TID):", tid);

            window.localStorage.setItem("tid", tid);
            setPayUrl(next_redirect_pc_url);

        } catch (error) {
            console.error("결제 준비 중 에러 발생:", error);
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-info">

            </div>
            <div className="payment-action" onMouseOver={handlePayment1m}>
                {payUrl && (
                    <a href={payUrl} target="_blank" rel="noopener noreferrer">

                    </a>
                )}
            </div>
        </div>
    );
};

export default Payment;
