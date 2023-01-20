import { searchCep, getAddress } from './helpers/cepFunctions';
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
  const productList = await fetchProductsList('computador');
  closeWarning();
  return productList;
};

const argumentsMap = async () => {
  const list = [];
  const products = await typedArguments();
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

// const arrayOfIds = productList.map((product, index) => {
//   const list = [];
//   list.push(product, index);
//   return list;
// });

//requisito 8

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
  });
};

selectCartItem();
