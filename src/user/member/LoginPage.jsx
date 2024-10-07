import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginPage.css';

const LoginPage = () => {
    const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });

    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate('/signup');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        //TODO: 로그인 처리
        console.log('로그인 정보:', loginInfo);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>로그인</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">아이디</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={loginInfo.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={loginInfo.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">로그인</button>
                </form>
                <div className="extra-options">
                    <button className="link-button" onClick={() => handleSignupClick()}>
                        회원가입
                    </button>
                    <button className="link-button" onClick={() => alert('ID/PW 찾기 페이지로 이동')}>
                        아이디/비밀번호 찾기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
