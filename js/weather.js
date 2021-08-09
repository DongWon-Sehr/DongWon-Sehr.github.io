/* 
 website : https://openweathermap.org/api
 api url : api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
*/

function onGeoSuccess(position) {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
	fetch(url).then(response => response.json()).then(data => {
		const city = document.querySelector("#city");
		city.innerText = `Hi ${data.name}!`;

		const weather = document.querySelector("#weather");
		weather.innerText = `${data.weather[0].main} / ${data.main.temp} ℃`;
	});
}

function onGeoError() {
	alert("Can't find where you are now!\nNo weather information for you :(");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);