// const todoDiv = document.querySelector("#todoDiv");
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");

const todoContents = [];

function setTodo(todoContents) {
	const todos = { [g_userId]: todoContents }
	localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e) {
	const li = e.target.parentElement;
	li.remove();
}

function paintTodo(item) {
	const li = document.createElement("li");
	const span = document.createElement("span");
	span.innerText = item;
	li.appendChild(span);

	const button = document.createElement("button");
	button.innerText = "X";
	button.addEventListener("click", deleteTodo);
	li.appendChild(button);

	li.id = new Date();
	todoList.appendChild(li);

}

function handleTodoSubmit(e) {
	e.preventDefault();
	const item = todoInput.value;
	todoInput.value = ""; // empty input field
	todoContents.push(item);

	paintTodo(item);
	setTodo(todoContents);
}

function loadTodo() {
	const savedTodo = JSON.parse(localStorage.getItem("todos"));
	if (savedTodo) {
		if (Object.keys(savedTodo).includes(g_userId)) {
			savedTodo[g_userId].forEach(paintTodo);
			return userInfoSpan.innerHTML += `<br>Todo Count: ${savedTodo[g_userId].length}`;
		}
	}

	userInfoSpan.innerHTML += `<br>Todo Count: 0`;
}

todoForm.addEventListener("submit", handleTodoSubmit);
// loadTodo();