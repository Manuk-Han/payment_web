import React, { useState } from 'react';
import './css/HeaderComponent.css';
import cartIcon from '../image/cart_icon.png';
import userIcon from '../image/user_icon.png';
import { UserRole } from '../redux/roles';
import { PageTabs } from '../redux/Tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface HeaderComponentProps {
    tab?: PageTabs;
    onTabChange: (tab: PageTabs) => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ tab, onTabChange }) => {
    const { userRole } = useSelector((state: RootState) => state.auth);
    const [selectedTab, setSelectedTab] = useState<PageTabs>(tab);

    const handleTabClick = (tab: PageTabs) => {
        setSelectedTab(tab);
        onTabChange(tab);
        window.history.pushState(null, '', tab);
    };

    return (
        <div className="header-component">
            <div className="header-tabs">
                <button
                    className={`header-tab ${selectedTab === PageTabs.PRODUCT ? 'active' : ''}`}
                    onClick={() => handleTabClick(PageTabs.PRODUCT)}
                >
                    Product
                </button>
                <button
                    className={`header-tab ${selectedTab === PageTabs.PRICE ? 'active' : ''}`}
                    onClick={() => handleTabClick(PageTabs.PRICE)}
                >
                    Price
                </button>
            </div>
            {userRole === UserRole.USER && (
                <div className="header-icons">
                    <button className="header-icon">
                        <img src={cartIcon} alt="Cart Icon" className="icon-image" />
                    </button>
                    <button className="header-icon">
                        <img src={userIcon} alt="User Icon" className="icon-image" style={{ marginRight: '0.3vw' }} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default HeaderComponent;
