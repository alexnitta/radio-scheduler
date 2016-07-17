#Radio-Scheduler
A simple app that uses geolocation and the [NPR One API] (http://dev.npr.org/) to show public radio scheduling in your area.
##Developer Guide
To get up and running:

1. Clone down this repository.
2. From the root, run `npm install`. You may need to `sudo npm install` depending on your access.
3. From `client`, run `bower install`. You may need to `sudo bower install --allow-root` depending on your access.
4. Create the following config folders and files:
  1. `server/config/private/ssl-keys`, containing two files:
    1. `cert.pem` containing your SSL certificate
    2. `privKey.pem` containing your private key (more on creating these below)
  2. `server/config/private/.env.json`, like this: 
  ```javascript
  {
    "NODE_ENV": "development"
  }
  ```
  3. `server/private/api-keys.js`, like this: (replace [API_KEY] with your own key - register [here]) (http://dev.npr.org/guide/prerequisites/))
  ```javascript
  {
  const apiKeys = {
    npr: [API_KEY]
  };

  module.exports = apiKeys;
  }
  ```
  4. `server/network-settings.js`, where you will set up your domain name. Replace [DOMAIN] with your hosted domain name, if you have one.
  ```javascript
  const networkSettings = {
    PORT: process.env.PORT || 443,
    URL: process.env.NODE_ENV === 'development' ? 'https://127.0.0.1:443' : '[DOMAIN]',
    HOST: process.env.NODE_ENV === 'development' ? '127.0.0.1' : '[DOMAIN]'
  };

  module.exports = networkSettings;
  ```
5. `sudo gulp` to do the following:
  * Compile CSS from Sass
  * Convert JSX -> ES6 -> ES5
  * Start up Nodemon with server.js and set the NODE_ENV to 'development'
  * Watch for changes in `client/views` and `client/styles` and rebuild CSS / JS when files change.

###How to create a self-signed SSL certificate with openssl
*Adapted from [this post](http://www.i-visionblog.com/2014/10/create-https-tls-ssl-application-with-express-nodejs-in-localhost-openssl.html)*

Enter the following commands in your bash terminal, making sure to:
*replace [/path/to/privKey.pem] with local path to the private key file, ending in `server/config/private/ssl-keys/privKey.pem`
*replace [/path/to/cert.pem] with local path to the certificate file, ending in `server/config/private/ssl-keys/cert.pem`

1. `openssl genrsa 1024 [/path/to/privKey.pem]`
2.  `openssl req -new -key [/path/to/privKey.pem] -out csr.pem` (follow the prompts to enter information that is included in the certificate request)
3.  `openssl x509 -req -days 365 -in csr.pem -signkey [/path/to/privKey.pem] -out [/path/to/cert.pem]`

When accessing your local development site, you will need to set a flag in Chrome to allow self-signed certificates, as follows: 

1.  Paste this in your chrome: `chrome://flags/#allow-insecure-localhost`
2. You should see highlighted text saying: *Allow invalid certificates for resources loaded from localhost*
3. Click `Enable`.
