export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
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
    throw new Error('Termo de busca não informado');
  }
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    const erro = new Error('Algum erro ocorreu, recarregue a página e tente novamente');
    throw erro;
    //   const appendError = document.querySelector('.products');
    //   const textError = document.createElement('h2');
    //   textError.classList('.error');
    //   textError.innerText = erro;
    //   appendError.appendChild(textError);
    // }
  }
};
