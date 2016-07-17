const networkSettings = {
  PORT: process.env.PORT || 443,
  URL: process.env.NODE_ENV === 'development' ? 'https://127.0.0.1:443' : 'https://production.url.REPLACE_ME:443',
  HOST: process.env.NODE_ENV === 'development' ? '127.0.0.1' : 'production.url.REPLACE_ME'
};

module.exports = networkSettings;
