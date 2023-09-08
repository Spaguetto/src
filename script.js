class Task {
    constructor(title, description) {
      this.title = title;
      this.description = description;
      this.completed = false;
    }
  }
  
  class TaskManager {
    constructor() {
      this.tasks = [];
    }
  
    async addTask(task) {
      this.tasks.push(task);
      await this.saveTasks();
    }
  
    async saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks)); // Task {title > a, Descitpuion > b} => { a ,  b}
      this.displayTasks();
    }
  
    async loadTasks() {
      const savedTasks = localStorage.getItem("tasks");
      this.tasks = savedTasks ? JSON.parse(savedTasks) : []; //1 , 2 , 3 ..... n +1
      this.displayTasks();
      console.log("task");
    }
  
    displayTasks() {
      const taskList = document.getElementById("task-list");
      taskList.innerHTML = "";
  
      this.tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
                <span class="${task.completed ? "completed" : ""}">${
          task.title
        } - ${task.description}</span>
                <button onclick="completeTask(${index})">Completar</button>
                <button onclick="editTask(${index})">Editar</button>
                <button onclick="deleteTask(${index})">Eliminar</button>
            `;
        taskList.appendChild(li);
      });
    }
  }
  
  const taskManager = new TaskManager(); // CREATE
  
  document.getElementById("task-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    if (title && description) {
      const task = new Task(title, description);
      await taskManager.addTask(task);
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
    }
  });
  
  function completeTask(index) { /// UPDATE DEL CRUD  >>>>  UPDATE 
    taskManager.tasks[index].completed = true;
    taskManager.saveTasks();
  }
  
  function editTask(index) { // UPDATE
    const newTitle = prompt(
      "Editar título de la tarea:",
      taskManager.tasks[index].title
    );
    const newDescription = prompt(
      "Editar descripción de la tarea:",
      taskManager.tasks[index].description
    );
  
    if (newTitle !== null && newDescription !== null) {
      taskManager.tasks[index].title = newTitle;
      taskManager.tasks[index].description = newDescription;
      taskManager.saveTasks();
    }
  }
  
  function deleteTask(index) { // DELETE
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      taskManager.tasks.splice(index, 1);
      taskManager.saveTasks();
    }
  }
  
  taskManager.loadTasks();
  