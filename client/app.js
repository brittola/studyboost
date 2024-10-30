document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateStats();
    }
});

let tasks = [];
let editingIndex = null;

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const progressBar = document.getElementById("progress");
progressBar.style.width = `0%`;

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        if (editingIndex !== null) {
            tasks[editingIndex].text = text;
            editingIndex = null;
        } else {
            tasks.push({ text: text, completed: false });
        }

        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    editingIndex = index;
};

const updateStats = () => {
    const completeTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progressBar = document.getElementById("progress");

    if (totalTasks > 0) {
        const progress = (completeTasks / totalTasks) * 100;
        progressBar.style.width = `${progress}%`;
    } else {
        progressBar.style.width = `0%`;
    }

    document.getElementById(
        "numbers"
    ).innerText = `${completeTasks} / ${totalTasks}`;

    if (totalTasks > 0 && completeTasks === totalTasks) {
        blastConfetti();
    }
};

const updateTasksList = () => {
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : ""
                } />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/Vector.png" onClick="editTask(${index})" />
                <img src="./img/X.png" onClick="deleteTask(${index})" />
            </div>
        </div>
    `;
        listItem
            .querySelector(".checkbox")
            .addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

updateStats();

const blastConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
    }, 250);
};
