let cart = [];

// 1. Display products on the page
function displayProducts() {
  const productContainer = document.getElementById("product-list");

  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product-card";

    // Check if product is already in cart to disable button
    const isInCart = cart.find((item) => item.id === product.id);

    div.innerHTML = `
            <div class="emoji">${product.image}</div>
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button 
                onclick="addToCart(${product.id})" 
                ${isInCart ? "disabled" : ""}>
                ${isInCart ? "Already in Cart" : "Add to Cart"}
            </button>
        `;
    productContainer.appendChild(div);
  });
}

// 2. Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push({ ...product, quantity: 1 });
  updateCartUI();
}

// 3. Change quantity
function changeQuantity(productId, amount) {
  const item = cart.find((p) => p.id === productId);
  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
  }
}

// 4. Remove item entirely
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

// 5. Clear entire cart
function clearCart() {
  cart = [];
  updateCartUI();
}

// 6. Update the Screen
function updateCartUI() {
  const cartContainer = document.getElementById("cart-items");
  const totalCount = document.getElementById("cart-count");
  const totalPrice = document.getElementById("total-price");

  cartContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  }

  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    count += item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
            <span>${item.name} ($${item.price})</span>
            <div class="qty-controls">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <span>Sub: $${subtotal}</span>
            <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
        `;
    cartContainer.appendChild(div);
  });

  totalPrice.innerText = total;
  totalCount.innerText = count;

  // Refresh product list buttons
  document.getElementById("product-list").innerHTML = "";
  displayProducts();
}

function checkout() {
  if (cart.length > 0) {
    alert(
      "Thank you for your purchase! Total: $" +
        document.getElementById("total-price").innerText,
    );
    clearCart();
  }
}

// Initialize the app
displayProducts();
updateCartUI();
