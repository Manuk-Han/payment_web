import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');

        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);

        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', decodeURIComponent(accessToken));
            localStorage.setItem('refreshToken', decodeURIComponent(refreshToken));

            navigate('/', { replace: true });
        } else {
            navigate('/sign-in', { replace: true });
        }
    }, [navigate]);

    return <div>로그인 중...</div>;
};

export default OAuth2RedirectHandler;
