import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout } from '../redux/authSlice';
import { RootState } from '../redux/store';
import { jwtDecode } from 'jwt-decode';
import './css/HomePage.css';
import Header from './Header';
import Footer from './Footer';

interface DecodedToken {
    user_id?: string;
    [key: string]: any;
}

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userEmail = useSelector((state: RootState) => state.auth.userEmail);

    useEffect(() => {
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

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                dispatch(setCredentials({ accessToken, refreshToken, userEmail: email }));
            } catch (error) {
                console.error('Invalid token:', error);
            }
            navigate(location.pathname, { replace: true });
        }
    }, [location, dispatch, navigate]);

    return (
        <div className="page-container">
            <Header />
            <div className="content">
                <h2>Home</h2>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
