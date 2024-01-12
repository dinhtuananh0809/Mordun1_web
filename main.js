const uuidv4 = () => {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

function renderHeader(data = null) {
  return `
   <header class="container-header">
        <div class="container-header-navigation">
       <a href="/HomePage">
  <img
    style="width: 150px; height: 100px"
    src="/Images/juno.png"
    alt=""
  />
</a>
          <nav class ="navigation-item">
            <a onclick="changePage(changeToHome)">Home</a>
            <a onclick="changePage(changeToAbout)">About</a>
            <a onclick="changePage(changeToContact)">Contact</a>
            <a onclick="changePage( changeToCategory)">Shop</a>
            <a onclick="changePage( changeToCart)">Cart</a>

             <div class="container-account">
      <!-- Thẻ a cho Account -->
      <a href="#account">Account</a>
      <!-- Nội dung dropdown -->
      <div class="dropdown-content">
        <!-- Thẻ a cho Logout -->
         <p> ${
           data
             ? `<img src="${data.avatar}" style="width: 50px; height: 50px; border-radius: 50%;"></p><p>Hello ${data.email} </p> <button onclick="logout()">Logout</button>`
             : `<a href="/Login">Sign Up / Sign In</a>`
         }
      </div>
    </div>  
          
          </nav>
        </div>
       
      </header>`;
}

function renderFooter() {
  return `<footer class="container-footer">
        <p>© 2035 by Tuan Anh. Powered and secured by Rikkei Academy</p>

        <div class="footer-icons">
          <a href="#" class="mx-2"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="mx-2"><i class="fab fa-twitter"></i></a>
          <a href="#" class="mx-2"><i class="fab fa-instagram"></i></a>
          <a href="#" class="mx-2"><i class="fab fa-snapchat-ghost"></i></a>
          <a href="#" class="mx-2"><i class="fab fa-youtube"></i></a>
          <a href="#" class="mx-2"><i class="fas fa-comment-dots"></i></a>
        </div>
      </footer>`;
}

function hash(str) {
  str = `asdasd**_${str}_asdadad`;
  let hashStr = "";
  for (let i in str) {
    hashStr += str[i].charCodeAt(0);
  }
  return hashStr * 2 + "shino";
}
function createToken(data) {
  let dataJasonStr = JSON.stringify({ data, privateKey: "ShinoTsubaki" });
  let hashStr = ``;
  for (let i in dataJasonStr) {
    hashStr += dataJasonStr[i].charCodeAt(0) * 2 + "|";
  }
  return hashStr;
}

function decodeToken(token) {
  let baseStr = ``;
  for (let i in token.split("|")) {
    if (token.split("|")[i] == "") break;
    baseStr += String.fromCharCode(token.split("|")[i] / 2);
  }
  try {
    return JSON.parse(baseStr);
  } catch (err) {
    return false;
  }
}

function checkLogin() {
  if (localStorage.getItem("token")) {
    let tokenData = decodeToken(localStorage.getItem("token"));
    if (tokenData.privateKey != "ShinoTsubaki") {
      localStorage.removeItem("token");
      return null;
    }
    return tokenData.data;
  } else {
    return null;
  }
}
function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}
// let category = [
//   {
//     id: uuidv4(),
//     imageUrl: "../Images/10114-GMCG-front!bggt-big.jpg",
//     description: "Charcoal Gray Suit",
//     quantity: 1,
//     price: "200$",
//   },

//   {
//     id: uuidv4(),

//     imageUrl:
//       "../Images/NAVY_BLUE_SUIT__075_0ba78598-6c22-4024-820e-019a5fdb109a_830x1230_crop_center.jpg (1).webp",
//     description: "Men's Navy Blue Suit",
//     quantity: 1,
//     price: "199$",
//   },
//   {
//     id: uuidv4(),

//     imageUrl:
//       "../Images/LIGHT_BLUE_SUIT_VEST__013_511d5239-7370-4ea1-9c37-b74fa4df9ad4_830x1230_crop_center.jpg.webp",
//     description: "Light Blue Suit Vest",
//     quantity: 1,
//     price: "50$",
//   },
//   {
//     id: uuidv4(),

//     imageUrl:
//       "../Images/CLASSIC_BLACK_TUXEDO_083_ec5edd97-4c19-417e-be20-0c0154d22aca_830x1230_crop_center.jpg.webp",
//     description: "Classic Black Tuxedo",
//     quantity: 1,
//     price: "259$",
//   },
//   {
//     id: uuidv4(),

//     imageUrl: "../Images/MENS_BURGUNDY_EDITED_830x1230_crop_center.jpg.webp",
//     description: "Mens Burgundy Edited",
//     quantity: 1,
//     price: "200$",
//   },
//   {
//     id: uuidv4(),

