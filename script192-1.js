var cityInput = document.getElementById("cityInput");
var addInput = document.getElementById("send");
var cityOutput = document.getElementById("cityOutput");
var descOutput = document.getElementById("description");
var temp = document.getElementById("temp");
const apiKey = "7a87e42df4f1c82f6375b6df77b747ff";

async function getWeather() {
  if (cityInput.value.trim() == "") {
    alert("The Textbox cannot be empty");
    cityInput.value = "";
    cityInput.focus();
  } else {
    var result = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`
      )
    ).json();
    setInfo(result);
  }
}

function setInfo(data) {
  if (data.cod == 404) {
    cityOutput.innerHTML = `Error: ${data.cod} - ${data.message}`;
    descOutput.innerHTML = `Error`;
    temp.innerHTML = `Error`;
    cityInput.focus();
  } else {
    var cityName = data.name;
    var description = data["weather"][0]["description"];
    var temperature = data["main"]["temp"];

    cityOutput.innerHTML = `City: ${cityName}`;
    temp.innerHTML = `Temperature: ${(temperature - 273.15).toFixed(
      2
    )} ${"&#8451;"}`;
    descOutput.innerHTML = `Desciption: ${description}`;
  }
}

addInput.addEventListener("click", getWeather);
