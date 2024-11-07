import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import '../css/Cart.css';

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
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
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
    }, [accessToken]);

    const handleCheckboxChange = (cartId: number) => {
        setSelectedItems(prevSelectedItems =>
            prevSelectedItems.includes(cartId)
                ? prevSelectedItems.filter(id => id !== cartId)
                : [...prevSelectedItems, cartId]
        );
    };

    const handleDeleteItem = (cartId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
        //TODO:: 서버에 개별 삭제 요청 추가 가능
    };

    const handleCheckoutSelected = () => {
        //TODO:: 선택된 항목을 결제 페이지로 이동하는 로직 추가
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
                            <td className="product-name" onClick={() => {/* Navigate to product detail */}}>
                                {item.productDetailForm.name}
                            </td>
                            <td>{item.productDetailForm.price}원</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice}원</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteItem(item.cartId)}
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
        </div>
    );
};

export default Cart;
