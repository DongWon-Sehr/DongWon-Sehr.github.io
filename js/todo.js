const todoDiv = document.querySelector("#todoDiv");
const todoForm = todoDiv.querySelector("#todoForm");
const todoInput = todoDiv.querySelector("#todoInput");
const todoList = todoDiv.querySelector("#todoList");


function paintTodo(item) {
	const li = document.createElement("li");
	const span = document.createElement("span");
	span.innerText = item;
	li.appendChild(span);

	const button = document.createElement("button");
	button.innerText = "X";
	li.appendChild(button);


	todoList.appendChild(li);

}

function handleTodoSubmit(e) {
	e.preventDefault();
	const item = todoInput.value;
	paintTodo(item);
}

todoForm.addEventListener("submit", handleTodoSubmit);