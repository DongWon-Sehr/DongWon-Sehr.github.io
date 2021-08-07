const clock = document.querySelector("#clock");
const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function runClock() {
	const today = new Date();
	clock.innerText = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${dayList[today.getDay()]} ${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}:${String(today.getSeconds()).padStart(2, "0")}`;
}

runClock();
setInterval(runClock, 1000);