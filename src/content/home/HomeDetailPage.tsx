import React, { useState } from 'react';
import './css/HomePage.css';
import HeaderComponent from "../HeaderComponent";
import { PageTabs } from '../../redux/Tabs';
import {useNavigate, useParams} from "react-router-dom";
import DetailDashboard from "../detailDashboard/DetailDashboard";


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
            <div className="content">
                <HeaderComponent tab={selectedTab} onTabChange={handleTabChange} />
                <DetailDashboard selectedTab={selectedTab} id={numericId} />
            </div>
        </div>
    );
};

export default HomeDetailPage;
