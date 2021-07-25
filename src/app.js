const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'YYY'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'YYY'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'YYY',
    helpText: 'This is a help text'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if (!address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        location,
        forecastData,
        address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Search item not provided'
    })
  }
  console.log(req.query);
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'YYY',
    errorMessage: 'Help article not found'
  })
})

// anything unmatched so far
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'YYY',
    errorMessage: 'Page not found'
  })
})

app.listen(8100, () => {
  console.log('Server is up on 8100.')
})