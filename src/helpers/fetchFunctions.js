export const fetchProduct = async (id) => {
  if (!id) throw new Error('ID não informado');
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    const catchError = 'ID não informado';
    alert(catchError);
  }
};

export const fetchProductsList = async (search) => {
  if (!search) {
    throw new Error('Algum erro ocorreu, recarregue a página e tente novamente');
  }
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    const erro = new Error('Algum erro ocorreu, recarregue a página e tente novamente!');
    const appendError = document.querySelector('.products');
    const textError = document.createElement('h2');
    textError.innerText = erro;
    appendError.appendChild(textError);
  }
};

// export const fetchProductsList = async (search) => {
//   if (!search) throw new Error('DEU PAU!');
//   try {
//     const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
//     const data = await response.json();
//     const { results } = await data;
//     const { id, title, thumbnail, price } = await results;
//     await console.log(id, title, thumbnail, price);
//   } catch (error) {
//     throw new Error('DEU PAU!');
//   }
// };
