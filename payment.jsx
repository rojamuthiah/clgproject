import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import { clearCart } from '../store/cartslice';

const Payment = () => {
    const [showSubscriptionInfo, setShowSubscriptionInfo] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.cart);

    const handleBook = () => {
        setShowConfirmation(true);
        setTimeout(() => {
            dispatch(clearCart());
            navigate('/');
        }, 3000);
    };

    const handleAddSubscription = () => {
        setIsSubscribed(true);
    };

    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const deliveryFee = isSubscribed ? 0 : 50;
    const total = subtotal + deliveryFee + (isSubscribed ? 99 : 0);

    return (
        <div style={{ padding: '2rem', backgroundColor: 'white', minHeight: '100vh' }}>
            

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                {/* Subscription Section */}
                <div style={{ flex: 1, marginRight: '1rem', position: 'relative' }}>
                    <h2>
                        Petal Land Gold Membership
                        <FaInfoCircle 
                            onClick={() => setShowSubscriptionInfo(true)}
                            style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                        />
                    </h2>
                    <p>₹99 per month - No delivery fees</p>
                    {!isSubscribed && (
                        <button 
                            onClick={handleAddSubscription}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#FF69B4',
                                color: 'white',
                                border: 'none',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                marginTop: '1rem'
                            }}
                        >
                            Add Subscription
                        </button>
                    )}
                    {showSubscriptionInfo && (
                        <div style={{
                            position: 'absolute',
                            top: '2rem',
                            left: '0',
                            backgroundColor: 'white',
                            padding: '1rem',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            zIndex: 1000
                        }}>
                            <h3>Petal Land Gold Membership</h3>
                            <p>Subscribe for ₹99 per month and enjoy:</p>
                            <ul>
                                <li>No delivery fees</li>
                                <li>Exclusive discounts</li>
                                <li>Priority customer support</li>
                            </ul>
                            <button 
                                onClick={() => setShowSubscriptionInfo(false)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#FF69B4',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    marginTop: '1rem'
                                }}
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>

                {/* Delivery Date Section */}
                <div style={{ flex: 1, marginLeft: '1rem' }}>
                    <h2>Select Delivery Date</h2>
                    <input 
                        type="date" 
                        value={deliveryDate} 
                        onChange={(e) => setDeliveryDate(e.target.value)} 
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            border: '1px solid #ccc',
                            width: '100%'
                        }}
                    />
                </div>
            </div>

            {/* Preview of Selected Products */}
            <div style={{ marginBottom: '2rem' }}>
                <h2>Selected Products</h2>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    {cart.map((item, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            border: '1px solid #eee',
                            borderRadius: '10px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <span>{item.Flowername}</span>
                            <span>₹{item.price}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bill Details */}
            <div style={{ marginBottom: '2rem' }}>
                <h2>Bill Details</h2>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    border: '1px solid #eee',
                    borderRadius: '10px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    border: '1px solid #eee',
                    borderRadius: '10px',
                    backgroundColor: '#f9f9f9',
                    textDecoration: isSubscribed ? 'line-through' : 'none'
                }}>
                    <span>Delivery Fee</span>
                    <span>₹50</span>
                </div>
                {isSubscribed && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        border: '1px solid #eee',
                        borderRadius: '10px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <span>Subscription Fee</span>
                        <span>₹99</span>
                    </div>
                )}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    border: '1px solid #eee',
                    borderRadius: '10px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
            </div>

            {/* Book Button */}
            <button 
                onClick={handleBook}
                style={{
                    padding: '1rem 2rem',
                    backgroundColor: '#FF69B4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer'
                }}
            >
                Book
            </button>

            {/* Confirmation Popup */}
            {showConfirmation && (
                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100px',
                        height: '100px'
                    }}>
                        <FaCheckCircle style={{ color: 'green', fontSize: '3rem' }} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payment;
