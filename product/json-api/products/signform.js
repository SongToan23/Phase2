document.getElementById("signin").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (!username || !password) {
    document.getElementById("error-message").innerHTML =
      "Vui lòng nhập đầy đủ thông tin.";
    return;
  }
  fetch("/product/json-api/data.json")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid credentials");
      }
    })
    .then((data) => {
      data.user.forEach((item) => {
        if (username == "admin" && password == "1234") {
          window.location.href = "./admin.html";
        } else if (item.username == username && item.password == password ) {
          window.location.href = "./product.html";
          localStorage.setItem("isLoggedIn", "true");
        } else {
          document.getElementById("error-message").innerHTML =
            "user hoặc mật khẩu không hợp lệ";
          return;
        }
      });
    })
    .catch((error) => {
      console.error("Lỗi đăng nhập:", error);
    });
});
