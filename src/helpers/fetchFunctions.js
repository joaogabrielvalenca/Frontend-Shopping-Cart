export const fetchProduct = () => {
  // seu código aqui
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
    throw new Error('Algum erro ocorreu, recarregue a página e tente novamente!');
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
