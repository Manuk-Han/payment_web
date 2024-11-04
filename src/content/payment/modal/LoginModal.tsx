import React from 'react';
import '../../../content/css/modal/Modal.css'

interface LoginModalProps {
    show: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>로그인이 필요합니다</h2>
                <p>결제를 진행하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?</p>
                <div className="modal-actions">
                    <button onClick={() => window.location.href = '/sign-in'}>로그인</button>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
