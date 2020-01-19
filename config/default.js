require('dotenv').config();

module.exports = {
  netgear: {
    username: process.env.NETGEAR_USERNAME,
    password: process.env.NETGEAR_PASSWORD,
    references: JSON.parse(process.env.NETGEAR_REFERENCES)
  },
  openWeatherMap: {
    apiUrl: process.env.OPEN_WEATHER_MAP_API_URL,
    apiKey: process.env.OPEN_WEATHER_MAP_API_KEY,
    city: process.env.OPEN_WEATHER_MAP_CITY,
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
  },
  transilien: {
    apiUrl: process.env.TRANSILIEN_API_URL,
    nextDepartureParams: JSON.parse(process.env.TRANSILIEN_NEXT_DEPARTURES_PARAMS)
  },
  tuya: {
    username: process.env.TUYA_USERNAME,
    password: process.env.TUYA_PASSWORD,
    countryCode: process.env.TUYA_COUNTRY_CODE,
  },
  control: {
    modes: JSON.parse(process.env.CONTROL_MODES),
  }
};
