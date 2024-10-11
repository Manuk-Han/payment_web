import React, { useState } from 'react';
import './css/LoginPage.css';
import SignupPage from './SignupPage';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';
import axiosInstance from '../../config/axiosInstance';

interface SignInForm {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [signInForm, setSignInForm] = useState<SignInForm>({ email: '', password: '' });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOAuthLogin = (provider: string) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignInForm({ ...signInForm, [name]: value });
    };

    const handleFormSubmit = async () => {
        try {
            const response = await axiosInstance.post('/member/signIn', signInForm);

            if (response.status === 200) {
                const authToken = response.headers['authorization'];
                const refreshToken = response.data;

                if (authToken && refreshToken) {
                    localStorage.setItem('accessToken', authToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    dispatch(setCredentials({ accessToken: authToken, refreshToken, userEmail: signInForm.email }));
                }

                navigate('/', { replace: true });
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
