const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3050 });

var server = {

    onMessage: function incoming(message)
    {
        console.log('Received: %s', message);
    },

    onConnection: function connection(ws)
    {
        console.log('New connection');

        ws.on('message', server.onMessage);

        ws.send('hello');
    }
};

wss.on('connection', server.onConnection);
