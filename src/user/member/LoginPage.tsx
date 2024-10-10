import React, { useState } from 'react';
import './css/LoginPage.css';
import SignupPage from './SignupPage';
import {useNavigate} from "react-router-dom";

interface SignInForm {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [signInForm, setSignInForm] = useState<SignInForm>({ email: '', password: '' });

    const navigate = useNavigate();

    const handleOAuthLogin = (provider: string) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignInForm({ ...signInForm, [name]: value });
    };

    const handleFormSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/member/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInForm),
            });

            if (response.ok) {
                const authToken = response.headers.get('Authorization');
                const data = await response.text();

                if (authToken) {
                    document.cookie = `Authorization=${authToken}; path=/; secure; samesite=strict`;
                    document.cookie = `refreshToken=${data}; path=/; secure; samesite=strict`;
                }

                navigate('/home', { replace: true })
            } else {
                console.log('로그인 실패');
            }
        } catch (error) {
            console.error('Error during signin:', error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>로그인</h2>
                <div className="form-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="이메일"
                        value={signInForm.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={signInForm.password}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleFormSubmit}>로그인</button>
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
