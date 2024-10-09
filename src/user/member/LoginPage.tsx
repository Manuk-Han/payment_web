import React, { useState } from 'react';
import './css/LoginPage.css';

interface SignupForm {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [signupForm, setSignupForm] = useState<SignupForm>({ email: '', password: '' });
    const [isLogin, setIsLogin] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupForm({ ...signupForm, [name]: value });
    };

    const handleFormSubmit = () => {
        if (isLogin) {
            console.log('Logging in with', signupForm);
        } else {
            console.log('Signing up with', signupForm);
        }
    };

    const handleOAuthLogin = (provider: string) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>{isLogin ? '로그인' : '회원가입'}</h2>
                <div className="form-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="이메일"
                        value={signupForm.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={signupForm.password}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleFormSubmit}>{isLogin ? '로그인' : '회원가입'}</button>
                    <button onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? '회원가입으로 전환' : '로그인으로 전환'}
                    </button>
                </div>
                <div className="oauth-options">
                    <h3>OAuth2</h3>
                    <button className="oauth-button kakao" onClick={() => handleOAuthLogin('kakao')}>
                        카카오로 로그인
                    </button>
                    <button className="oauth-button google" onClick={() => handleOAuthLogin('google')}>
                        구글로 로그인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
