// const todoDiv = document.querySelector("#todoDiv");
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const todoCount = document.querySelector("#todoCount");

let todoContents = [];

function setTodo(todoContents) {
	let savedTodo = JSON.parse(localStorage.getItem("todos"));
	if (savedTodo) {
		savedTodo[g_userId] = todoContents;
	}
	else {
		savedTodo = { [g_userId]: todoContents }
	}

	localStorage.setItem("todos", JSON.stringify(savedTodo));
}

function deleteTodo(e) {
	const li = e.target.parentElement;

	for (let i = 0; i < todoContents.length; i++) {
		if (todoContents[i].id === li.id) {
			todoContents.splice(i, 1);
			setTodo(todoContents);
			break;
		}
	}

	li.remove();
	console.log("delete success!")
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
	updateTodoCount();

}

function updateTodoCount() {
	userInfoSpan.innerText = `Todo Count: ${todoContents.length}`
}

function loadTodo() {
	const savedTodo = JSON.parse(localStorage.getItem("todos"));
	if (savedTodo) {
		if (Object.keys(savedTodo).includes(g_userId)) {
			todoContents = savedTodo[g_userId];
			todoContents.forEach(paintTodo);
		}
	}

	todoContents ??= [];
	updateTodoCount();
}

todoForm.addEventListener("submit", handleTodoSubmit);
// loadTodo();