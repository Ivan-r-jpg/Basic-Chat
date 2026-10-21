    const chatDiv = document.getElementById('chat');
    chatDiv.innerHTML = '<p style="text-align: center; color: #aaa; margin-top: 180px; font-style: italic;">Повідомлень ще немає. Напишіть першим!</p>';
    const sendBtn = document.getElementById('sendBtn');
            const openBtn = document.getElementById('openBtn');
            const closeBtn = document.getElementById('closeBtn');
            const usernameInput = document.getElementById('username');
            const messageInput = document.getElementById('messageText'); 
            
            let socket = null; 

            sendBtn.disabled = true;
            closeBtn.disabled = true;
            usernameInput.disabled = true;
            messageInput.disabled = true;

            openBtn.addEventListener('click', function () {

                if (socket && socket.readyState === WebSocket.OPEN) {
                    window.alert("-> Ви вже підключені до сервера.");
                    return;
                }

                socket = new WebSocket('ws://localhost:8080');

                socket.onopen = function () {
                    window.alert("-> Підключення до сервера встановлено.");
                    openBtn.disabled = true;
                    sendBtn.disabled = false;
                    closeBtn.disabled = false;
                    usernameInput.disabled = false;
                    messageInput.disabled = false;
                };

                socket.onmessage = function (event) {
                    const messages = JSON.parse(event.data);

                    chatDiv.innerHTML = '';
                    for (let msg of messages) {
                        chatDiv.innerHTML += `<p><b>${msg.user}:</b> ${msg.text}</p>`;
                    }
                };

                socket.onclose = function () {
                    window.alert("-> З'єднання з сервером втрачено.");
                    sendBtn.disabled = true;
                    closeBtn.disabled = true;
                    openBtn.disabled = false;
                    usernameInput.disabled = true;
                    messageInput.disabled = true;
                };
            });

            function sendMessage() {

                if (!socket || socket.readyState !== WebSocket.OPEN) {
                    window.alert("-> З'єднання ще не встановлено... Зачекайте.");
                    return;
                }

                const msgData = {
                    user: document.getElementById('username').value || 'Анонім',
                    text: document.getElementById('messageText').value
                };

                socket.send(JSON.stringify(msgData));
                document.getElementById('messageText').value = ''; 
            }

            closeBtn.addEventListener('click', function () {
                if (socket) {
                    socket.close(1000, "Клієнт завершив роботу");
                    
                    sendBtn.disabled = true;
                    closeBtn.disabled = true;
                    openBtn.disabled = false;
                }
            });