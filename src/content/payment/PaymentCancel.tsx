import React from 'react';
import Header from "../../home/Header";
import Footer from "../../home/Footer";

const PaymentCancel = () => {
    return (
        <div className="page-container">
            <Header />
            <div>
                <h1>결제 취소</h1>
                <p>결제가 취소되었습니다. 다시 시도해 주세요.</p>
            </div>
            <Footer/>
        </div>
    );
};

export default PaymentCancel;
