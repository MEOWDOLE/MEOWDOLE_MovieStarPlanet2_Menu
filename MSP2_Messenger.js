(function () {
    const style = document.createElement('style');
    style.innerHTML = `
:root {

    --primary-bg: #0f172afa;
    --secondary-bg: #1e293b;

    --border-color: #6366f126;
    --basic-radius: 8px;

    --dissconnected: #FF5C5C;
    --connected: #98FF98;
    --color-loading: #FFD700;

    --slider-green: #50C878;

    --text-color: #f8fafc;

    --font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

* {
    margin: 0;
    padding: 0;

    box-sizing: border-box;

    scrollbar-width: thin;
    scrollbar-color: var(--border-color) var(--secondary-bg);
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: var(--secondary-bg);
    border-radius: var(--basic-radius);
}

::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: var(--basic-radius);
}

::-webkit-scrollbar-thumb:hover {
    background: var(--slider-green);
}

.chat_Header, .chat_Title, .chat_Close, .chat_Send { user-select: none; }

.chat_Container {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    position: fixed;
    top: 25px;
    left: 50px;
    width: 500px;
    max-width: 400px;
    background: #0f172afa;
    border-radius: 16px;
    box-shadow: 0 8px 24px #0000004d, 0 0 0 1px var(--border-color);
    z-index: 9999;
    backdrop-filter: blur(12px);
    animation: slideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    transition: transform 0.5s ease, opacity 0.5s ease;

    height: auto;
    padding-bottom: 15px;
}

.chat_Header {
    background: #1e293b;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 16px 16px 0 0;
    cursor: move;
}

.chat_Title::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: var(--dissconnected);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--dissconnected);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.chat_Title {
    color: var(--text-color);
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 16px;
}

.chat_Title.connected::before {
    background: var(--connected);
    box-shadow: 0 0 12px 3px var(--connected);
}

.chat_Close {
    background: transparent;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    font-size: 18px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat_Close:hover {
    background: #334155;
    color: var(--text-color);
}

.chat_Content {
    font-family: var(--font-family);
    width: 100%;
    height: calc(100% - 48px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    gap: 8px;
    padding: 10px;
}

.chat_Input {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    color: var(--text-color);
    font-size: 14px;
    resize: none;
    outline: none;
    padding: 16px;
    border-radius: 16px;
    border: 1px solid var(--border-color);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 8px;
    user-select: text;
}

.chat_Send {
    background: #6366f1;
    color: var(--text-color);
    border: none;
    border-radius: 16px;
    padding: 8px 22px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat_Send:hover {
    background: #4f46e5;
    color: var(--text-color);
    transform: scale(1.02);
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1;}
    to { opacity: 0;}
}

@keyframes enterScreen {
    from { opacity: 0;  top: -100px}
    to { opacity: 1; top: 25px;}
}

@keyframes exitScreen {
    from { opacity: 1; top: 25px;}
    to { opacity: 0; top: -100px;}
}

    `;

    document.head.appendChild(style);

    const container = document.createElement('div');
    container.className = 'chat_Container';
    container.id = 'chat_Container';
    container.innerHTML = `
            <div class="chat_Header">
            <h3 class="chat_Title">Chat</h3>
            <button class="chat_Close">×</button>
        </div>

        <div class="chat_Content">
            <textarea class="chat_Input" placeholder="Type your message here..."></textarea>
            <button class="chat_Send" id="send_Button">Send</button>
        </div>
    `;

    document.body.appendChild(container);

    const uiContainer = document.getElementById('chat_Container');
    const header = uiContainer.querySelector('.chat_Header');
    const closeButton = uiContainer.querySelector('.chat_Close');

    const startX = 250;
    const startY = 25;

    uiContainer.style.left = `${startX}px`;
    uiContainer.style.top = `${startY}px`;

    let isDragging = false;
    let currentX = startX;
    let currentY = startY;
    let initialX;
    let initialY;
    let xOffset = startX;
    let yOffset = startY;


    function closeContainer() {
        uiContainer.remove();
    }

    closeButton.addEventListener('click', closeContainer);


    header.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);


    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target.closest('.chat_Header')) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            uiContainer.style.left = `${currentX}px`;
            uiContainer.style.top = `${currentY}px`;
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    let inputString = '';
    let selectedText = '';
    let isAllSelected = false;
    let textarea = document.querySelector('.chat_Input');

    textarea.addEventListener('keydown', async (event) => {
        event.preventDefault();

        if (event.ctrlKey && event.key === 'a') {
            selectedText = inputString;
            isAllSelected = true;
            textarea.setSelectionRange(0, textarea.value.length);
            return;
        }

        if (event.ctrlKey && event.key === 'c') {
            if (selectedText) {
                try {
                    await navigator.clipboard.writeText(selectedText);
                } catch (err) {

                }
            }
            return;
        }

        if (event.ctrlKey && event.key === 'v') {
            try {
                const pastedText = await navigator.clipboard.readText();
                if (isAllSelected) {
                    inputString = pastedText;
                } else {
                    const selectionStart = textarea.selectionStart;
                    inputString = inputString.slice(0, selectionStart) + pastedText + inputString.slice(textarea.selectionEnd);
                }
                selectedText = '';
                isAllSelected = false;
            } catch (err) {

            }
        } else if (event.key === 'Backspace') {
            if (isAllSelected) {
                inputString = '';
                selectedText = '';
                isAllSelected = false;
            } else {
                const selectionStart = textarea.selectionStart;
                if (selectionStart > 0) {
                    inputString = inputString.slice(0, selectionStart - 1) + inputString.slice(textarea.selectionEnd);
                }
            }
        } else if (event.key.length === 1) {
            if (isAllSelected) {
                inputString = event.key;
                isAllSelected = false;
            } else {
                const selectionStart = textarea.selectionStart;
                inputString = inputString.slice(0, selectionStart) + event.key + inputString.slice(textarea.selectionEnd);
            }
        }

        textarea.value = inputString;
        if (event.key.length === 1) {
            textarea.setSelectionRange(textarea.selectionStart + 1, textarea.selectionStart + 1);
        } else if (event.key === 'Backspace') {
            textarea.setSelectionRange(textarea.selectionStart, textarea.selectionStart);
        }
    });

    window.ws = null;

    function initWebSocket() {
        let nativeWebSocket = window.WebSocket;
        window.WebSocket = function (...args) {
            const socket = new nativeWebSocket(...args);
            window.ws = socket;

            socket.addEventListener('open', function () {
                const title = uiContainer.querySelector('.chat_Title');
                title.classList.add('connected');

                console.log(`
                ******************************************
                            WEBSOCKET CONNECTED
                ******************************************
                `);
            });

            socket.addEventListener('error', function () {
                console.error('WebSocket error');
                uiContainer.querySelector('.chat_Title').classList.remove('connected');
                console.log(`
                ******************************************
                            WEBSOCKET ERROR
                ******************************************
                `);
            });

            function sendMessage(message) {
                const bericht = `42["chatv2:send",{"message":"${message}"}]`;

                if (window.ws) {
                    ws.send(bericht);
                } else {
                    console.log('lol error successsss');
                }
            }

            const msgInput = uiContainer.querySelector('.chat_Input');

            document.querySelector('#send_Button').addEventListener('click', () => {
                sendMessage(msgInput.value);
            });

            return socket;
        };
    };

    initWebSocket();

})();
