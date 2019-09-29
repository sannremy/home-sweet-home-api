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
    let origins = config.googleMaps.directions.map(direction => direction.origin);
    let destinations = config.googleMaps.directions.map(direction => direction.destination);
    let labels = config.googleMaps.directions.map(direction => direction.label);

    const formattedDurations = await googleMapsClient.distanceMatrix({
      origins: origins,
      destinations: destinations,
      mode: 'driving',
      avoid: ['tolls'],
      traffic_model: 'best_guess',
      departure_time: 'now',
    }).asPromise().then((response) => {
      const durations = [];
      const rows = response.json.rows;
      for (let i = 0; i < rows.length; i++) {
        const element = rows[i].elements[0];

        durations.push({
          label: labels[i],
          duration: element.duration_in_traffic.value, // in second
          distance: element.distance.value, // in meter
        });
      }

      return durations;
    }).catch((err) => {
      console.error(err);

      if (err === 'timeout') {
        // Handle timeout.
      } else if (err.json) {
        // Inspect err.status for more info.
      } else {
        // Handle network error.
      }

      return [];
    });

    return {
      durations: formattedDurations
    };
  }
}

module.exports = GoogleMaps;
