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
const HIDDEN_CLASS_NAME = HIDDEN_CLASS_NAME

function setLoginInfo(userId, userPw) {
	let userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));

	if (userInfo) {
		userInfo.userId = userPw;
	}
	else {
		userInfo = { userId: userPw };
	}

	localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

function doLogin(userId) {
	userInfoSpan.innerText = userId;
	loginInputId.value = "";
	loginInputPw.value = "";

	loginBtn.classList.toggle(HIDDEN_CLASS_NAME);
	logoutBtn.classList.toggle(HIDDEN_CLASS_NAME);
	todoDiv.classList.toggle(HIDDEN_CLASS_NAME);
}

function doLogout() {
	userInfoSpan.innerText = "";
	loginBtn.classList.toggle(HIDDEN_CLASS_NAME);
	logoutBtn.classList.toggle(HIDDEN_CLASS_NAME);
	todoDiv.classList.toggle(HIDDEN_CLASS_NAME);
}

function handleLogin(e) {
	e.preventDefault();
	const userId = loginInputId.value;
	const userPw = loginInputPw.value;

	const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));
	if (userInfo) {
		if (userInfo.keys.includes(userId)) {
			if (userInfo.userIds !== userPw) {
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

loginBtn.addEventListener("submit", handleLogin);
logoutBtn.addEventListener("submit", handleLogout);
