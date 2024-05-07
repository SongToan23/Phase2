// Get the product ID from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Make a request to get the product details
fetch("/product/json-api/data.json")
.then((response) => {
return response.json();
})
.then((data) => {
const girlProduct = data.girl.find((item) => item.id === productId);
const boyProduct = data.boy.find((item) => item.id === productId);

if (girlProduct) {
  // Update the DOM with the girl product details
  document.getElementById("product-img").src = girlProduct.preview;
  document.getElementById("product-name").textContent = girlProduct.name;
  document.getElementById("product-brand").textContent = girlProduct.brand;
  document.getElementById("product-price").textContent = girlProduct.price;

  const info = document.querySelector(".product-info");
  let h3 = document.createElement('h3');
  let h3Text = document.createTextNode('Mô tả');
  h3.appendChild(h3Text);
  info.appendChild(h3);
  let para = document.createElement('p');
  let paraText = document.createTextNode(girlProduct.description);
  para.appendChild(paraText);
  info.appendChild(para);

  // Add the "Add to Cart" button
  let addToCartButton = document.createElement('button');
  addToCartButton.textContent = "Thêm vào giỏ hàng";
  addToCartButton.classList.add('add-to-cart');
  addToCartButton.addEventListener('click', () => {
    addToCart(girlProduct);
  });
  info.appendChild(addToCartButton);
} else if (boyProduct) {
  // Update the DOM with the boy product details
  document.getElementById("product-img").src = boyProduct.preview;
  document.getElementById("product-name").textContent = boyProduct.name;
  document.getElementById("product-brand").textContent = boyProduct.brand;
  document.getElementById("product-price").textContent = boyProduct.price;

  const info = document.querySelector(".product-info");
  let h3 = document.createElement('h3');
  let h3Text = document.createTextNode('Mô tả');
  h3.appendChild(h3Text);
  info.appendChild(h3);
  let para = document.createElement('p');
  let paraText = document.createTextNode(boyProduct.description);
  para.appendChild(paraText);
  info.appendChild(para);

  // Add the "Add to Cart" button
  let addToCartButton = document.createElement('button');
  addToCartButton.textContent = "Thêm vào giỏ hàng";
  addToCartButton.classList.add('add-to-cart');
  addToCartButton.addEventListener('click', () => {
    addToCart(boyProduct);
  });
  info.appendChild(addToCartButton);
}
})
.catch((error) => {
console.log(error);
});
// Get the cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update the cart badge with the total number of products
const cartBadge = document.getElementById("badge");
cartBadge.textContent = cart.length.toString();

// Function to add a product to the cart
function addToCart(product) {
  // Check if the product is already in the cart
  const existingProduct = cart.find((p) => p.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  // Save the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart badge with the total number of products
  cartBadge.textContent = cart.length.toString();
}
// Function to handle the "Thêm vào giỏ hàng" button click
function handleAddToCart(product) {
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    alert("Sản phẩm đã tồn tại trong giỏ hàng. Mời bạn vào giỏ hàng để tiến hành mua hàng.");
    return;
  }
  

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
}
// Function to render the cart badge
function renderCartBadge() {
  cartBadge.textContent = cart.length.toString();
}

// Initial rendering of the cart badge
renderCartBadge();