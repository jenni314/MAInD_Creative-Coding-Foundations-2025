// Method A
// for APIs requiring the API key as an url parameter

const MY_API_KEY = "80d1993378fa9e47ffc9c7fec53fe1d2" // here add your API key
const API_URL = "https://api.openweathermap.org/data/2.5/forecast?lat=45.9&lon=8.96&units=metric&appid=" + MY_API_KEY

fetch(API_URL)
  .then(response => response.json()) 
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
  
  
  
// Method B
// for APIs requiring the API key as header

fetch('https://api.example.com/data', {
  method: 'GET',  // Can be 'POST', 'PUT', 'DELETE'
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${MY_API_KEY}'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Fetch error:', error));