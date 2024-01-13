function changeToCategory() {
  if (localStorage.getItem("token")) {
    window.location.href = "/Category";
  } else {
    alert("đăng nhập trc khi vào");
    window.location.href = "./index.html";
  }
}

function changeToHome() {
  window.location.href = "/index.html";
}

function changeToAbout() {
  window.location.href = "/About";
}

function changeToContact() {
  window.location.href = "/Contact";
}

function changeToCart() {
  if (localStorage.getItem("token")) {
    window.location.href = "/Cart";
  } else {
    alert("đăng nhập trc khi vào");
    window.location.href = "./index.html";
  }
}

function changePage(changeFunction) {
  // Đặt độ mờ của trang hiện tại xuống 0
  document.body.style.opacity = 0;

  // Đợi hiệu ứng chuyển độ mờ hoàn tất
  setTimeout(function () {
    // Gọi hàm để thực hiện chuyển trang
    changeFunction();
  }, 500); // 500ms, thời gian bằng với thời gian chuyển độ mờ trong CSS
}
document
  .getElementById("root")
  .insertAdjacentHTML("afterend", renderHeader(checkLogin()));

document.getElementById("root").insertAdjacentHTML("afterend", renderFooter());
