#Radio-Scheduler

##Description
Problem:  You love public radio but you are new to the area. Where to begin?

Solution: Use this simple app! It uses your geolocation data to show public radio scheduling in your area.

##Scope
This is a full-stack app, including a React front end with a Node/Express backend. There isn't much user-centric data, so this is a front-end focused app.

##Technical Choices
In setting up this app, I focused on building a framework that would allow for expansion with more development time. I used React as a frontend framework because it is easy to compose into views manually, but also can handle more complex state requirements with Redux.

The backend is a lightweight Node/Express server that serves up the `index.html`, the static CSS, JS and image files, and a single API endpoint at `/api/npr-data/`. There is not currently a database, because the only details regarding the state of the app - i.e. the user's latitude and longitude - are sourced from the browser's geolocation API. Since the Node/Express architecture is in place, it would be relatively easy to implement a database and store the program state in it.

I started out by setting up HTTPS, because I know that Chrome requires it for geolocation data. Since Chrome is one of the most commonly used browsers, it made sense to make sure this was in place before building the app. Setting up the SSL certificates ended up eating into my development time, and as a result I didn't get to debug a few other things, namely the NPR API.

I looked up the [API reference](http://dev.npr.org/api/) to get an example schema of the data that would be returned, then structured my React components around that. Once I got further along, I tested the credentials I created using their recommended steps, but kept getting a 401 error. As it turns out, there's not much documentation on the API yet, and not many people discussing how to debug it online. 

If I had more time, I would contact the developer who wrote the NPR API and figure out why my access token doesn't work. For now, I'm using mock data to show how the UI looks. I also spent a good deal of time setting up my development environment, and the Gulpfile is working smoothly. If I were to do this project over, I would spend less time with automation and more time writing tests.

##Portfolio
Here are some links to my LinkedIn and other work:

[LinkedIn](https://www.linkedin.com/in/alexnitta)

*Applications*

GitAchieve: [Repo on GitHub](https://github.com/alexnitta/GitAchieve) / [Deployed Site](http://gitachieve.com)

Hurryup: [Repo on GitHub](https://github.com/alexnitta/hurry-up)

Amblr: [Repo on GitHub](https://github.com/alexnitta/amblr)



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


Per [this post](http://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate), when accessing your local development site, you will need to set a flag in Chrome to allow self-signed certificates, as follows: 

1.  Paste this in your chrome: `chrome://flags/#allow-insecure-localhost`
2. You should see highlighted text saying: *Allow invalid certificates for resources loaded from localhost*
3. Click `Enable`.

