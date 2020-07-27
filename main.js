let cart = [];
let modalQt = 1;
let modalKey = 0;

clouthJson.map((item, index)=>{
    let clouthItem = document.querySelector('.clouth-item').cloneNode(true);    
  
    clouthItem.setAttribute('data-key', index);
    clouthItem.querySelector('.clouth-item--img img').src = item.img;
    document.querySelector('.clouth-area').append(clouthItem);

    clouthItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        
        //preenche a pagina anterior ao carrinho
        let key = e.target.closest('.clouth-item').getAttribute('data-key');
        document.querySelector('.clouthWindowArea').style.display = "block";
        modalQt = 1;
        modalKey = key;

        document.querySelector('.clouthInfo--qt').innerHTML = modalQt;
        document.querySelector('.clouthBig img').src = clouthJson[key].img;
        document.querySelector('.clouthInfo h1').innerHTML = item.name;
        document.querySelector('.clouthInfo--info').innerHTML = clouthJson[key].description;
        document.querySelector('.clouthInfo--actualPrice').innerHTML = `R$ ${clouthJson[key].price.toFixed(2)}`;
        
    });
 
  });
   // eventos da pagina anterior ao carrinho
function closeModal() {
    document.querySelector('.clouthWindowArea').style.display = "none";
}
document.querySelectorAll('.clouthInfo--cancelButton, .clouthInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});
document.querySelector('.clouthInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {
        modalQt--;
        document.querySelector('.clouthInfo--qt').innerHTML = modalQt;
    }
});
document.querySelector('.clouthInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    document.querySelector('.clouthInfo--qt').innerHTML = modalQt;
});
document.querySelectorAll('.clouthInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        document.querySelector('.clouthInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});
function sacola() {
    document.querySelector('#sacola').style.opacity = '1';
    
    let size = parseInt(document.querySelector('.clouthInfo--size.selected').getAttribute('data-key'));
    let identifier = clouthJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);
    if(key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:clouthJson[modalKey].id,
            size,
            qt:modalQt
        });
    }

    updateCart();
    closeModal();
}
function fechaSacola() {
    document.querySelector('#sacola').style.opacity = '0';
}
function updateCart() {
    document.querySelector('#span').innerHTML = cart.length;

    if(cart.length > 0) {
        document.querySelector('.cart').innerHTML = '';

        let total = 0;

        for(let i in cart) {
            let clouthItem = clouthJson.find((item)=>item.id == cart[i].id);
            total += clouthItem.price * cart[i].qt;

            let cartItem = document.querySelector('.compras .cart-item').cloneNode(true);

            let clouthSizeName;
            switch(cart[i].size) {
                case 0:
                    clouthSizeName = 'P';
                    break;
                case 1:
                    clouthSizeName = 'M';
                    break;
                case 2:
                    clouthSizeName = 'G';
                    break;
            }
            let clouthName = `${clouthItem.name} (${clouthSizeName})`;

            cartItem.querySelector('img').src = clouthItem.img;
            cartItem.querySelector('.cart-item-nome').innerHTML = clouthName;
            cartItem.querySelector('.cart-item-qt').innerHTML = cart[i].qt;
            
            cartItem.querySelector('.cart-item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart-item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            document.querySelector('.cart').append(cartItem);
        }                
        

        document.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } 
}
function carrinho() {
    document.querySelector('#sacola').style.opacity = '1';
}
document.querySelector('.clouthInfo--addButton').setAttribute('onclick', 'sacola()');
document.querySelector('.menu-closer').setAttribute('onclick', 'fechaSacola()');
document.querySelector('#link').setAttribute('onclick', 'carrinho()'); 



