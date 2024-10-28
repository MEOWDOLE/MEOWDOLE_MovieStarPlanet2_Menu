// -------------------- IMITATOR --------------------
// Zet deze script in the dev console en gebruik
// toggleImitateMessages() om berichten te imiteren.
// --------------------------------------------------

(function() {
    window.ws = null;
    let imitateMessages = false;

    function initWebSocket() {
        var nativeWebSocket = window.WebSocket;
        window.WebSocket = function (...args) {
            const socket = new nativeWebSocket(...args);
            window.ws = socket;
            console.log('WebSocket verbonden. Je kunt nu ws.send() gebruiken in de console.');
            socket.addEventListener('message', handleMessage);
            return socket;
        };
    }

    function handleMessage(event) {
        try {
            const data = JSON.parse(event.data.substring(2));
            if (data[0] === "message" && data[1].messageType === "2001") {
                const message = data[1].messageContent.message;
                console.log('%c Ontvangen bericht: ' + message, 'color: green; font-weight: bold; font-size: 14px;');
                
                if (imitateMessages) {
                    setTimeout(() => sendImitatedMessage(message), 1);
                }
            }
        } catch (error) {
            console.error('Fout bij het verwerken van het bericht:', error);
        }
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
    };

    initWebSocket();

    console.log('WebSocket interceptor geïnstalleerd. Gebruik toggleImitateMessages() om imitatie aan/uit te zetten.');
})();
