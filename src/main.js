

// function when loading page
function init () {
    let addButton = document.getElementById("add-button");
    addButton.addEventListener('click', createTask);

    let sortButton = document.getElementById("sort-button");
    sortButton.addEventListener('click', sortTasks);

    let taskList = document.getElementById("task-list");
    taskList.addEventListener('click', clickOnTask);
    refresh();
    document.body.style.cursor='default';
}

//delets everything and gets it from the server 
function refresh() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = '';
    for (i in taskArray) {
        createUiTask(taskArray[i], i)
    }
    updateCounter();
}


// date function
function taskDate(time) {
    let date = new Date(time);
    let ss = date.getSeconds(); 
    let mi = date.getMinutes();
    let hh = date.getHours();
    let dd = date.getDate();
    let mm = date.getMonth()+1; 
    let yyyy = date.getFullYear();
    ss = format2digits(ss);
    mi = format2digits(mi);
    hh = format2digits(hh);
    dd = format2digits(dd);
    mm = format2digits(mm);
    let today = yyyy + '-' + mm +'-' + dd + ' '+ hh + ':' + mi + ':' + ss;
    return today;
}

// SQL date function
function format2digits (d) {
    if (d < 10) {
        return '0'+d;
    } else {
        return d;
    }
}

// sort function
function sortTasks() {
    sort();
    refresh();
}


function updateCounter() {
    let counterSpan = document.getElementById("counter");
    counterSpan.innerText = 'You have ' + taskArray.length + ' tasks left';
}


// Delete or completed task function
function clickOnTask(event){
    let target = event.target;
    if (target.hasAttribute('taskarea')) {
        toggleCompleteTask(event)
    } else if (target.hasAttribute('deletearea')) {
        deleteTask(event)
    }
}

function deleteTask(event) {
    let li = event.target.parentElement;
    removeTask(li.id);
    refresh();
 }

function toggleCompleteTask(event) {
    let target = event.target;
    do {
        if (target.tagName === 'LI'){
            break;
        }
        target = target.parentElement;
    } while (target != 'BODY') // Should never get to BODY, just for safety.
    let li = target;
    toggleIsActive(li.id);
    refresh();
}


// create task function
function createTask() {
    let taskText = document.getElementById("text-input").value;
    if (taskText === '') {
        alert("Please insert a task");
        return;
    }
    let taskPriority = document.getElementById("priority-selector").value;
    let time = new Date().getTime();
    let dataTask = new Task(taskText, taskPriority, time);
    addTask(dataTask)
    refresh();
}


// Create UI function 
function createUiTask(dataTask, index) {

    // LI
    let li = document.createElement("li");
    li.setAttribute('taskarea', 'taskarea');
    li.id = index;

    // Task Container
    let todoContainer = document.createElement("DIV");
    todoContainer.setAttribute('taskarea', 'taskarea');
    todoContainer.classList.add("todo-container");
    li.appendChild(todoContainer)

    // Text
    let todoText =  document.createElement("DIV");
    todoText.setAttribute('taskarea', 'taskarea');
    todoText.classList.add("todo-text");
    let textNode = document.createTextNode(dataTask.text);
    todoText.appendChild(textNode);
    todoContainer.appendChild(todoText);  

    // Date
    let todoCreatedAt = document.createElement("DIV");
    todoCreatedAt.setAttribute('taskarea', 'taskarea');
    todoCreatedAt.classList.add("todo-created-at");
    let taskDateText = taskDate(dataTask.date);
    let dateTextNode = document.createTextNode(taskDateText);
    todoCreatedAt.appendChild(dateTextNode);
    todoContainer.appendChild(todoCreatedAt);  

    // Priority
    let todoPriority = document.createElement("DIV");
    todoPriority.setAttribute('taskarea', 'taskarea');
    todoPriority.classList.add("todo-priority");
    let priorityText = document.createTextNode(dataTask.priority);
    todoPriority.appendChild(priorityText);
    todoContainer.appendChild(todoPriority);  

    // Is Active
    // check if task isActive and give class if not
     if (!dataTask.isActive) {
         li.classList.add('checked');
     } else {
         li.classList.remove('checked');
     }

    // Delete Button
    let deleteArea = document.createElement("SPAN");
    deleteArea.setAttribute('deletearea', 'deletearea');
    let deleteSymbol = document.createTextNode("\u00D7");
    deleteArea.className = "close";
    deleteArea.appendChild(deleteSymbol);
    li.appendChild(deleteArea);

    document.getElementById("text-input").value = "";
    document.getElementById("task-list").appendChild(li);
}
