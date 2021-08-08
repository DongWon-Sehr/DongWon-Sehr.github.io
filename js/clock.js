const clock = document.querySelector("#clock");
const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getTimezoneName() {
	const today = new Date();
	const short = today.toLocaleDateString(undefined);
	const full = today.toLocaleDateString(undefined, { timeZoneName: 'long' });

	// Trying to remove date from the string in a locale-agnostic way
	const shortIndex = full.indexOf(short);
	if (shortIndex >= 0) {
		const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);

		// by this time `trimmed` should be the timezone's name with some punctuation -
		// trim it from both sides
		return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');

	} else {
		// in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
		return full;
	}
}

function runClock() {
	const today = new Date();
	clock.innerText = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")} ${dayList[today.getDay()]} ${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}:${String(today.getSeconds()).padStart(2, "0")} ${getTimezoneName()}`;
}

runClock();
setInterval(runClock, 1000);