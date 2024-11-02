import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';
import './css/Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = useSelector((state: RootState) => state.auth.userName);

    console.log("Header userName:", userName)

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(logout());
        navigate('/', { replace: true });
    };

    const handleHome = () => {
        navigate('/');
    }

    return (
        <header className="header">
            <div className="header-title" onClick={handleHome}>Payment</div>
            <div className="header-buttons">
                {userName ? (
                    <>
                        <span className="header-user">{`환영합니다, ${userName}님!`}</span>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <button onClick={() => navigate('/sign-in')}>로그인</button>
                )}
            </div>
        </header>
    );
};

export default Header;
