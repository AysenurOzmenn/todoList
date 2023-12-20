//Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {   //Tüm eventler listenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);

}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItem.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            //bulamadı

            listItem.setAttribute("style","display :none");
        }
        else{
            
        }
        
    })

}
function deleteTodo(e) {  //şuan sadece arayüzden silindi, local storageden silinmedi..
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)

        showAlert("warning", "Todo başarıyla silindi...")
    }
}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo == deletetodo){
            todos.splice(index,1); //Arrayden değeri silebiliriz.
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}
function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo === "") {
        /*  <div class="alert alert-danger" role="alert">
         is a danger alert—check it out!
          </div>*/
        showAlert("danger", "Bir todo giriniz...");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo başarıyla eklendi...")
    }
    e.preventDefault();
}
function getTodosFromStorage() {  //Storagedan todoları alma
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    //setTimeout metoduyla uyyarı mesajına görünme saniyesi vereceğiz..
    setTimeout(function () {
        alert.remove();
    }, 1000);
}
// <!-- <li class="list-group-item d-flex justify-content-between">
//     Todo 1
//     <a href = "#" class ="delete-item">
//         <i class = "fa fa-remove"></i>
//     </a>
// </li> -->

function addTodoToUI(newtodo) {  //String değerini list item olarak UI a ekleyecek.

    //List item oluşturma
    const listItem = document.createElement("li");
    //Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    //text-node ekleme
    listItem.appendChild(document.createTextNode(newtodo));
    listItem.appendChild(link);

    //Todo List e list item ı ekleme
    todoList.appendChild(listItem);
    todoInput.value = ""; //ekleme bittikten sonra inputu temizle
}
