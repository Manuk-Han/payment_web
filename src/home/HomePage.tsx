// Payment 컴포넌트에 대하여 HomePage에서 렌더링되도록 설정
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import Header from './Header';
import Footer from './Footer';
import Dashboard from "../content/dashboard/Dashboard";
import HeaderComponent from "../content/HeaderComponent";
import Payment from "../content/payment/Payment";
import { PageTabs } from '../redux/Tabs';

interface HomePageProps {
    nowTab?: PageTabs;
}

const HomePage: React.FC<HomePageProps> = ({ nowTab = PageTabs.PRODUCT }) => {
    const [selectedTab, setSelectedTab] = useState<PageTabs>(nowTab);
    const location = useLocation();
    const dispatch = useDispatch();

    const handleTabChange = (tab: PageTabs) => {
        setSelectedTab(tab);
        window.history.pushState(null, '', tab);
    };

    useEffect(() => {
        if (location.pathname === PageTabs.PRODUCT || location.pathname === PageTabs.PRICE) {
            setSelectedTab(location.pathname as PageTabs);
        }
    }, [location]);

    return (
        <div className="page-container">
            <Header />
            <div className="content">
                <HeaderComponent tab={selectedTab} onTabChange={handleTabChange} />
                {location.pathname.includes('/payment') ? (
                    <Payment />
                ) : (
                    <Dashboard selectedTab={selectedTab} />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
