let knowledgeBase = "";

// Function to load the knowledge base from the text file
document.getElementById('file-input').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        knowledgeBase = e.target.result;  // Store content of file in knowledgeBase
    };
    
    reader.readAsText(file);
}

// Send user input and get response
async function sendMessage() {
    const userMessage = document.getElementById('user-input').value;
    if (!userMessage) return;

    appendMessage(userMessage, 'user');
    
    const response = await queryGeminiAPI(userMessage);
    appendMessage(response, 'bot');
    
    document.getElementById('user-input').value = '';
}

// Append message to chat box
function appendMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to query Gemini API
async function queryGeminiAPI(userMessage) {
    const apiKey = 'AIzaSyCNZjpyYBfuZ5jzxO2QiyGlBA6y85RQZoE';  // Replace with your actual API key

    const body = {
        "query": userMessage,
        "knowledgeBase": knowledgeBase,  // Optional: If you want to pass knowledge base to Gemini
    };

    const response = await fetch('https://api.googleapis.com/v1/gemini/query', {  // Replace with actual endpoint, if applicable
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    return data.answer || "Sorry, I couldn't find an answer.";
}
