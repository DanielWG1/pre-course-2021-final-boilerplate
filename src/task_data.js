const EMPTY = 'EMPTY'
const BIN_ID = "6015a4446426b448ee0eb89d";
let taskArray = [];

function Task (text, priority, date) {
    this.text = text;
    this.priority = priority;
    this.date = date;
    this.isActive = true;
}

function addTask (task) {
    taskArray.push(task)
    updateServer(taskArray, BIN_ID);
}

function removeTask(i) {
    taskArray.splice (i, 1);
    updateServer(taskArray, BIN_ID);
}

function toggleIsActive(i) {
    taskArray[i].isActive = !taskArray[i].isActive;
    updateServer(taskArray, BIN_ID);
}

function sort () {
    taskArray.sort(function(a, b){return b.priority - a.priority})
    updateServer(taskArray, BIN_ID);
}

function updateServer(obj, binId) {
    let array;
    if (obj.length === 0){
        array = [EMPTY];
    } else {
        array = obj;
    }
    httpPUT(array, binId)
}

function loadData(callBack) {
    httpGET(BIN_ID).then(setDataTaks).then(callBack);
}

function setDataTaks (json) {
    if (json['record'][0] === EMPTY) {
        taskArray = [];
    }
    else {
        taskArray = json['record'];
    }
}

async function httpPUT(obj, binId) {
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
    return json;
}

async function httpGET(binId) {
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
    return json;
}


