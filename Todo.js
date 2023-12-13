document.addEventListener("DOMContentLoaded", function() {
let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById('saveTodoButton');


function getTodoListFromLocalStorage() {
    let stringified = localStorage.getItem('todoList');
    let parsedList = JSON.parse(stringified);
    if (parsedList === null) {
        return [];
    } else {
        return parsedList;
    }
}

let todoList = getTodoListFromLocalStorage();

let todosCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle('checked');
    let todoItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = 'todo' + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoItemIndex];
    if (todoObject.ischecked === true) {
        todoObject.ischecked = false;
    } else {
        todoObject.ischecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteTodoItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = 'todo' + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteTodoItemIndex, 1);
    if(todoList.length == 0 ){
        saveTodoButton.classList.add('d-none');
    }
}

function createAndAppendTodo(todo) {
    let todoId = 'todo' + todo.uniqueNo;
    let checkboxId = 'checkbox' + todo.uniqueNo;
    let labelId = 'label' + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row","pr-5",'pl-2','pt-1');
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("ml-2",'mt-auto','mb-auto');
    inputElement.checked = todo.ischecked;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.ischecked === true) {
        labelElement.classList.add('checked');
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container","ml-auto",'mt-auto','mb-auto');
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);    
}

for (let todo of todoList) {
    createAndAppendTodo(todo);   
}
if(todoList.length != 0 ){
saveTodoButton.classList.remove('d-none');
}

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        ischecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
    if(todoList.length != 0 ){
        saveTodoButton.classList.remove('d-none');
    }
}

addTodoButton.onclick = function() {
    console.log('working')
    onAddTodo();
}

});