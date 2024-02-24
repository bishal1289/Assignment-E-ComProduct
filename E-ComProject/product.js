let main = document.querySelector("#main");
let pBox = document.querySelector("#pBox");

let arr = [];
let n = 0;
let logedUser = JSON.parse(localStorage.getItem("loged"));

if (logedUser && logedUser.role === "Admin") {
  if (localStorage.getItem("products")) {
    arr = JSON.parse(localStorage.getItem("products"));

    arr.forEach((item) => {
      console.log(item);
      addToUi(item);
    });

    //To show Product 5 once and again
    //   more.addEventListener("click", () => {
    //     let temp = n;
    //     n += 5;
    //     for (let i = temp; i < n; i++) {
    //       temp++;
    //       addToUi(arr[i]);
    //     }
    //   });
    //   for (let i = 0; i < 5; i++) {
    //     n++;
    //     if (i < arr.length) addToUi(arr[i]);
    //   }
  }

  pBox.addEventListener("click", addProduct);
} else {
  window.location.href = "/E-ComProject/login.html";
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
  div.classList.add("div");

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
  window.location.href = "/E-ComProject/product.html";
}
