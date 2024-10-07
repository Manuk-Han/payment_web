import React, {useState} from 'react';
import './css/LoginPage.css';

const LoginPage = () => {
    const handleOAuthLogin = (provider) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>로그인</h2>
                <div className="oauth-options">
                    <h3>OAuth2</h3>
                    <button className="oauth-button kakao" onClick={() => handleOAuthLogin('kakao')}>
                        카카오로 회원가입
                    </button>
                    <button className="oauth-button google" onClick={() => handleOAuthLogin('google')}>
                        구글로 회원가입
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
