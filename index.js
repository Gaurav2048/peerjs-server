var fs = require('fs');
const express = require('express');
const { ExpressPeerServer } = require('peer');
var https = require('https');
const app = express();
var privateKey = fs.readFileSync('./security/key.pem');
var certificate = fs.readFileSync('./security/cert.pem');
var credentials = { key: privateKey, cert: certificate };
app.get('/', (req, res, next) => res.send('This server is powered by Express.'));

// =======
var server = https.createServer(credentials, app);
server.listen(9000);

const peerServer = ExpressPeerServer(server, {
    path: '/myapp'
});

app.use('/peerjs', peerServer);