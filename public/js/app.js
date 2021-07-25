console.log('Javascript loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Loading...'

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const location = search.value
  fetch('http://localhost:8100/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecastData
        console.log(data.location)
        console.log(data.forecast)
      }
    })
  })
})