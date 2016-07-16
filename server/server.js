const express = require('express');
const path = require('path');
const https = require('https');
const router = express.Router();
const networkSettings = '/../config/network-settings';
const PORT = networkSettings.PORT;

pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
  const app = express();
 
  app.get('/',  requireAuth, function(req, res){
    res.send('o hai!');
  });
  
  // send requests for root to index.html
  app.get('/', requireAuth, function(req, res) {
    res.sendFile(path.resolve('./client/index.html'));
  });
 
  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(PORT);
});



// instantiate server
const app = express();

// serve static files from client folder only
app.use('/static', express.static(__dirname + '/../client'));



// redirect wildcard requests to root
app.get('/*', function (req, res) {
  res.redirect('/');
});

// Run server listening on the local environment
const server = https.createServer(app);

server.listen(PORT);
console.log('radio-scheduler server listening on port ' + PORT + ' in ' + process.env.NODE_ENV + ' mode');

// socket.io
const io = require('socket.io')(server);
require('./helpers/socket')(io);

module.exports = app;
