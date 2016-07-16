const networkSettings = {
  PORT: process.env.PORT || 4300,
  URL: process.env.NODE_ENV === 'production' ? 'https://production.url.REPLACE_ME:443' : 'https://127.0.0.1:4300',
  HOST: process.env.NODE_ENV === 'production' ? 'production.url.REPLACE_ME' : '127.0.0.1'
};

module.exports = networkSettings;
