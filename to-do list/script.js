let tasksList = document.querySelector('.tasks_list');
let addButton = document.querySelector('.add-button');
let input = document.querySelector('.adder input');

let tasks = JSON.parse(localStorage.getItem('task list')) || 
[];
updateTaskList();

function updateTaskList(){
    let innerHtml = '';
    tasks.forEach((obj, index) => {
        innerHtml += `
            <li>
                <div class="task">
                    <img src="images/${obj.status}.png" onclick="change(${index})" > 
                    <p style="${obj.status === 'checked' ? 'text-decoration: line-through; color: grey;' : ''}">${obj.task}</p>
                </div>
                <button onclick="removeTask(${index})">X</button>
            </li>`;
    })
    tasksList.innerHTML = innerHtml;
    localStorage.setItem('task list', JSON.stringify(tasks));
}

function removeTask(index){
    tasks.splice(index, 1);
    updateTaskList();
}

function change(index){
    tasks[index].status = tasks[index].status == 'unchecked'? 'checked' : 'unchecked';
    updateTaskList();
}

addButton.addEventListener('click', () => {
    let value = input.value.trim();
    input.value = '';
    if(value != ''){
        tasks.push({
            task: `${value}`,
            status: 'unchecked',
        },);
        updateTaskList();
    }
    else{
        alert('Enter the valid text');
    }
})