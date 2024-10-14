const weatherForm = document.querySelector(".weatherFrom");
const cityInput = document.querySelector(".cityInput");
const Card = document.querySelector(".Card");
const apikey = "3d34ccc027d943a611db04761b0a36c9";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);

            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a valid city");
    }
});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Something went wrong");
    }
    return await response.json();

}
function displayWeatherInfo(data){
    // console.log(data);
    const{name: city, 
        main:{temp, humidity, pressure}, 
        weather:[{description, id}], wind:{speed} } = data;

        Card.textContent = "";
        Card.style.display = "block";

        const cityDisplay = document.createElement("h1");
        cityDisplay.classList.add("cityDisplay");

        const tempDisplay = document.createElement("p");
        tempDisplay.classList.add("tempDisplay");

        const humidityDisplay = document.createElement("p");
        humidityDisplay.classList.add("humidityDisplay");

        const desDisplay = document.createElement("p");
        desDisplay.classList.add("desDisplay");

        const windDisplay = document.createElement("p");
        windDisplay.classList.add("windDisplay");

        const pressureDisplay = document.createElement("p");
        pressureDisplay.classList.add("pressureDisplay");

        const weatherEmoji = document.createElement("p");
        weatherEmoji.classList.add("weatherEmoji");

        cityDisplay.textContent = city;
        Card.appendChild(cityDisplay);

        tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
        Card.appendChild(tempDisplay);

        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        Card.appendChild(humidityDisplay);

        desDisplay.textContent = description;
        Card.appendChild(desDisplay);

        windDisplay.textContent = `Wind Speed: ${speed} km/hr`;
        Card.appendChild(windDisplay);

        pressureDisplay.textContent = `Pressure: ${pressure} hPa`;
        Card.appendChild(pressureDisplay);

        weatherEmoji.textContent = displayWeatherEmoji(id);
        Card.appendChild(weatherEmoji);

}
function displayWeatherEmoji(weatherId){

    if(weatherId>=200 && weatherId<=232){
        return "⛈";
    }
    else if(weatherId>=300 && weatherId<=321){
        return "🌧";
    }
    else if(weatherId>=500 && weatherId<=531){
        return "🌧";
    }
    else if(weatherId>=600 && weatherId<=622){
        return "🌨";
    }
    else if(weatherId>=701 && weatherId<=781){
        return"🌫";
    }
    else if(weatherId===800){
        return"☀️";
    }  
    else if(weatherId>=801 && weatherId<=804){
        return"☁️";
    }      
     

}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    Card.textContent = "";
    Card.style.display="block";

    Card.appendChild(errorDisplay);

}
    