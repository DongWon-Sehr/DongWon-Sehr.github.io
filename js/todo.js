// const todoDiv = document.querySelector("#todoDiv");
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");

let todoContents = [];

function setTodo(todoContents) {
	const todos = { [g_userId]: todoContents }
	localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e) {
	const li = e.target.parentElement;
	li.remove();

	for (let i = 0; i < todoContents.length; i++) {
		if (todoContents[i].id === li.id) {
			todoContents.splice(i, 1);
			return setTodo(todoContents);
		}
	}
}

function paintTodo(item) {
	const li = document.createElement("li");
	const span = document.createElement("span");
	li.id = item.id;
	span.innerText = item.val;
	li.appendChild(span);

	const button = document.createElement("button");
	button.innerText = "X";
	button.addEventListener("click", deleteTodo);
	li.appendChild(button);

	todoList.appendChild(li);

}

function handleTodoSubmit(e) {
	e.preventDefault();
	const newItem = {
		id: Date.now(),
		val: todoInput.value
	};
	todoInput.value = ""; // empty input field
	todoContents.push(newItem);

	paintTodo(newItem);
	setTodo(todoContents);
}

function loadTodo() {
	const savedTodo = JSON.parse(localStorage.getItem("todos"));
	if (savedTodo) {
		if (Object.keys(savedTodo).includes(g_userId)) {
			todoContents = savedTodo[g_userId];
			todoContents.forEach(paintTodo);
			return userInfoSpan.innerHTML += `<br>Todo Count: ${todoContents.length}`;
		}
	}

	userInfoSpan.innerHTML += `<br>Todo Count: 0`;
}

todoForm.addEventListener("submit", handleTodoSubmit);
// loadTodo();