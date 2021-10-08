const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();

const static = path.join(__dirname, 'dist');

app.use('/', express.static(static));

app.get('/', function(req, res) {
    res.sendFile(path.join(static, 'index.html'));
});

const port = process.env.PORT || 8080;
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    if(ws.readyState){
        ws.send('Welcome To WS Chat Server');
    }

    ws.on('message', (data)=>{
        wss.clients.forEach((clientws) => {
            clientws.send(data);
        });
    });
});

server.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
});