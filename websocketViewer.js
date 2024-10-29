(function() {
    const fontLink = document.createElement("link");
    fontLink.href =
        "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    const style = document.createElement("style");
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .MSP2_Container {
            width: 400px;
            height: 500px;
            background-color: #1E293B;
            font-family: 'Roboto', sans-serif;
            border-radius: 10px;
            box-shadow: 0 10px 20px #00000030, 0 6px 6px rgba(0,0,0,0.23);
            display: flex;
            flex-direction: column;
            user-select: none;
        }

        .MSP2_Title {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            background-color: #1E293B;
            border-bottom: 1px solid #49505a;
            padding: 0 10px;
        }

        .MSP2_Title h1 {
            margin: 0 0 0 15px;
            font-size: 16px;
            font-weight: 550;
            text-transform: uppercase;
            color: #e9eff3;
        }

        .MSP2_Title button {
            background-color: #0F172A;
            border: 1px solid #49505a;
            color: #ffffff;
            font-size: 14px;
            font-weight: 400;
            cursor: pointer;
            margin-left: auto;
            margin-right: 20px;
            border-radius: 5px;
            width: 60px;
            height: 30px;
        }

        .MSP2_Body {
            flex-grow: 1;
            overflow-y: auto; /* Sta scrollen toe */
            background-color: #0F172A;
        }

        /* Aangepaste scrollbar stijlen */
        .MSP2_Body::-webkit-scrollbar {
            width: 8px;
            margin-left: -10px;
        }

        .MSP2_Body::-webkit-scrollbar-track {
            background: #0F172A;
        }

        .MSP2_Body::-webkit-scrollbar-thumb {
            background: #49505a;
            border-radius: 4px;
        }

        .green { background-color: #27c93f; }

        .MSP2_Messages {
            padding: 10px;
        }

        .WebSocketMessage {
            background-color: #1E293B;
            width: 100%;
            height: auto;
            margin: 5px auto;
            border: 1px solid #49505a;
            border-left: 3px solid #1dbd80;
            border-radius: 7px;
            padding: 5px;
            box-sizing: border-box;
            margin-bottom: 10px;
        }

        .MessageHeader {
            display: flex;
            align-items: center;
            color: #bed0db;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 550;
            height: 45px;
            padding: 0 0 0 10px;
        }

        .ws_time {
            margin-left: auto;
            margin-right: 10px;
        }

        .ws_message {
            padding: 0 5px 5px 15px;
            color: #e9eff3;
            font-size: 13px;
            text-align: left;
            word-wrap: break-word;
            white-space: normal;
        }
    `;

    document.head.appendChild(style);
    const uiContainer = document.createElement('div');
    uiContainer.className = 'MSP2_Container';
    uiContainer.id = 'uiContainer';
    uiContainer.innerHTML = `

    <div class="MSP2_Title">
        <h1>WebSocket Inspector</h1>
        <button id="clearButton">Clear</button>
    <div style="height: 50px;"></div>

    </div>
        <div class="MSP2_Body">
            <div class="MSP2_Messages" id="messageContainer">
                <!-- Incoming messages will be appended here -->
            </div>
        </div>
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

    function clearMessages() {
        document.getElementById('messageContainer').innerHTML = '';
    }

    document.getElementById('clearButton').addEventListener('click', clearMessages);

    function initWebSocket() {
        var nativeWebSocket = window.WebSocket;
        window.WebSocket = function(...args) {
            const socket = new nativeWebSocket(...args);
            window.ws = socket;
            console.log('WebSocket connected. You can now use ws.send() in the console.');
            socket.addEventListener('message', handleMessage);
            return socket;
        };
    }

    function handleMessage(event) {
        const message = event.data;
        const messageContainer = document.getElementById('messageContainer');

        const wsMessageElement = document.createElement('div');
        wsMessageElement.className = 'WebSocketMessage';
        wsMessageElement.innerHTML = `
            <div class="MessageHeader">
                <p class="ws_status">INCOMING</p>
                <p class="ws_time">${new Date().toLocaleTimeString()}</p>
            </div>
            <div class="ws_message">
                <p>${message}</p>
            </div>
        `;

        messageContainer.appendChild(wsMessageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    initWebSocket();
    console.log('WebSocket interceptor installed. Use toggleImitateMessages() to turn imitation on/off.');
})();
