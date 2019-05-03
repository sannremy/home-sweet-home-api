const config = require('config');

const axios = require('axios');
const moment = require('moment');

class Transilien {
  static async getNextDepartures() {
    try {
      let body = config.transilien.nextDepartureParams;
      let response = await axios.post(config.transilien.apiUrl + '/nextDeparture/search', body, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });

      const data = response.data;

      // Curated data
      let departure = data.departureStopArea.label || null;

      let nextTrains = [];
      if (data.nextTrainsList && data.nextTrainsList.length) {
        for (let i = 0; i < data.nextTrainsList.length; i++) {
          const train = data.nextTrainsList[i];
          nextTrains.push({
            codeMission: train.codeMission,
            hasTrafficDisruption: train.hasTraficDisruption,
            hasWorkDisruption: train.hasTravauxDisruption,
            departureTime: train.departureTime,
            delayed: train.delayed,
            cancelled: train.canceled,
            destination: train.destinationMission,
          });
        }
      }

      return {
        departure: departure,
        nextTrains: nextTrains
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = Transilien;
