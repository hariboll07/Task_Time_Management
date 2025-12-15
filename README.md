📌 Personal Time Management Web App:
A simple, modern, and fully functional Task Manager Web Application built using HTML, CSS, and JavaScript.
This app helps users plan, organize, and track their daily tasks with features like authentication, priority handling, deadlines, and auto-updating task statuses — all stored in localStorage.

🌟 Features:
🔐 Authentication System:
User Sign Up with:
Username validation
Email validation (Regex)
Strong password validation
Full name check
Sign In with localStorage verification
Stores credentials securely in the browser
Session managed using currentUser

🗂️ Task Dashboard:
Users can create and manage tasks with:
✔ Task Properties
Title
Description
Deadline
Priority (Low / Medium / High)
Auto status update (New → Pending after 1 hour)

🧭 Task Categories:
All Tasks
New
Pending
Completed
Overdue

📝 Actions:
Mark task as complete
Edit task
Delete task
Overdue tasks get highlighted
Disabled actions for overdue tasks

🎨 UI / UX Highlights:
Premium dark theme
Glassmorphism task cards
Hover animations
Fixed navbar
Responsive auto-grid task layout
Popup modal for adding tasks
Smooth transitions and modern design

📁 Project Structure
/project-folder
│── index.html           → Login & Signup page
│── dashboard.html       → Main task dashboard
│── script.js            → Authentication logic
│── dashboard.js         → Task management logic
│── style.css            → Login/Signup styling
│── dashboard.css        → Dashboard styling

🚀 Getting Started
1️⃣ Clone or Download the Project
git clone <your-repository-url>

2️⃣ Open the App
Just open the index.html file in any modern browser.

3️⃣ Create an Account
Complete the signup form
Log in with your credentials
Start managing your tasks
Everything is stored in localStorage, even after refresh or closing the browser

🧩 Future Improvements 
Cloud database (MongoDB / Firebase)
Email verification
Push notifications for deadlines
Task search bar
Sorting & filtering
Light & Dark mode toggle
Mobile App version (React Native)

🧑‍💻 Author
Hari Kiran
A simple, clean, productivity-focused task manager built using pure frontend technologies.
