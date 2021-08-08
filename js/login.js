const loginDiv = document.querySelector("#loginDiv");

const loginForm = loginDiv.querySelector("#loginForm");
const loginInputId = loginForm.querySelector("#loginInputId");
const loginInputPw = loginForm.querySelector("#loginInputPw");
const loginBtn = loginForm.querySelector("#loginBtn");

const logoutForm = loginDiv.querySelector("#logoutForm");
const userInfoSpan = logoutForm.querySelector("#userInfo");
const logoutBtn = logoutForm.querySelector("#logoutBtn");

const todoDiv = document.querySelector("#todoDiv");

const USER_INFO_KEY = "userInfo";
const HIDDEN_CLASS_NAME = "hidden";

let g_userId = "";

function setLoginInfo(userId, userPw) {
	let userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));

	if (userInfo) {
		userInfo[userId] = userPw;
	}
	else {
		userInfo = { [userId]: userPw };
	}

	localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));

	console.log("\nsetLoginInfo success!");
}

function doLogin(userId) {
	userInfoSpan.innerHTML = `ID : ${userId}`;
	g_userId = userId;
	loginInputId.value = "";
	loginInputPw.value = "";
	loadTodo();

	loginForm.classList.toggle(HIDDEN_CLASS_NAME);
	logoutForm.classList.toggle(HIDDEN_CLASS_NAME);
	todoDiv.classList.toggle(HIDDEN_CLASS_NAME);

	console.log("\ndoLogin success!");
}

function doLogout() {
	userInfoSpan.innerText = "";
	g_userId = "";

	loginForm.classList.toggle(HIDDEN_CLASS_NAME);
	logoutForm.classList.toggle(HIDDEN_CLASS_NAME);
	todoDiv.classList.toggle(HIDDEN_CLASS_NAME);

	console.log("\ndoLogout success!");
}

function handleLogin(e) {
	e.preventDefault();
	const userId = loginInputId.value;
	const userPw = loginInputPw.value;

	const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));
	if (userInfo) {
		if (Object.keys(userInfo).includes(userId)) {
			if (userInfo[userId] !== userPw) {
				alert("wrong ID or PW");
				return;
			}
			else {
				return doLogin(userId);
			}
		}
	}

	setLoginInfo(userId, userPw);
	return doLogin(userId);
}

function handleLogout(e) {
	e.preventDefault();
	doLogout();
}

loginForm.addEventListener("submit", handleLogin);
logoutForm.addEventListener("submit", handleLogout);
