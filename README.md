# Home Sweet Home - API

Home Sweet Home - API is a Node app for managing personal smart home devices.

## Installation

Use `git` to download the source code.

```bash
git clone git@github.com:sannremy/home-sweet-home-api.git
```

### Configuration
Copy [`.env.sample`](https://github.com/sannremy/home-sweet-home-api/blob/master/.env.sample) to `.env`.
```bash
cp .env.sample .env
```

Edit the environment variables in the `.env` file.

## Usage

This will create a HTTP service on port [8080](http://localhost:8080).

### Production: Run with Docker (recommanded)
```bash
docker-compose up --build
```

### Production: Run with npm
```bash
npm start
```

### Development: Run with npm

#### Install depedencies
```bash
npm install
```

#### Watch + Serve
```bash
npm run serve
```

### Available methods
 * **/vigicrue** River level data by [Vigicrue](https://www.vigicrues.gouv.fr/)
 * **/weather** Weather forecast by [OpenWeather](https://openweathermap.org/)
 * **/netatmo** [Netatmo Weather](https://dev.netatmo.com/) devices
 * **/traffic** Traffic to destinations by [Google Maps API](https://developers.google.com/maps/documentation/distance-matrix/)
 * **/network** Devices connected to the Netgear R7000 router
 * **/trains** Real-time timetables at train stations by [Transilien](https://www.transilien.com/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://github.com/sannremy/home-sweet-home-api/blob/master/LICENSE)
