//Variables for the OneWeather API
var APIKey = '96097dc8f5f71e97eb432223ff032ed9';
var currentWeatherConditions = 'https://api.openweathermap.org/data/2.5/weather?q=';

//Global Variables
var searchButton = document.querySelector('.search-button');
var citySearch = document.querySelector('.search-city');
var currentCity = document.querySelector('.current-city');
var currentTemp = document.querySelector('.current-temp');
var currentWind = document.querySelector('.current-wind');
var currentHumidity = document.querySelector('.current-humidity');
var currentUV = document.querySelector('.current-uv');
var fiveDay = document.querySelector('.five-day');
var searchHistory = document.querySelector('.search-history');
var pastCity = [];
//calling the function that handles the input and search button.
userInput();



//code to handle the input and search button!
function userInput(){
    searchButton.addEventListener('click', function(event){
        event.preventDefault();
        city = citySearch.value;
        console.log(citySearch.value);
        
    currentCityWeather();
    pastCities();
    })
}        

// function historicalSearch(){
//     history = document.getElementsByTagName('li');
//     history.addEventListener('click', function(event){
//         event.preventDefault();
//         citySearch = event.target.textContent;
//         console.log(citySearch);
        
//     currentCityWeather();
//     })
// }

//function for the current weather
function currentCityWeather(){
    
    //code to clear the appends before appending new data.
    $('p').remove();
    $('img').remove();
    //variable to build the query URL to get the latitude and longitude from OneWeather
    var currentWeatherURL = currentWeatherConditions + city + '&appid=' + APIKey + '&units=imperial';

    //fetch to call the API for the above query URL
    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            var latitude = data.coord.lat;
            var longitude = data.coord.lon;

            console.log(data);
            currentCity.innerHTML = "City: " + data.name;

            //variable to build query URL to get the weather data from OneWeather using Latitude and Longitude
            const latLonWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly,alerts&units=imperial&appid=' + APIKey;
    
    //fetch to call the API using the above latitude/longitude query URL and create the elements needed for current weather.
        fetch(latLonWeatherURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                currentTemp.innerHTML = "Temp: " + data.current.temp + "\xB0F";
                currentHumidity.innerHTML = "Humidity: " + data.current.humidity + "%";
                currentWind.innerHTML = "Wind Speed: " + data.current.wind_speed + "MPH";
                currentUV.innerHTML = "UV: " + data.current.uvi;
                var currentIcon = document.createElement('img')
                var icon1 = data.daily[0].weather[0].icon;
                var iconImg1 = 'http://openweathermap.org/img/wn/' + icon1 + '.png';
                currentIcon.setAttribute('src', iconImg1);
                currentCity.append(currentIcon);
        
            //for loop to create the data for the 5 day forecast
            for(k=1; k<=5; k++){
                var dayI = document.querySelector('.day-' + k);
                var dates = document.createElement('p');
                dates.classList.add('card-title','dateheader' ,'forecast');
                var maxTemps = document.createElement('p');
                maxTemps.classList.add('card-text', 'forecast');
                var minTemps = document.createElement('p');
                minTemps.classList.add('card-text', 'forecast');
                var hums = document.createElement('p');
                hums.classList.add('card-text', 'forecast');
                var wins = document.createElement('p');
                wins.classList.add('card-text', 'forecast');
                var icons = document.createElement('img')
                // icons.classList.add('card-text', 'forecast');

                var date = moment().add(k, 'days').format('M/D/YYYY');
                var maxTemp = data.daily[k].temp.max;
                var minTemp = data.daily[k].temp.min;
                var humidity = data.daily[k].humidity;
                var wind = data.daily[k].wind_speed;
                var iconNum = data.daily[k].weather[0].icon;
                var iconImg = 'http://openweathermap.org/img/wn/' + iconNum + '.png';
                

                dates.innerHTML = date;
                maxTemps.innerHTML = "Max Temp: " + maxTemp + "\xB0F";
                minTemps.innerHTML = "Min Temp: " + minTemp + "\xB0F";
                hums.innerHTML = "Humidity: " + humidity;
                wins.innerHTML = "Wind Speed: " + wind + "MPH";
                icons.setAttribute('src', iconImg);

            //appending the data to the five day forecast
                dayI.append(dates);
                dayI.append(icons);
                dayI.append(maxTemps);
                dayI.append(minTemps);
                dayI.append(hums);
                dayI.append(wins);

            }
        })    
    })
        .catch(err => alert('This is not a city!')) 
}


//function to save inputs and create buttons?
function pastCities(){
    $('ul').empty(); 
    pastCity.push(city)
    localStorage.setItem('pastCities', JSON.stringify(pastCity))
//for loop to create search history cities
    for (i=0; i<pastCity.length; i++){
        var cityHistory = document.createElement('li');
        cityHistory.classList.add('past-city');
        cityHistory.setAttribute('type', 'button');
        cityHistory.innerHTML = pastCity[i];
        searchHistory.prepend(cityHistory);
    }
}    

// history.addEventListener('click', pastCities, function(event){
//     event.preventDefault();
//     citySearch = event.target.textContent;
//     console.log(citySearch);
    
// currentCityWeather();
// })

