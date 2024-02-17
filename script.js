let email = document.querySelector("#email");
let password = document.querySelector("#password");
let submit = document.querySelector("#submit");

submit.addEventListener('click', () => {
    let users = JSON.parse(localStorage.getItem("signup"));
    let user = users.filter((item) => {
        if (item.email === email.value && item.password === password.value) {
            return true;
        }
    })
    if (users.length > 0) { 
        let u = localStorage.setItem("loged", JSON.stringify(email.value));
        window.location.href = "http://10.20.9.182:5500/product.html";
        console.log("login");
    } else {
        console.log("Invalid username or password")
    }
})

