// const todoDiv = document.querySelector("#todoDiv"); // asigned at login.js
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const todoCountSpan = document.querySelector("#todoCount");

const TODO_KEYS = "todos"

let todoContents = [];

function setTodo(todoContents) {
	let savedTodo = JSON.parse(localStorage.getItem(TODO_KEYS));
	if (savedTodo) {
		savedTodo[g_userId] = todoContents;
	}
	else {
		savedTodo = { [g_userId]: todoContents }
	}

	localStorage.setItem(TODO_KEYS, JSON.stringify(savedTodo));

	console.log("\nsetTodo success!")

}

function deleteTodo(e) {
	const li = e.target.parentElement;
	console.log("\n\nli id : " + li.id) + "\n";

	for (let i = 0; i < todoContents.length; i++) {
		console.log("\ntodo id : " + todoContents[i].id)
		if (todoContents[i].id === li.id) {
			todoContents.splice(i, 1);
			setTodo(todoContents);

			li.remove();
			updateTodoCount();
			console.log("\ndeleteTodo success!")

			return;
		}
	}

	alert("something wrong with deleting item!")

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
		id: String(Date.now()),
		val: todoInput.value
	};
	todoInput.value = ""; // empty input field
	todoContents.push(newItem);

	paintTodo(newItem);
	setTodo(todoContents);
	updateTodoCount();

}

function updateTodoCount() {
	todoCountSpan.innerText = `Todo Count: ${todoContents.length}`
}

function loadTodo() {
	const savedTodo = JSON.parse(localStorage.getItem(TODO_KEYS));
	if (savedTodo) {
		if (Object.keys(savedTodo).includes(g_userId)) {
			todoContents = savedTodo[g_userId];
			todoContents.forEach(paintTodo);
			return updateTodoCount();
		}
	}

	todoContents = [];
	return updateTodoCount();
}

todoForm.addEventListener("submit", handleTodoSubmit);