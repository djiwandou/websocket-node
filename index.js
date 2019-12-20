const WebSocket = require('ws');
var express = require('express');
var app = express();
var path = require('path');

//websocket init
const wss = new WebSocket.Server({
    port: 3000
});
console.log("Web Socket Server started on port 3000");
//const and global variables
const MAINTENANCE = false
var version_app_current = '1.15.4';
var maintenance_mode = false;
let version = '0.0.0'

// web view at http://localhost:8080/admin-ws
app.get('/admin-ws', function(req, res) {
    res.sendFile(path.join(__dirname + '/admin-ws/index.html'));
});

app.get('/admin-ws-version', function(req, res) {
    version_app_current = req.query.version_field;
    res.send('current version set: '+version_app_current);
    console.log("Version: %s", version_app_current);
});

app.get('/admin-ws-maintenance', function(req, res) {
    maintenance_mode = req.query.maintenance_mode ? true: false;
    res.send('maintenance mode: '+maintenance_mode);
    console.log("Maintenance mode: %s", maintenance_mode);
});

//websocket listener
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
            version = version_app_current
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

app.listen(8080);