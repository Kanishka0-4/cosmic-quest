import React, { useState } from "react";
import "./chatbot.css";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false); // For loading state

  const handleSendMessage = async () => {
    if (!userInput) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true); // Show loading indicator when sending a message

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput }),
      });

      const data = await response.json();
      setMessages([...newMessages, { sender: "bot", text: data.answer }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages([ ...newMessages, { sender: "bot", text: "Sorry, something went wrong!" } ]);
    } finally {
      setLoading(false); // Hide loading indicator after response
    }
  };

  return (
    <div className="chatbot-container">
      <h1>Chat Cosmos</h1>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="loading-message">Bot is typing...</div>} {/* Loading message */}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your question..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>

      {/* Embed the GIF here */}
      <div 
        className="tenor-gif-embed" 
        data-postid="19909529" 
        data-share-method="host" 
        data-aspect-ratio="1" 
        data-width="100%">
      </div>
    </div>
  );
};

export default ChatbotPage;
