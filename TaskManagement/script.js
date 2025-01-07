const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const showAllBtn = document.getElementById('showAll');
const showActiveBtn = document.getElementById('showActive');
const showCompletedBtn = document.getElementById('showCompleted');
const taskSummary = document.getElementById('taskSummary');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Load tasks from local storage
loadTasks();

// Add task event
addTaskBtn.addEventListener('click', addTask);
showAllBtn.addEventListener('click', loadTasks);
showActiveBtn.addEventListener('click', filterActive);
showCompletedBtn.addEventListener('click', filterCompleted);

function loadTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => createTaskElement(task));
    updateTaskSummary();
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const newTask = { text: taskText, completed: false };
    tasks.push(newTask);
    saveTasks();
    loadTasks();
    taskInput.value = '';
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskSummary() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const activeTasks = totalTasks - completedTasks;
    taskSummary.textContent = `Total Tasks: ${totalTasks}, Active: ${activeTasks}, Completed: ${completedTasks}`;
}

function filterActive() {
    taskList.innerHTML = '';
    tasks.filter(task => !task.completed).forEach(task => createTaskElement(task));
}

function filterCompleted() {
    taskList.innerHTML = '';
    tasks.filter(task => task.completed).forEach(task => createTaskElement(task));
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.className = task.completed ? 'completed' : '';

    // Toggle completion on click
    li.addEventListener('click', () => {
        task.completed = !task.completed;
        saveTasks();
        loadTasks();
    });

    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent toggling completion
        const newTaskText = prompt("Edit task:", task.text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            task.text = newTaskText.trim();
            saveTasks();
            loadTasks();
        }
    };

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent toggling completion
        tasks = tasks.filter(t => t !== task);
        saveTasks();
        loadTasks();
    };

    // Append buttons to the list item
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}
