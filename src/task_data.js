function Tasks () {
    this.lastIdCounter = 0;
    this.taskList = [];

    this.addTask = function(task) {
        this.lastIdCounter++;
        task.id = 'task-id-' + this.lastIdCounter;
        this.taskList.push(task)
        return task.id;
    };

    this.removeTask = function(id) {
        for (i in this.taskList) {
            if (this.taskList[i].id === id) {
                this.taskList.splice (i, 1);
                return;
            }
        }
    };

    this.sort = function(){
        this.taskList.sort(function(a, b){return b.priority - a.priority})
    }

    this.size = function(){
        return this.taskList.length;
    }

}

function Task (text, priority, createdAt, isActive) {
    this.id = null;
    this.text = text;
    this.priority = priority;
    this.createdAt = createdAt;
    this.isActive = isActive; 
}

let dataTasks = new Tasks();

//let t = new Task('text', 2, 123456, true);
//dataTasks.addTask(t)
// t = new Task('text', 2, 123456, true);
// dataTasks.addTask(t)
// t = new Task('text', 2, 123456, true);
// dataTasks.addTask(t)

// dataTasks.removeTask('task-id-2')
// console.log(dataTasks);
//dataTasks.sort();
console.log(dataTasks.size());
