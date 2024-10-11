import React from 'react';
import ProductDashboard from './ProductDashboard';
import PriceDashboard from './PriceDashboard';
import {PageTabs} from "../../redux/Tabs";
import '../css/Dashboard.css';

interface DashboardProps {
    selectedTab: string;
}

const Dashboard: React.FC<DashboardProps> = ({ selectedTab }) => {
    return (
        <div className="dashboard">
            {selectedTab === PageTabs.PRODUCT && <ProductDashboard />}
            {selectedTab === PageTabs.PRICE && <PriceDashboard />}
        </div>
    );
};

export default Dashboard;
