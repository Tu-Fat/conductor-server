
const WebSocket = require('ws');
const Colors = require('colors');

const config = require('./Config');
const Helper = require('./Helper');
const listAllUser = require("./Commands").listAllUser;

const wss = new WebSocket.Server({ host: config.host, port: config.port }, () => {
    console.log('Server started!'.green);
    console.log('TYPE'.gray, 'Websocket'.green);
    console.log('HOST'.gray, config.host.green);
    console.log('PORT'.gray, config.port.toString().green);
    console.log('URL'.gray, ('ws://' + config.host + ':' + config.port).blue.bold);
    console.log();
    console.log();
    console.log();
});

// Broadcast to all.
wss.broadcast = function broadcast(data) {

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws) {

    if(!ws.username) {
        ws.username = 'USER_' + Math.round(Math.random()*1000);

        console.log(ws.username.blue + ' connected!'.green);
    }

    ws.on('message', function incoming(data) {
        console.log((ws.username + ' wants to write following message: ' + data).blue);
        let command = false;

        if(data[0] === '/') {
            console.log('It was a command!'.red);
            command = true;
        }

        // if not a command, then broadcast to everyone else.
        if(!command) {
            console.log('It was a text-message!'.blue);

            let dataToSend = {
                fromUser: ws.username,
                message: data
            };

            console.log(('Trying to send message to all users, besides OP: ' + JSON.stringify(dataToSend)).blue);
            wss.clients.forEach(function each(client) {

                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(dataToSend));
                }
            });
        }

        if(command) {
            switch(data) {
                case '/listAllUsers':
                    const users = JSON.stringify(listAllUser(wss));
                    ws.send(users);
                    console.log(('Result of command sent to OP: ' + users).red);
                    break;
                default:
                    console.log(('Sorry, OP, your Command ws not found:' + data).red);
                    ws.send('Command not found:' + data);
            }

        }

    });

});

