// import express modules
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('spdy');
const path = require('path');
const router = express.Router();

// import system settings
const networkSettings = require ('./config/network-settings');
const PORT = networkSettings.PORT;
const HOST = networkSettings.HOST;
const ADMIN_EMAIL = networkSettings.ADMIN_EMAIL;
const ENV = process.env.NODE_ENV;

var sslConfig = {
  key: fs.readFileSync(__dirname + '/config/private/ssl-keys/privKey.pem'),
  cert: fs.readFileSync(__dirname + '/config/private/ssl-keys/cert.pem')
};

// SERVER SETUP V1: self signed SSL certificates

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

// Create an HTTPS service 
https.createServer(sslConfig, app).listen(PORT, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('radio-scheduler server is listening on port: ' + PORT);
});

// Redirect from http port 80 to https
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);



/*
SERVER SETUP V2: automated SSL certificates from letsencrypt-express module


const leConfDir = '/config/private/ssl-keys';
// const leConfDir = require('os').homedir() + '/letsencrypt/etc';

// set up which certificate server to use, depending on ENV
const LEX = ENV === 'development' ? require('letsencrypt-express').testing() : require('letsencrypt-express');

// configure Let's Encrypt for SSL certificates
const lex = LEX.create({
  configDir: leConfDir,
  approveRegistration: function (hostname, cb) {
    cb(null, {
      domains: [HOST],
      email: ADMIN_EMAIL,
      agreeTos: true
    });
  }
});

// redirect http requests to our https server
const redirectHttp = function() {
  http.createServer(LEX.createAcmeResponder(lex, function redirectHttps(req, res) {
    res.setHeader('Location', 'https://' + req.headers.host + req.url);
    res.statusCode = 302;
    res.end('<!-- Hello Developer Person! Please use HTTPS instead -->');
  })).listen(80);
};

// business logic for https server


const serveHttps = function() {

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

  https.createServer(lex.httpsOptions, LEX.createAcmeResponder(lex, app)).listen(PORT);
  
  console.log('radio-scheduler listening at: ' + HOST + ':' + PORT);
  console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
};

redirectHttp();
serveHttps();

*/
