const API_URL = 'http://localhost:3000/api/tasks';
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskDesc = document.getElementById('task-desc');

// Fetch and Display Tasks
async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  taskList.innerHTML = tasks.map(task => `
    <div class="task">
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Status: ${task.status}</p>
      <div class="actions">
        <button onclick="updateTask('${task._id}', 'Completed')">Mark Completed</button>
        <button onclick="deleteTask('${task._id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

// Add Task
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newTask = {
    title: taskTitle.value,
    description: taskDesc.value,
  };

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  });

  taskTitle.value = '';
  taskDesc.value = '';
  fetchTasks();
});

// Update Task
async function updateTask(id, status) {
  await fetch(`${API_URL}/${id}`, {  // Corrected the template literal
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  fetchTasks();
}

// Delete Task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {  // Corrected the template literal
    method: 'DELETE',
  });
  fetchTasks();
}

// Initial Fetch
 fetchTasks();
