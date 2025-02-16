document.getElementById('ask-button').addEventListener('click', async () => {
    const questionInput = document.getElementById('question-input');
    const question = questionInput.value;

    if (!question) {
        alert("Please enter a question.");
        return;
    }

    const responseContainer = document.getElementById('response-container');
    responseContainer.innerHTML += `<div>You: ${question}</div>`;
    questionInput.value = '';

    try {
        const response = await fetch('http://localhost:5001/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        const data = await response.json();
        responseContainer.innerHTML += `<div>Bot: ${data.answer}</div>`;
    } catch (error) {
        responseContainer.innerHTML += `<div>Bot: An error occurred while processing your request.</div>`;
    }

    responseContainer.scrollTop = responseContainer.scrollHeight; // Scroll to the bottom
});