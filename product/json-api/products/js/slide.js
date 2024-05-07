const header = document.querySelector("header")
window.addEventListener("scroll", function() {
    x = window.pageYOffset //tính toạ độ Y(chiều dọc)
    if(x > 0) { // rê vào màng hình dịch xuống dưới
        header.classList.add("sticky")
    }
    else {
        header.classList.remove("sticky")
    }
})


const imgPosition = document.querySelectorAll(".aspect-ratio-169 img")
// console.log(imgPosition)
const imgContainer = document.querySelector('.aspect-ratio-169')
const dotItem = document.querySelectorAll(".dot")
let imgNuber = imgPosition.length
let index = 0
imgPosition.forEach(function(image,index) {
    image.style.left = index*100 + "%"   // dịch chuyển các phần tử 
    dotItem[index].addEventListener("click",function(){
    slider (index) 
    })

}) 

function imgSlide () {
    index++;
    console.log(index)
    if(index >= imgNuber) {index = 0}
    slider (index) 
}

function slider (index) {
    imgContainer.style.left = "-" +index*100+"%"
    const dotActive = document.querySelector('.active') //chọn hết class active xong r xoá
    dotActive.classList.remove("active")
    dotItem[index].classList.add("active")
}

setInterval(imgSlide,5000)