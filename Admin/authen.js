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

if (localStorage.getItem("token")) {
  if (decodeToken(localStorage.getItem("token")).data.userName != "admin") {
    window.location.href = "/";
  }
} else {
  window.location.href = "/";
}
