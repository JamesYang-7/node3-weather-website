const request = require('request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=a8aeafc132127841dc46c857d14ef7e1&query=' + latitude + ',' + longitude + '&units=f'
  request({url, json: true}, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to weather sevice', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const current = body.current
      callback(undefined, current.weather_descriptions[0] + '. The temperature is ' + current.temperature + '. It feels like ' + current.feelslike)
    }
  })
}

module.exports = forecast
