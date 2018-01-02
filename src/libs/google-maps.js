const moment = require('moment');
const config = require('../configs/home-sweet-home');
const GoogleMapsApi = require('@google/maps');

// Create client with a Promise constructor
const googleMapsClient = GoogleMapsApi.createClient({
  key: config.googleMaps.key,
  Promise: Promise
});

class GoogleMaps {
  static async getDurations() {
    let durations = [];
    for (let direction of config.googleMaps.directions) {
      let duration = await googleMapsClient.directions({
        origin: direction.origin,
        destination: direction.destination,
        mode: 'driving',
        avoid: ['tolls']
      }).asPromise().then((response) => {
        let directionDuration = moment.duration(response.json.routes[0].legs[0].duration.value, 'seconds');
        directionDuration.locale(config.locale);

        return {
          label: direction.label,
          duration: directionDuration
        };
      }).catch((err) => {
        if (err === 'timeout') {
          // Handle timeout.
        } else if (err.json) {
          // Inspect err.status for more info.
        } else {
          // Handle network error.
        }
      });

      durations.push(duration);
    }

    return {
      durations: durations
    };
  }
}

module.exports = GoogleMaps;
