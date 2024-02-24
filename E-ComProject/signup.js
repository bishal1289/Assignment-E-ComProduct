let email = document.querySelector("#email");
let password = document.querySelector("#password");
let submit = document.querySelector("#submit");
let role = document.querySelector("#role");

let arr = [];
let users = localStorage.getItem("signup");
if (users != null) {
  let user = JSON.parse(localStorage.getItem("signup"));
  user.forEach((obj) => {
    arr.push(obj);
  });
  console.log(user);
}

submit.addEventListener("click", () => {
  let obj = {};
  obj.email = email.value;
  obj.password = password.value;
  obj.role = "user";
  arr.push(obj);
  localStorage.setItem("signup", JSON.stringify(arr));
  window.location.href = `/E-ComProject/login.html`;
});
