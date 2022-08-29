const wrapper = document.querySelector(".sliderWrapper");

const menuItems = document.querySelectorAll(".menuItem");
// wrapper.style.transform="translateX(-100vw)"

menuItems.forEach((item,index)=>{
   item.addEventListener("click",()=>{
       wrapper.style.transform = `translateX(${-91 * index}vw)`;
       //change chosen product 
       choosenProduct = products[index];

       //change texts of currentProduct
       currentProductTitle.textContent = choosenProduct.title;
       currentProductPrice.textContent = choosenProduct.price+"/- BDT";
       currentProductImg.src = choosenProduct.colors[0].img;

        // assign new colors
       currentProductColors.forEach((color, index) => {
         color.style.backgroundColor = choosenProduct.colors[index].code;
     });
   });
});

currentProductColors.forEach((item,index)=>{
     item.addEventListener("click",()=>{
         console.log(index + "is clicked");
       currentProductImg.src = choosenProduct.colors[index].img;
     });
});

currentProductSizes.forEach((size,index)=>{
   size.addEventListener("click",()=>{
       currentProductSizes.forEach((size)=>{
          size.style.backgroundColor = "white";
          size.style.color="black";
       });
       size.style.backgroundColor = "black";
       size.style.color = "white";
   });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});