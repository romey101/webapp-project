// Get elements
const buyButtons = document.querySelectorAll(".buy-button");
const cartList = document.querySelector(".listCart");
const cart = document.querySelector(".cart");
const cartIcon = document.querySelector(".iconCart");
const closeCartBtn = document.querySelector(".close");
const checkoutBtn = document.querySelector(".checkout");
const totalQuantity = document.querySelector(".totalQuantity");
const totalPriceElement = document.querySelector(".totalPrice");
const container = document.querySelector(".container");
let containerr = document.querySelector(".sec");
let body = document.querySelector("body");

// Array to store cart items
let listCard = document.querySelector(".listCard");
let cartItems = [];
let products = null;

// Function to initialize the cart from local storage
function initCartFromLocalStorage() {
  const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (storedCartItems) {
    cartItems = storedCartItems;
    updateCart();
  }
}

// Call the function to initialize the cart from local storage
initCartFromLocalStorage();

// Add click event listeners to buy buttons
buyButtons.forEach((button, _index) => {
  button.addEventListener("click", () => {
    const videoInfo = {
      content: button.parentNode.querySelector(".note-content").textContent,
      price: button.parentNode.querySelector(".price").textContent,
    };
    addToCart(videoInfo);
  });
});

// Function to add item to cart
function addToCart(item) {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.content === item.content
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    item.quantity = 1;
    cartItems.push(item);
  }

  // Update local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  updateCart();
}

// Function to update cart display
function updateCart() {
  cartList.innerHTML = "";
  let total = 0;
  let quantity = 0;

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div>${item.content}</div>
      <div>${item.price}</div>
    `;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("onclick", `deleteItem('${item.content}')`);
    deleteButton.style.backgroundColor = "#484440"; // Set background color
    deleteButton.style.color = "white"; // Set text color
    deleteButton.style.border = "none"; // Remove border
    deleteButton.style.padding = "5px 10px"; // Add padding
    deleteButton.style.cursor = "pointer"; // Change cursor to pointer on hover
    deleteButton.style.left = "35%";

    // Append the button to the parent element
    cartItem.appendChild(deleteButton);
    cartList.appendChild(cartItem);

    total += parseFloat(item.price.replace("$", "")) * item.quantity;
    quantity += item.quantity;
  });

  totalQuantity.textContent = quantity;
  totalPriceElement.textContent = `$${total.toFixed(2)}`;

  if (cartItems.length === 0) {
    cart.classList.remove("open");
  } else {
    cart.classList.add("open");
  }
}

// Function to delete item from cart
function deleteItem(content) {
  // Find the index of the item to delete
  const index = cartItems.findIndex((item) => item.content === content);
  if (index !== -1) {
    // Remove the item from the array
    cartItems.splice(index, 1);
    // Update local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // Update the cart display
    updateCart();
  }
}

// Open/close cart
cartIcon.addEventListener("click", () => {
  if (cart.style.right == "-80%") {
    cart.style.right = "0";
    container.style.transform = "translateX(-400px)";
  } else {
    cart.style.right = "-80%";
    container.style.transform = "translateX(0)";
  }
});
cartIcon.addEventListener("click", () => {
  document.body.classList.add("active"); // Add active class to body
});

closeCartBtn.addEventListener("click", () => {
  document.body.classList.remove("active"); // Remove active class from body
});

closeCartBtn.addEventListener("click", () => {
  body.classList.remove("active");
  cart.style.right = "-80%";
  container.style.transform = "translateX(0)";
});

checkoutBtn.addEventListener("click", () => {
  window.location.href = "checkout.html";
});

cartIcon.addEventListener("click", () => {
  shoppingCart.classList.toggle("hidden");
  container.style.transform = "translateX(-300px)";
});
let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
    list.appendChild(newDiv);
  });
}

// Fetch product data from JSON file
fetch("product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addDataToHTML();
  });

// Show product data in list
function addDataToHTML() {
  let listProductHTML = document.querySelector(".notes");
  listProductHTML.innerHTML = "";

  if (products != null) {
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("note");
      newProduct.innerHTML = `
        <img src="${product.image}">
        <div class="note-content">${product.name}</div>
        <div class="price">$${product.price}</div>
        <button class="buy-button">Add to cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
}

// Use cookies so the cart doesn't get lost on page refresh
let listCart = [];
function checkCart() {
  var cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("listCart="));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split("=")[1]);
  } else {
    listCart = [];
  }
}
checkCart();

function addCart($idProduct) {
  let productsCopy = JSON.parse(JSON.stringify(products));
  if (!listCart[$idProduct]) {
    listCart[$idProduct] = productsCopy.filter(
      (product) => product.id == $idProduct
    )[0];
    listCart[$idProduct].quantity = 1;
  } else {
    listCart[$idProduct].quantity++;
  }
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

  addCartToHTML();
  cart.style.right = "0";
  container.style.transform = "translateX(-400px)";
}

// Modify the event listener for the cart icon button
iconCart.addEventListener("click", function () {
  cart.style.right = "0";
  container.style.transform = "translateX(-400px)";
});

close.addEventListener("click", function () {
  cart.style.right = "-100%";
  container.style.transform = "translateX(0)";
});

function addCartToHTML() {
  let listCartHTML = document.querySelector(".listCart");
  listCartHTML.innerHTML = "";

  let totalHTML = document.querySelector(".totalQuantity");
  let totalPrice = 0;
  let totalQuantity = 0;

  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let newCart = document.createElement("div");
        newCart.classList.add("item");
        newCart.innerHTML = `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
        listCartHTML.appendChild(newCart);
        totalQuantity += product.quantity;
        totalPrice += product.quantity * product.price;
      }
    });
  }
  totalHTML.innerText = totalQuantity;
  totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
}

function changeQuantity($idProduct, $type) {
  switch ($type) {
    case "Delete":
      listCart[$idProduct].quantity++;
      break;
    case "-":
      listCart[$idProduct].quantity--;
      if (listCart[$idProduct].quantity <= 0) {
        delete listCart[$idProduct];
      }
      break;
    default:
      break;
  }
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  addCartToHTML();
}

// Initial call to render the cart from cookies
addCartToHTML();
