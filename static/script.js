const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// ... (Keep Theme Toggle, Mic, and File logic from previous steps) ...

async function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    // 1. Display User Message
    addMessage(text, 'user');
    userInput.value = '';

    // 2. Show "Typing..." indicator
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot-msg');
    typingDiv.innerText = "Thinking...";
    typingDiv.id = "typing-indicator";
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // 3. Send request to Flask
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();
        
        // 4. Remove typing indicator and show AI reply
        document.getElementById('typing-indicator').remove();
        addMessage(data.reply, 'bot');

    } catch (error) {
        document.getElementById('typing-indicator').remove();
        addMessage("Sorry, I'm having trouble connecting to the server.", "bot");
        console.error("Error:", error);
    }
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });

function addMessage(content, sender, type = 'text') {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-msg' : 'bot-msg');
    
    if (type === 'image') {
        msgDiv.innerHTML = `<img src="${content}" style="max-width:100%;">`;
    } else {
        // Use innerText for safety, or a Markdown library if you want formatted AI text
        msgDiv.innerText = content;
    }
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}