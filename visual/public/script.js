document.addEventListener('DOMContentLoaded', () => {
    const questionInput = document.getElementById('question-input');
    const askButton = document.getElementById('ask-button');
    const responseContainer = document.getElementById('response-container');

    // Function to add a message to the chat window
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;
        responseContainer.appendChild(messageDiv);
        responseContainer.scrollTop = responseContainer.scrollHeight;
    }

    // Function to handle the chat submission
    async function handleChat() {
        const question = questionInput.value.trim();
        
        if (!question) return; // Don't send empty messages

        // Add user message to chat
        addMessage(question, true);
        
        // Clear input
        questionInput.value = '';

        // Add loading message
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-message';
        loadingDiv.textContent = 'Thinking...';
        responseContainer.appendChild(loadingDiv);

        try {
            const response = await fetch('http://localhost:5001/api/chat', {  // Changed back to original endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),  // Using the original payload structure
            });

            // Remove loading message
            loadingDiv.remove();

            const data = await response.json();
            addMessage(data.answer);  // Changed to data.answer to match original response structure

        } catch (error) {
            // Remove loading message
            loadingDiv.remove();
            
            addMessage('Sorry, I encountered an error. Please try again.');
            console.error('Error:', error);
        }
    }

    // Event listeners
    askButton.addEventListener('click', handleChat);
    
    questionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChat();
        }
    });

    // Disable button when input is empty
    questionInput.addEventListener('input', () => {
        askButton.disabled = questionInput.value.trim() === '';
    });

    // Initial button state
    askButton.disabled = true;
});