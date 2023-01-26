import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';
import './style.css';
import product from './tests/mocks/product';

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
  try {
    loadingWarning();
    const productList = await fetchProductsList('123abaduhih');
    closeWarning();
    if (productList.length === 0) {
      const noResp = 'Algum erro ocorreu, recarregue a página e tente novamente';
      const printResponse = document.createElement('h2');
      printResponse.classList.add('error');
      printResponse.innerText = noResp;
      const bodyAppend = document.querySelector('.products');
      bodyAppend.appendChild(printResponse);
    }
  } catch {
    const noResp = 'Algum erro ocorreu, recarregue a página e tente novamente';
    const printResponse = document.createElement('h2');
    printResponse.classList.add('error');
    printResponse.innerText = noResp;
    const bodyAppend = document.querySelector('.products');
    bodyAppend.appendChild(printResponse);
    console.log(err);
    throw new Error(noResp);
  }
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

const getPricesFromProductsIds = (ids = []) => {
  const list = [];
  ids.map(async (productId) => {
    const saveObj = await fetchProduct(productId);
    const { price } = saveObj;
    list.push(price);
    return list;
  });
  return list;
};

const cartProduct = '.cart__products';
const totalPrice = '.total-price';
const fetchProductsFromLocalStorage = async () => {
  const storageProducts = JSON.parse(localStorage.getItem('cartProducts'));
  if (!storageProducts) return false;
  const arrPrices = [];
  storageProducts.map(async (product) => {
    const saveObj = await fetchProduct(product);
    const { id, title, price, pictures } = saveObj;
    const fetchedProduct = createCartProductElement({ id, title, price, pictures });
    const cartAppend = document.querySelector(cartProduct);
    cartAppend.appendChild(fetchedProduct);
    arrPrices.push(price);
    const sumPrices = arrPrices.reduce((acc, curr) => acc + curr);
    const roundPrice = sumPrices.toFixed(2);
    const showPrice = document.querySelector(totalPrice);
    showPrice.innerText = roundPrice;
    return saveObj;
  });
};

fetchProductsFromLocalStorage();

const selectCartItem = async () => {
  const buttons = document.querySelectorAll('.product__add');
  const newButtons = [...buttons];
  const arrayOfIds = JSON.parse(localStorage.getItem('cartProducts')) ?? [];
  const prices = await getPricesFromProductsIds(arrayOfIds);
  const arr = [];
  newButtons.map((button) => {
    arr.push(button);
    const addProduct = button.addEventListener('click', async (event) => {
      const selectedProduct = event.path[1];
      const filteredProduct = selectedProduct.querySelector('.product__id');
      const idProduct = filteredProduct.innerText;
      const saveObj = await fetchProduct(idProduct);
      const { id, title, price, pictures } = saveObj;
      const product = createCartProductElement({ id, title, price, pictures });
      saveCartID(idProduct);
      const appendTo = document.querySelector(cartProduct);
      appendTo.appendChild(product);
      const filteredPrice = selectedProduct.querySelector('.product__price__value');
      const priceInner = filteredPrice.innerText;
      const numberPrice = Number(priceInner);
      prices.push(numberPrice);
      console.log(prices);
      const pricesReduce = prices.reduce((acc, curr) => acc + curr);
      const roundPrices = pricesReduce.toFixed(2);
      const showPrice = document.querySelector(totalPrice);
      showPrice.innerText = roundPrices;
      return arr;
    });
    return addProduct;
  });
  const itens = document.querySelector(cartProduct);
  itens.addEventListener('click', (event) => {
    const abc = event.path[1];
    const value = abc.querySelector('.product__price__value');
    const valueInner = value.innerText;
    const numberPrice = Number(valueInner);
    const indexToDelete = prices.indexOf(numberPrice);
    prices.splice(indexToDelete, 1);
    const pricesReduce = prices.reduce((acc, curr) => acc + curr, 0);
    const showPrice = document.querySelector(totalPrice);
    showPrice.innerText = pricesReduce;
    if (!prices) {
      showPrice.innerText = 0;
    }
  });
};

selectCartItem();

// window.onload = () => {
//   cartStorage();
// }
