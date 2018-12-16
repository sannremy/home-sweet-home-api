const moment = require('moment');
const config = require('config');
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
      let duration = await googleMapsClient.distanceMatrix({
        origins: [direction.origin],
        destinations: [direction.destination],
        departure_time: (new Date()).getTime(),
        mode: 'driving',
        avoid: ['tolls'],
        traffic_model: 'best_guess'
      }).asPromise().then((response) => {
        let directionDuration = moment.duration(response.json.rows[0].elements[0].duration.value, 'seconds');
        directionDuration.locale(config.locale);

        let directionDistance = response.json.rows[0].elements[0].distance.value; // in meter

        return {
          label: direction.label,
          duration: directionDuration,
          distance: directionDistance
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
