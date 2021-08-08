const imgFileNames = [
	"landscape1.jpg"
	, "landscape2.jpg"
	, "landscape3.jpg"
	, "landscape4.jpg"
];

const selectedPath = imgFileNames[Math.floor(Math.random() * imgFileNames.length)];
const imgUrl = `img/${selectedPath}`;

document.body.style.backgroundImage = `url("${imgUrl}")`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundPosition = "center";

const bgDimmed = document.querySelector("#bgDimmed");
bgDimmed.style.width = `${window.innerWidth}px`;
bgDimmed.style.height = `${window.innerHeight}px`;
bgDimmed.style.padding = "30%";