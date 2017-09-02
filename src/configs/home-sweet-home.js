'use strict';

module.exports = {
  'locale': process.env.LOCALE || 'en',
  'netgear': {
    'username': process.env.NETGEAR_USERNAME || 'username',
    'password': process.env.NETGEAR_PASSWORD || 'password',
  },
  'yahooWeather': {
    'key': process.env.YAHOO_WEATHER_API_KEY || '',
    'secret': process.env.YAHOO_WEATHER_API_SECRET || '',

    'location': process.env.YAHOO_WEATHER_LOCATION || 'Paris, FR',
    'temperature_unit': process.env.YAHOO_WEATHER_TEMPERATURE_UNIT || 'celsius',
  },
  'googleMaps': {
    'key': process.env.GOOGLE_MAPS_API_KEY || '',
    'directions': [
      {
        label: 'Bordeaux',
        origin: 'Paris, France',
        destination: 'Bordeaux, France',
      },
      {
        label: 'Lyon',
        origin: 'Paris, France',
        destination: 'Lyon, France',
      },
    ]
  },
  'vigicrue': {
    url: process.env.VIGICRUE_URL || ''
  }
};
