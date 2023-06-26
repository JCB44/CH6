var city
var valid

function currentDay(){
var now = dayjs().format('MM/DD/YYYY') 
$(".currentDate").append(now)
}

function displayLast(){
var lastCity = localStorage.getItem('Last City')
city = lastCity
if(lastCity === null){
//does nothing on purpose
}else{
  makeCall()
}
}

function saveInput(){
    var input = document.getElementById("input")
    city = input.value
    valid = true
    makeCall()
}

function makeCall(){
var WeatherUrl ='https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=522997d238759d89251f223ea7bf7a0c&units=imperial'  
    fetch(WeatherUrl).then(function(response){
        if (response.status === 404) {
            
          //  badResponse()
            console.log("404")
        }else{
        return response.json()
         .then(function(data){
            $(".city").empty()
            $(".weather").empty()
            $( "#temp" ).empty()
            $("#wind").empty()
            $("#humidity").empty()
            
            $(".city").append(city.charAt(0).toUpperCase()+city.slice(1))
            $(".weather").append(data.weather[0].description.charAt(0).toUpperCase()+data.weather[0].description.slice(1))
            $( "#temp" ).append(Math.round(data.main.temp)+"°F ")
            $("#wind").append(data.wind.speed+" MPH ")
            $("#humidity").append(data.main.humidity)
            localStorage.setItem("Last City", city)
            if(valid === false){
                console.log(valid)
            }else{
                // goodResponse()
            }
            resetForecast()
            createForecastCards();
            console.log(data)
         });
        }
    })
}

 function badResponse(){
    var errorModal = document.getElementById("errorModal");
    var closeButton = document.getElementById("close-button");
    errorModal.style.display = "block";
    
    window.onclick = function(event) {
      if (event.target == errorModal) {
        errorModal.style.display = "none";
      }
    }
    closeButton.addEventListener("click", function() {
        errorModal.style.display = "none";
      });
 }
 function goodResponse(){

 }

function createForecastCards() {
  var forecastContainer = document.querySelector(".forecast-container");
  let futureUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=522997d238759d89251f223ea7bf7a0c"
    fetch(futureUrl).then(function (response){
      if (response.ok) {
        response.json().then(function (data) {
console.log(data)
  for (i = 5; i < data.list.length; i += 8) {
    var forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    var date = document.createElement("p");
    date.classList.add("date");
    date.textContent = dayjs(data.list[i].dt * 1000).format("MM/DD/YYYY");

    var temperature = document.createElement("p");
    temperature.classList.add("li");
    temperature.textContent = "Temperature:" + data.list[i].main.temp.toFixed(0) +  "°F";

    var windSpeed = document.createElement("p");
    windSpeed.classList.add("li");
    windSpeed.textContent = "Wind Speed: "+ data.list[i].wind.speed.toFixed(0) + " MPH";

    var humidity = document.createElement("p");
    humidity.classList.add("li");
    humidity.textContent = "Humidity: "+ data.list[i].main.humidity.toFixed(0) + " %";

    forecastCard.appendChild(date);
    forecastCard.appendChild(temperature);
    forecastCard.appendChild(windSpeed);
    forecastCard.appendChild(humidity);

    forecastContainer.appendChild(forecastCard);
  }
});
}
})
}
function resetForecast() {
  var forecastContainer = document.querySelector(".forecast-container");

  while (forecastContainer.firstChild) {
    forecastContainer.removeChild(forecastContainer.firstChild);
  }
}



currentDay()
displayLast()