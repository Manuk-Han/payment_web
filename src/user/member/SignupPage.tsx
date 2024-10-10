import React, { useState } from 'react';
import './css/LoginPage.css';

interface SignupPageProps {
    closePopup: () => void;
    setLoginEmail: React.Dispatch<React.SetStateAction<string>>;
    setIsSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignUpForm {
    name: string;
    email: string;
    password: string;
}

const SignupPage: React.FC<SignupPageProps> = ({ closePopup, setLoginEmail, setIsSignupOpen }) => {
    const [signUpForm, setSignUpForm] = useState<SignUpForm>({ name: '', email: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpForm({ ...signUpForm, [name]: value });
    };

    const handleFormSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/member/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpForm),
            });

            if (response.ok) {
                console.log('회원가입 성공');
                setLoginEmail(signUpForm.email);
                setIsSignupOpen(false);
            } else {
                console.log('회원가입 실패');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <button className="close-button" onClick={closePopup}>X</button>
                <h2>회원가입</h2>
                <div className="form-container">
                    <input
                        type="text"
                        name="name"
                        placeholder="이름"
                        value={signUpForm.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="이메일"
                        value={signUpForm.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={signUpForm.password}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleFormSubmit}>회원가입</button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
