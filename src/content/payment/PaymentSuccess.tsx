import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const recordOrder = async () => {
            const tid = localStorage.getItem("tid");
            const pgToken = new URLSearchParams(window.location.search).get("pg_token");
            const purchaseId = new URLSearchParams(window.location.search).get("purchaseId");
            const fromCart = new URLSearchParams(window.location.search).get("fromCart");

            if(!tid && !pgToken && !purchaseId) {
                return;
            } else if(!tid || !pgToken || !purchaseId) {
                navigate('/payment/fail');
            }

            if(tid && pgToken && purchaseId) {
                const approveForm = new FormData();
                approveForm.append("tid", tid);
                approveForm.append("pgToken", pgToken);
                approveForm.append("purchaseId", purchaseId);
                approveForm.append("fromCart", fromCart || "false");

                try {
                    await axiosInstance.post('/payment/success', approveForm,
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        });

                    localStorage.removeItem("tid");

                    const url = new URL(window.location.href);
                    url.searchParams.delete("purchaseId");
                    url.searchParams.delete("pg_token");
                    window.history.replaceState({}, document.title, url.toString());
                } catch (error) {
                    console.error("주문 기록 중 에러 발생:", error);
                    if (error.response?.status === 401) {
                        alert("세션이 만료되었습니다. 다시 로그인 해 주세요.");
                        navigate('/sign-in');
                    }
                }
            }
        };

        recordOrder();
    }, []);

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
