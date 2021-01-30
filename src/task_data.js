const BIN_ID = "6015a4446426b448ee0eb89d";
let dataTasks;// = new Tasks();

function Tasks () {
    this.lastIdCounter = 0;
    this.taskArray = [];
}

function Task (text, priority, createdAt) {
    this.id = null;
    this.text = text;
    this.priority = priority;
    this.createdAt = createdAt;
    this.isActive = true;
}

function addTask (task) {
    dataTasks.lastIdCounter++;
    task.id = 'task-id-' + dataTasks.lastIdCounter;
    dataTasks.taskArray.push(task)
    updateServer(dataTasks, BIN_ID);
    return task.id;
}

function removeTask(id) {
    for (i in dataTasks.taskArray) {
        if (dataTasks.taskArray[i].id === id) {
            dataTasks.taskArray.splice (i, 1);
            updateServer(dataTasks, BIN_ID);
            return;
        }
    }
}

function toggleIsActive(id) {
    for (task of dataTasks.taskArray) {
        if (task.id === id) {
            task.isActive = !task.isActive;
            updateServer(dataTasks, BIN_ID);
            return;
        }
    }
}

function sort () {
    dataTasks.taskArray.sort(function(a, b){return b.priority - a.priority})
    updateServer(dataTasks, BIN_ID);
}

function loadData() {
    dataTasks = getFromServer(BIN_ID);
}

async function updateServer(obj, binId) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            "X-Master-Key" : "$2b$10$qXmy650q0DAvbiMhqmVknODrEcNCh5asdpTlcYO1fjLo2XEdI1sFW"
        },
        body: JSON.stringify(obj)
    };
    const response = await fetch("https://api.jsonbin.io/v3/b/"+binId, options);
    if (!response.ok) {
        const {error} = await response.json();
        throw "error" + error;
    }  
    const json = await response.json(); 
    //console.log(json)
    return json;
}

async function getFromServer(binId) {
    const options = {
        method: "GET",
        headers: {
            "X-Master-Key" : "$2b$10$qXmy650q0DAvbiMhqmVknODrEcNCh5asdpTlcYO1fjLo2XEdI1sFW"
        }
    };
    const response = await fetch("https://api.jsonbin.io/v3/b/"+binId, options); 
    if(!response.ok) {
        throw "Could not get to server data.";
    }
    
    const json = await response.json();
    //console.log(json);

    return json;
}

////////////////// TESTS /////////////////////////////////

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


// function testPersist(){
//     //let testTask = new Task('text', 1009, 11111);
//     return updateServer(testTask, BIN_ID)
// }

