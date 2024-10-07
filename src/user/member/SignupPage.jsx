import React, { useState } from 'react';
import './css/SignupPage.css';

const SignupPage = () => {
    const [signupInfo, setSignupInfo] = useState({ username: '', password: '', confirmPassword: '' });

    const handleOAuthLogin = (provider) => {
        // 각 OAuth 제공자 로그인 URL로 리디렉트
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>회원가입</h2>
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

export default SignupPage;
