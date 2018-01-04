const config = require('../configs/home-sweet-home');
const moment = require('moment');
const axios = require('axios');

class Netatmo {
  authorize() {
    // https://api.netatmo.com/oauth2/authorize?
    //     client_id=[YOUR_APP_ID]
    //     &redirect_uri=[YOUR_REDIRECT_URI]
    //     &scope=[SCOPE_DOT_SEPARATED]
    //     &state=[SOME_ARBITRARY_BUT_UNIQUE_STRING]
  }

  token() {
    // POST /oauth2/token HTTP/1.1
    //     Host: api.netatmo.com
    //     Content-Type: application/x-www-form-urlencoded;charset=UTF-8

    //     grant_type=authorization_code
    //     client_id=[YOUR_APP_ID]
    //     client_secret=[YOUR_CLIENT_SECRET]
    //     code=[CODE_RECEIVED_FROM_USER]
    //     redirect_uri=[YOUR_REDIRECT_URI]
    //     scope=[SCOPE_DOT_SEPARATED]
  }
  static getInfo() {

  }
}

module.exports = Netatmo;
