// https://github.com/balloob/pynetgear/

const http = require('http');

class NetgearRouter {

  constructor() {
    this.sessionId = 'A7D88AE69687E58D9A00';

    this.action = {
      login: 'urn:NETGEAR-ROUTER:service:ParentalControl:1#Authenticate',
      getAttachedDevices: 'urn:NETGEAR-ROUTER:service:DeviceInfo:1#GetAttachDevice',
    };

    this.envelope = {
      login:
          '<?xml version="1.0" encoding="utf-8" ?>'
        + '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">'
        + '<SOAP-ENV:Header>'
        + '<SessionID xsi:type="xsd:string" xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance">{sessionId}</SessionID>'
        + '</SOAP-ENV:Header>'
        + '<SOAP-ENV:Body>'
        + '<Authenticate>'
        + '<NewUsername>{username}</NewUsername>'
        + '<NewPassword>{password}</NewPassword>'
        + '</Authenticate>'
        + '</SOAP-ENV:Body>'
        + '</SOAP-ENV:Envelope>',
      getAttachedDevices:
          '<?xml version="1.0" encoding="utf-8" standalone="no"?>'
        + '<SOAP-ENV:Envelope xmlns:SOAPSDK1="http://www.w3.org/2001/XMLSchema" xmlns:SOAPSDK2="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAPSDK3="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">'
        + '<SOAP-ENV:Header>'
        + '<SessionID>{sessionId}</SessionID>'
        + '</SOAP-ENV:Header>'
        + '<SOAP-ENV:Body>'
        + '<M1:GetAttachDevice xmlns:M1="urn:NETGEAR-ROUTER:service:DeviceInfo:1">'
        + '</M1:GetAttachDevice>'
        + '</SOAP-ENV:Body>'
        + '</SOAP-ENV:Envelope>'
    };
  }

  request(action, params, callback) {
    params = params || {};

    let postData = this.formatEnvelope(this.envelope[action], params);

    let httpOpts = {
      host: 'routerlogin.net',
      port: 5000,
      path: '/soap/server_sa/',
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': this.action[action],
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    let request = http.request(httpOpts, (response) => {
      response.setEncoding('utf8');
      if(typeof callback === 'function') {
        callback(response);
      }
    });

    request.write(postData);
    request.end();

    return request;
  }

  requestPromise(action, params) {
    return new Promise((resolve, reject) => {
      let data = '';

      let request = this.request(action, params, (response) => {
        if (response.statusCode === 200) {
          response.on('data', function (chunk) {
            data += chunk;
          });

          response.on('end', () => {
            resolve(data);
          });
        }
      });

      request.on('error', (err) => {
        reject(err);
      });
    });
  }

  formatEnvelope(envelope, params) {
    let formattedEnvelope = envelope;
    for(let param in params) {
      let value = params[param];
      formattedEnvelope = formattedEnvelope.replace('{' + param +'}', value);
    }

    return formattedEnvelope;
  }

  isValidResponse(data) {
    return data.indexOf('<ResponseCode>000</ResponseCode>') > -1;
  }

  async login(sessionId, username, password) {
    sessionId = sessionId || this.sessionId;
    let data = await this.requestPromise('login', {
      sessionId: sessionId,
      username: username,
      password: password
    });

    return this.isValidResponse(data);
  }

  async getAttachedDevices(sessionId) {
    sessionId = sessionId || this.sessionId;

    let data = await this.requestPromise('getAttachedDevices', { sessionId: sessionId })
    let dataString = data.substring(
      data.indexOf('<NewAttachDevice>') + '<NewAttachDevice>'.length,
      data.indexOf('</NewAttachDevice>')
    );

    let dataSplit = dataString.split('@');
    let numberOfDevices = dataSplit[0];
    let attachDevices = [];
    for(let deviceString of dataSplit) {
      let deviceSplit = deviceString.split(';');

      if (deviceSplit.length === 8) {
        attachDevices.push({
          ip_addr: deviceSplit[1],
          name: deviceSplit[2],
          mac_addr: deviceSplit[3],
          connection_type: deviceSplit[4],
          bandwidth: deviceSplit[5],
          signal_strength: deviceSplit[6],
          access_control: deviceSplit[7],
        });
      }
    }

    return {
      devices: attachDevices
    };
  }
}

module.exports = NetgearRouter;
