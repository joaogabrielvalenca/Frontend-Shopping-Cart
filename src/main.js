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
  const pricesArray = [];
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
      const filteredPrice = selectedProduct.querySelector('.product__price__value');
      const priceInner = filteredPrice.innerText;
      const numberPrice = Number(priceInner);
      pricesArray.push(numberPrice);
      const pricesReduce = pricesArray.reduce((acc, curr) => acc + curr);
      const roundPrices = pricesReduce.toFixed(2);
      const showPrice = document.querySelector('.total-price');
      showPrice.innerText = roundPrices;
    });
    return arr;
  });
};

const fetchProductsFromLocalStorage = () => {
  const storageProducts = JSON.parse(localStorage.getItem('cartProducts'));
  const arrPrices = [];
  console.log(storageProducts);
  storageProducts.map(async (product) => {
    const saveObj = await fetchProduct(product);
    const { id, title, price, pictures } = saveObj;
    const fetchedProduct = createCartProductElement({ id, title, price, pictures });
    const cartAppend = document.querySelector('.cart__products');
    cartAppend.appendChild(fetchedProduct);
    arrPrices.push(price);
    const sumPrices = arrPrices.reduce((acc, curr) => acc + curr);
    const roundPrice = sumPrices.toFixed(2);
    console.log(sumPrices);
    const showPrice = document.querySelector('.total-price');
    showPrice.innerText = roundPrice;
    return saveObj;
  });
};
fetchProductsFromLocalStorage();

selectCartItem();

// window.onload = () => {
//   cartStorage();
// }
