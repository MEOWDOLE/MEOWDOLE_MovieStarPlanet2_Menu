(function() {
    const style = document.createElement('style');
    style.textContent = `
    :root {
        --primary-bg: #0f172afa;
        --secondary-bg: #1e293b;
        --border-color: #6366f126;
        --basic-radius: 8px;
        --dissconnected: #FF5C5C;
        --connected: #25df63;
        --color-loading: #FFD700;
        --text-color: #f8fafc;
        --font-family: 'Inter', system-ui, -apple-system, sans-serif;
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
        from { opacity: 1; }
        to { opacity: 0; }
    }

    
    .animation_Container {
        font-family: var(--font-family);
        position: fixed;
        top: 15px;
        left: 250px;
        width: 500px;
        max-width: 400px;
        background: var(--primary-bg);
        border-radius: 16px;
        box-shadow: 0 8px 24px #0000004d, 0 0 0 1px var(--border-color);
        opacity: 0;
        z-index: 9999;
        backdrop-filter: blur(12px);
        animation: slideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        transition: width 0.3s ease;
        height: auto;
        padding-bottom: 15px;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        transition: opacity 3s ease; 
        opacity: 1 !important;
    }
    
    .animation_Header {
        background: var(--secondary-bg);
        padding: 9px 16px;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 16px 16px 0 0;
        cursor: move;
    }
    
    .animation_Title {
        color: var(--text-color);
        font-size: 14px;
        font-weight: 600;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 16px;
    }
    
    .animation_Title::before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        background: var(--dissconnected);
        border-radius: 50%;
        box-shadow: 0 0 12px 3px var(--dissconnected);
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .animation_Title.connected::before {
        background: var(--connected);
        box-shadow: 0 0 12px 3px var(--connected);
    }
    
    .animation_Close {
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
    
    .animation_Content {
        width: 100%;
        height: calc(100% - 48px);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        align-content: center;
        gap: 2px;
    }
    
    .animation_Close:hover {
        background: #334155;
        color: var(--text-color);
    }
    
    .MSP2_Emotes, .MSP2_Moods {
        background-color: var(--secondary-bg);
        width: 375px;
        height: auto;
        margin-top: 8px;
        border-radius: var(--basic-radius);
    }
    
    .emote_Header, .mood_Header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 2px 16px;
    }
    
    .emote_Header h3, .mood_Header h3 {
        color: var(--text-color);
        font-size: 12px;
        font-weight: 600;
    }
    
    .emote_Buttons, .mood_Buttons {
        display: flex;
        align-items: flex-start;
        padding: 8px 0;
        gap: 8px;
        flex-direction: column;
    }
    
    .emote_Buttons button, .mood_Buttons button {
        width: calc(100% - 10px);
        margin: 0 auto;
        background: #0f172aad;
        border: none;
        color: var(--text-color);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: var(--basic-radius);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
    }
    
    .emote_Buttons button:hover, .mood_Buttons button:hover {
        color: var(--dissconnected);
        background: #0f172a;
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
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.className = 'animation_Container';
    container.id = 'animation_Container';
    container.innerHTML = `
        <div class="animation_Header">
            <h3 class="animation_Title" id="animation_Title">MSP2.Meowd0le</h3>
            <button class="animation_Close">×</button>
        </div>
        <div class="animation_Content">
            <div class="MSP2_Emotes">
                <div class="emote_Header">
                    <h3 class="emote_Title">Emotes</h3>
                </div>
                <div class="emote_Buttons">
                    <button class="emote_LvlUp" data-message='42["avt:lvlup",{"newLevel":3}]'>Level Up</button>
                    <button class="emote_BasicGift" data-message='42["7006",{"emote":"gift_pickup_regular_withcoins","looping":false}]'>Basic Gift</button>
                    <button class="emote_Heart" data-message='42["7006",{"emote":"gift_pickup_heart","looping":false}]'>Halloween Heart</button>
                    <button class="emote_VIPGift" data-message='42["7006",{"emote":"gift_pickup_vip_withmanycoins","looping":false}]'>VIP Gift</button>
                    <button class="emote_Skull" data-message='42["7006",{"emote":"gift_pickup_halloween_skull","looping":false}]'>Event Skull</button>
                </div>
            </div>
            <div class="MSP2_Moods">
                <div class="mood_Header">
                    <h3 class="mood_Title">Moods</h3>
                </div>
                <div class="mood_Buttons">
                    <button class="mood_Bended">2023_bended_lz</button>
                    <button class="mood_Spider">2023_spidercrawl_lsz</button>
                    <button class="mood_Frosty">xmas_2022_frosty_dg</button>
                    <button class="mood_Freezing">xmas_2022_freezing_lsz</button>
                    <button class="mood_Turky">2022_turkeywalk_lsz</button>
                    <button class="mood_Teenwalk">bad_2022_teenwalk_dg</button>
                    <button class="mood_Swim">swim_new</button>
                    <button class="mood_Skating">noshoes_skating</button>
                </div>
            </div>
        </div>
        
        `;

    document.body.appendChild(container);

    const uiContainer = document.getElementById('animation_Container');
    const header = uiContainer.querySelector('.animation_Header');
    const closeButton = uiContainer.querySelector('.animation_Close');

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

    header.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        isDragging = true;
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

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.left = `${xPos}px`;
        el.style.top = `${yPos}px`;
    }

    closeButton.addEventListener('click', () => {
        uiContainer.remove();
    });
    
    

    uiContainer.querySelectorAll('.emote_Buttons button, .mood_Buttons button').forEach(button => {
        button.addEventListener('click', function(e) {
            let rect = this.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            let diameter = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${x - diameter / 2}px`;
            ripple.style.top = `${y - diameter / 2}px`;
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    function initWebSocket() {
        const originalSocket = window.WebSocket;

        window.WebSocket = function(...args) {
            const socket = new originalSocket(...args);

            window.ws = socket;

            socket.addEventListener('open', function() {
                const title = uiContainer.querySelector('.animation_Title');
                title.classList.add('connected');

                console.log(`
                ******************************************
                            WEBSOCKET CONNECTED
                ******************************************
                `)
            });

            socket.addEventListener('message', function(event) {
                console.log('Message received:', event.data);
            });

            socket.addEventListener('error', function() {
                console.error('WebSocket error');
                uiContainer.querySelector('.animation_Title').classList.remove('connected');
                console.log(`
                ******************************************
                            WEBSOCKET ERROR
                ******************************************
                `);
            });

            function sendSocketMessage(message) {
                const bericht = `${message}`;
                console.log(`Custom message to Socket: ${bericht}`);
                if (window.ws) {
                    ws.send(bericht);
                } else {
                    console.log(`You're cooked`);
                    
                }
            };

            document.querySelectorAll('.emote_Buttons button').forEach(button => 
                button.addEventListener('click', () => 
                    sendSocketMessage(button.getAttribute('data-message'))
                )
            );

            document.querySelectorAll('.mood_Buttons button').forEach(button => 
                button.addEventListener('click', () => 
                    sendSocketMessage(`42["7005",{"mood":"${button.textContent}"}]`)
                )
            );
            
            return socket;
        };
    };

    initWebSocket();
    
})();