//     imageUrl: "../Images/MENS_TAN_EDITED_830x1230_crop_center.jpg.webp",
//     description: "Mens Tan Edited",
//     quantity: 1,
//     price: "200$",
//   },
//   {
//     id: uuidv4(),

//     imageUrl: "../Images/LOOK_8_014_830x1230_crop_center.jpg.webp",
//     description: "Mens Shawl Lapel Navy Tuxedo",
//     quantity: 1,
//     price: "259$",
//   },
//   {
//     id: uuidv4(),

//     imageUrl:
//       "../Images/TEXTURED_GRAY_SUIT__048_5d624da9-c950-440f-9c05-02dd3f358715_830x1230_crop_center.jpg.webp",
//     description: "Tuxedo Gray Suit",
//     quantity: 1,
//     price: "259$",
//   },
//   {
//     id: uuidv4(),

//     imageUrl:
//       "../Images/TEXTURED_GRAY_SUIT_VEST_008_2_830x1230_crop_center.jpg.webp",
//     description: "Tuxedo Gray Suit Vest",
//     quantity: 1,
//     price: "50$",
//   },
//   {
//     id: uuidv4(),

//     imageUrl:
//       "../Images/NAVY_BLUE_SUIT_VEST__013_e57efd0c-f509-4c6e-a543-db171df66e3a_830x1230_crop_center.jpg.webp",
//     description: "Navy Blue Suit Vest",
//     quantity: 1,
//     price: "50$",
//   },

//   {
//     id: uuidv4(),

//     imageUrl: "../Images/Men's Peak Lapel Navy Tuxedo.webp",
//     description: "Men's Peak Lapel Navy Tuxedo",
//     quantity: 1,
//     price: "259$",
//   },
//   {
//     id: uuidv4(),

//     imageUrl: "../Images/Men's Teal Suit.webp",
//     description: "Men's Teal Suit",
//     quantity: 1,
//     price: "224$",
//   },
// ];
// localStorage.setItem("category", JSON.stringify(category));

const products = JSON.parse(localStorage.getItem("category"));

// Lặp qua danh sách sản phẩm và hiển thị chúng trong các phần tử HTML
const container = document.querySelector(".container-category");

products.forEach((product) => {
  const productItem = document.createElement("div");
  productItem.classList.add("container-category-item");

  productItem.innerHTML = `
    <a href="#">
      <img src="${product.imageUrl}" alt="${product.description}" />
    </a>
    <p id="name">${product.description}</p>
    <p id="price">Price: ${product.price}</p>
    <button type="submit" id="buy">Buy</button>
  `;

  container.appendChild(productItem);
});

// --------------- add to cart-----------------------------

const users = JSON.parse(localStorage.getItem("users")) ?? [];

const lowercaseLoginId = localStorage.getItem("loginId").trim().toLowerCase(); // tranduyy0209
console.log(lowercaseLoginId, "a");
const currentUserIndex = users.findIndex((user) => {
  const userName = user.userName.trim().toLowerCase();
  console.log(userName);
  return userName === lowercaseLoginId;
});

const currentUser = users[currentUserIndex]; // 1
const cart = currentUser.cart ?? [];

function addToLocal() {
  localStorage.setItem("users", JSON.stringify(users));
}
const buttons = document.querySelectorAll("button");

buttons.forEach((button, index) => {
  button.addEventListener("click", function () {
    addToCart(index);
  });
});
function addToCart(productId) {
  // Lấy danh sách sản phẩm từ Local Storage
  const category = JSON.parse(localStorage.getItem("category"));

  // Tìm sản phẩm cụ thể dựa trên productId
  const product = category[productId];

  if (product) {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingProductIndex = category.findIndex(
      (item) => item.description === product.description
    );

    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      category[existingProductIndex].quantity += 1;
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào mảng
      const newProduct = {
        id: uuidv4(),
        imageUrl: product.imageUrl,
        description: product.description,
        price: product.price,
        quantity: 1,
      };

      category.push(newProduct);
    }

    // Lưu lại danh sách sản phẩm vào Local Storage
    localStorage.setItem("category", JSON.stringify(category));

    // Chuyển đến trang giỏ hàng hoặc thực hiện các tác vụ khác tùy theo yêu cầu của bạn
    window.location.href = "/Cart";
  }
}

// function addToCart(productId) {
//   const product = category[productId];

//   if (product) {
//     const newProduct = {
//       id: uuidv4(),
//       imageUrl: product.imageUrl,
//       description: product.description,
//       price: product.price,
//       quantity: 1,
//     };

//     cart.push(newProduct);
//     addToLocal(cart);

//     window.location.href = "/Cart";
//   }
// }
