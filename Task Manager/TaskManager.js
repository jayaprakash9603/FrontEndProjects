// Get HTML elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            ${taskText}
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);
        taskInput.value = "";

        // Add an event listener to delete the task
        li.querySelector(".delete").addEventListener("click", function() {
            li.remove();
            saveTasksToLocalStorage(); // Update local storage when a task is deleted
        });

        saveTasksToLocalStorage(); // Update local storage when a task is added
    }
}

// Function to search for tasks
function searchTasks() {
    const searchText = searchInput.value.trim().toLowerCase();
    const taskItems = taskList.querySelectorAll("li");

    taskItems.forEach((item) => {
        const taskText = item.textContent.toLowerCase();
        const displayStyle = taskText.includes(searchText) ? "block" : "none";
        item.style.display = displayStyle;
    });
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll("li")).map((item) => item.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${taskText}
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);

        // Add an event listener to delete the task
        li.querySelector(".delete").addEventListener("click", function() {
            li.remove();
            saveTasksToLocalStorage(); // Update local storage when a task is deleted
        });
    });
}

// Load tasks from local storage when the page loads
loadTasksFromLocalStorage();

// Add a task when the "Add" button is clicked
addTaskButton.addEventListener("click", addTask);

// Add a task when Enter key is pressed in the input field
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchTasks();
    }
});
 

// Add an event listener for key combination Ctrl (or Cmd) + K
document.addEventListener("keydown", function(event) {
    if ((event.key === "c" || event.key === "C") && event.ctrlKey ||(event.key==="b")) {
        // Your code to handle Ctrl (or Cmd) + K
        // For example, you can clear all tasks or perform a specific action
        clearAllTasks();
    }
});

// Function to clear all tasks
function clearAllTasks() {
    const taskItems = taskList.querySelectorAll("li");
    taskItems.forEach((item) => {
        item.remove();
    });

    // Clear tasks from local storage
    localStorage.removeItem("tasks");
}

// Add a click event listener to the search button
searchButton.addEventListener("click", searchTasks);
