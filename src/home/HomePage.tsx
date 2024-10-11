import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import { jwtDecode } from 'jwt-decode';
import './css/HomePage.css';
import Header from './Header';
import Footer from './Footer';
import Dashboard from "../content/dashboard/Dashboard";
import HeaderComponent from "../content/HeaderComponent";
import { UserRole } from '../redux/roles';
import { PageTabs } from '../redux/Tabs';

interface DecodedToken {
    user_id?: string;
    role?: string;
    [key: string]: any;
}

interface HomePageProps {
    nowTab?: PageTabs;
}

const HomePage: React.FC<HomePageProps> = ({ nowTab = PageTabs.PRODUCT }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState<PageTabs>(nowTab);

    const handleTabChange = (tab: PageTabs) => {
        setSelectedTab(tab);
        window.history.pushState(null, '', tab);
    };

    useEffect(() => {
        if (location.pathname === PageTabs.PRODUCT || location.pathname === PageTabs.PRICE) {
            setSelectedTab(location.pathname as PageTabs);
        }

        const params = new URLSearchParams(location.search);
        let accessToken = params.get('accessToken');
        let refreshToken = params.get('refreshToken');

        if (!accessToken || !refreshToken) {
            accessToken = localStorage.getItem('accessToken');
            refreshToken = localStorage.getItem('refreshToken');
        }

        if (accessToken && refreshToken) {
            try {
                const token = accessToken.replace('Bearer ', '');
                const decodedToken: DecodedToken = jwtDecode(token);
                const email = decodedToken.user_id || '알 수 없는 사용자';
                const role = decodedToken.role || UserRole.GUEST;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                dispatch(setCredentials({ accessToken, refreshToken, userEmail: email, userRole: role }));

                window.history.pushState(null, '', '/');
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, [dispatch, location]);

    return (
        <div className="page-container">
            <Header />
            <div className="content">
                <HeaderComponent tab={nowTab} onTabChange={handleTabChange} />
                <Dashboard selectedTab={selectedTab} />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
