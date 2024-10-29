// -------------------- MEOWD0LE --------------------
// Zet deze script in de dev console om te gebruiken
// --------------------------------------------------

(function() {
    const saveMessagesToDiscord = true;
    const discordWebhookURL = 'https://discord.com/api/webhooks/1300508660870676603/dVuSY_7ZP_5HSQMCppfpxH7SNhIgU24FROiLHxbSSbhTxtCkaes1JRyzqhlkafBxvYs-';

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.textContent = `
        .MSP2_Container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 500px;
            background-color: #2c2c2c;
            font-family: 'Roboto', sans-serif;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            user-select: none;
            z-index: 9999;
        }
        .MSP2_Title {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #1e1e1e;
            border-bottom: 1px solid #3a3a3a;
            cursor: move;
        }
        .MSP2_Title h1 {
            color: #ffffff;
            font-size: 16px;
            font-weight: 400;
            margin: 0;
        }
        .MSP2_Body {
            flex-grow: 1;
            overflow-y: auto;
        }
        .MSP2_Footer {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            padding: 0 15px;
            background-color: #1e1e1e;
            border-top: 1px solid #3a3a3a;
        }
        .control-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .red { background-color: #ff5f56; }
        .MSP2_Footer h2 {
            color: #ffffff;
            font-size: 14px;
            font-weight: 400;
            margin: 0;
        }
        .MSP2_ChatReflection, .MSP2_DiscordWebhook {
            padding: 10px;
        }
        .command-button, .toggle-webhook-button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            background-color: #3A3A3A;
            border: none;
            border-left: 4px solid #ff5f56;
            color: white;
            padding: 10px 15px;
            text-align: left;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .command-name {
            font-weight: 500;
        }
        .command-shortcut {
            font-size: 12px;
            color: #BBBBBB;
        }
    `;
    document.head.appendChild(style);

    const uiContainer = document.createElement('div');
    uiContainer.className = 'MSP2_Container';
    uiContainer.id = 'uiContainer';
    uiContainer.innerHTML = `
        <div class="MSP2_Title">
            <h1>MEOWD0LE</h1>
        </div>
        <div class="MSP2_Body">
            <div class="MSP2_Commands">
                <div class="MSP2_ChatReflection">
                    <button class="command-button">
                        <span class="command-name">Enable chat reflection</span>
                        <span class="command-shortcut">Alt+P</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="MSP2_Footer">
            <span class="control-dot red"></span>
            <h2>Disconnected</h2>
        </div>
    `;
    document.body.appendChild(uiContainer);

    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    uiContainer.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target.closest('.MSP2_Title')) {
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
            setTranslate(currentX, currentY, uiContainer);
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }

    window.ws = null;
    let imitateMessages = false;

    function initWebSocket() {
        var nativeWebSocket = window.WebSocket;
        window.WebSocket = function (...args) {
            const socket = new nativeWebSocket(...args);
            window.ws = socket;
            console.log('WebSocket verbonden. Je kunt nu ws.send() gebruiken in de console.');
            socket.addEventListener('message', handleMessage);
            socket.addEventListener('open', handleOpen);

            socket.addEventListener('open', function() {
                websocketURL = socket.url;
                const roomIdMatch = websocketURL.match(/gs-chatroom-([\w-]+)/);
                const roomId = roomIdMatch ? roomIdMatch[1] : "Unknown Room";
                console.log('WebSocket Room ID:', roomId);
                document.querySelector('.MSP2_Footer h2').textContent = `Connected to: ${roomId}`;
            });
            
            
            return socket;
        };
    }

    function handleMessage(event) {
        try {
            const data = JSON.parse(event.data.substring(2));
            if (data[0] === "message" && data[1].messageType === "2001") {
                const message = data[1].messageContent.message;
                const profileID = data[1].messageContent.profileId;
                console.log('%c Ontvangen bericht: ' + message, 'color: green; font-weight: bold; font-size: 14px;');
                
                if (imitateMessages) {
                    setTimeout(() => sendImitatedMessage(message), 1);
                }

                if (saveMessagesToDiscord && discordWebhookURL) {
                    fetch(discordWebhookURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            content: `${profileID}: ${message}`
                        }),
                    }).then(response => {
                        if (!response.ok) {
                            console.error('Fout bij het verzenden van het bericht naar Discord:', response);
                        }
                    }) .catch(error => {
                        console.error('Fout bij het verzenden van het bericht naar Discord:', error);
                    });
                }

            }
        } catch (error) {
            console.error('Fout bij het verwerken van het bericht:', error);
        }
    }

    function handleOpen() {
        const dotElement = document.querySelector('.control-dot');
        const statusElement = document.querySelector('.MSP2_Footer h2');
        if (dotElement) dotElement.style.backgroundColor = '#27c93f';
        if (statusElement) statusElement.textContent = `Connected`;
    }

    function sendImitatedMessage(message) {
        const bericht = `42["chatv2:send",{"message":"${message}"}]`;
        console.log(`Imitatiebericht verzenden: ${bericht}`);
        if (window.ws) {
            ws.send(bericht);
        } else {
            console.log('Let op: ws is niet gedefinieerd. Het bericht is niet daadwerkelijk verzonden.');
        }
    }

    window.toggleImitateMessages = function() {
        imitateMessages = !imitateMessages;
        console.log(`Imitatie van berichten is nu ${imitateMessages ? 'AAN' : 'UIT'}`);
        
        const button = document.querySelector('.command-button');
        if (button) {
            button.style.borderLeftColor = imitateMessages ? '#27c93f' : '#ff5f56';
        }
        
        const commandName = button.querySelector('.command-name');
        if (commandName) {
            commandName.textContent = imitateMessages ? 'Disable chat reflection' : 'Enable chat reflection';
        }
    };

    document.addEventListener('keydown', function(event) {
        if (event.altKey && event.key === 'p') {
            event.preventDefault();
            toggleImitateMessages();
        }
    });

    initWebSocket();

    console.log('WebSocket interceptor geïnstalleerd.');

    const commandButton = document.querySelector('.command-button');
    if (commandButton) {
        commandButton.addEventListener('click', toggleImitateMessages);
    }
})();
