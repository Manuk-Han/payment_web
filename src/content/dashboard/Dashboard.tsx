import React from 'react';
import ProductDashboard from './ProductDashboard';
import PriceDashboard from './PriceDashboard';
import {PageTabs} from "../../redux/Tabs";
import './css/Dashboard.css';

interface DashboardProps {
    selectedTab: string;
    onGoToPayment?: (id: number, qty: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ selectedTab, onGoToPayment }) => {
    return (
        <div className="dashboard">
            {selectedTab === PageTabs.PRODUCT && <ProductDashboard onGoToPayment={onGoToPayment} />}
            {selectedTab === PageTabs.PRICE && <PriceDashboard />}
        </div>
    );
};

export default Dashboard;

