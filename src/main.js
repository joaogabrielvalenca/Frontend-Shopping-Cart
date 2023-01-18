import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// const movieApiMovies = () => {
// let loader = `<div class="boxLoading"></div>`;
// document.getElementById('movieResult').innerHTML = loader;
// fetch(movieApi_url + "movies/")
//     .then(response => response.json())
//     .then(function (data) {
//         let result = `<h2> Movies I've watched! </h2>`;
//         data.forEach((movie) => {
//             const {id, name, year, note_imdb, genre, duration} = movie;
//             result +=
//                 `<div>
//                     <h5> Movie ID: ${id} </h5>
//                     <ul>
//                         <li>Movie name: ${name}</li>
//                         <li>Movie year: ${year}</li>
//                         <li>Movie note on IMDB: ${note_imdb}</li>
//                         <li>Movie Genre: ${genre}</li>
//                         <li>Movie duration: ${duration}</li>
//                     </ul>
//                 </div>`;
//             document.getElementById('movieResult').innerHTML = result;
//         })
//     })
// };

const loadingWarning = () => {
  const loading = document.createElement('h2');
  const bodyPlace = document.querySelector('.product');
  loading.innerText('carregando...');
  loading.classList('loading');
  bodyPlace.appendChild(loading);
};

const closeWarning = () => {
  const removeLoading = document.querySelector('.loading');
  const bodyPlace = document.querySelector('.product');
  bodyPlace.removeAttribute(removeLoading);
};

// const typedArguments = async () => {
//   const fetchedProduct = await fetchProductsList('gato');
//   if (fetchedProduct === Promise) {
//     loadingWarning();
//   } else {
//     closeWarning();
//     return fetchedProduct;
//   }
// };
const typedArguments = await fetchProductsList('computador')
console.log(typedArguments);

// const renderSection = document.querySelector('.products');
// renderSection.appendChild(createProductElement(typedArguments));

const argumentsMap = () => {
  const list = [];
  typedArguments.map((argument) => {
    const obj = {};
    obj.id = argument.id;
    obj.title = argument.title;
    obj.thumbnail = argument.thumbnail;
    obj.price = argument.price;
    list.push(obj);
    return obj;
  });
  console.log(list);
  return list;
};

const productList = argumentsMap();

const products = document.querySelector('.products');

productList.map((product) => products.appendChild(createProductElement(product)));


