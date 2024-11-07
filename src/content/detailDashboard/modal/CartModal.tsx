import React from 'react';
import '../../../content/css/modal/Modal.css'

interface LoginModalProps {
    show: boolean;
    onClose: () => void;
}

const CartModal: React.FC<LoginModalProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>장바구니에 상품이 담겼습니다.</h2>
                <p>장바구니로 이동하시겠습니까?</p>
                <div className="modal-actions">
                    <button onClick={() => window.location.href = '/cart'}>장바구니로 가기</button>
                    <button onClick={onClose}>계속하기</button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
