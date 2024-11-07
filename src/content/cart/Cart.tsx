import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
        if (accessToken) {
            axiosInstance
                .get('/cart/myCart', )
                .then((response) => {
                    setCartItems(response.data);
                })
                .catch((error) => {
                    console.error("Failed to fetch cart items:", error);
                });
        }
    }, [accessToken]);

    return (
        <div className="cart-page">
            <h2>My Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <table className="cart-table">
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.cartId}>
                            <td>{item.productDetailForm.name}</td>
                            <td>{item.productDetailForm.price}원</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice}원</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Cart;
