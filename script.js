let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const task = { text, completed: false };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const doneBtn = document.createElement("button");
    doneBtn.textContent = task.completed ? "ยกเลิก" : "เสร็จแล้ว";
    doneBtn.onclick = () => toggleTask(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "ลบ";
    delBtn.onclick = () => deleteTask(index);

    actions.appendChild(doneBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

renderTasks();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://naizaza190-pixel/TesterNine.github.io/service-worker.js');
}
