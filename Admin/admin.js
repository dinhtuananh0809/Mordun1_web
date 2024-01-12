const uuidv4 = () => {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

// ---------------------side bar-------------------
const body = document.querySelector("body"),
  sidebar = body.querySelector(".fui-sidbar-navigiation nav"),
  toggle = body.querySelector(".fui-sidbar-navigiation .toggle"),
  searchBtn = body.querySelector(".fui-sidbar-navigiation .search-box"),
  modeSwitch = body.querySelector(".fui-sidbar-navigiation .toggle-switch");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

// ---------------------------take data from local and show--------------------------

// Lấy dữ liệu sản phẩm từ LocalStorage
const products = JSON.parse(localStorage.getItem("category"));

const tbodyCart = document.getElementById("tbodyCart");

// Hàm để tìm sản phẩm trong danh sách theo ID
function findProductById(productId) {
  return products.find((product) => product.id === productId);
}

// Hàm để cập nhật danh sách sản phẩm trong LocalStorage
function updateLocalStorage(updatedProducts) {
  localStorage.setItem("category", JSON.stringify(updatedProducts));
}

// Hàm tăng số lượng sản phẩm
function increaseQuantity(productId) {
  const productRow = event.target.closest("tr");
  const quantitySpan = productRow.querySelector("span");
  const product = findProductById(productId);

  if (product) {
    product.quantity = parseInt(quantitySpan.textContent) + 1;
    quantitySpan.textContent = product.quantity;
    updateLocalStorage(products);
  }
}

// Hàm giảm số lượng sản phẩm
function decreaseQuantity(productId) {
  const productRow = event.target.closest("tr");
  const quantitySpan = productRow.querySelector("span");
  const product = findProductById(productId);

  if (product && product.quantity > 1) {
    product.quantity = parseInt(quantitySpan.textContent) - 1;
    quantitySpan.textContent = product.quantity;
    updateLocalStorage(products);
  }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(productId) {
  const productRow = event.target.closest("tr");
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    productRow.remove();
    updateLocalStorage(products);
  }
}

// Lặp qua danh sách sản phẩm và hiển thị chúng trong bảng HTML
products.forEach((editProduct) => {
  const productRow = document.createElement("tr");

  productRow.innerHTML = `
    <td>
      <img
        src="${editProduct.imageUrl}"
        alt="Product Image"
        width="auto"
        height="140px"
      />
    </td>
    <td>${editProduct.description}</td>
    <td>${editProduct.price}</td>
    <td>
      <div class="tableQuantity">
        <button
          style="
            color: white;
            height: 30px;
            width: 30px;
            background-color: gray;
            font-size: 20px;
            font-weight: 300;
          "
          onclick="increaseQuantity('${editProduct.id}')"
        >
          +
        </button>
        <span>${editProduct.quantity || 1}</span>
        <button
          style="
            color: white;
            height: 30px;
            width: 30px;
            background-color: gray;
            font-size: 20px;
            font-weight: 300;
          "
          onclick="decreaseQuantity('${editProduct.id}')"
        >
          -
        </button>
      </div>
    </td>
    <td>
      <button onclick="removeItem('${editProduct.id}')">
        <i class="fa-solid fa-trash-can-list"></i>
      </button>
    </td>
  `;

  tbodyCart.appendChild(productRow);
});

// ---------------------- thêm sản phẩm vào list-----------------

let category = JSON.parse(localStorage.getItem("category")) || [];

let imageUrl = document.querySelector("#imageUrl");
let description = document.querySelector("#description");
let price = document.querySelector("#price");

// ---------- hiển thị sản phẩm-------------
function displayProduct() {
  let show = "";
  for (let i = 0; i < category.length; i++) {
    show += `
     <tr>
        <td>${category[i].imageUrl}</td>
        <td>${category[i].description}</td>
        <td>${category[i].price}</td>
        <td>  <span>1</span>   </td>
     </tr>
  `;
  }
  document
    .querySelector('input[type="file"]')
    .addEventListener("change", function (e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function () {
        var img = document.createElement("img");
        img.src = reader.result;
        document.getElementById("imageContainer").appendChild(img);
      };
      if (file) reader.readAsDataURL(file);
    });

  document.querySelector("#tbodyCart").innerHTML = show;

  imageUrl.value = "";
  description.value = "";
  price.value = "";
}

// thêm sản phẩm
function addList() {
  let newProduct = {
    id: uuidv4(),
    imageUrl: imageUrl.value,
    description: description.value,
    price: price.value,
    quantity: 1,
  };
  category.push(newProduct);
  saveToLocal();
  displayProduct();
}

// hàm save to local
function saveToLocal() {
  localStorage.setItem("category", JSON.stringify(category));
}
