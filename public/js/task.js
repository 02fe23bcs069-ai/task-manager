const api = "/api/tasks";

async function fetchTasks() {
  try {
    const res = await fetch(api);
    const tasks = await res.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.title;
      if (task.completed) li.classList.add("completed");
      li.onclick = () => toggleTask(task._id);
      const del = document.createElement("button");
      del.textContent = "❌";
      del.style.marginLeft = "10px";
      del.onclick = (e) => { e.stopPropagation(); deleteTask(task._id); };
      li.appendChild(del);
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
  }
}

async function addTask() {
  const title = document.getElementById("taskInput").value;
  if (!title) return;
  await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
  document.getElementById("taskInput").value = "";
  fetchTasks();
}

async function toggleTask(id) {
  await fetch(`${api}/${id}`, { method: "PUT" });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${api}/${id}`, { method: "DELETE" });
  fetchTasks();
}

// Run initially
fetchTasks();
