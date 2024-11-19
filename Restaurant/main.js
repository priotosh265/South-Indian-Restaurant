const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".order__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".event__content", {
  duration: 1000,
});

// Cart Data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM Elements
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const closeCartBtn = document.getElementById("close-cart-btn");
const orderButtons = document.querySelectorAll(".order__card .btn");

// Update Cart Display
function updateCartDisplay() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div>
          <h4>${item.name}</h4>
          <p>Price: $${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <button class="btn remove-btn" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  // Calculate Total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;

  // Save to LocalStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add Item to Cart
function addToCart(item) {
  const existingItem = cart.find((cartItem) => cartItem.name === item.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }
  updateCartDisplay();
}

// Remove Item from Cart
cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    updateCartDisplay();
  }
});

// Event Listeners
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "block";
});

closeCartBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Add Items to Cart on Button Click
orderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.parentElement;
    const name = card.querySelector("h4").textContent;
    const price = parseFloat(card.querySelector("p").textContent.match(/[\d.]+/)[0]);
    addToCart({ name, price, quantity: 1 });
  });
});
// Add event listener to the Checkout button
document.getElementById('checkout-btn').addEventListener('click', function () {
  alert('Your order is successfully placed!');
});

// Add event listener to the Close button to close the modal
document.getElementById('close-cart-btn').addEventListener('click', function () {
  document.getElementById('cart-modal').style.display = 'none';
});

// To show the modal (for example, if a user clicks "View Cart" somewhere)
function openCartModal() {
  document.getElementById('cart-modal').style.display = 'block';
}

// Initialize Cart Display
updateCartDisplay();
