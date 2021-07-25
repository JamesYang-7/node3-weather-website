const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiamFtZXN5YW5nNyIsImEiOiJja3JnM3FqZWw2Mms0MnBvOHNtNTZ6Zjg0In0.OQmmRk4TVFY_nSeK9s8kNA&limit=1'
  request({url, json: true}, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location, try another place', undefined)
    } else {
      const features = body.features
      callback(undefined, {
        longitude: features[0].center[0],
        latitude: features[0].center[1],
        location: features[0].place_name
      })
    }
  })
}

module.exports = geocode