import React, { useState } from 'react';
import axios from 'axios';
import '../components/styles/ChatBot.css'; // Optional: for additional styling

function App() {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const generateResponse = async (message) => {
        const apiKey = 'AIzaSyDVNXwlPuF8_4fujKMvH8X9ljJVjaW0cMM'; // Replace with your API key
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        try {
            const response = await axios.post(endpoint, {
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const textPart = response.data.candidates[0].content.parts[0].text;
            return textPart;
        } catch (error) {
            console.error("Error:", error);
            return "Sorry, I couldn't process that. Please try again.";
        }
    };

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        // Add instructions for processing the message without showing them in the chat
        const prefixedMessage = `${userMessage}. Answer this question if it is related to human health,else return "I cannot answer this,Please ask a health related".Give answer in less than 5 lines`;

        // Only show the user's original message in the chat window
        const newChat = [...chatHistory, { sender: 'User', message: userMessage }];
        setChatHistory(newChat);

        // Send the prefixed message to the backend for processing
        const botResponse = await generateResponse(prefixedMessage);
        setChatHistory([...newChat, { sender: 'Bot', message: botResponse }]);

        setUserMessage(''); // Clear the input field after sending
    };

    return (
        <div className="App3">
            <h1>Health Chatbot</h1>
            <div className="chatbox">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`chat-message ${chat.sender}`}>
                        <strong>{chat.sender}:</strong> {chat.message}
                    </div>
                ))}
            </div>
            <div className="input-section">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Ask me something about health..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;
