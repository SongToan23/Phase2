document.getElementById("signup").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const sdt = document.getElementById("sdt").value;
    if (!username || !password || !sdt) {
      document.getElementById("error-message").innerHTML =
        "Vui lòng nhập đầy đủ thông tin.";
      return;
    }
    var sign = {
      username: username,
      password: password,
      sdt: sdt
    };
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sign),
    };
    fetch("http://localhost:3000/api/products/user", options)
      .then((response) => {
        return response.json();
      })
      .then(() => {
        document.getElementById("message").innerHTML = "Đăng nhập thành công";
        window.location.href = "./signin.html";
        return;
      })
      .catch((error) => {
        console.error("Lỗi khi tạo đăng ký:", error);
      });
  });