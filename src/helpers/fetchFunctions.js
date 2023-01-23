export const fetchProduct = async (id) => {
  if (!id) {
    const erro = new Error('ID não informado');
    return erro;
  }
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    const catchError = 'ID não informado';
    return catchError;
  }
};

export const fetchProductsList = async (search) => {
  if (!search) {
    const empty = new Error('Algum erro ocorreu, recarregue a página e tente novamente');
    alert(empty);
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
