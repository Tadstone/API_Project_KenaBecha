let cartIcon = document.querySelector("#cart-Icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//opne cart
cartIcon.onclick = () =>{
  cart.classList.add("active");
}

//close cart
closeCart.onclick = () =>{
    cart.classList.remove("active");
}

// cart working js

if (document.readyState=="loading"){
  document.addEventListener("DOMContentLoaded",ready);
}
else{
  ready();
}

// making a function
function ready()
{
  var removeCartButtons = document.getElementsByClassName('cart-remove');
  console.log(removeCartButtons);
  for(var i = 0; i<removeCartButtons.length;i++)
  {
    var button =removeCartButtons[i];
    button.addEventListener('click',removeCartItem);
  }

  // quantity changes
  var quantityInputs=document.getElementsByClassName("cart-quantity");
  for(var i=0;i<quantityInputs.length;i++)
  {
    var input=quantityInputs[i];
    //limitUpdate(i);
   // var cartLimit=document.getElementsByClassName("cart-limit")[i];
    input.addEventListener("change",quantityChanged);
  }

  //add to cart
  var addCart=document.getElementsByClassName('add-cart');
  for(var i=0;i<addCart.length;i++)
  {
    var button=addCart[i];
    button.addEventListener("click",addCartClicked);
  }

  // buy button
  document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonClicked);
}

//update product limit doesnt work
// function limitUpdate(i){
//   var getlimit=document.getElementsByClassName('cart-limit')[i].innerText;
//   limit=12;
// }

//buy button function
function buyButtonClicked()
{
  alert("Your order has been placed!");
  // var cartContent=document.getElementsByClassName('cart-content')[0];
  // while(cartContent.hasChildNodes()){
  //   cartContent.removeChild(cartContent.firstChild);
  // }
 // updateTotal();
}

// remove items from cart
function removeCartItem(event)
{
   var buttonClicked = event.target;
   buttonClicked.parentElement.remove();
   updateTotal();
}

//quantity change
function quantityChanged(event){
  var input=event.target;
  setlimit(input);
  updateTotal();
}

function setlimit(input){
  var parent=input.parentElement;
  var value=parent.getElementsByClassName("cart-limit")[0].innerText;
  var limitval=parseInt(value);
     if(isNaN(input.value) || input.value<=0 )
   {
     input.value=1;
   }
   else if(input.value>limitval)
   {
     input.value=limitval;
   }
}

//Add to cart
function addCartClicked(event)
{
  var button=event.target;
  var shopProducts=button.parentElement;
  var title=shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price=shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg=shopProducts.getElementsByClassName("sliderImage")[0].src;
  var available=shopProducts.getElementsByClassName("items")[0].innerText;
  addProductToCart(title,price,productImg,available);
  updateTotal();
}

function addProductToCart(title,price,productImg,available)
{
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems=document.getElementsByClassName('cart-content')[0];
  var cartItemsNames=cartItems.getElementsByClassName('cart-product-title');
  for(var i =0;i<cartItemsNames.length;i++)
  {
    if(cartItemsNames[i].innerText==title)
    {
    alert("You have already added this item to cart!");
    return;
    }
  }
  // <div class="cart-product-title">${title}</div>

var cartBoxContent = ` 
                      <img src="${productImg}" alt="" class="cart-img">
                      <div class="detail-box">
                          <input type="text" class="cart-product-title" name="title" value=${title} readonly>
                          <div class="cart-price">${price}</div>
                          <div class="cart-limit">${available}</div>
                          <input type="number" name="quantity" value="1" class="cart-quantity">
                      </div>
                      <!-- Remove cart -->
                      <i class='bx bxs-trash-alt cart-remove' ></i>`;
cartShopBox.innerHTML=cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);

}

// update total
function updateTotal()
{
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total=0;
  for(var i=0;i<cartBoxes.length;i++)
  {
    var cartBox=cartBoxes[i];
    var priceElement=cartBox.getElementsByClassName("cart-price")[0];
    var price=parseFloat(priceElement.innerText.replace("/-tk",""));
    var quatityElement=cartBox.getElementsByClassName("cart-quantity")[0];
    var quantity=quatityElement.value;
    total=total+(price*quantity);
  }
    // handle floating
  //  total=Math.round(total*100)/100;
  document.getElementsByClassName('total-price')[0].value=total;
  
}