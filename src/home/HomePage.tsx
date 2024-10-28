import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    const [productId, setProductId] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const location = useLocation();

    const handleTabChange = (tab: PageTabs) => {
        setSelectedTab(tab);
        window.history.pushState(null, '', tab);
    };

    const handleGoToPayment = (id: number, qty: number) => {
        setProductId(id);
        setQuantity(qty);
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
                    <Payment productId={productId} quantity={quantity} />
                ) : (
                    <Dashboard selectedTab={selectedTab} onGoToPayment={handleGoToPayment} />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
