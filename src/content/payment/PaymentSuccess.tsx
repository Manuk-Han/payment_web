import React, { useEffect } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useNavigate} from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
        const recordOrder = async () => {
            const tid = localStorage.getItem("tid");
            const pgToken = new URLSearchParams(window.location.search).get("pg_token");
            const productId = localStorage.getItem("productId");
            const quantity = localStorage.getItem("quantity");

            if (!tid || !pgToken || !productId || !quantity) {
                console.error("결제 정보가 부족합니다.");
                return;
            }

            const formData = new FormData();
            formData.append("tid", tid);
            formData.append("pgToken", pgToken);
            formData.append("productId", productId);
            formData.append("quantity", quantity);

            try {
                await axios.post('/payment/success', formData, {
                    headers: {
                        Authorization: `${accessToken}`,
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                });

                localStorage.removeItem("tid");
                localStorage.removeItem("productId");
                localStorage.removeItem("quantity");
            } catch (error) {
                console.error("주문 기록 중 에러 발생:", error);
                if (error.response?.status === 401) {
                    alert("세션이 만료되었습니다. 다시 로그인 해 주세요.");
                    navigate('/sign-in');
                }
            }
        };

        recordOrder();
    }, [accessToken, navigate]);

    return (
        <div className="page-container">
            <div>
                <h1>결제 성공</h1>
                <p>결제가 성공적으로 완료되었습니다. 감사합니다!</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
