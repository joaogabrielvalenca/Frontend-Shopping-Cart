import { searchCep, getAddress } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const loadingWarning = () => {
  const loading = document.createElement('h2');
  const bodyPlace = document.querySelector('.products');
  loading.innerText = 'carregando...';
  loading.classList.add('loading');
  bodyPlace.appendChild(loading);
  console.log('1', bodyPlace);
};

const closeWarning = () => {
  const removeLoading = document.querySelector('.loading');
  const bodyPlace = document.querySelector('.products');
  bodyPlace.removeChild(removeLoading);
  console.log('2', bodyPlace);
};

const typedArguments = async () => {
  loadingWarning();
  const productList = await fetchProductsList('computador');
  closeWarning();
  return productList;
};

const argumentsMap = async () => {
  const list = [];
  const products = await typedArguments();
  console.log(products);
  products.map((argument) => {
    const obj = {};
    obj.id = argument.id;
    obj.title = argument.title;
    obj.thumbnail = argument.thumbnail;
    obj.price = argument.price;
    list.push(obj);
    return obj;
  });
  return list;
};
const productList = await argumentsMap();
const products = document.querySelector('.products');
productList.map((product) => products.appendChild(createProductElement(product)));

const arrayOfIds = productList.map((product, index) => {
  const list = [];
  list.push(product, index);
  return list;
});

//requisito 8

const selectCartItem = () => {
  const buttons = document.querySelectorAll('.product__add');
  const newButtons = [...buttons];
  // console.log(newButtons);
  const arr = []
  newButtons.map((button) => {
    arr.push(button);
    button.addEventListener('click', (event) => {
      // button.classList.add('active');
      const selectedProduct = event.path[1];
      console.log(selectedProduct);
    });
  });
  const activeElement = document.querySelector('.active');
  console.log(activeElement);
  // console.log(buttons);
  // const arr = [];
  // const arrNums = buttons.map((button) => {
  //   arr.push(button);
  //   return arr;
  // });
  
};

selectCartItem();

getAddress(60160070);