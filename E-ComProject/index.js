let main = document.querySelector("#main");
let productTag = document.querySelector("#product");
let login = document.querySelector("#login");
let logoutBtn = document.querySelector("#logout");
let signup = document.querySelector("#signup");
let products = JSON.parse(localStorage.getItem("products"));
let more = document.querySelector("#more");
let logedUser = JSON.parse(localStorage.getItem("loged"));
let cart = [];

if (logedUser && logedUser.role != "Admin") {
  productTag.style.display = "none";
}

function logout() {
  ``;
  localStorage.removeItem("loged");
  window.location.href = "/E-ComProject/index.html";
}

if (logedUser) {
  login.style.display = "none";
  signup.style.display = "none";
}
if (!logedUser) {
  logoutBtn.style.display = "none";
}
if (localStorage.getItem("cart")) {
  let item = JSON.parse(localStorage.getItem("cart"));
  item.forEach((ele) => {
    cart.push(ele);
  });
}

if (products) {
  let n = 0;
  more.addEventListener("click", () => {
    let temp = n;
    n += 5;
    for (let i = temp; i < n; i++) {
      temp++;
      if (i < products.length) showProduct(products[i]);
      if (i === products.length - 1) {
        more.style.display = "none";
      }
    }
  });

  for (let i = 0; i < 5; i++) {
    n++;
    if (i < products.length) showProduct(products[i]);
    if (products.length <= 5) more.style.display = "none";
  }

  function showProduct(obj) {
    let div = document.createElement("div");
    let nspan = document.createElement("span");
    let pspan = document.createElement("span");
    let cartBtn = document.createElement("button");
    let imageDiv = document.createElement("div");
    let image = document.createElement("img");

    image.style.height = "300px";
    image.style.width = "250px";

    image.setAttribute("src", "./Apple iPhone 15 pro max.jpeg");
    imageDiv.style.height = "300px";
    imageDiv.style.width = "300px";
    image.style.marginLeft = "25px ";

    imageDiv.append(image);
    pspan.style.marginLeft = "130px";

    div.style.boxShadow =
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset";

    div.style.width = "300px";
    div.style.height = "400px";
    div.style.borderRadius = "20px";
    nspan.style.marginLeft = "5px";
    cartBtn.style.margin = "30px";

    cartBtn.addEventListener("click", () => {
      let cartProduct = JSON.parse(localStorage.getItem("cart"));
      let flag = true;
      
      //** check if the item is already present in cart then only increase the qty of that cart item **/
      if (cartProduct) {
        cartProduct.map((item) => {
          if (item.id === obj.id && item.email === logedUser.email) {
            console.log(item);
            console.log(obj);
            item.qty += 1;
            flag = false;
          }
        });
        localStorage.setItem("cart", JSON.stringify(cartProduct));
      }
      if (logedUser) {
        if (flag) {
          let cartItem = {};
          cartItem.email = logedUser.email;
          cartItem.name = obj.name;
          cartItem.price = obj.price;
          cartItem.id = obj.id;
          cartItem.total = obj.price;
          cartItem.qty = 1;
          cart.push(cartItem);

          localStorage.setItem("cart", JSON.stringify(cart));
        }
      } else {
        window.location.href = "/E-ComProject/login.html";
      }
      //alert("Cart Item Added !!!");
    });
    nspan.innerHTML = obj.name;
    pspan.innerHTML = "RS :" + obj.price;
    cartBtn.innerText = "Add To Cart";
    div.append(imageDiv);
    div.append(nspan);
    div.append(pspan);
    div.append(cartBtn);
    main.append(div);
  }
} else {
  main.innerHTML = "<b>No Product to Show</b>";
  more.style.display = "none";
}
