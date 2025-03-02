import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartslice';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const handleRemoveFromCart = (flower) => {
        dispatch(removeFromCart(flower));
    };

    const handlePay = () => {
        navigate('/payment');
    };

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    // Group flowers by name and count quantities
    const groupedCart = cart.reduce((acc, flower) => {
        const existingFlower = acc.find(item => item.Flowername === flower.Flowername);
        if (existingFlower) {
            existingFlower.quantity += 1;
        } else {
            acc.push({ ...flower, quantity: 1 });
        }
        return acc;
    }, []);

    return (
        <div style={{ padding: '2rem', backgroundColor: 'white', minHeight: '100vh' }}>
            
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                {groupedCart.map((flower, index) => (
                    <div key={index} style={{
                        border: '1px solid #eee',
                        borderRadius: '10px',
                        padding: '1rem',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#fff'
                    }}>
                        <img 
                            src={flower.picurl} 
                            alt={flower.Flowername}
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginRight: '1rem'
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <h3 style={{ 
                                margin: '0.5rem 0',
                                textTransform: 'capitalize'
                            }}>
                                {flower.Flowername.replace('_', ' ')}
                            </h3>
                            <p style={{ 
                                color: '#FF69B4',
                                fontWeight: 'bold',
                                margin: '0.5rem 0'
                            }}>
                                ₹{flower.price} x {flower.quantity}
                            </p>
                        </div>
                        <button
                            onClick={() => handleRemoveFromCart(flower)}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#ff6b6b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <FaTrash /> Remove
                        </button>
                    </div>
                ))}
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '2rem'
            }}>
                <h2>Total Price: ₹{totalPrice}</h2>
                <button
                    onClick={handlePay}
                    style={{
                        padding: '1rem 2rem',
                        backgroundColor: '#FF69B4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer'
                    }}
                >
                    Pay
                </button>
            </div>
        </div>
    );
}

export default Checkout;
