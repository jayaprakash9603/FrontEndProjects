const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");
const addButton = document.getElementById("add-button");
const taskSet = new Set();

function addTask() {
    const taskText = inputbox.value.trim();

    if (taskText === "") {
        alert("You must write something.");
        return;
    }

    if (taskSet.has(taskText)) {
        alert("Task already exists.");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = taskText;
    listcontainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    // Add the task to the set to prevent duplicates
    taskSet.add(taskText);

    inputbox.value = "";
    saveData();
}

listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        const taskText = e.target.parentElement.textContent.trim();
        taskSet.delete(taskText); // Remove the task from the set
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showTask() {
    listcontainer.innerHTML = localStorage.getItem("data");
    // Update the taskSet based on the displayed tasks
    taskSet.clear();
    listcontainer.querySelectorAll("li").forEach(function (li) {
        const taskText = li.textContent.trim();
        taskSet.add(taskText);
    });
}

showTask();

inputbox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addButton.click();
    }
});
    