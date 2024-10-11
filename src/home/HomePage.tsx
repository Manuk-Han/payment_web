import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout } from '../redux/authSlice';
import { RootState } from '../redux/store';
import { jwtDecode } from 'jwt-decode';
import './css/HomePage.css';
import Header from './Header';
import Footer from './Footer';
import Dashboard from "../content/Dashboard";
import {UserRole} from "../redux/roles";

interface DecodedToken {
    user_id?: string;
    [key: string]: any;
}

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userEmail = useSelector((state: RootState) => state.auth.userEmail);
    const [hasNavigated, setHasNavigated] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let accessToken = params.get('accessToken');
        let refreshToken = params.get('refreshToken');

        if (!accessToken || !refreshToken) {
            accessToken = localStorage.getItem('accessToken');
            refreshToken = localStorage.getItem('refreshToken');
        }

        if (accessToken && refreshToken && !hasNavigated) {
            try {
                const token = accessToken.replace('Bearer ', '');
                const decodedToken: DecodedToken = jwtDecode(token);
                const email = decodedToken.user_id || '알 수 없는 사용자';
                const role = decodedToken.role || UserRole.GUEST;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                dispatch(setCredentials({ accessToken, refreshToken, userEmail: email, userRole : role }));
                setHasNavigated(true);
            } catch (error) {
                console.error('Invalid token:', error);
            }
            navigate(location.pathname, { replace: true });
        }
    }, [location, dispatch, navigate, hasNavigated]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(logout());
        navigate('/', { replace: true });
    };

    return (
        <div className="page-container">
            <Header />
            <div className="content">
                <Dashboard />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
