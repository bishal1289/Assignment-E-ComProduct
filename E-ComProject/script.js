let email = document.querySelector("#email");
let password = document.querySelector("#password");
let submit = document.querySelector("#submit");

submit.addEventListener("click", () => {
  let users = JSON.parse(localStorage.getItem("signup"));
  let user = users.filter((item) => {
    if (item.email === email.value && item.password === password.value) {
      return true;
    }
  });
  console.log(user);
  if (user.length > 0) {
    console.log(user);
    let obj = {};
    obj.email = user[0].email;
    obj.role = user[0].role;

    localStorage.setItem("loged", JSON.stringify(obj));
    if (user[0].role === "Admin") {
      window.location.href = `/E-ComProject/product.html`;
    } else {
      window.location.href = `/E-ComProject/index.html`;
    }
    console.log("login");
  } else {
    console.log("Invalid username or password");
  }
});
