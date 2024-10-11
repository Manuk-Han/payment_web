import React, { useState } from 'react';
import './css/HomePage.css';
import Header from './Header';
import Footer from './Footer';
import HeaderComponent from "../content/HeaderComponent";
import { PageTabs } from '../redux/Tabs';
import {useNavigate, useParams} from "react-router-dom";
import DetailDashboard from "../content/detailDashboard/DetailDashboard";


const HomeDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : undefined;
    const [selectedTab, setSelectedTab] = useState<PageTabs>(PageTabs.PRODUCT);
    const navigate = useNavigate();

    const handleTabChange = (tab: PageTabs) => {
        navigate(`${tab}`)
        setSelectedTab(tab);
    };

    console.log(selectedTab)

    return (
        <div className="page-container">
            <Header />
            <div className="content">
                <HeaderComponent tab={selectedTab} onTabChange={handleTabChange} />
                <DetailDashboard selectedTab={selectedTab} id={numericId} />
            </div>
            <Footer />
        </div>
    );
};

export default HomeDetailPage;
