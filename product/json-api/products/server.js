const fs = require('fs');

// Đọc dữ liệu từ tệp JSON
const data = JSON.parse(fs.readFileSync('data.json'));

// Tìm id cuối cùng trong mảng 'girl'
const lastGirlId = data.girl[data.girl.length - 1].id;

// Tìm id cuối cùng trong mảng 'boy'
const lastBoyId = data.boy[data.boy.length - 1].id;

// Tạo id mới cho mục mới trong mảng 'girl'
const newGirlId = parseInt(lastGirlId) + 1;

// Tạo mục mới với id mới trong mảng 'girl'
const newGirlItem = {
  "name": "Chân váy kaki Minnie bé gái Rabity 555.002",
  "preview": "https://product.hstatic.net/1000290074/product/555002-0_b984b8a549fc4493b2d8195cf1549d77.jpg",
  "description": "Chân váy kaki Minnie bé gái duyên dáng. Kiểu dáng dễ phối nhiều outfits khác nhau cho bé diện xuống phố, đi học, đi chơi hay đi tiệc. Sản phẩm đạt chứng nhận Oeko-Tex 100 an toàn cho da trẻ em.",
  "brand": "Rabity",
  "price": "279,000₫",
  "amount": "23",
  "id": newGirlId.toString()
};

// Thêm mục mới vào mảng 'girl'
data.girl.push(newGirlItem);

// Tạo id mới cho mục mới trong mảng 'boy'
const newBoyId = parseInt(lastBoyId) + 1;

// Tạo mục mới với id mới trong mảng 'boy'
const newBoyItem = {
  "name": "Bộ thun ngắn tay Mickey bé trai Rabity 560.002",
  "preview": "https://product.hstatic.net/1000290074/product/rabity9309_copy_1d1dd301719e45a88f49b25bdbfcb8c8.jpg",
  "description": "Bộ đồ bé trai thoải mái mang đi khắp mọi nơi với chất liệu cotton mềm mịn",
  "brand": "West",
  "price": "230,000đ",
  "amount": "28",
  "id": newBoyId.toString()
};

// Thêm mục mới vào mảng 'boy'
data.boy.push(newBoyItem);

// Ghi lại dữ liệu đã cập nhật vào tệp JSON
fs.writeFileSync('data.json', JSON.stringify(data, null, 2));