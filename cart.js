// -------------------display cart----------------------------------

function displayCart() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let lowercaseLoginId = localStorage.getItem("loginId").trim(); // Đảm bảo đã xác định email người dùng đã đăng nhập

  // Tìm người dùng dựa trên email đã đăng nhập
  let currentUser = users.find(
    (user) => user.userName.trim() === lowercaseLoginId
  );

  if (currentUser) {
    let cart = currentUser.cart || [];
    let listCartItem = [];

    for (let item of cart) {
      listCartItem.push(`
        <tr>
          <td><img src="${item.imageUrl}" alt="Product Image" width="auto" height="140px"></td>
          <td>${item.description}</td>
          <td>${item.price}</td>
          <td>
            <div>
              <button style="color: white; height: 30px; width: 30px; background-color: gray; font-size: 20px; font-weight: 300;" onclick="increaseQuantity('${item.id}')">+</button>
              <span style="color: white;">${item.quantity}</span>
              <button style="color: white; height: 30px; width: 30px; background-color: gray; font-size: 20px; font-weight: 300;" onclick="decreaseQuantity('${item.id}')">-</button>
            </div>
          </td>
          <td><button  onclick="removeCart('${item.id}')"><i  class="fa-solid fa-trash-can-list"></i></button></td>
        </tr>
      `);
    }

    document.querySelector("#tbodyCart").innerHTML = listCartItem.join("");
  }
}
displayCart();
// -----------------remove items------------------
// Tăng số lượng sản phẩm trong giỏ hàng
function increaseQuantity(itemId) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let lowercaseLoginId = localStorage.getItem("loginId").trim();
  let currentUser = users.find(
    (user) => user.userName.trim() === lowercaseLoginId
  );

  if (currentUser) {
    let cart = currentUser.cart || [];
    let itemIndex = cart.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      cart[itemIndex].quantity++;
      updateCartAndLocalStorage(users, currentUser);
      totalCart();
    }
  }
}

// Giảm số lượng sản phẩm trong giỏ hàng
function decreaseQuantity(itemId) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let lowercaseLoginId = localStorage.getItem("loginId").trim();
  let currentUser = users.find(
    (user) => user.userName.trim() === lowercaseLoginId
  );

  if (currentUser) {
    let cart = currentUser.cart || [];
    let itemIndex = cart.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1 && cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity--;
      updateCartAndLocalStorage(users, currentUser);
      totalCart();
    }
  }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeCart(itemId) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let lowercaseLoginId = localStorage.getItem("loginId").trim();
  let currentUser = users.find(
    (user) => user.userName.trim() === lowercaseLoginId
  );

  if (currentUser) {
    let cart = currentUser.cart || [];
    let itemIndex = cart.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      updateCartAndLocalStorage(users, currentUser);

      totalCart();
    }
  }
}

// Hàm cập nhật giỏ hàng và lưu trữ vào Local Storage
function updateCartAndLocalStorage(users, currentUser) {
  localStorage.setItem("users", JSON.stringify(users));
  displayCart();
}

// ----------------------Sub Total---------------------
function totalCart() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let lowercaseLoginId = localStorage.getItem("loginId").trim();
  let currentUser = users.find(
    (user) => user.userName.trim() === lowercaseLoginId
  );

  let subTotal = currentUser.cart.reduce((total, product) => {
    return total + parseFloat(product.price) * product.quantity;
  }, 0);

  document.querySelector(
    ".cart-total-price p:nth-child(2)"
  ).textContent = `$${subTotal.toFixed(2)}`;
}

totalCart();
