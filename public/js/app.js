console.log('Javascript loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.innerHTML = 'Loading...'

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const location = search.value
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
        messageOne.innerHTML = data.error
      } else {
        messageOne.innerHTML = data.location
        messageTwo.innerHTML = data.forecastData
        console.log(data.location)
        console.log(data.forecast)
      }
    })
  })
})