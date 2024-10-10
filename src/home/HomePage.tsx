import React, { useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        if (accessToken && refreshToken) {
            document.cookie = `Authorization=${accessToken}; path=/; secure; samesite=strict`;
            document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict`;

            navigate(location.pathname, { replace: true });
        }
    }, [location]);

    return (
        <div>
            <h2>Home</h2>
        </div>
    );
};

export default HomePage;
