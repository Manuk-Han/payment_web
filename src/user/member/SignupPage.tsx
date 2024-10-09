import React, { useState } from 'react';
import './css/LoginPage.css';

interface SignUpForm {
    name: string
    email: string;
    password: string;
}

interface SignupPageProps {
    closePopup: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ closePopup }) => {
    const [signUpForm, setSignUpForm] = useState<SignUpForm>({ name: '', email: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpForm({ ...signUpForm, [name]: value });
    };

    const handleFormSubmit = () => {
        console.log('Signing up with', signUpForm);
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <button className="close-button" onClick={closePopup}>X</button>
                <h2>회원가입</h2>
                <div className="form-container">
                    <input
                        type="name"
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
}

export default SignupPage;
