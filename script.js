let $ = (query) => document.querySelector(query);
let todoList = [];
let todoEditID = document.querySelector("input.todo-edit");
let inputTodo = document.querySelector("input[name=todo-input]");
inputTodo.focus();
let getDataTodo = localStorage.getItem("todo");
let newUrl = window.location.href;
window.history.pushState({ path: newUrl }, "", newUrl.split("?")[0]);
if (getDataTodo) {
  todoList = JSON.parse(localStorage.getItem("todo"));
}

function start() {
  getTodo();
  getNewTodo();
  sortTodo();
}
function getTodo() {
  let listTodo = document.querySelector(".show-todo");
  if (getDataTodo) {
    let bigData = todoList.map(
      (thisTodo, index) => `
              <li class="d-flex align-items-center col-12 px-3 py-2 ${
                thisTodo["complete"] == 1 ? "completed" : ""
              }">
                <input type="checkbox" class="me-2" onclick="completeTodo(${index})" ${
        thisTodo["complete"] == 1 ? "checked" : ""
      }/>${
        index + 1
      }.&emsp;<span class="todo-text col-10 col-md-9 col-lg-9" onclick="completeTodo(${index})">${
        thisTodo["data"]
      }</span>
                  <span class="action col-2 col-md-3 col-lg-3 text-end navbar navbar-expand-md">
                    <div class="ms-1">
      <button class="navbar-toggler p-0 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav${index}" aria-controls="navbarNav${index}" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon fs-6"></span>
      </button>
      <div class="collapse navbar-collapse text-right" id="navbarNav${index}">
      ${
        thisTodo["complete"] == 0
          ? `<button class="up btn btn-primary btn-sm me-1 py-0 pb-1">
                      <i class="fas fa-chevron-up fa-xs pb-1"></i>
                    </button>
                    <button class="down btn btn-primary btn-sm me-1 py-0 pb-1">
                      <i class="fas fa-chevron-down fa-xs pb-1"></i>
                    </button>
                    <button class="edit btn btn-warning btn-sm me-1 py-0 pb-1" data-bs-toggle="modal" data-bs-target="#modal-edit" onclick="editTodo(${index})">
                      <i class="fas fa-pencil-alt fa-xs text-white"></i>
                    </button>`}
                    <button class="del btn btn-danger btn-sm me-1 py-0 pb-1" onclick="delTodo(${index})">
                      <i class="fas fa-times fa-xs"></i>
                    </button>
                    </div></div>
                  </span>
              </li>
            `
    );
    listTodo.innerHTML = bigData.join("");
  }
}

function getNewTodo() {
  let btnTodo = document.querySelector("#todo-submit");
  btnTodo.onclick = function (e) {
    if (inputTodo.value.trim() != "") {
      let dataTodo = {
        data: inputTodo.value,
        complete: 0,
      };
      todoList.push(dataTodo);
      localStorage.setItem("todo", JSON.stringify(todoList));
      start();
    }
  };
}

function sortTodo() {
  let upBtn = document.querySelectorAll(".up");
  let downBtn = document.querySelectorAll(".down");

  upBtn.forEach((upTodo, index) => {
    upTodo.onclick = (e) => {
      if (index !== 0) {
        [todoList[index], todoList[index - 1]] = [
          todoList[index - 1],
          todoList[index],
        ];
        localStorage.setItem("todo", JSON.stringify(todoList));
      } else {
      }
      start();
    };
  });

  downBtn.forEach((downTodo, index) => {
    downTodo.onclick = (e) => {
      if (index !== upBtn.length - 1) {
        [todoList[index], todoList[index + 1]] = [
          todoList[index + 1],
          todoList[index],
        ];
        localStorage.setItem("todo", JSON.stringify(todoList));
      } else {
      }
      start();
    };
  });
}

function editTodo(id) {
  let todoShowID = document.getElementsByClassName("todo-text")[id];
  todoEditID.focus();
  todoEditID.value = todoShowID.textContent;
  document
    .getElementsByClassName("save-todo")[0]
    .setAttribute("onclick", `updateTodo(${id})`);
}

function updateTodo(id) {
  todoList[id].data = todoEditID.value;
  localStorage.setItem("todo", JSON.stringify(todoList));
}

function delTodo(id) {
  let confirmAction = confirm("Bạn có chắc chắn muốn xóa?");
  if (confirmAction) {
    todoList.splice(id, 1);
    localStorage.setItem("todo", JSON.stringify(todoList));
    start();
  } else {
  }
}

function completeTodo(id) {
  todoList[id].complete = 1;
  [todoList[id], todoList[todoList.length - 1]] = [
    todoList[todoList.length - 1],
    todoList[id],
  ];

  localStorage.setItem("todo", JSON.stringify(todoList));
  start();
}

start();
