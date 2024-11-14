import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkLoginStatus } from './redux/authSlice';
import LoginPage from './content/user/member/LoginPage';
import HomePage from './content/home/HomePage';
import HomeDetailPage from "./content/home/HomeDetailPage";
import { PageTabs } from "./redux/Tabs";
import Payment from "./content/payment/Payment";
import OAuth2RedirectHandler from "./content/user/member/OAuth2RedirectHandler";
import PaymentSuccess from "./content/payment/PaymentSuccess";
import PaymentCancel from "./content/payment/PaymentCancel";
import PaymentFail from "./content/payment/PaymentFail";
import Header from "./content/home/Header";
import Footer from "./content/home/Footer";
import Cart from "./content/cart/Cart";
import './App.css';
import MyPage from "./content/user/member/MyPage";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkLoginStatus());
    }, [dispatch]);

    return (
        <div className="App">
            <Router>
                <Header className="App-header"/>
                <div className="App-content">
                    <Routes>
                        <Route path="/" element={<HomePage nowTab={PageTabs.PRODUCT} />} />
                        <Route path="/product" element={<HomePage nowTab={PageTabs.PRODUCT} />} />
                        <Route path="/price" element={<HomePage nowTab={PageTabs.PRICE} />} />
                        <Route path="/sign-in" element={<LoginPage />} />
                        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                        <Route path="/product/:id" element={<HomeDetailPage />} />
                        <Route path="/payment/:productId" element={<Payment />} />

                        <Route path="/payment/success" element={<PaymentSuccess />} />
                        <Route path="/payment/cancel" element={<PaymentCancel />} />
                        <Route path="/payment/fail" element={<PaymentFail />} />

                        <Route path="/cart" element={<Cart />} />
                        <Route path="/my-page" element={<MyPage />} />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
                <Footer className="App-footer" />
            </Router>
        </div>
    );
};

export default App;
