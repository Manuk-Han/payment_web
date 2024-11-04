import React from 'react';
import Header from "../../home/Header";
import Footer from "../../home/Footer";

const PaymentFail = () => {
    return (
        <div className="page-container">
            <Header />
            <div>
                <h1>결제 실패</h1>
                <p>결제 처리 중 문제가 발생했습니다. 다시 시도해 주세요.</p>
            </div>
            <Footer/>
        </div>
    );
};

export default PaymentFail;
