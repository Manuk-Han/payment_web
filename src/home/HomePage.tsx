import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        if (accessToken && refreshToken) {
            dispatch(setCredentials({ accessToken, refreshToken }));
            navigate(location.pathname, { replace: true });
        }
    }, [location, dispatch, navigate]);

    return (
        <div>
            <h2>Home</h2>
        </div>
    );
};

export default HomePage;
