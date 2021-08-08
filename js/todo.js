const todoDiv = document.querySelector("#todoDiv");
const todoForm = todoDiv.querySelector("#todoForm");
const todoInput = todoDiv.querySelector("#todoInput");
const todoList = todoDiv.querySelector("#todoList");

const todoContents = [];

function setTodo(todoContents) {
	const todos = { key: new Date(), items: todoContents }
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

	li.id = newDate();
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

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodo = JSON.parse(localStorage.getItem("todos"));
if (savedTodo.items) {
	savedTodo.items.forEach(paintTodo);
}