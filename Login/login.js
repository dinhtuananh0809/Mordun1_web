document.querySelector(".img__btn").addEventListener("click", function () {
  document.querySelector(".cont").classList.toggle("s--signup");
});
import { signInWithGoogle } from "../firebase.js";
if (checkLogin()) window.location.href = "/index.html";

export function register(e) {
  e.preventDefault();
  let newUser = {
    id: Math.ceil(Date.now() * Math.random()),
    userName: e.target.userName.value,
    email: e.target.email.value,
    password: hash(e.target.password.value),
    avatar: "/Images/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg",
    cart: [],
  };

  if (newUser.userName == "" || newUser.email == "") return;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  if (
    users.find(
      (user) => user.email == newUser.email || user.userName == newUser.userName
    )
  ) {
    alert("email or username trùng");
    return;
  }
  localStorage.setItem("users", JSON.stringify([...users, newUser]));
  alert("Đăng ký thành công!");
  document.querySelector(".cont").classList.toggle("s--signup");
  e.target.userName.value = "";
  e.target.email.value = "";
  e.target.password.value = "";
}

export function login(e) {
  e.preventDefault();
  let data = {
    loginId: e.target.loginId.value,
    password: e.target.password.value,
    avatar: "/Images/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg",
  };
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let loginId = data.loginId; // khởi tạo loginId từ data
  localStorage.setItem("loginId", loginId);

  // let admin = users.find(
  //   (item) => item.password == "123456" && item.userName == "admin"
  // );
  // if (admin) {
  //   window.location.href = "/Admin";
  // } else {
  //   alert("mời bạn đăng nhập tài khoản khác");
  // }

  let user = users.find(
    (item) => item.email == data.loginId || item.userName == data.loginId
  );

  if (!user) {
    alert("Tài khoản không tồn tại");
    return;
  }

  if (hash(data.password) != user.password) {
    alert("Mật khẩu không chính xác");
    return;
  }

  // console.log("user", JSON.stringify(user));
  let token = createToken(user);
  localStorage.setItem("token", token);
  window.location.href = "/index.html";
}

document.getElementById("formSignIn").addEventListener("submit", (e) => {
  login(e);
});

document.getElementById("formRegister").addEventListener("submit", (e) => {
  register(e);
});

let load = false;
document
  .getElementById("signInWithGoogle")
  .addEventListener("click", async () => {
    console.log("đã vào");
    let loadEl = document.querySelector(".loader_box");
    try {
      if (load) return;
      loadEl.classList.add("active");
      let result = await signInWithGoogle();
      load = true;
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      let checkUser = users.find((user) => user.email == result.user.email);
      if (checkUser) {
        //login
        let user = users.find((item) => item.email == result.user.email);
        let token = createToken(user);
        localStorage.setItem("token", token);
        window.location.href = "/Login";
      } else {
        //register + login
        let newUser = {
          id: Math.ceil(Date.now() * Math.random()),
          userName: Math.ceil(Date.now() * Math.random()),
          email: result.user.email,
          password: Math.ceil(Date.now() * Math.random()),
          avatar: result.user.photoURL,
        };
        localStorage.setItem("users", JSON.stringify([...users, newUser]));
        let token = createToken(newUser);
        localStorage.setItem("token", token);
        window.location.href = "/Login";
      }
      loadEl.classList.remove("active");
      load = false;
    } catch (err) {
      load = false;
      loadEl.classList.remove("active");
      alert("Vui lòng thử lại");
    }
  });
