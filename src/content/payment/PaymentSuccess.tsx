import React from 'react';
import Header from "../../home/Header";
import Footer from "../../home/Footer";

const PaymentSuccess = () => {
    return (
        <div className="page-container">
            <Header />
            <div>
                <h1>결제 성공</h1>
                <p>결제가 성공적으로 완료되었습니다. 감사합니다!</p>
            </div>
            <Footer/>
        </div>
    );
};

export default PaymentSuccess;
