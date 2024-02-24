let main = document.querySelector("#main");
let outerDiv = document.querySelector("#out");
let tableDiv = document.querySelector("#table");
let netTotal = document.querySelector("#total");
let loged = JSON.parse(localStorage.getItem("loged"));
let cartItem = JSON.parse(localStorage.getItem("cart"));

let h1 = document.createElement("h1");
h1.innerText = "No Cart Items";

let netTotalPrice = 0;
let netPrice = 0;

//** When window load calculate total and Nettotal and display **/

  cartItem.forEach((ele) => {
    ele.total = ele.price * ele.qty;
    netPrice += parseInt(ele.total);
  })
  localStorage.setItem("cart", JSON.stringify(cartItem));
  netTotal.innerHTML = `<b>Net Amount : ${netPrice}</b>`;

  

//** To clear all cart items **//
function clearAll() {
  localStorage.removeItem("cart");
  tableDiv.style.display = "none";
  outerDiv.append(h1);
}

//** If there is no item in cart then display -> No Cart Items **/

if (cartItem && cartItem.length == 0) {
  tableDiv.style.display = "none";
  outerDiv.append(h1);
}

//** To filter specific user cart items **//
if (loged) {
  if (cartItem) {
    let items = cartItem.filter((item) => {
      if (item.email === loged.email) {
        return true;
      }
    });
    console.log(items);

    items.forEach((item) => {
      netTotalPrice += parseInt(item.total);
      displayItem(item);
    });
  } else {
    tableDiv.style.display = "none";
    outerDiv.append(h1);
  }
} else {
  window.location.href = `/E-ComProject/login.html`;
}

//** To filter specific user cart items **//

//** Function to Display Cart Items **/

function displayItem(items) {

  let tr = document.createElement("tr");
  let plusBtn = document.createElement("button");
  let minusBtn = document.createElement("button");
  let name = document.createElement("td");
  let product_td = document.createElement("td");
  let qty_td = document.createElement("td");
  let total_td = document.createElement("td");
  let deleteBtn = document.createElement("button");

  name.innerText = items.name;
  product_td.innerText = items.price;
  plusBtn.innerText = "+";
  minusBtn.innerText = "-";
  qty_td.innerText = items.qty;
  deleteBtn.innerText = "Delete Item";
  total_td.innerText = "Total : " + items.total;

  tr.append(name);
  tr.append(product_td);
  tr.append(qty_td);
  tr.append(plusBtn);
  tr.append(minusBtn);
  tr.append(total_td);
  tr.append(deleteBtn);

  main.append(tr);

  plusBtn.addEventListener("click", (e) => {
    items.qty += 1;
    qty_td.innerText = items.qty;
    items.total = items.price * items.qty;
    total_td.innerText = "Total : " + items.total;
    netTotalPrice += parseInt(items.price);
    netTotal.innerHTML = `<b>Net Amount : ${netTotalPrice}</b>`;

    //** To modify data in localstorage and save **//
    cartItem.map((item) => {
      if (item.id === items.id) {
        item.qty = items.qty;
        item.total = items.total;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cartItem));
    console.log(items);
  });

  minusBtn.addEventListener("click", (e) => {
    if (items.qty > 1) {
      items.qty -= 1;
      qty_td.innerText = items.qty;
      console.log(items.qty);
      items.total = items.price * items.qty;
      total_td.innerText = "Total : " + items.total;
      netTotalPrice -= parseInt(items.price);
      netTotal.innerHTML = `<b>Net Amount : ${netTotalPrice}</b>`;

      //** To modify data in localstorage and save **//
      cartItem.map((item) => {
        if (item.id === items.id) {
          item.qty = items.qty;
          item.total = items.total;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cartItem));
    }
  });
  netTotal.innerHTML = `<b>Net Amount : ${netTotalPrice}</b>`;

  deleteBtn.addEventListener("click", (e) => {
    console.log(cartItem);
    cartItem = cartItem.filter((item) => {
      if (item.id != items.id) {
        return true;
      }
    });
    if (cartItem.length == 0) {
      tableDiv.style.display = "none";
      outerDiv.append(h1);
    }
    netTotalPrice -= items.price;
    netTotal.innerHTML = `<b>Net Amount : ${netTotalPrice}</b>`;

    e.target.parentNode.remove();
    console.log(cartItem);
    localStorage.setItem("cart", JSON.stringify(cartItem));
  });
}
