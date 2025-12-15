if (!localStorage.getItem("currentUser")) {
  window.location.href = "index.html";
}

//display username
let user1 = localStorage.getItem("currentUser");
document.getElementById("userName").innerHTML = user1.toUpperCase() || "user";

//dashboard
function goToDashboard() {
  window.location.href = "dashboard.html";
}

//for display name and email
let usersinfo = JSON.parse(localStorage.getItem("users"));
let currentuserinfo = usersinfo.find((user) => user.username === user1);

// If user does not exist, force logout
if (!currentuserinfo) {
    alert("User data missing. Logging out...");
    logout();
} else {
    document.querySelector(".name").innerHTML = currentuserinfo.fullname;
    document.querySelector(".email").innerHTML = currentuserinfo.email;
}

function goBackProfile() {
  goBack();
}
function getToggleProfile() {
  profileContainer();
}
function getToggleAboutus() {
  aboutUsContainer();
}

//hidden containers
function profileContainer() {
  document.getElementById("aboutContainer").style.visibility = "hidden";
  if (
    document.getElementById("profileContainer").style.visibility === "hidden"
  ) {
    document.getElementById("profileContainer").style.visibility = "visible";
  }
}
function aboutUsContainer() {
  document.getElementById("profileContainer").style.visibility = "hidden";
  if (document.getElementById("aboutContainer").style.visibility === "hidden") {
    document.getElementById("aboutContainer").style.visibility = "visible";
  }
}
function goBack() {
  document.getElementById("aboutContainer").style.visibility = "hidden";
  document.getElementById("profileContainer").style.visibility = "hidden";
}

//logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

//delete account function
function deleteAccount() {
  let currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return;
  // Ask user before deleting
  let confirmDelete = confirm(
    "Are you sure you want to delete your account? This cannot be undone."
  );
  if (!confirmDelete) return;

  // Get all users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  //get all tasks
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Remove only the logged-in user
  let updatedUsers = users.filter((user) => user.username !== currentUser);
  //remove only the tasks which are logged-in user
  let updatedTasks = tasks.filter((task) => task.username !== currentUser);

  // Save updated list
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  //Save update list
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  // Remove session user
  localStorage.removeItem("currentUser");

  // Redirect to login
  alert("Account deleted successfully.");
  window.location.href = "index.html";
}

//open TaskBar
function openTaskPopup() {
  resetTaskForm();
  document.getElementById("taskPopup").style.display = "flex";
}

//close TaskBar
function closeTaskPopup() {
  document.getElementById("taskPopup").style.display = "none";
}

function resetTaskForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("taskDeadline").value = "";
  document.getElementById("taskPriority").value = "Low";
}

//save btn
function saveTask() {
  let title = document.getElementById("taskTitle").value.trim();
  let desc = document.getElementById("taskDescription").value.trim();
  let deadline = document.getElementById("taskDeadline").value;
  let priority = document.getElementById("taskPriority").value;
  let currentUser = localStorage.getItem("currentUser");

  if (title === "") {
    alert("Task title cannot be empty!");
    return;
  }

  if (deadline === "") {
    alert("Please select a deadline!");
    return;
  }

  let selectedDate = new Date(deadline);
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    alert("Please select a valid future date");
    return;
  }

  // Create task object
  let newTask = {
    id: Date.now(),
    username: currentUser,
    createdAt: Date.now(),
    title: title,
    description: desc,
    deadline: deadline,
    priority: priority,
    status: "New",
  };

  // Read existing tasks or create empty list
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add new task
  tasks.push(newTask);

  // Save back to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  alert("Task Added!");

  closeTaskPopup();

  // Update UI
  let activeTab = document.querySelector(".tab.active").innerText;
  filterTasks(`${activeTab == "All Tasks" ? "All" : activeTab}`);
}

