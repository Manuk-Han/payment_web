import React, { useState } from 'react';
import './css/LoginPage.css';
import SignupPage from './SignupPage';

const LoginPage: React.FC = () => {
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');

    const handleOAuthLogin = (provider: string) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>로그인</h2>
                <div className="form-container">
                    <input
                        type="email"
                        placeholder="이메일"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <input type="password" placeholder="비밀번호" />
                    <button>로그인</button>
                </div>
                <div className="signup-link">
                    <p onClick={() => setIsSignupOpen(true)} className="signup-link-text">회원가입</p>
                </div>
                <div className="oauth-options">
                    <h3>OAuth2</h3>
                    <button className="oauth-button kakao" onClick={() => handleOAuthLogin('kakao')}>카카오로 로그인</button>
                    <button className="oauth-button google" onClick={() => handleOAuthLogin('google')}>구글로 로그인</button>
                </div>
            </div>
            {isSignupOpen && (
                <div className="signup-popup">
                    <SignupPage
                        closePopup={() => setIsSignupOpen(false)}
                        setLoginEmail={setLoginEmail}
                        setIsSignupOpen={setIsSignupOpen}
                    />
                </div>
            )}
        </div>
    );
};

export default LoginPage;
