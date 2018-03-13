const request = require('request');

module.exports = class BotMyIp {
  init (callback) {
    var options = {
      'method': 'GET',
      'url': 'https://api.ipify.org?format=json'
    };

    request(options, (error, response, body) => {
      if (error) {
        return console.error('Failed: %s', error.message);
      }
      callback(body);
      return body;
    });
  }

  echo () {
    var sync = true;

    this.init(result => {
      this.setJson(result);
      sync = false;
    });
    while (sync) {
      require('deasync').sleep(100);
    }
  }

  setJson (json) {
    this.json = JSON.parse(json);
  }

  getJson () {
    return this.json;
  }
};

