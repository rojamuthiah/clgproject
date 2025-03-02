import React, { useState } from 'react';
import Data from './data';
import mixed from "../assets/mixed.jpg";
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartslice';

const Customize = () => {
    const [customizedCart, setCustomizedCart] = useState([]);
    const [showMixedImage, setShowMixedImage] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [displayCount, setDisplayCount] = useState(40);
    const dispatch = useDispatch();

    const handleAddToCart = (flower) => {
        setCustomizedCart([...customizedCart, flower]);
    };

    const handleRemoveFromCart = (flower) => {
        setCustomizedCart(customizedCart.filter(item => item.Flowername !== flower.Flowername));
    };

    const handleCustomize = () => {
        setShowMixedImage(true);
    };

    const handleDiscard = () => {
        setCustomizedCart([]);
        setShowMixedImage(false);
        setShowPopup(false);
    };

    const handleSeeInfo = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleAddCustomizedToCart = () => {
        const customFlower = {
            Flowername: "Customized Bouquet",
            price: totalPrice,
            picurl: mixed
        };
        dispatch(addToCart(customFlower));
        setShowPopup(false);
    };

    const totalPrice = Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000;

    return (
        <div style={{ padding: '2rem', backgroundColor: 'white', minHeight: '100vh' }}>
            {!showMixedImage && (
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {Data.slice(0, displayCount).map((flower, index) => (
                                <div key={index} style={{
                                    border: '1px solid #eee',
                                    borderRadius: '20px',
                                    padding: '0.5rem 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#f9f9f9',
                                    position: 'relative',
                                    width: '200px'
                                }}>
                                    <span style={{ textTransform: 'capitalize' }}>{flower.Flowername.replace('_', ' ')}</span>
                                    {customizedCart.some(item => item.Flowername === flower.Flowername) ? (
                                        <FaTimes 
                                            onClick={() => handleRemoveFromCart(flower)}
                                            style={{
                                                color: 'red',
                                                cursor: 'pointer',
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px'
                                            }}
                                        />
                                    ) : (
                                        <FaPlus 
                                            onClick={() => handleAddToCart(flower)}
                                            style={{
                                                color: 'green',
                                                cursor: 'pointer',
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px'
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        {Data.length > displayCount && (
                            <div style={{ marginTop: '2rem' }}>
                                <button
                                    onClick={() => setDisplayCount(prev => prev + 40)}
                                    style={{
                                        padding: '1rem 2rem',
                                        backgroundColor: '#FF69B4',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '30px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                    <div style={{ flex: 1, marginLeft: '2rem', position: 'sticky', top: '2rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {customizedCart.map((flower, index) => (
                                <img 
                                    key={index}
                                    src={flower.picurl}
                                    alt={flower.Flowername}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        borderRadius: '10px'
                                    }}
                                />
                            ))}
                            {customizedCart.length > 0 && (
                                <FaPlus style={{ fontSize: '2rem', color: '#ccc' }} />
                            )}
                        </div>
                        {customizedCart.length > 0 && (
                            <button
                                onClick={handleCustomize}
                                style={{
                                    padding: '1rem 2rem',
                                    backgroundColor: '#FF69B4',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '30px',
                                    cursor: 'pointer',
                                    marginTop: '2rem'
                                }}
                            >
                                Customize
                            </button>
                        )}
                    </div>
                </div>
            )}
            {showMixedImage && (
                <div style={{ textAlign: 'center' }}>
                    <img 
                        src={mixed}
                        alt="Mixed Bouquet"
                        style={{
                            width: '300px',
                            height: '300px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            marginBottom: '2rem'
                        }}
                    />
                    <button
                        onClick={handleSeeInfo}
                        style={{
                            padding: '1rem 2rem',
                            backgroundColor: '#FF69B4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            marginBottom: '2rem'
                        }}
                    >
                        See Info
                    </button>
                    <button
                        onClick={handleDiscard}
                        style={{
                            padding: '1rem 2rem',
                            backgroundColor: '#ff6b6b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            marginBottom: '2rem',
                            marginLeft: '1rem'
                        }}
                    >
                        Discard
                    </button>
                </div>
            )}
            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '10px',
                        position: 'relative',
                        width: '400px'
                    }}>
                        <FaTimes 
                            onClick={handleClosePopup}
                            style={{
                                color: 'red',
                                cursor: 'pointer',
                                position: 'absolute',
                                top: '10px',
                                right: '10px'
                            }}
                        />
                        <h2>Selected Flowers</h2>
                        <ul>
                            {customizedCart.map((flower, index) => (
                                <li key={index} style={{ textTransform: 'capitalize' }}>
                                    {flower.Flowername.replace('_', ' ')}
                                </li>
                            ))}
                        </ul>
                        <h3>Total Price: ₹{totalPrice}</h3>
                        <button
                            onClick={handleAddCustomizedToCart}
                            style={{
                                padding: '1rem 2rem',
                                backgroundColor: '#FF69B4',
                                color: 'white',
                                border: 'none',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                marginTop: '1rem'
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Customize;
