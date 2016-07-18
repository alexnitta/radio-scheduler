// import express modules
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('spdy');
const path = require('path');
const rp = require('request-promise');

// import system settings
const networkSettings = require('./config/network-settings');
const PORT = networkSettings.PORT;
// const HOST = networkSettings.HOST;
// const ADMIN_EMAIL = networkSettings.ADMIN_EMAIL;
// const ENV = process.env.NODE_ENV;

const sslConfig = {
  key: fs.readFileSync(__dirname + '/config/private/ssl-keys/privKey.pem'),
  cert: fs.readFileSync(__dirname + '/config/private/ssl-keys/cert.pem'),
};

// SERVER SETUP V1: self-signed SSL certificates

// instantiate server application
const app = express();

//serve static files from client folder only
app.use(express.static(__dirname + '/../client'));

// send requests for root to index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./client/index.html'));
});

app.get('/api/npr-data', (req, res) => {
  
  const token = require('./config/private/api-keys').nprToken;
  const lat = req.query.lat;
  const long = req.query.long;

  // configuration of API GET request
  
  // @TODO: even though the header is set correctly, I'm getting a 401 back from the NPR API
  // I generated the access token from the instructions at https://github.com/adafruit/node_npr
  // and then tested them manually at http://dev.npr.org/api/ 
  // but was also given a 401 there as well.
  // I'm switching to a mock data set to show how it would look if this were working correctly
  
  const options = {
    uri: 'https://api.npr.org/stationfinder/v2/organizations',
    headers: {
      'Authorization': `Bearer ${token}`,
      'lat': lat,
      'long': long
    },
    json: true // Automatically parses the JSON string in the response 
  };
  
  rp(options)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
  
  
  // sample code from https://github.com/adafruit/node_npr
  
  // const NPR = require('npr-api'),
  //   npr = new NPR();
    
   
  // npr.one.init(token)
  //   .then(function() {
  //     return npr.one.stationfinder();
  //   })
  //   .then(function(recommendations) {
  //     console.log('first result:', recommendations[0]);
  //     res.send(recommendations);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });  
  
});


// redirect wild card requests to root
app.get('/*', (req, res) => {
  res.redirect('/');
});

// Create an HTTPS service
https.createServer(sslConfig, app).listen(PORT, (err) => {
  console.log('radio-scheduler server is listening on port: ' + PORT);
  if (err) {
    return console.log(err);
  }
});

// Redirect from http port 80 to https
http.createServer((req, res) => {
  res.writeHead(301, { Location: 'https://' + req.headers['host'] + req.url });
  res.end();
}).listen(80);



/*
SERVER SETUP V2: automated SSL certificates from letsencrypt-express module


const leConfDir = '/config/private/ssl-keys';
// const leConfDir = require('os').homedir() + '/letsencrypt/etc';

// set up which certificate server to use, depending on ENV
const LEX = ENV === 'development' ? require('letsencrypt-express').testing() 
  : require('letsencrypt-express');

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
