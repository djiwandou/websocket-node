const WebSocket = require('ws');
var express = require('express');
var app = express();
var path = require('path');

//web socket server code
const wss = new WebSocket.Server({
    port: 3000
});
console.log("Web Socket Server started");
const MAINTENANCE = true

let version = '0.0.0'

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {

        if (message = 'version_request') {
            console.log('received: %s', message);
            ws.send(JSON.stringify({
                RS_I: version,
                RS_A: version,
                SP_I: version,
                SP_A: version
            }))
        }
    })

    let time = 10

    while (time != 0) {

        if (!MAINTENANCE) {
            version = '1.15.5'
        }

        ws.send(JSON.stringify({
            RS_I: version,
            RS_A: version,
            SP_I: version,
            SP_A: version
        }))
        time = time - 1
    }
})

// web view at http://localhost:8080/admin-ws
app.get('/admin-ws', function(req, res) {
    res.sendFile(path.join(__dirname + '/admin-ws/index.html'));
});

app.listen(8080);