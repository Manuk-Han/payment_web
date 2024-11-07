import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import '../css/Cart.css';
import {useNavigate} from "react-router-dom";

interface ProductDetailForm {
    productId: number;
    name: string;
    price: number;
    stockQuantity: number;
}

interface CartProductForm {
    cartId: number;
    productDetailForm: ProductDetailForm;
    quantity: number;
    totalPrice: number;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartProductForm[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems();
    }, [accessToken]);

    const fetchCartItems = () => {
        if (accessToken) {
            axiosInstance
                .get('/cart/myCart')
                .then((response) => {
                    setCartItems(response.data);
                })
                .catch((error) => {
                    console.error("Failed to fetch cart items:", error);
                });
        }
    };

    const handleCheckboxChange = (cartId: number) => {
        setSelectedItems(prevSelectedItems =>
            prevSelectedItems.includes(cartId)
                ? prevSelectedItems.filter(id => id !== cartId)
                : [...prevSelectedItems, cartId]
        );
    };

    const handleDeleteRequest = (cartId: number) => {
        setDeleteTargetId(cartId);
        setShowConfirmDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (deleteTargetId === null) return;

        try {
            const response = await axiosInstance.post(`/cart/deleteProduct/${deleteTargetId}`);
            if (response.status === 200) {
                setShowDeleteModal(true);
                setShowConfirmDeleteModal(false);
                setDeleteTargetId(null);
                fetchCartItems();
            }
        } catch (error) {
            console.error("Failed to delete cart item:", error);
        }
    };

    const handleModalClose = () => {
        setShowDeleteModal(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmDeleteModal(false);
        setDeleteTargetId(null);
    };

    const handleCheckoutSelected = () => {
        // TODO: 선택된 항목을 결제 페이지로 이동하는 로직 추가
    };

    return (
        <div className="cart-page">
            <h2 className="cart-title">My Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-message">Your cart is empty.</p>
            ) : (
                <table className="cart-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.cartId} className="cart-item">
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.cartId)}
                                    onChange={() => handleCheckboxChange(item.cartId)}
                                />
                            </td>
                            <td className="product-name" onClick={() => navigate(`/product/${item.productDetailForm.productId}`)}>
                                {item.productDetailForm.name}
                            </td>
                            <td>{item.productDetailForm.price}원</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice}원</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteRequest(item.cartId)}
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <div className="cart-actions">
                <button className="checkout-button" onClick={handleCheckoutSelected}>
                    결제하기
                </button>
            </div>

            {showConfirmDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>정말 삭제하시겠습니까?</p>
                        <button style={{ backgroundColor: 'gray' }} onClick={handleConfirmDelete}>확인</button>
                        <button onClick={handleCancelDelete}>취소</button>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>상품이 삭제되었습니다.</p>
                        <button onClick={handleModalClose}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
