class WeatherObj {
  constructor(timestamp, temperature, description, location, country, icon) {
    this.timestamp = timestamp.toLocaleTimeString().slice(0, -3);
    this.temperature = Math.floor(temperature);
    this.description = description;
    this.location = location;
    this.country = country;
    this.icon = icon;
  }
}

async function fetchData(place) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=119304a99c5d8187984758e61f0079d6`
    );
    console.log("Data received...");
    const processedData = await data.json();
    //console.log(processedData);
    const date = new Date();
    dataArr.push(
      new WeatherObj(
        date,
        processedData.main.temp,
        processedData.weather[0].description,
        processedData.name,
        processedData.sys.country,
        processedData.weather[0].icon
      )
    );
    addCard(processedData.weather[0].icon);
  } catch (error) {
    searchBar.innerHTML = "Place not found!";
  }
}

function addCard() {
  function iconPicker(id) {
    switch (id) {
      case "01d":
        return '<i class="fas fa-sun"></i>';
      case "02d":
        return '<i class="fas fa-cloud-sun"></i>';
      case "03d":
        return '<i class="fas fa-cloud"></i>';
      case "04d":
        return '<i class="fas fa-cloud"></i>';
      case "09d":
        return '<i class="fas fa-cloud-rain"></i>';
      case "10d":
        return '<i class="fas fa-cloud-showers-heavy"></i>';
      case "11d":
        return '<i class="fas fa-bolt"></i>';
      case "13d":
        return '<i class="fas fa-snowflake"></i>';
      case "50d":
        return '<i class="fas fa-smog"></i>';
      default:
        return '<i class="fas fa-cloud"></i>';
    }
  }
  searchBar.innerHTML = ""; // clean eventual errors
  const currentObj = dataArr[dataArr.length - 1];
  const markup = `
  
    <p>${currentObj.location}, ${currentObj.country}</p>
    <h2>${currentObj.temperature}°C</h2>
    ${iconPicker(currentObj.icon)}
    <p>${currentObj.description}</p>
  `;
  const cardFinished = document.createElement("div");
  cardFinished.classList.add("card");
  cardFinished.innerHTML = markup;
  cards.appendChild(cardFinished);
}

let dataArr = [],
  place;

const cards = document.querySelector("#bottom-section");
const form = document.querySelector("#upper-section form");
const input = document.querySelector("#upper-section form input");
const searchBar = document.querySelector("#upper-section .errors");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchData(input.value);
});
