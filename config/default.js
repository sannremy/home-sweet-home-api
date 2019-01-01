require('dotenv').config();

module.exports = {
  locale: process.env.LOCALE,
  netgear: {
    username: process.env.NETGEAR_USERNAME,
    password: process.env.NETGEAR_PASSWORD,
    references: JSON.parse(process.env.NETGEAR_REFERENCES)
  },
  yahooWeather: {
    key: process.env.YAHOO_WEATHER_API_KEY,
    secret: process.env.YAHOO_WEATHER_API_SECRET,

    location: process.env.YAHOO_WEATHER_LOCATION,
    temperature_unit: process.env.YAHOO_WEATHER_TEMPERATURE_UNIT,
  },
  googleMaps: {
    key: process.env.GOOGLE_MAPS_API_KEY,
    directions: JSON.parse(process.env.GOOGLE_MAPS_DIRECTIONS)
  },
  vigicrue: {
    levelUrl: process.env.VIGICRUE_LEVEL_URL,
    attentionUrl: process.env.VIGICRUE_ATTENTION_URL
  },
  netatmo: {
    apiUrl: process.env.NETATMO_API_URL,
    clientId: process.env.NETATMO_CLIENT_ID,
    clientSecret: process.env.NETATMO_CLIENT_SECRET,
    username: process.env.NETATMO_USERNAME,
    password: process.env.NETATMO_PASSWORD,
  }
};
