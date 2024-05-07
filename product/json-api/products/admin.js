document.addEventListener("DOMContentLoaded", function () {
    const manageCategoriesLink = document.getElementById("manage-categories");
    const manageOrdersLink = document.getElementById("manage-orders");
    const orderTable = document.getElementById("order-table");
    const productTable = document.getElementById("product-table");

    if (manageCategoriesLink) {
        manageCategoriesLink.addEventListener("click", function (event) {
            event.preventDefault();
            orderTable.classList.add("hidden"); // Ẩn bảng đơn hàng
            productTable.classList.remove("hidden"); // Hiện bảng sản phẩm
            const categoryOptionsContainer = document.querySelector(".category-options");
            if (categoryOptionsContainer) {

                categoryOptionsContainer.remove();
            } else {
                showCategoryOptions();
            }
        });
    }

    if (manageOrdersLink) {
        manageOrdersLink.addEventListener("click", function (event) {
            event.preventDefault();
            orderTable.classList.remove("hidden"); // Hiện bảng đơn hàng
            productTable.classList.add("hidden"); // Ẩn bảng sản phẩm
        });
    } else {
        console.error("Không tìm thấy liên kết quản lý đơn hàng.");
    }


    const closeButton = document.querySelector(".close");
    if (closeButton) {
        // Gán sự kiện click để ẩn modal khi click vào dấu X
        closeButton.addEventListener("click", function () {
            const modal = document.getElementById("myModal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    }

    const closeButtton = document.querySelector("#addProductModal .close");
    if (closeButtton) {
        // Gán sự kiện click để ẩn modal khi click vào dấu X
        closeButtton.addEventListener("click", function () {
            const modal = document.getElementById("addProductModal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    }


});

function showCategoryOptions() {
    const existingOptions = document.querySelector(".category-options");
    if (existingOptions) {
        return;
    }

    const categoryOptionsContainer = document.createElement("div");
    categoryOptionsContainer.classList.add("category-options");

    const boyOption = document.createElement("button");
    boyOption.textContent = "Boy";
    boyOption.addEventListener("click", function () {
        fetchDataAndDisplayProducts("boy");
        boyOption.classList.add("active");
    });

    const girlOption = document.createElement("button");
    girlOption.textContent = "Girl";
    girlOption.addEventListener("click", function () {
        fetchDataAndDisplayProducts("girl");
        boyOption.classList.add("active");
    });

    categoryOptionsContainer.appendChild(girlOption);
    categoryOptionsContainer.appendChild(boyOption);

    const asideElement = document.querySelector("aside");
    asideElement.appendChild(categoryOptionsContainer);
}

function fetchDataAndDisplayProducts(category) {
    fetch("/product/json-api/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const productTable = document.getElementById("product-table");
            productTable.innerHTML = "";

            const table = document.createElement("table");
            table.classList.add("product-table");

            const headerRow = table.insertRow();
            const headers = ["ID", "Tên sản phẩm", "Hình ảnh", "Mô tả", "Hãng", "Giá", "Cập nhật", "Xoá", "Thêm"];
            headers.forEach(headerText => {
                const headerCell = document.createElement("th");
                headerCell.textContent = headerText.toUpperCase();
                headerRow.appendChild(headerCell);
            });

            data[category].forEach(product => {
                const row = table.insertRow();

                const idCell = row.insertCell();
                idCell.textContent = product.id;

                const nameCell = row.insertCell();
                nameCell.textContent = product.name;
                nameCell.classList.add("product-name");

                const previewCell = row.insertCell();
                const previewImage = document.createElement("img");
                previewImage.src = product.preview;
                previewImage.alt = product.name;
                previewImage.classList.add("product-preview");
                previewCell.appendChild(previewImage);

                const descriptionCell = row.insertCell();
                descriptionCell.textContent = product.description;

                const brandCell = row.insertCell();
                brandCell.textContent = product.brand;

                const priceCell = row.insertCell();
                priceCell.textContent = product.price;

                const actionCell = row.insertCell();
                const editButton = document.createElement("button");
                editButton.textContent = "Sửa";
                editButton.addEventListener("click", () => {
                    editProduct(product.id);
                });

                const action1Cell = row.insertCell();
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Xoá";
                deleteButton.addEventListener("click", () => {
                    deleteProduct(product.id, row);
                });

                const addCell = row.insertCell();
                const addButton = document.createElement("button");
                addButton.textContent = "Thêm";
                addButton.addEventListener("click", function () {
                    addProduct(product.id, category);
                });

                addCell.appendChild(addButton);
                action1Cell.appendChild(deleteButton);
                actionCell.appendChild(editButton);
            });

            productTable.appendChild(table);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}


function editProduct(productId) {
    const modal = document.getElementById("myModal");
    const productNameInput = document.getElementById("productName");
    const productPreviewInput = document.getElementById("productPreview");
    const productDescriptionInput = document.getElementById("productDescription");
    const productBrandInput = document.getElementById("productBrand");
    const productPriceInput = document.getElementById("productPrice");

    fetch("/product/json-api/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const product = findProductById(data, productId);
            if (product) {
                productNameInput.value = product.name;
                productPreviewInput.value = product.preview;
                productDescriptionInput.value = product.description;
                productBrandInput.value = product.brand;
                productPriceInput.value = product.price;

                modal.style.display = "block";

                const saveButton = document.getElementById("saveChanges");
                saveButton.addEventListener("click", function (event) {
                    event.preventDefault();

                    if (!productNameInput.value || !productPreviewInput.value || !productDescriptionInput.value || !productBrandInput.value || !productPriceInput.value) {
                        alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
                        return;
                    }

                    const updatedProduct = {
                        name: productNameInput.value,
                        preview: productPreviewInput.value,
                        description: productDescriptionInput.value,
                        brand: productBrandInput.value,
                        price: productPriceInput.value
                    };

                    saveDataToJson(data, updatedProduct, product); // Sử dụng hàm saveDataToJson thay thế
                    modal.style.display = "none";
                });

            } else {
                console.error("Không tìm thấy sản phẩm với ID: ", productId);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function findProductById(data, productId) {
    const girlProduct = data.girl.find(product => product.id === productId);
    const boyProduct = data.boy.find(product => product.id === productId);
    return girlProduct || boyProduct;
}

function saveDataToJson(data, updatedProduct, product) {
    const category = data.girl.includes(product) ? 'girl' : 'boy';
    console.log("Category:", category);
    const productId = product.id;

    const index = data[category].findIndex(p => p.id === productId);
    if (index !== -1) {
        data[category][index] = { ...data[category][index], ...updatedProduct };

        fetch(`http://localhost:3000/${category}/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log('Product updated successfully:', data);
            })
            .catch(error => {
                console.error("Error updating data:", error);
            });
    } else {
        console.error("Product not found");
    }
}



function deleteProduct(productId, row) {
    fetch("/product/json-api/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const category = data.girl.some(product => product.id === productId) ? 'girl' : 'boy';
            const index = data[category].findIndex(product => product.id === productId);
            if (index !== -1) {
                const deletedProduct = data[category][index];
                data[category].splice(index, 1);
                fetch(`http://localhost:3000/${category}/${productId}`, {
                    method: "DELETE"
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        alert("Xoá thành công");
                        row.remove();
                        console.log('Product deleted successfully:', deletedProduct);
                    })
                    .catch(error => {
                        console.error("Error deleting product:", error);
                    });
            } else {
                console.error("Product not found");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}


function addProduct(productId, category) {
    const modal = document.getElementById("addProductModal");
    const productNameInput = document.getElementById("newProductName");
    const productPreviewInput = document.getElementById("newProductPreview");
    const productDescriptionInput = document.getElementById("newProductDescription");
    const productBrandInput = document.getElementById("newProductBrand");
    const productPriceInput = document.getElementById("newProductPrice");

    // Làm trống các trường nhập
    productNameInput.value = "";
    productPreviewInput.value = "";
    productDescriptionInput.value = "";
    productBrandInput.value = "";
    productPriceInput.value = "";

    fetch("/product/json-api/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const product = findProductById(data, productId);
            if (product) {
                modal.style.display = "block";

                const saveButton = document.getElementById("saveNewProduct");
                saveButton.addEventListener("click", function (event) {
                    event.preventDefault();

                    if (!productNameInput.value || !productPreviewInput.value || !productDescriptionInput.value || !productBrandInput.value || !productPriceInput.value) {
                        alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
                        return;
                    }
                    console.log("Giá trị của category:", category);
                    const newProductId = generateProductId(data, category); // Sử dụng hàm generateProductId để tạo id 

                    const newProduct = {
                        id: newProductId, // Thêm id mới cho sản phẩm
                        name: productNameInput.value,
                        preview: productPreviewInput.value,
                        description: productDescriptionInput.value,
                        brand: productBrandInput.value,
                        price: productPriceInput.value
                    };


                    // Gửi yêu cầu POST để thêm sản phẩm mới
                    saveNewProduct(data, newProduct, category); // Chú ý truyền giá trị của category vào hàm
                    modal.style.display = "none";
                    fetchDataAndDisplayProducts(category);
                });

            } else {
                console.error("Không tìm thấy sản phẩm với ID: ", productId);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function generateProductId(data, category) {
    // Lấy danh sách sản phẩm từ dữ liệu tương ứng với category
    const products = data[category];

    // Nếu không có sản phẩm nào, trả về 1 làm id đầu tiên
    if (products.length === 0) {
        return 1;
    }

    // Lấy id của sản phẩm cuối cùng trong danh mục đang chọn
    const lastProductId = Number(products[products.length - 1].id);
    return lastProductId + 1;
}

function saveNewProduct(data, newProduct, category) {
    fetch(`http://localhost:3000/${category}`, { // Gửi yêu cầu POST đến URL tương ứng với category
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log('Product added successfully:', data);
            // Thực hiện các hành động khác sau khi sản phẩm được thêm thành công
        })
        .catch(error => {
            console.error("Error adding new product:", error);
        });
}













// admin.js
document.addEventListener("DOMContentLoaded", function () {
    const manageOrdersLink = document.getElementById("manage-orders");

    if (manageOrdersLink) {
        manageOrdersLink.addEventListener("click", function (event) {
            event.preventDefault();
            displayOrders();
        });
    } else {
        console.error("Không tìm thấy liên kết quản lý đơn hàng.");
    }
});

function displayOrders() {
    // Lấy giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Lấy thông tin người dùng từ data.json
    fetch('/product/json-api/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Lấy danh sách người dùng từ data.json
            const users = data.user;

            // Hiển thị thông tin đơn hàng trên bảng
            const orderTable = document.getElementById("order-table");

            // Xóa nội dung cũ của bảng trước khi thêm mới
            orderTable.innerHTML = "";

            // Tạo tiêu đề bảng
            const headerRow = orderTable.insertRow();
            const headers = ["Tên Người Dùng", "Tổng Số Lượng", "Tổng Tiền", "Duyệt", "Xoá"];
            headers.forEach(headerText => {
                const headerCell = document.createElement("th");
                headerCell.textContent = headerText;
                headerRow.appendChild(headerCell);
            });

            function formatNumber(number) {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            // Tính tổng số lượng và tổng tiền của đơn hàng
            let totalQuantity = 0;
            let totalPrice = 0;

            // Duyệt qua từng mục trong giỏ hàng
            cart.forEach(product => {
                totalQuantity += parseInt(product.quantity);
                totalPrice += parseInt(product.price.replace(',', '')) * parseInt(product.quantity);
            });

            // Duyệt qua danh sách người dùng để hiển thị thông tin đơn hàng
            users.forEach(user => {
                if (user.role != "0") {
                    const row = orderTable.insertRow();
                    const usernameCell = row.insertCell();
                    usernameCell.textContent = user.username;

                    // Thêm thông tin tổng số lượng sản phẩm
                    const quantityCell = row.insertCell();
                    quantityCell.textContent = totalQuantity;

                    // Thêm thông tin tổng tiền
                    const totalPriceCell = row.insertCell();
                    totalPriceCell.textContent = formatNumber(totalPrice) + "đ";

                    const actionCell = row.insertCell();
                    const approveButton = document.createElement("button");
                    approveButton.textContent = "Duyệt";
                    approveButton.addEventListener("click", function () {
                        // Xử lý khi bấm nút Duyệt
                        alert("Đã duyệt đơn hàng của " + user.username);
                        row.remove(); // Xoá dòng đơn hàng sau khi đã duyệt
                    });

                    const action1Cell = row.insertCell();
                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Xoá";
                    deleteButton.addEventListener("click", function () {
                        // Xử lý khi bấm nút Xoá
                        alert("Đã xoá đơn hàng của " + user.username);
                        row.remove(); // Xoá dòng đơn hàng sau khi đã xoá
                    });

                    actionCell.appendChild(approveButton);
                    action1Cell.appendChild(deleteButton);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


