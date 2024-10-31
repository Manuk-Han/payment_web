import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setCredentials} from "../../redux/authSlice";
import { jwtDecode } from 'jwt-decode';

const OAuth2RedirectHandler: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');

        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);

        const decodedToken = jwtDecode<{ user_id: string; role: string }>(accessToken);
        console.log("Decoded Token:", decodedToken);

        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', decodeURIComponent(accessToken));
            localStorage.setItem('refreshToken', decodeURIComponent(refreshToken));

            dispatch(setCredentials({
                accessToken: decodeURIComponent(accessToken),
                refreshToken: decodeURIComponent(refreshToken),
                userName: decodedToken.user_id || '',
                userRole: decodedToken.role || "GUEST",
            }));

            navigate('/', { replace: true });
        } else {
            navigate('/sign-in', { replace: true });
        }
    }, [navigate]);

    return <div>로그인 중...</div>;
};

export default OAuth2RedirectHandler;