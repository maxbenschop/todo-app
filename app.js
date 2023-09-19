document.addEventListener("DOMContentLoaded", function () {
    addTask = () => {
        const taskInput = document.getElementById("taskInput");
        const task = taskInput.value.trim();
        if (task !== "") {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            displayTasks();
        }
    };

    displayTasks = () => {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task, index) => {
            taskList.innerHTML += `
                <li class="todo-item flex items-center justify-between py-2 border-b border-gray-300">
                    <!-- <input type="checkbox" name="" id=""> -->
                    <div class="flex items-center">
                        <label for="${index}" class="text-lg font-medium text-gray-800">${task}</label>
                    </div>
                    <button class="delete-todo text-red-600 hover:text-red-800 focus:outline-none" onclick="removeTask(${index})">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
</button>
</svg>
                    </button>
                </li>
            `;
        });
    };

   
    removeTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    };

   
    document.getElementById("taskForm").addEventListener("submit", function (event) {
        event.preventDefault();
        addTask();
    });

  
    const toggleDarkModeClass = () => {
        const body = document.body;
        body.classList.toggle("dark-mode");
        const isDarkMode = body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);
    };

    
const darkModeButton = document.getElementById("darkModeButton");
darkModeButton.addEventListener("click", function () {
    toggleDarkModeClass();
    const trashIcons = document.querySelectorAll(".delete-todo svg");
    if (document.body.classList.contains("dark-mode")) {
        trashIcons.forEach(icon => {
            icon.setAttribute("fill", "white");
        });
    } else {
        trashIcons.forEach(icon => {
            icon.removeAttribute("fill");
        });
    }
});

    displayTasks();
});
