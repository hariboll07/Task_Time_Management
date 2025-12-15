let form1 = document.getElementById("form1");
let uname = document.getElementById("uname");
let email = document.getElementById("email");
let fname = document.getElementById("fname");
let password = document.getElementById("password");
let cpassword = document.getElementById("cpassword");
let tandc = document.getElementById("tc");
let signup = document.getElementById("signup");
let form2 = document.getElementById("form2");
let uName = document.getElementById("uName1");
let passWord = document.getElementById("passWord1");
let signin = document.getElementById("signin");

document.querySelector("#form1 .button").value = "Sign Up";
document.querySelector("#form2 .button").value = "Sign In";

uname.addEventListener("keyup", userChecker);
email.addEventListener("keyup", checkEmail);
fname.addEventListener("keyup", checkName);
password.addEventListener("keyup", checkPassword);
cpassword.addEventListener("keyup", checkConfPassword);

form1.addEventListener("submit", function (e) {
  e.preventDefault();
  signUpValidation();
});
function changeToSignin() {
  resetForm(form1);
  signup.style.display = "none";
  signin.style.display = "block";
}
function changeToSignup() {
  resetForm(form2);
  signin.style.display = "none";
  signup.style.display = "block";
}

function signUpValidation() {
  let uname1 = uname.value.trim();
  let email1 = email.value.trim();
  let password1 = password.value.trim();
  let cpassword1 = cpassword.value.trim();
  let fname1 = fname.value.trim();

  //for user
  userChecker();

  //for email
  checkEmail();

  //for password
  checkPassword();

  //for full name
  checkName();

  //confirm Password
  checkConfPassword();

  //for term and conditions
  if (!tandc.checked) {
    setError(tandc, "click on the terms and condition checkbox");
  } else {
    setSuccess(tandc);
  }

  if (
    uname.parentElement.classList.contains("success") &&
    email.parentElement.classList.contains("success") &&
    fname.parentElement.classList.contains("success") &&
    password.parentElement.classList.contains("success") &&
    cpassword.parentElement.classList.contains("success") &&
    tandc.checked
  ) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username or email already exists
    let userExists = users.some(
      (u) => u.username === uname.value.trim() || u.email === email.value.trim()
    );

    if (userExists) {
      alert("User already exists! Try a different username or email.");
      resetForm(form1)
      return;
    }

    //if user not exits it will run
    let userData = {
      username: uname.value.trim(),
      fullname:fname.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    };

    // Add new user to array
    users.push(userData);

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
    changeToSignin();
  }
}
function userChecker() {
  let uname1 = uname.value.trim();
  if (uname1 === "") {
    setError(uname, "username cannot be empty");
  } else if (uname1.length < 6) {
    setError(uname, "username must be contain 6 characters");
  } else {
    setSuccess(uname);
  }
}
function checkName(){
  let fname1=fname.value.trim()
  if(fname1===""){
    setError(fname,"Fullname cannot be empty")
  }
  else{
    setSuccess(fname)
  }
}
function checkEmail() {
  let email1 = email.value.trim();
  if (email1 === "") {
    setError(email, "email cannot be empty");
  } else if (!emailChecker(email1)) {
    setError(email, "enter vaild email Id");
  } else {
    setSuccess(email);
  }
}
function checkPassword() {
  let password1 = password.value.trim();
  if (password1 === "") {
    setError(password, "password cannot be empty");
  } else if (!passwordChecker(password1)) {
    setError(password, "enter vaild password");
  } else {
    setSuccess(password);
  }
}
function checkConfPassword() {
  let cpassword1 = cpassword.value.trim();
  let password1 = password.value.trim();
  if (cpassword1 === "") {
    setError(cpassword, "password cannot be empty");
  } else if (cpassword1 !== password1) {
    setError(cpassword, "Password didn't matched");
  } else {
    setSuccess(cpassword);
  }
}

form2.addEventListener("submit", function (e) {
  e.preventDefault();
  signInValidation();
});

//signin validations
function signInValidation() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    alert("No users found! Please sign up first.");
    return;
  }

  let uname1 = uName.value.trim();
  let password1 = passWord.value.trim();

  // Find matching user
  let userFound = users.find(
    (u) => u.username === uname1 && u.password === password1
  );

  if (userFound) {
    alert("Login Successful!");
    localStorage.setItem("currentUser", userFound.username);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid Username or Password");
  }
}

//for reset the form
function resetForm(form) {
  let fields = form.querySelectorAll(".field");
  fields.forEach((field) => {
    field.classList.remove("success");
    field.classList.remove("error");

    let input = field.querySelector("input");
    if (input) input.value = "";

    let small = field.querySelector("small");
    if (small) small.style.visibility = "hidden";
  });
}
//giving error and success msg and icons
function setError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  small.innerText = message;
  parent.classList.add("error");
  parent.classList.remove("success");
}
function setSuccess(input) {
  let parent = input.parentElement;
  parent.classList.remove("error");
  parent.classList.add("success");
}

//checking email and password by using regex
function emailChecker(input) {
  let r = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let valid = r.test(input);
  return valid;
}
function passwordChecker(input) {
  let r = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&'*(),.?/]).{8,}$/;
  let valid = r.test(input);
  return valid;
}