function filterTasks(status) {
  let currentUser = localStorage.getItem("currentUser");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let today = new Date().toISOString().split("T")[0];

  let filtered;
  if (status === "All") {
    filtered = tasks.filter((task) => task.username === currentUser);
  } else if (status === "Overdue") {
    filtered = tasks.filter(
      (task) =>
        task.username === currentUser &&
        task.status !== "Completed" &&
        task.deadline < today
    );
  } else {
    filtered = tasks.filter(
      (task) => task.username === currentUser && task.status === status
    );
  }

  let container = document.querySelector(".task-container");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `<p style="color:white; text-align:center;">No ${
      status == "All" ? "" : status
    } tasks found.</p>`;
    return;
  }

  filtered.forEach((task) => {
    let div = document.createElement("div");
    div.classList.add("task-card");
    div.dataset.priority = task.priority;
    let isOverdue = task.deadline < today && task.status !== "Completed";
    let completed = task.status === "Completed";
    if (isOverdue) {
      div.classList.add("overdue");
    }
    div.innerHTML = `
      <h2>${task.title.toUpperCase()}</h2>
      <p><b>Deadline:</b> ${task.deadline}</p>
      <p><b>Priority:</b> ${task.priority}</p>
      <p><b>Status:</b> ${task.status}</p>

      ${
        completed
          ? `<button ${isOverdue ? "disabled" : ""} class="delete-btn" onclick="deleteTask(${
              task.id
            })">
            Delete Task
        </button>`
          : `
        <button ${isOverdue ? "disabled" : ""} class="complete-btn" onclick="updateStatus(${
              task.id
            }, 'Completed')">
          Mark Completed
        </button>
        <button ${isOverdue ? "disabled" : ""} class="edit-btn" onclick="editTask(${task.id})">
            Edit Task
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">
            Delete Task
        </button>
        
      `
      }

    `;
    container.appendChild(div);
  });
}

function setTab(status) {
  let allTabs = document.querySelectorAll(".tab");

  allTabs.forEach((tab) => tab.classList.remove("active"));

  // make clicked tab active
  event.target.classList.add("active");

  // filter tasks by status
  filterTasks(status);
}
function updateStatus(taskId, newStatus) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      task.status = newStatus;
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  let activeTab = document.querySelector(".tab.active").innerText;
  filterTasks(`${activeTab == "All Tasks" ? "All" : activeTab}`);
}

function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.filter((task) => task.id !== taskId);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  let activeTab = document.querySelector(".tab.active").innerText;
  filterTasks(`${activeTab == "All Tasks" ? "All" : activeTab}`);
}

function editTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let task = tasks.find((t) => t.id === taskId);

  if (!task) {
    alert("Task not found!");
    return;
  }

  // Get updated values with current values as defaults
  let newTitle = prompt("Enter your title", task.title);
   // title Validation
  if (!newTitle || newTitle.trim() === "") {
    alert("Title cannot be empty!");
    return;
  }
  let newDesc = prompt("Enter your description", task.description);
  let newDeadline = prompt("Enter your deadline (YYYY-MM-DD)", task.deadline);
  //date validation
   if (!/^\d{4}-\d{2}-\d{2}$/.test(newDeadline)) {
    alert("Invalid date format! Use YYYY-MM-DD");
    return;
  }
  let today = new Date();
  today.setHours(0,0,0,0);

  let newDate = new Date(newDeadline);
  newDate.setHours(0,0,0,0);
  if (newDate < today) {
    alert("Deadline must be today or future date");
    return;
  }

  let newPriority = prompt("Enter priority (Low, Medium, High)", task.priority);
    // Priority validation
  let validPriorities = ["Low", "Medium", "High"];

  // Capitalize first letter to match format
  if (newPriority) {
    newPriority = newPriority.charAt(0).toUpperCase() + newPriority.slice(1).toLowerCase();
  }
  if (!validPriorities.includes(newPriority)) {
    alert("Invalid priority! Allowed values: Low, Medium, High");
    return;
  }

  // Update task fields
  task.title = newTitle.trim();
  task.description = newDesc.trim();
  task.deadline = newDeadline;
  task.priority = newPriority;

  // Save changes
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Refresh UI
  let activeTab = document.querySelector(".tab.active").innerText;
  filterTasks(activeTab == "All Tasks" ? "All" : activeTab);

  alert("Task updated!");
}

//auto update the status from new to pending
function autoUpdatePending() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let now = Date.now();
  let updated = false;

  tasks = tasks.map((task) => {
    if (task.status === "New") {
      let diff = now - task.createdAt;
      if (diff >= 3600000) {
        task.status = "Pending";
        updated = true;
      }
    }
    return task;
  });

  if (updated) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  return updated; // tells interval if UI needs update
}

function updateTaskStatusInUI() {
  const taskCards = document.querySelectorAll(".task-card");

  taskCards.forEach(card => {
    const title = card.querySelector("h2").innerText;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let task = tasks.find(t => t.title.toUpperCase() === title);

    if (!task) return;

    // safer way to find status element
    let statusElement = Array.from(card.querySelectorAll("p"))
      .find(p => p.innerHTML.includes("Status"));

    if (statusElement) {
      statusElement.innerHTML = `<b>Status:</b> ${task.status}`;
    }
  });
}

window.onload = function () {
  autoUpdatePending();
  filterTasks("All");
};

setInterval(() => {
  const updated = autoUpdatePending();
  if (updated) updateTaskStatusInUI();
}, 10000);

