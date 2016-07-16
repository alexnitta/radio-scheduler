const networkSettings = {
  PORT: process.env.PORT || 443,
  URL: process.env.NODE_ENV === 'production' ? 'https://production.url.REPLACE_ME' : 'https://127.0.0.1',
  HOST: process.env.NODE_ENV === 'production' ? 'production.url.REPLACE_ME' : '127.0.0.1'
};

module.exports = networkSettings;
