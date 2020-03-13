// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load All event listeners
loadEventListeners();

function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", e => {
    if (taskInput.value === "") {
      alert("Add a task");
      return;
    }
    // Create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Apend the li to the taskList
    taskList.appendChild(li);

    // Store item to local storage
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(taskInput.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    e.preventDefault();
  });

  // Remove task event. Event delegation, not event bubling
  taskList.addEventListener("click", e => {
    if (e.target.parentElement.classList.contains("delete-item")) {
      if (
        confirm(
          "Are you sure you want to remove the element: " +
            e.target.parentElement.parentElement.textContent +
            " ?"
        )
      ) {
        e.target.parentElement.parentElement.remove();

        // Remove task for Local Storage
        let tasks;
        if (localStorage.getItem("tasks") === null) {
          tasks = [];
        } else {
          tasks = JSON.parse(localStorage.getItem("tasks"));
        }

        tasks.forEach((task, index) => {
          if (e.target.parentElement.parentElement.textContent === task) {
            tasks.splice(index, 1);
          }
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }
  });

  // Clear task event.
  clearBtn.addEventListener("click", e => {
    // taskList.innerHTML = "";

    // Faster way
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    // Clear tasks from Local Storage
    localStorage.clear();
  });

  // Filter tasks event.
  filter.addEventListener("keyup", e => {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(task => {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    });
  });

  // DOM load event
  document.addEventListener("DOMContentLoaded", () => {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(task => {
      // Create li element
      const li = document.createElement("li");
      li.className = "collection-item";
      li.appendChild(document.createTextNode(task));

      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);

      // Apend the li to the taskList
      taskList.appendChild(li);
    });
  });
}
