import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const loadingWarning = () => {
  const loading = document.createElement('h2');
  const bodyPlace = document.querySelector('.products');
  loading.innerText = 'carregando...';
  loading.classList.add('loading');
  bodyPlace.appendChild(loading);
};

const closeWarning = () => {
  const removeLoading = document.querySelector('.loading');
  const bodyPlace = document.querySelector('.products');
  bodyPlace.removeChild(removeLoading);
};

const typedArguments = async () => {
  loadingWarning();
  const productList = await fetchProductsList('gato');
  closeWarning();
  if (productList.length === 0) {
    const noResp = new Error('Algum erro ocorreu, recarregue a página e tente novamente');
    const printResponse = document.createElement('h2');
    printResponse.classList.add('error');
    printResponse.innerText = noResp;
    const body = document.querySelector('.products');
    body.appendChild(printResponse);
  }
  return productList;
};

const argumentsMap = async () => {
  const list = [];
  const products = await typedArguments();
  products.map((argument) => {
    const obj = {
      id: argument.id,
      title: argument.title,
      thumbnail: argument.thumbnail,
      price: argument.price,
    };
    list.push(obj);
    return obj;
  });
  return list;
};
const productList = await argumentsMap();
const products = document.querySelector('.products');
productList.map((product) => products.appendChild(createProductElement(product)));

const selectCartItem = () => {
  const buttons = document.querySelectorAll('.product__add');
  const newButtons = [...buttons];
  const arr = [];
  newButtons.map((button) => {
    arr.push(button);
    button.addEventListener('click', async (event) => {
      const selectedProduct = event.path[1];
      const filteredProduct = selectedProduct.querySelector('.product__id');
      const idProduct = filteredProduct.innerText;
      const saveObj = await fetchProduct(idProduct);
      const { id, title, price, pictures } = saveObj;
      saveCartID(idProduct);
      const product = createCartProductElement({ id, title, price, pictures });
      const appendTo = document.querySelector('.cart__products');
      appendTo.appendChild(product);
    });
    return arr;
  });
};

// const cartStorage = async () => {
//   const storageItems = JSON.parse(localStorage.getItem('cartProducts'));
//   const mapItems = storageItems.map(async (item) => {
//     const cart = (fetchProduct(item));
//     return cart;
//   });
// };
// const resolvingPromises = await Promise.all(mapItems);
// console.log(resolvingPromises);
// resolvingPromises.map(async (promise) => {
// const restauredCart = await
// createCartProductElement(promise.id, promise.title, promise.price, promise.pictures);
// console.log(restauredCart);
// return restauredCart;
// });
// const { id, title, prices, pictures } = await resolvingPromises;
// console.log(id, title);
// const product = createCartProductElement({ id, title, prices, pictures });
// console.log(product);
// const appendMother = document.querySelector('.cart__products');
// appendMother.appendChild(product);
// };

// console.log(cartStorage());
selectCartItem();

// window.onload = () => {
//   cartStorage();
// }
