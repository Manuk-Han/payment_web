import React, { useState } from 'react';
import './css/LoginPage.css';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../redux/authSlice';
import axiosInstance from '../../../config/axiosInstance';

interface SignupPageProps {
    closePopup: () => void;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setIsSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignUpForm {
    name: string;
    email: string;
    password: string;
}

const SignupPage: React.FC<SignupPageProps> = ({ closePopup, setUserName, setIsSignupOpen }) => {
    const [signUpForm, setSignUpForm] = useState<SignUpForm>({ name: '', email: '', password: '' });
    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpForm({ ...signUpForm, [name]: value });
    };

    const handleFormSubmit = async () => {
        try {
            const response = await axiosInstance.post('/member/signup', signUpForm);

            if (response.status === 200) {
                const authToken = response.headers['authorization'];
                const refreshToken = response.data;

                if (authToken && refreshToken) {
                    dispatch(setCredentials({ accessToken: authToken, refreshToken }));
                }

                console.log('회원가입 성공');
                setUserName(signUpForm.name);
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
