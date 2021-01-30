
let lastIdCounter = 0;
let dataTasks = [];


function Task (text, priority, createdAt) {
    this.id = null;
    this.text = text;
    this.priority = priority;
    this.createdAt = createdAt;
    this.isActive = true;
}

function addTask (task) {
    lastIdCounter++;
    task.id = 'task-id-' + lastIdCounter;
    dataTasks.push(task)
    return task.id;
}

function removeTask(id) {
    for (i in dataTasks) {
        if (dataTasks[i].id === id) {
            dataTasks.splice (i, 1);
            return;
        }
    }
}

function toggleIsActive(id) {
    for (task of dataTasks) {
        if (task.id === id) {
            task.isActive = !task.isActive;
            return;
        }
    }
}

function sort (){
    dataTasks.sort(function(a, b){return b.priority - a.priority})
}

// let t = new Task('text', 2, 123456);
// addTask(t)
// t = new Task('text', 2, 123456);
// addTask(t)
// t = new Task('text', 2, 123456);
// addTask(t)
// console.log(dataTasks);
// toggleIsActive('task-id-1');
// console.log(dataTasks);
// dataTasks.sort();
// console.log(dataTasks);
