

import React, { useState, useRef, useEffect } from 'react';

// Import Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const Recommend = () => {
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [question, setQuestion] = useState('');
    const questionInputRef = useRef(null);
    const chatEndRef = useRef(null);

    // Scroll to bottom of chat whenever chat history updates
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        
        // Create preview URL for the image
        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setFilePreview(previewUrl);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        
        setLoading(true);
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('prompt', 'Analyze this flower image. Tell me: 1. The flower species and class 2. Detailed biological characteristics 3. Common uses and recommendations 4. Any special care instructions');

        try {
            const res = await fetch('http://127.0.0.1:8000/analyze-image', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            
            // Clean and format the response text
            const cleanedText = cleanApiResponse(data.analysis);
            
            // Add the initial analysis to chat history
            setChatHistory([{
                type: 'analysis',
                content: cleanedText
            }]);
            
            // Focus on the question input after analysis is complete
            setTimeout(() => {
                if (questionInputRef.current) {
                    questionInputRef.current.focus();
                }
            }, 100);
        } catch (error) {
            console.error('Error uploading file:', error);
            setChatHistory([{
                type: 'error',
                content: 'There was an error analyzing your image. Please try again.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleQuestionSubmit = async (e) => {
        if (e) e.preventDefault(); // Prevent default form submission
        
        if (!question.trim()) return;
        
        const currentQuestion = question;
        setQuestion(''); // Clear input field immediately
        
        // Add user question to chat history
        setChatHistory(prev => [...prev, {
            type: 'question',
            content: currentQuestion
        }]);
        
        setLoading(true);

        try {
            const res = await fetch('http://127.0.0.1:8000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: currentQuestion })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            const cleanedResponse = cleanApiResponse(data.response);
            
            // Add the response to chat history
            setChatHistory(prev => [...prev, {
                type: 'answer',
                content: cleanedResponse
            }]);
            
            // Focus on the question input after receiving response
            setTimeout(() => {
                if (questionInputRef.current) {
                    questionInputRef.current.focus();
                }
            }, 100);
        } catch (error) {
            console.error('Error generating content:', error);
            setChatHistory(prev => [...prev, {
                type: 'error',
                content: 'Sorry, there was an error processing your question. Please try again.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    // Clean API response - remove all escape characters and properly format the text
    const cleanApiResponse = (text) => {
        if (!text) return '';
        
        // Step 1: Remove all backslashes
        let cleanText = text.replace(/\\/g, '');
        
        // Step 2: Remove markdown formatting
        cleanText = cleanText
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
            .replace(/\*(.*?)\*/g, '$1');    // Remove italics
        
        // Step 3: Replace all newline sequences with HTML breaks
        // First, handle double newlines (paragraphs)
        cleanText = cleanText.replace(/\n\n/g, '<br><br>');
        
        // Then handle single newlines
        cleanText = cleanText.replace(/\n/g, '<br>');
        
        // Step 4: Add proper spacing around numbered points for better readability
        cleanText = cleanText.replace(/(\d+\.)\s/g, '<br><strong>$1</strong> ');
        
        return cleanText;
    };

    return (
        <div style={{ padding: '2rem', backgroundColor: 'white', minHeight: '100vh', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#333', marginBottom: '1.5rem' }}>Flower bank</h1>
            
            {/* File upload section */}
            <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        accept="image/*"
                        id="file-input"
                        style={{ display: 'none' }}
                    />
                    <label 
                        htmlFor="file-input"
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#8e44ad',
                            color: 'white',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            display: 'inline-block'
                        }}
                    >
                        Choose Flower Image
                    </label>
                    
                    <span style={{ marginLeft: '0.5rem' }}>
                        {file ? file.name : 'No file selected'}
                    </span>
                </div>
                
                {filePreview && (
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <img 
                            src={filePreview} 
                            alt="Flower preview" 
                            style={{ 
                                maxWidth: '100%', 
                                maxHeight: '300px', 
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                            }} 
                        />
                    </div>
                )}
                
                <button 
                    onClick={handleUpload} 
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#FF69B4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        width: 'fit-content'
                    }}
                    disabled={!file || loading}
                >
                    {loading ? 'Processing...' : 'Upload and Analyze'}
                </button>
            </div>
            
            {/* Chat section */}
            {chatHistory.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: '#333', marginBottom: '1rem' }}>Analysis & Conversation</h2>
                    
                    <div style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        {chatHistory.map((item, index) => (
                            <div 
                                key={index} 
                                style={{ 
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    backgroundColor: item.type === 'question' ? '#e3f2fd' : 
                                                   item.type === 'error' ? '#ffebee' : 'white',
                                    border: '1px solid #e0e0e0',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ 
                                    fontWeight: 'bold', 
                                    marginBottom: '0.5rem',
                                    color: item.type === 'question' ? '#1976d2' : 
                                           item.type === 'error' ? '#c62828' : '#333'
                                }}>
                                    {item.type === 'analysis' ? 'Flower Analysis' : 
                                     item.type === 'question' ? 'Your Question' : 
                                     item.type === 'error' ? 'Error' : 'Response'}
                                </div>
                                {item.type === 'question' ? (
                                    <div>{item.content}</div>
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: item.content }} style={{ fontFamily: 'Playfair Display, serif' }}></div>
                                )}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    
                    {/* Question form */}
                    <form 
                        onSubmit={handleQuestionSubmit}
                        style={{ 
                            display: 'flex', 
                            gap: '0.5rem', 
                            marginTop: '1.5rem' 
                        }}
                    >
                        <input 
                            type="text" 
                            placeholder="Ask questions related to the flower..." 
                            value={question} 
                            onChange={(e) => setQuestion(e.target.value)} 
                            ref={questionInputRef}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: '1px solid #ccc',
                                flexGrow: 1
                            }}
                            disabled={loading}
                        />
                        <button 
                            type="submit"
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#FF69B4',
                                color: 'white',
                                border: 'none',
                                borderRadius: '20px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Thinking...' : 'Submit'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Recommend;
