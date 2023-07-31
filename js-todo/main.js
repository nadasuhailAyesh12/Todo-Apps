const todosSection = document.querySelector(".active-todos");
const todosList = document.querySelector(".list");
const todoInput = document.querySelector("#todoInput");
const addButton = document.querySelector(".btn-add");
const warning = document.querySelector(".warning");

//load all event listeners 
loadEventListeners();

function loadEventListeners() {
    window.onload = loadTodos;

    todoInput.addEventListener("keypress", function (e) {
        if (e.key == "Enter") addTodo();
    });

    addButton.addEventListener("click", () => {
        addTodo();
    });

    todosSection.addEventListener("click", removeTodo);

    todosSection.addEventListener("click", checkTodo);

    todosSection.addEventListener("click", editTodo);

    todosSection.addEventListener("keypress", function (e) {
        if (e.target.classList.contains("text")) {
            const editArea = e.target;
            if (e.key == "Enter") {
                saveTodo(editArea, e);
                e.target.parentElement.nextSibling.firstElementChild.classList.remove(
                    "fa-save"
                );
                e.target.parentElement.nextSibling.firstElementChild.classList.add(
                    "fa-pen"
                );
            }
        }
    });
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    if (todos.length > 0) {
        todos.forEach((todo) => createTodoItem(todo.text, todo.id));
    } else {
        warning.classList.remove("hide");
        warning.classList.add("show");
    }
}

function addTodo() {
    const todos = Array.from(JSON.parse(localStorage.getItem("todos")) || []);
    if (!todoInput.value) {
        alert("Please enter a Todo");
    }

    else if (
        todos.findIndex((element) => element.text == todoInput.value) != -1
    ) {
        alert("this is existing todo,please add none existing one");
    }

    else {
        const newTodo = todoInput.value;

        const todo = {
            id: Date.now(),
            text: newTodo,
            isCompleted: false,
        };

        todos.push(todo);
        warning.classList.remove("show");
        warning.classList.add("hide");
        createTodoItem(newTodo, todo.id);
        localStorage.setItem("todos", JSON.stringify(todos));
        todoInput.value = "";
    }
}

function checkTodo(e) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todoItem = e.target.parentElement.parentElement;

    if (e.target.classList.contains("fa-check")) {
        const todoTextElement = e.target.nextSibling;
        todoTextElement.classList.toggle("checked");
        const index = todos.findIndex(
            (element) => element.id == todoItem.getAttribute("id")
        );

        if (todoTextElement.classList.contains("checked")) {
            todos[index].isCompleted = true;
        } else {
            todos[index].isCompleted = false;
        }

        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

function removeTodo(e) {
    const todoItem = e.target.parentElement.parentElement;
    if (e.target.classList.contains("fa-times")) {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];

        localStorage.setItem(
            "todos",
            JSON.stringify(
                todos.filter((element) => element.id != todoItem.getAttribute("id"))
            )
        );
        todoItem.remove();
    }
}

function editTodo(e) {
    if (e.target.classList.contains("fa-pen")) {
        const editArea = e.target.parentElement.previousSibling.lastElementChild;
        editArea.focus();
        editArea.removeAttribute("readonly");
        e.target.classList.remove("fa-pen");
        e.target.classList.add("fa-save");
    }

    else if (e.target.classList.contains("fa-save")) {
        const editArea = e.target.parentElement.previousSibling.lastElementChild;
        saveTodo(editArea, e);
        e.target.classList.remove("fa-save");
        e.target.classList.add("fa-pen");
    }
}

function saveTodo(editArea, e) {
    const todoItem = e.target.parentElement.parentElement;
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    editArea.setAttribute("readonly", true);
    editArea.blur();
    const index = todos.findIndex(
        (element) => element.id == todoItem.getAttribute("id")
    );
    todos[index].text = editArea.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}
//helper functions
function createTodoItem(todoText, todoID) {
    //create containers
    const todoItem = createElementWithClass("li", ["list-item"], todosList);
    const todoItemLeftSide = createElementWithClass(
        "span",
        ["left-side"],
        todoItem
    );
    const todoItemRightSide = createElementWithClass(
        "span",
        ["right-side"],
        todoItem
    );
    todoItem.setAttribute("id", todoID);
    //create buttons
    createElementWithClass(
        "span",
        ["fas", "fa-check", "fa-check-active"],
        todoItemLeftSide
    );
    createElementWithClass("i", ["fas", "fa-pen"], todoItemRightSide);
    createElementWithClass("i", ["fas", "fa-times"], todoItemRightSide);
    //create todoText
    const todoItemText = createElementWithClass(
        "input",
        ["text"],
        todoItemLeftSide
    );
    todoItemText.value = todoText.trim();
    todoItemText.setAttribute("readonly", true);
    todoItemText.innerText = todoText.trim();
}

function createElementWithClass(elementTag, classNames, parent) {
    const classes = [...classNames];
    const element = document.createElement(elementTag);

    classes.forEach((className) => {
        element.classList.add(className);
    });

    parent.appendChild(element);
    return element;
}






