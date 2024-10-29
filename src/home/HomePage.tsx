import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Dashboard from "../content/dashboard/Dashboard";
import HeaderComponent from "../content/HeaderComponent";
import { PageTabs } from '../redux/Tabs';

interface HomePageProps {
    nowTab?: PageTabs;
}

const HomePage: React.FC<HomePageProps> = ({ nowTab = PageTabs.PRODUCT }) => {
    const [selectedTab, setSelectedTab] = useState<PageTabs>(nowTab);
    const navigate = useNavigate();

    const handleTabChange = (tab: PageTabs) => {
        setSelectedTab(tab);
        window.history.pushState(null, '', tab);
    };

    const handleGoToPayment = (id: number, qty: number) => {
        navigate(`/payment/${id}`, { state: { quantity: qty } });
    };

    return (
        <div className="page-container">
            <Header />
            <div className="content">
                <HeaderComponent tab={selectedTab} onTabChange={handleTabChange} />
                <Dashboard selectedTab={selectedTab} onGoToPayment={handleGoToPayment} />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
