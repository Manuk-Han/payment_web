import React from 'react';
import {PageTabs} from "../../redux/Tabs";
import '../css/Dashboard.css';

interface DashboardProps {
    selectedTab: string;
    onGoToPayment?: (id: number, qty: number) => void;
}

const Cart: React.FC<DashboardProps> = () => {
    return (
        <div className="cart">
        </div>
    );
};

export default Cart;

