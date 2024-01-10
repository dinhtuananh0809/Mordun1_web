window.onload = displayCart;

function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let listCartItem = ``;
  for (let i = 0; i < cart.length; i++) {
    listCartItem += `
          <tr>
            <td><img src="${cart[i].imageUrl}" alt="Product Image" width="auto" height="140px"></td>
            <td>${cart[i].description}</td>
            <td>${cart[i].price}</td>
           <td> <div>
           <button style="color: white; height: 30px; width: 30px; background-color: gray; font-size: 20px; font-weight: 300;" onclick="increaseQuantity(${i})">+</button>
          <span style="color: white;">${cart[i].quantity}</span>
          <button style="color: white; height: 30px; width: 30px; background-color: gray; font-size: 20px; font-weight: 300;" onclick="decreaseQuantity(${i})">-</button>
        </div></td>
           <td><button onclick="removeCart('${cart[i].id}')">Remove</button></td>
          </tr>
        `;
    document.querySelector("#tbodyCart").innerHTML = listCartItem;
  }
}

// -----------------remove items------------------
function removeCart(cartId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let index = cart.findIndex((item) => item.id === cartId);

  if (index !== -1) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    totalCart();
  }
}

// ----------------------Increase Quantity---------------------
function increaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  totalCart();
}

// ----------------------Decrease Quantity---------------------
function decreaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    totalCart();
  }
}

// ----------------------Sub Total---------------------
function totalCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let subTotal = cart.reduce((total, product) => {
    if (typeof product.price === "string" && product.price.includes("$")) {
      return (
        total + parseFloat(product.price.replace("$", "")) * product.quantity
      );
    } else {
      return total;
    }
  }, 0);

  document.querySelector(
    ".cart-total-price p:nth-child(2)"
  ).textContent = `$${subTotal.toFixed(2)}`;

  localStorage.setItem("cart", JSON.stringify(cart));
}

totalCart();
