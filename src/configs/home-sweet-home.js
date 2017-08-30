'use strict';

module.exports = {
  'netgear': {
    'username': process.env.NETGEAR_USERNAME,
    'password': process.env.NETGEAR_PASSWORD,
  },
  'yahooWeather': {
    'key': process.env.YAHOO_WEATHER_API_KEY,
    'secret': process.env.YAHOO_WEATHER_API_SECRET,
  },
  'googleMaps': {
    'key': process.env.GOOGLE_MAPS_API_KEY,
    'secret': process.env.GOOGLE_MAPS_API_SECRET,
  },
};
