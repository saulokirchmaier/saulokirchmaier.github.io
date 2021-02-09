function printTotalPrice(value) {
  const price = document.querySelector('.total-price');
  price.innerText = value.toFixed(2);
}

async function getTotalPriceItems() {
  const cartItems = document.querySelectorAll('.cart__item');
  let price = 0;
  cartItems.forEach((item) => {
    price += +(item.innerText.split('$')[1]);
    printTotalPrice(price);
  });
  if (cartItems.length === 0) printTotalPrice(0);
}

// async function getTotalPriceItems() {
//   let saved = [];
//   if (localStorage.getItem('itemToBuy')) saved = JSON.parse(localStorage.getItem('itemToBuy'));
//   let amount = 0;
//   saved.forEach(async (item) => {
//     const linkItem = `https://api.mercadolibre.com/items/${item}`;
//     if (item) {
//       try {
//         const responseItem = await fetch(linkItem);
//         const responseItemJSON = await responseItem.json();
//         amount += responseItemJSON.price;
//       } catch (error) {
//         alert(error);
//       }
//     }
//     printTotalPrice(amount);
//   });
//   if (saved.length === 0) printTotalPrice(0);
// }

function showCartQantity() {
  const cartItems = document.querySelectorAll('.cart__item');
  const cartIcon = document.querySelector('.cart-quantity');
  if (cartItems.length !== 0) {
    cartIcon.innerText = `${cartItems.length}`;
    cartIcon.style.visibility = 'visible';
  } else cartIcon.style.visibility = 'hidden';
}

function clearCart() {
  const emptyCartButton = document.querySelector('.empty-cart');
  emptyCartButton.addEventListener('click', () => {
    const itemsInCart = document.querySelectorAll('.cart__item');
    itemsInCart.forEach(item => item.remove());
    localStorage.setItem('itemToBuy', '');
    getTotalPriceItems();
    showCartQantity();
  });
}

function createDivTotalPrice() {
  const cart = document.querySelector('.cart');
  const total = document.createElement('div');
  const price = document.createElement('span');
  total.classList.add('total');
  total.innerHTML = 'Preço total: $';
  price.classList.add('total-price');
  price.innerText = 0;
  cart.appendChild(total);
  total.appendChild(price);
}

function saveItemCartOnLocalStorage() {
  const cartItems = document.querySelector('.cart__items');
  localStorage.setItem('itemToBuy', cartItems.innerHTML);
  getTotalPriceItems();
  showCartQantity();
}

// function saveItemCartOnLocalStorage() {
//   let saved = [];
//   if (localStorage.getItem('itemToBuy')) saved = JSON.parse(localStorage.getItem('itemToBuy'));
//   saved.push(item.sku);
//   localStorage.setItem('itemToBuy', JSON.stringify(saved));
//   getTotalPriceItems();
// }

async function removeFromLocalStorage() {
  const cartItems = document.querySelector('.cart__items');
  localStorage.setItem('itemToBuy', cartItems.innerHTML);
  getTotalPriceItems();
  showCartQantity();
}

// async function removeFromLocalStorage(item) {
//   const itemID = item.innerText.slice(5, 18);
//   const saved = JSON.parse(localStorage.getItem('itemToBuy'));
//   const toDelete = saved.indexOf(itemID);
//   saved.splice(toDelete, 1);
//   localStorage.setItem('itemToBuy', JSON.stringify(saved));
//   getTotalPriceItems();
// }

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ price, sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__price', `$ ${price.toFixed(2)}`));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const cart = document.querySelector('.cart__items');
  cart.removeChild(event.target);
  removeFromLocalStorage(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function appendChildCartItemList(item) {
  const cart = document.querySelector('.cart__items');
  cart.appendChild(item);
}

async function fetchItemMercadoLivre(item, addItem) {
  const linkItem = `https://api.mercadolibre.com/items/${item}`;

  try {
    const responseItem = await fetch(linkItem);
    const responseItemJSON = await responseItem.json();
    const newItem = {
      ...item,
      sku: responseItemJSON.id,
      name: responseItemJSON.title,
      salePrice: responseItemJSON.price,
    };
    appendChildCartItemList(createCartItemElement(newItem));
    if (addItem) saveItemCartOnLocalStorage(newItem);
  } catch (error) {
    alert(error);
  }
}

function addItemInCartListener() {
  const addButtons = document.querySelectorAll('.item__add');
  addButtons.forEach(addButton => (addButton
    .addEventListener('click', (event) => {
      const itemID = getSkuFromProductItem(event.target.parentNode);
      fetchItemMercadoLivre(itemID, addItem = true);
    },
  )));
}

function appendChildItemsList(item) {
  const items = document.querySelector('.items');
  items.appendChild(item);
}

function showLoadingStatus() {
  const items = document.querySelector('.items');
  const loading = document.createElement('div');
  loading.classList.add('loading');
  loading.innerHTML = 'Loading...';
  items.appendChild(loading);
}

function removeLoadingStatus() {
  const loading = document.querySelector('.loading');
  loading.remove();
}

function tittleItemSearch(search) {
  const productSearch = document.querySelector('.product-search span');
  productSearch.innerText = search;
}

async function fetchMercadoLivreAPI(search) {
  const link = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;

  try {
    showLoadingStatus();
    const response = await fetch(link);
    const responseJSON = await response.json();
    responseJSON.results.forEach((result) => {
      const item = {
        ...result,
        sku: result.id,
        name: result.title,
        image: result.thumbnail,
      };
      appendChildItemsList(createProductItemElement(item));
    });
    tittleItemSearch(search);
    addItemInCartListener();
    removeLoadingStatus();
  } catch (error) {
    alert(error);
  }
}

function loadCartListeners() {
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
}

function loadItemCartSavedOnLocalStorage() {
  let saved;
  const cartItems = document.querySelector('.cart__items');
  if (localStorage.getItem('itemToBuy')) {
    saved = localStorage.getItem('itemToBuy');
    cartItems.innerHTML = saved;
  } else cartItems.innerHTML = '';
  loadCartListeners();
  getTotalPriceItems();
  showCartQantity();
}

// function loadItemCartSavedOnLocalStorage() {
//   let saved = [];
//   if (localStorage.getItem('itemToBuy')) saved = JSON.parse(localStorage.getItem('itemToBuy'));
//   saved.forEach((item) => {
//     if (item) fetchItemMercadoLivre(item, addItem = false);
//   });
//   getTotalPriceItems();
// }

function showCartItens() {
  const cartIcon = document.querySelector('.cart-icon');
  const cart = document.querySelector('.cart-space');
  const items = document.querySelector('.items');
  cartIcon.addEventListener('click', () => {
    console.log(screen.availWidth);
    if (screen.availWidth > '600') {
      if (cart.style.display === 'none') cart.style.display = 'flex';
      else cart.style.display = 'none';
    } else {
      if (cart.style.display === 'none') {
        cart.style.display = 'flex';
        items.style.display = 'none';
      } else {
        cart.style.display = 'none';
        items.style.display = 'flex';
      } 
    }
  });
}

function searchProduct() {
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  const items = document.querySelector('.items');

  searchButton.addEventListener('click', () => {
    const search = searchInput.value;
    items.innerHTML = '';
    fetchMercadoLivreAPI(search);
  });
}

window.onload = function onload() {
  searchProduct();
  createDivTotalPrice();
  fetchMercadoLivreAPI('computador');
  loadItemCartSavedOnLocalStorage();
  clearCart();
  showCartItens();
};
