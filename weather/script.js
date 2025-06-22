let container = document.querySelector('.main_container');
let search = document.querySelector('.search_icon');
let weatherBox = document.querySelector('.weather_box');
let weatherDetails = document.querySelector('.weather-details');

const apiKey = "83f4ab826cfc9a786d817b32e6806907";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function checkWeather(city){
    const response = await fetch(apiUrl+`&appid=${apiKey}&q=${city}`);
    if(response.status == 404){
        document.querySelector('.not_found').style.display = "flex";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
    }
    else{
        var data = await response.json();
        
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp);
        document.querySelector('.humidity span').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind-speed span').innerHTML = data.wind.speed + "Km/h";
        let image = document.querySelector('.weather-img');
        let n = data.weather[0].main;
        switch(n){
            case "Clouds" : image.src = "images/cloud.png";
                            break;
            case "Rain" : image.src = "images/rain.png";
                            break;
            case "Clear" : image.src = "images/clear.png";
                            break;
            case "Drizzle" : image.src = "images/mist.png";
                            break;
            case "Snow" : image.src = "images/snow.png";
                            break;

        }
        document.querySelector('.not_found').style.display = "none";
        weatherBox.style.display = "flex";
        weatherDetails.style.display = "flex";
    }
}
search.addEventListener('click', () =>{
    let city = document.querySelector('.search_box input').value;
    document.querySelector('.search_box input').value = "";
    checkWeather(city);
});
    




