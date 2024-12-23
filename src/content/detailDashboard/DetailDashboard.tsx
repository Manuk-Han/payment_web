import React from 'react';
import DetailProductDashboard from './DetailProductDashboard';
import DetailRankDashboard from './DetailRankDashboard';
import {PageTabs} from "../../redux/Tabs";
import '../dashboard/css/Dashboard.css';

interface DashboardProps {
    selectedTab: string;
    id: number;
}

const DetailDashboard: React.FC<DashboardProps> = ({ selectedTab, id }) => {
    return (
        <div className="dashboard">
            {selectedTab === PageTabs.PRODUCT && <DetailProductDashboard id={id}/>}
            {selectedTab === PageTabs.RANK && <DetailRankDashboard id={id}/>}
        </div>
    );
};

export default DetailDashboard;
