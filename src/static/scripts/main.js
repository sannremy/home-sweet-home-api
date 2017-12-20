((global) => {
  let getServiceByName = (serviceName) => {
    let httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      console.log('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          console.log(JSON.parse(httpRequest.responseText));
        } else {
          console.log('There was a problem with the request.');
        }
      }
    };

    httpRequest.open('GET', '/service/' + serviceName);
    httpRequest.send();
  };

  getServiceByName('weather');
  getServiceByName('traffic');

})(window);
