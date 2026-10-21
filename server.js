const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const getTime = () => new Date().toTimeString().slice(0, 8);
console.log(`->[ЗАПУСК (${getTime()})] Сервер WebSocket запущено на порту 8080`);

let messages = []; 
let clientId = 0;

wss.on('connection', function(ws) {

    ws.clientId = ++clientId;
    console.log(`->[ПІДКЛЮЧЕННЯ (${getTime()})] Новий клієнт #${ws.clientId} підключився`);
    ws.send(JSON.stringify(messages), function(error){
        if (error) {
            console.error(`->[ПОМИЛКА (${getTime()})] Помилка при відправці клієнту #${ws.clientId}: ${error.message}`);
        } else {
            console.log(`->[УСПІХ (${getTime()})] Дані успішно відправлено клієнту #${ws.clientId}!`);
        }
    });

    ws.onmessage = function(event) {
        console.log(`->[${getTime()}] Отримано повідомлення від клієнта #${ws.clientId}: ${event.data}`);
        const newMsg = JSON.parse(event.data);
        
        messages.push(newMsg);

        for (let client of wss.clients){
            client.send(JSON.stringify(messages), function(error){
                if (error) {
                    console.error(`->[ПОМИЛКА (${getTime()})] Помилка при відправці клієнту #${client.clientId}: ${error.message}`);
                } else {
                    console.log(`->[УСПІХ (${getTime()})] Дані успішно відправлено клієнту #${client.clientId}!`);
                }
            });
        }
    }

    ws.on('close', function() {
        console.log(`->[ВІДКЛЮЧЕННЯ (${getTime()})] Клієнт #${ws.clientId} відключився`);
    });
});