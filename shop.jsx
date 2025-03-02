import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartslice';
import Data from './data';
import { FaPlus, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Access cart data directly from Redux store
    const cart = useSelector((state) => state.cart.cart);

    const [displayCount, setDisplayCount] = useState(20);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter flowers based on search term
    const filteredFlowers = Data.filter(flower =>
        flower.Flowername.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Dispatch action to add flower to cart
    const handleAddToCart = (flower) => {
        dispatch(addToCart(flower));
    };

    // Dispatch action to remove flower from cart
    const handleRemoveFromCart = (flower) => {
        dispatch(removeFromCart(flower));
    };

    // Handle mouse enter for zoom-in effect
    const handleMouseEnter = (e) => {
        e.target.style.transform = 'scale(1.1)';
    };

    // Handle mouse leave to remove zoom-in effect
    const handleMouseLeave = (e) => {
        e.target.style.transform = 'scale(1)';
    };

    return (
        <div style={{ 
            padding: '2rem',
            backgroundColor: 'white',
            minHeight: '100vh',
            position: 'relative'
        }}>
            {/* Search Bar */}
            <div style={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '2rem'
            }}>
                <input
                    type="text"
                    placeholder="Search flowers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        border: '1px solid #ccc',
                        width: '300px',
                        fontSize: '1rem'
                    }}
                />
            </div>

            {/* Flower Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                {filteredFlowers.slice(0, displayCount).map((flower, index) => (
                    <div key={index} style={{
                        border: '1px solid #eee',
                        borderRadius: '10px',
                        padding: '1rem',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#fff'
                    }}>
                        <img 
                            src={flower.picurl} 
                            alt={flower.Flowername}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease'
                            }}
                        />
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
                            ₹{flower.price}
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            marginTop: 'auto'
                        }}>
                            <button
                                onClick={() => handleAddToCart(flower)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#FF69B4',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <FaShoppingCart /> Add
                            </button>
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
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {filteredFlowers.length > displayCount && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem'
                }}>
                    <button
                        onClick={() => setDisplayCount(prev => prev + 20)}
                        style={{
                            padding: '1rem',
                            borderRadius: '50%',
                            border: 'none',
                            backgroundColor: '#FF69B4',
                            color: 'white',
                            cursor: 'pointer',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <FaPlus />
                    </button>
                </div>
            )}

            {/* Checkout Button (Fixed to Bottom Right) */}
            {cart.length > 0 && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    zIndex: 1000
                }}>
                    <button
                        onClick={() => navigate('/checkout')}
                        style={{
                            padding: '1rem 2rem',
                            backgroundColor: '#FF69B4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                        }}
                    >
                        <FaShoppingCart />
                        Go to Checkout ({cart.length})
                    </button>
                </div>
            )}
        </div>
    );
};

export default Shop;
