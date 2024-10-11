import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import { RootState } from '../redux/store';
import { jwtDecode } from 'jwt-decode';

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
        <div>
            <header>
                <div style={{ float: 'right', margin: '10px' }}>
                    {userEmail ? `환영합니다, ${userEmail}님!` : '로그인되지 않음'}
                </div>
            </header>
            <h2>Home</h2>
        </div>
    );
};

export default HomePage;
