import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkLoginStatus } from './redux/authSlice';
import LoginPage from './user/member/LoginPage';
import HomePage from './home/HomePage';
import HomeDetailPage from "./home/HomeDetailPage";
import { PageTabs } from "./redux/Tabs";
import Payment from "./content/payment/Payment";
import OAuth2RedirectHandler from "./user/member/OAuth2RedirectHandler";
import PaymentSuccess from "./content/payment/PaymentSuccess";
import PaymentCancel from "./content/payment/PaymentCancel";
import PaymentFail from "./content/payment/PaymentFail";
import Header from "./home/Header";
import Footer from "./home/Footer";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkLoginStatus());
    }, [dispatch]);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage nowTab={PageTabs.PRODUCT} />} />
                <Route path="/product" element={<HomePage nowTab={PageTabs.PRODUCT} />} />
                <Route path="/price" element={<HomePage nowTab={PageTabs.PRICE} />} />
                <Route path="/sign-in" element={<LoginPage />} />
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                <Route path="/product/:id" element={<HomeDetailPage />} />
                <Route path="/payment/:productId" element={<Payment />} />

                <Route path="/order/pay/completed" element={<PaymentSuccess />} />
                <Route path="/order/pay/cancel" element={<PaymentCancel />} />
                <Route path="/order/pay/fail" element={<PaymentFail />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
