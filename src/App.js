import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './user/member/LoginPage';
import HomePage from './home/HomePage';
import SignupPage from './user/member/SignupPage';
import HomeDetailPage from "./home/HomeDetailPage";
import {PageTabs} from "./redux/Tabs";
import Payment from "./content/payment/Payment";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage nowTab={PageTabs.PRODUCT} />} />
                <Route path="/product" element={<HomePage nowTab={PageTabs.PRODUCT} />} />
                <Route path="/price" element={<HomePage nowTab={PageTabs.PRICE} />} />
                <Route path="/sign-in" element={<LoginPage />} />
                <Route path="/product/:id" element={<HomeDetailPage />} />
                <Route path="/payment/:productId" element={<Payment />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
