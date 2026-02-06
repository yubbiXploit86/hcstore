const ADMIN_USER="Retaabi21";
const ADMIN_PASS="Retaabi21";

const BTC="bc1qvd00grpp3kea4nlgexvv7ktam62fv9lepfyt6w";
const ETH="0x81830DF553d62bE793c3E7dC0184d8F3728b33F3";

let products=JSON.parse(localStorage.getItem("products"))||[];
let cart=[];
let secret=0;

/* SCROLL */
function scrollToId(id){
  document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

/* ADMIN HIDDEN */
serviceTitle.onclick=()=>{
  secret++;
  if(secret===5) adminLogin.classList.remove("hidden");
};
adminLoginBtn.onclick=()=>{
  if(adminUser.value===ADMIN_USER && adminPass.value===ADMIN_PASS){
    adminPanel.classList.remove("hidden");
    adminLogin.classList.add("hidden");
  } else alert("Access denied");
};

/* PRODUCT */
addProductBtn.onclick=()=>{
  const f=pimg.files[0];
  if(!f) return;
  const r=new FileReader();
  r.onload=()=>{
    products.push({
      name:pname.value,
      price:pprice.value,
      desc:pdesc.value,
      code:pcode.value,
      img:r.result
    });
    localStorage.setItem("products",JSON.stringify(products));
    renderProducts();
  };
  r.readAsDataURL(f);
};

function renderProducts(){
  productList.innerHTML="";
  products.forEach((p,i)=>{
    const d=document.createElement("div");
    d.className="product";
    d.innerHTML=`
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p class="soft">${p.desc}</p>
      <pre>${p.code}</pre>
      <b>$${p.price}</b>
      <button class="btn primary">Tambah</button>
    `;
    d.querySelector("button").onclick=()=>{
      cart.push(p);
      cartCount.textContent=cart.length;
    };
    productList.appendChild(d);
  });
}
renderProducts();

/* CART */
openCart.onclick=()=>{
  cartModal.classList.remove("hidden");
  renderCart();
};
function closeCart(){
  cartModal.classList.add("hidden");
  stepCart.classList.remove("hidden");
  stepPay.classList.add("hidden");
}

function renderCart(){
  cartItems.innerHTML="";
  cart.forEach(p=>{
    cartItems.innerHTML+=`<p>${p.name} - $${p.price}</p>`;
  });
}

/* CHECKOUT */
function goCheckout(){
  stepCart.classList.add("hidden");
  stepPay.classList.remove("hidden");
  btcAddr.textContent=BTC;
  ethAddr.textContent=ETH;
}

/* COPY */
function copyAddr(type){
  const text=type==="btc"?BTC:ETH;
  navigator.clipboard.writeText(text);
  alert("Alamat disalin");
}
