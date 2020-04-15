//Selectors
const form = document.querySelector("form");
const input = form.querySelector("input");
const addButton = form.querySelector("button");
const ul = document.querySelector(".todos");

//Event Listeners
addButton.addEventListener("click", createTodo);
ul.addEventListener("click", completedOrDelete);

//functions
function createTodo(e) {
  e.preventDefault();

  if (!input.value) return;

  const li = document.createElement("li");
  li.classList.add("todo");

  const textDiv = document.createElement("div");
  const text = document.createTextNode(`${input.value}`);
  textDiv.appendChild(text);

  const completedButton = document.createElement("button");
  completedButton.classList.add("btn-completed");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";

  const trashButton = document.createElement("button");
  trashButton.classList.add("btn-trash");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";

  const buttonsDiv = document.createElement("div");

  buttonsDiv.append(completedButton, trashButton);

  li.append(textDiv, buttonsDiv);
  ul.appendChild(li);

  saveLocalTodo(input.value);

  input.value = "";
}

function completedOrDelete(e) {
  const item = e.target;
  const todo = item.parentElement.parentElement;

  if (item.classList[0] === "btn-completed") {
    todo.classList.toggle("completed");
  }

  if (item.classList[0] === "btn-trash") {
    todo.classList.add("deleted");
    todo.addEventListener("transitionend", () => todo.remove());

    removeLocalTodo(todo);
  }
}

//render todo's stored at localStorage
(() => {
  let todos;
  if (JSON.parse(localStorage.getItem("todos")) == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo");

    const textDiv = document.createElement("div");
    const text = document.createTextNode(`${todo}`);
    textDiv.appendChild(text);

    const completedButton = document.createElement("button");
    completedButton.classList.add("btn-completed");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";

    const trashButton = document.createElement("button");
    trashButton.classList.add("btn-trash");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";

    const buttonsDiv = document.createElement("div");

    buttonsDiv.append(completedButton, trashButton);
    li.append(textDiv, buttonsDiv);
    ul.appendChild(li);
  });
})();

function saveLocalTodo(todo) {
  let todos;
  if (JSON.parse(localStorage.getItem("todos")) == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todos);
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodo(todo) {
  let todos;
  if (JSON.parse(localStorage.getItem("todos")) == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todos);
  const todoIndex = todos.indexOf(todo.innerText);

  todos.splice(todoIndex, 1);

  localStorage.setItem('todos', JSON.stringify(todos));

  
}