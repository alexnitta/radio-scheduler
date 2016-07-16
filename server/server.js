// import express modules
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const router = express.Router();

// import system settings
const networkSettings = '/../config/network-settings';
const PORT = networkSettings.PORT;
const ENV = process.env.NODE_ENV;
const sslSettings = {
  key: fs.readFileSync('/config/keys/privKey.pem'),
  cert: fs.readFileSync('/config/keys/cert.pem')
};

// instantiate server application
const app = express();

// serve static files from client folder only
app.use('/static', express.static(__dirname + '/../client'));

// send requests for root to index.html
app.get('/', function(req, res) {
  res.sendFile(path.resolve('./client/index.html'));
});

// redirect wild card requests to root
app.get('/*', function (req, res) {
  res.redirect('/');
});

// create an HTTPS service 
https.createServer(sslSettings, app).listen(PORT, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('radio-scheduler server is listening on port: ' + PORT + ' in ' + ENV + ' environment');
});

// redirect from http port 80 to https
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

module.exports = app;
