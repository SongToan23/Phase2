document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchKeyword = urlParams.get("keyword");

  if (searchKeyword) {
    fetch("/product/json-api/data.json")
      .then((response) => response.json())
      .then((data) => {
        const boysearchResults = data.boy.filter((item) => {
          return item.name.toLowerCase().includes(searchKeyword);
        });

        const girlsearchResults = data.girl.filter((item) => {
          return item.name.toLowerCase().includes(searchKeyword);
        });

        const searchResultsContainer = document.getElementById("searchResults");
        searchResultsContainer.innerHTML = "";

        if (boysearchResults.length === 0 && girlsearchResults.length === 0) {
          const noResults = document.createElement("p");
          noResults.textContent = "Không tìm thấy kết quả.";
          searchResultsContainer.appendChild(noResults);
        } else {
          boysearchResults.forEach((item) => {
            const resultItem = createResultItem(item);
            searchResultsContainer.appendChild(resultItem);
          });

          girlsearchResults.forEach((item) => {
            const resultItem = createResultItem(item);
            searchResultsContainer.appendChild(resultItem);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

function createResultItem(item) {
  const resultItem = document.createElement("div");

  const imgTag = document.createElement("img");
  imgTag.src = item.preview;
  resultItem.appendChild(imgTag);

  const name = document.createElement("p");
  name.textContent = item.name;
  resultItem.appendChild(name);

  const brand = document.createElement("p");
  brand.textContent = item.brand;
  resultItem.appendChild(brand);

  const price = document.createElement("p");
  price.textContent = item.price;
  resultItem.appendChild(price);

  // Hiển thị thêm thông tin sản phẩm tại đây

  return resultItem;
} 