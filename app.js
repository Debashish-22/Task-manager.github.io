var input = document.getElementById('input');
var button = document.getElementById('button');
var container = document.getElementById('container');
var content = document.getElementById('content');

let taskList = [];

notification = (content, color) => {

    let newItem = document.createElement('div');
    newItem.classList.add('notification', color)
    newItem.innerHTML = content;
    container.insertBefore(newItem, container.childNodes[0]);

    setTimeout(() => {
        newItem.classList.add('none')
    }, 1500)
}

button.addEventListener('click', (e)=>{

    let buttonStatus = e.target.textContent.toLowerCase();

    let taskName = input.value;
    if (!taskName) {
        notification('Please, Add a Task!', 'bg-red');
        return;
    }

    if(buttonStatus === 'add'){

        addTask(taskName);
        notification('Task Added successfully!', 'bg-green');
        input.value = "";
    }

    if(buttonStatus === 'save'){
        addTask(taskName);
        notification('Task Updated successfully!', 'bg-green');
        button.textContent = "Add";
        render(taskList);
        input.value = "";
    }
})

render = (newList) =>{
    content.innerHTML = "";
    newList.map((element)=>{

    let newTask = document.createElement('div');

    newTask.id= element.id;
    newTask.classList.add('task', 'flex', 'between');

    newTask.innerHTML = `
    <div class="main flex" >
        <i class="bi bi-check-circle-fill icon ${element.status ? 'green' : 'yellow'}"></i>
        <p class= ${element.status ? 'canceled' : ''}>${element.taskName}</p>
    </div>
    <div class="functions">
        <i class="bi bi-pencil-square icon black" function="edit"></i>
        <i class="bi bi-check-lg icon blue" function="check"></i>
        <i class="bi bi-trash icon red" function="delete"></i>
    </div>
    `;
    content.insertBefore(newTask, content.childNodes[0]);
    })
}

addTask = (taskName) => {
    let task = {
        id: Date.now().toString(),
        taskName,
        status: false
    }
    taskList.push(task);
    render(taskList);
}

content.addEventListener('click', (e)=>{

    var target = e.target.parentNode.parentNode.id;
    var current = e.target.getAttribute('function');
    
    if(current === 'delete'){

        deleteTask(target);
    }

    if(current === 'check'){

        checkTask(target);
    }

    if(current === 'edit'){

       editTask(target);
    } 
})

deleteTask = (taskId) =>{

    var newList = taskList.filter((element)=>{
        
        if(element.id !== taskId){
            return element;
        }
    });

    taskList = newList;
    notification('Task Removed!', 'bg-yellow');
    return render(newList);
}

checkTask = (taskId) =>{
    
    taskList.map((element)=>{
        
        if(element.id === taskId){
            
            let status = element.status;
            element.status = !status;

            if(!element.status){
                notification('Task Incomplete!', 'bg-yellow');
                return;
            }
            notification('Task completed!', 'bg-green');
        }
    });

    return render(taskList);
}

editTask = (taskId) =>{

    button.textContent= "Save";
    taskList.filter((element)=>{

        if(taskId === element.id){

            input.value = element.taskName;
            deleteTask(taskId);
        }
    }) 
}
