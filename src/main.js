// Every todo item should have a "container" div with class todo-container that will contain 3 sub-elements:

// An element with a class todo-text with the text of the todo task
// An element with a class todo-created-at that will hold the creation time of the task in a SQL format
// An element for showing the numeric priority value of the task, with a class todo-priority

function init () {
    let addButton = document.getElementById("add-button");
    addButton.addEventListener('click', createTask);
    let taskList = document.getElementById("task-list");
    taskList.addEventListener('click', clickOnTask);
    updateCounter();
}

function taskDate() {
    let date = new Date();
    let ss = date.getSeconds(); 
    let mi = date.getMinutes();
    let hh = date.getHours();
    let dd = date.getDate();
    let mm = date.getMonth()+1; 
    let yyyy = date.getFullYear();
    if(ss < 10) {
        ss = '0' + ss;
    }
    if(mi < 10) {
        mi = '0' + mi;
    }
    if (hh < 10) {
        hh = '0' + hh;
    }
    if(dd < 10) { 
        dd = '0' + dd;
    } 
    if(mm < 10) {
        mm = '0' + mm;
    } 
    let today = yyyy + '-' + mm +'-' + dd + ' '+ hh + ':' + mi + ':' + ss;
    return today;
}

function sort() {

}

function updateCounter() {
    let taskList = document.getElementById("task-list");
    let counterSpan = document.getElementById("counter");
    counterSpan.innerText = taskList.childElementCount + ' TODOs';
}

function clickOnTask(event){
    let target = event.target;
    if (target.hasAttribute('taskarea')) {
        toggleCompleteTask(event)
    } else if (target.hasAttribute('deletearea')) {
        deleteTask(event)
    }
}

function deleteTask(event) {
    let deleteArea = event.target;
    deleteArea.parentElement.remove();
    updateCounter();
 }

function toggleCompleteTask(event) {
    let target = event.target;
    do {
        if (target.tagName === 'LI'){
            target.classList.toggle('checked');
            return;
        }
        target = target.parentElement;
    } while (target != 'BODY') // Should never get to BODY, just for safety.
}

function createTask() {

    let taskText = document.getElementById("text-input").value;
    if (taskText === '') {
        alert("Please insert a task");
        return;
    }

    // LI
    let li = document.createElement("li");
    li.setAttribute('taskarea', 'taskarea');

    // Task Container
    let todoContainer =  document.createElement("DIV");
    todoContainer.setAttribute('taskarea', 'taskarea');
    todoContainer.classList.add("todo-container");
    li.appendChild(todoContainer)

    // Task text
    let todoText =  document.createElement("DIV");
    todoText.setAttribute('taskarea', 'taskarea');
    todoText.classList.add("todo-text");
    let textNode = document.createTextNode(taskText);
    todoText.appendChild(textNode);
    todoContainer.appendChild(todoText);  

    // Date
    let todoCreatedAt = document.createElement("DIV");
    todoCreatedAt.setAttribute('taskarea', 'taskarea');
    todoCreatedAt.classList.add("todo-created-at");
    let taskDateText = taskDate();
    let dateTextNode = document.createTextNode(taskDateText);
    todoCreatedAt.appendChild(dateTextNode);
    todoContainer.appendChild(todoCreatedAt);  

    // Priority
    let todoPriority = document.createElement("DIV");
    todoPriority.setAttribute('taskarea', 'taskarea');
    todoPriority.classList.add("todo-priority");
    let taskPriorityValue = document.getElementById("priority-selector").value;
    let priorityText = document.createTextNode(taskPriorityValue);
    todoPriority.appendChild(priorityText);
    todoContainer.appendChild(todoPriority);  

    // Delete Button
    let deleteArea = document.createElement("SPAN");
    deleteArea.setAttribute('deletearea', 'deletearea');
    let deleteSymbol = document.createTextNode("\u00D7");
    deleteArea.className = "close";
    deleteArea.appendChild(deleteSymbol);
    li.appendChild(deleteArea);

    document.getElementById("text-input").value = "";
    document.getElementById("task-list").appendChild(li);
    updateCounter();
}
