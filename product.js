let main = document.querySelector("#main");
let pBox = document.querySelector("#pBox");

let arr = [];

let logedUser = localStorage.getItem("loged");
if (logedUser) {
  if (localStorage.getItem("products") != null) {
    arr = JSON.parse(localStorage.getItem("products"));
    arr.forEach((item) => {
      console.log(item);
      addToUi(item);
    });
  }

  pBox.addEventListener("click", addProduct);
} else {
  window.location.href = "http://10.20.9.182:5500/login.html";
}

function addProduct() {
  let name = window.prompt("Enter Product Name");
  let price = window.prompt("Enter Product Price");
  if (name.trim() != "" || price.trim() != "") {
    let obj = {};
    obj.name = name;
    obj.price = price;
    obj.id = Date.now();
    arr.push(obj);

    localStorage.setItem("products", JSON.stringify(arr));
    addToUi(obj);
  }
}

function addToUi(obj) {
  let div = document.createElement("div");
  let pspan = document.createElement("span");
  let nspan = document.createElement("span");
  let deleteBtn = document.createElement("button");
  let updateBtn = document.createElement("button");

  deleteBtn.innerText = "Delete";
  updateBtn.innerText = "Update";
  deleteBtn.addEventListener("click", deleteItem);
  pspan.innerHTML = obj.price;
  nspan.innerHTML = obj.name;

  div.appendChild(nspan);
  div.appendChild(pspan);
  div.appendChild(updateBtn);
  div.appendChild(deleteBtn);
  div.classList.add('div');

  main.appendChild(div);

  deleteBtn.addEventListener("click", () => {
    arr = arr.filter((item) => {
      if (item.id != obj.id) {
        return true;
      }
    });
    localStorage.setItem("products", JSON.stringify(arr));
  });

  updateBtn.addEventListener("click", () => {
    let name = window.prompt("Update products");
    let price = window.prompt("Update products");
    arr.map((item) => {
      if (item.id === obj.id) {
        console.log(item);
        if (name.trim() != "") {
          nspan.innerText = name;
          item.name = name;
        }
        if (price.trim() != "") {
          pspan.innerText = price;
          item.price = price;
        }
      }
    });
    localStorage.setItem("products", JSON.stringify(arr));
  });
}

function deleteItem(e) {
  e.target.parentNode.remove();
}

function removeItem() {
  localStorage.removeItem("loged");
  window.location.href = "http://10.20.9.182:5500/login.html";
}
