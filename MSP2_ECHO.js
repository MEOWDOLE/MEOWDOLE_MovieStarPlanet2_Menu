(function() {
    const discord_webhook = "https://discord.com/api/webhooks/1300508660870676603/dVuSY_7ZP_5HSQMCppfpxH7SNhIgU24FROiLHxbSSbhTxtCkaes1JRyzqhlkafBxvYs-";

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
            user-select: none;

            transition: all 0.3s ease;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translate(-50%, -10px); }
            to { opacity: 1; transform: translate(-50%, 0); }
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

        .fade-out {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        

        .repeater_Container {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            position: fixed; /* Veranderd van 'absolute' naar 'fixed' */
            top: 50%; /* Maakt het verticaal gecentreerd */
            left: 50%; /* Maakt het horizontaal gecentreerd */
            width: 500px;
            max-width: 400px;
            background: #0f172afa;
            border-radius: 16px;
            box-shadow: 0 8px 24px #0000004d, 0 0 0 1px var(--border-color);
            opacity: 0;
            z-index: 9999;
            backdrop-filter: blur(12px);
            animation: slideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            transition: transform 0.5s ease, opacity 0.5s ease; /* Voeg transities toe */

            height: auto;
            padding-bottom: 15px;
        }

        .repeater_Container.close {
            transform: translateY(-100%); /* Beweeg naar boven */
            opacity: 0; /* Vervaag naar transparant */
        }

        @media (max-width: 480px) {
            .quiz-container {
                width: 90%;
            }
        }

        .repeater_Header {
            background: #1e293b;
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 16px 16px 0 0;
            cursor: move;
        }

        .repeater_Title {
            color: var(--text-color);
            font-size: 14px;
            font-weight: 600;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .repeater_Title::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            background: var(--dissconnected);
            border-radius: 50%;
            box-shadow: 0 0 8px var(--dissconnected);
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .repeat_Close {
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

        .repeat_Content {
            font-family: var(--font-family);
            width: 100%;
            height: calc(100% - 48px);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            align-content: center;
            gap: 8px;
        }

        .repeat_Close:hover {
            background: #334155;
            color: var(--text-color);
        }

        .MSP2_Repeates {
            background-color: var(--secondary-bg);
            width: 375px;
            height: auto;
            margin-top: 8px;
            border-radius: var(--basic-radius);
        }

        .repeater_Title.connected::before {
            content: '';
            display: block;
            background-color: green;
            box-shadow: 0 0 8px var(--connected);
        }
        

        .MSP2_Moods {
            background-color: var(--secondary-bg);
            width: 375px;
            height: auto;
            border-radius: var(--basic-radius);
        }

        .repeat_Header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
            padding: 8px 16px;
            flex-direction: column;
        }

        .repeat_Header h3 {
            color: var(--text-color);
            font-size: 12px;
            font-weight: 600;
        }



        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background-color: #c968805d;
            pointer-events: none;
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .repeater_x {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between; /* Positions switch to the right */
            gap: 8px;
            padding: 16px 0;
            color: var(--text-color);
            font-family: var(--font-family);
            font-size: 16px;
        }

        .switch {
            position: relative;
            display: inline-block;
            width: 44px; /* Reduced width */
            height: 24px; /* Reduced height */
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--dissconnected);
            transition: 0.4s;
            border-radius: 24px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 18px; /* Reduced size */
            width: 18px; /* Reduced size */
            left: 3px;
            top: 1.5px;
            bottom: 3px;
            background-color: var(--text-color);
            transition: 0.4s;
            border-radius: 50%;
            border: 1px solid var(--secondary-bg);
        }

        input:checked + .slider {
            background-color: var(--slider-green); /* Uses the green color defined */
        }

        input:focus + .slider {
            box-shadow: 0 0 1px var(--slider-green);
        }

        input:checked + .slider:before {
            transform: translateX(20px); /* Adjusted for smaller size */
        }

        .discord_Content {
            font-family: var(--font-family);
            width: 100%;
            height: calc(100% - 48px);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            align-content: center;
            gap: 8px;
            margin-top: 8px;
        }

        .MSP2_Discord {
            background-color: var(--secondary-bg);
            width: 375px;
            height: auto;
            border-radius: var(--basic-radius);
        }

        .discord_Header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
            padding: 8px 16px;
            flex-direction: column;
        }

        .discord_Header h3 {
            color: var(--text-color);
            font-size: 12px;
            font-weight: 600;
        }

        .discord_x {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between; /* Positions switch to the right */
            gap: 8px;
            padding: 16px 0;
            color: var(--text-color);
            font-family: var(--font-family);
            font-size: 16px;
        }

    `;

    document.head.appendChild(style);

    const uiContainer = document.createElement('div');
    uiContainer.classList.add('repeater_Container');
    uiContainer.id = 'repeater_Container';
    uiContainer.innerHTML = `
        <div class="repeater_Header">
            <h3 class="repeater_Title">MSP2_Repeater</h3>
            <button class="repeat_Close">×</button>
        </div>

        <div class="repeat_Content">
            <div class="MSP2_Repeates">
                <div class="repeat_Header">
                    <h3 class="repeat_Title">Repeat</h3>
                    <div class="repeater_x">
                        <p>Enable Repeater</p>
                        <label class="switch" id='repeat_switch'>
                          <input type="checkbox">
                          <span class="slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="discord_Content">
            <div class="MSP2_Discord">
                <div class="discord_Header">
                    <h3 class="discord_Title">Discord</h3>
                    <div class="discord_x">
                        <p>Enable Discord Loggin</p>
                        <label class="switch" id='dc_switch'>
                          <input type="checkbox">
                          <span class="slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(uiContainer);

    const repeatSwitch = document.querySelector('#repeat_switch input');
    const dcSwitch = document.querySelector('#dc_switch input');

    repeatSwitch.addEventListener('change', function() {
        if (this.checked) {
            imitateMessages = true;

        } else {
            imitateMessages = false;
        }
    });

    dcSwitch.addEventListener('change', function() {
        if (this.checked) {
            sendToDiscord = true;
        } else {
            sendToDiscord = false;
        }
    });

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

    const closeButton = document.querySelector('.repeat_Close');

    function closeContainer() {
        uiContainer.remove();
    }

    closeButton.addEventListener('click', closeContainer);
    

    uiContainer.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);
    

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target.closest('.repeater_Header')) {
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

    window.ws = null;
    let imitateMessages = false;
    let sendToDiscord = false;

    function initWebSocket() {
        let nativeWebSocket = window.WebSocket;
        window.WebSocket = function(...args) {
            const socket = new nativeWebSocket(...args);
            window.ws = socket;

            socket.addEventListener('open', function() {
                const title = uiContainer.querySelector('.repeater_Title');
                title.classList.add('connected');
            
                console.log(`
                ******************************************
                            WEBSOCKET CONNECTED
                ******************************************
                `);
            });
            

            socket.addEventListener('error', function() {
                console.error('WebSocket error');
                uiContainer.querySelector('.repeater_Title').classList.remove('connected');
                console.log(`
                ******************************************
                            WEBSOCKET ERROR
                ******************************************
                `);
            });

            socket.addEventListener('message', handleMessage);

            function handleMessage(event) {
                try {
                    const data = JSON.parse(event.data.substring(2));
                    if (data[0] === "message" && data[1].messageType === "2001") {
                        const message = data[1].messageContent.message;
                        const profileID = data[1].messageContent.profileId;
                        
                        if (imitateMessages) {
                            setTimeout(() => sendImitatedMessage(message), 1);
                        }
        
                        if (sendToDiscord && discord_webhook) {
                            fetch(discord_webhook, {
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
                    console.error(error);
                }
            }

            function sendImitatedMessage(message) {
                const bericht = `42["chatv2:send",{"message":"${message}"}]`;
                if (window.ws) {
                    ws.send(bericht);
                } else {
                    console.log('lol error successsss');
                }
            }
            
            return socket;

        };
    };

    initWebSocket();

})();

// fix unexpected end of JSON input at JSON.parse (<anonymous> at handleMessage)