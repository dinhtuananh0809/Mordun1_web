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

let token = localStorage.getItem("token");
console.log(token);

if (token) {
  let decodedData = decodeToken(token);

  if (decodedData.userName === "admin") {
    window.location.href = "/Admin";
  } else {
    window.location.href = "./index.html";
  }
} else {
  alert("Vui lòng đăng nhập để truy cập trang.");
  window.location.href = "/Login";
}
