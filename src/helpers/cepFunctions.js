export const getAddress = async (postalCode) => {
  try {
    const response = await fetch(`https://cep.awesomeapi.com.br/json/${postalCode}`);
    const data = await response.json();
    const { address, district, city, state } = data;
    const obj = {
      rua: address,
      bairro: district,
      cidade: city,
      estado: state,
    };

    const postObj = document.querySelector('.cart__address');
    const textReturn = await `${obj.rua} - ${obj.bairro} - ${obj.cidade} - ${obj.estado}`;
    if (obj.rua === undefined) {
      postObj.innerHTML = 'CEP não encontrado';
    } else {
      postObj.innerHTML = textReturn;
    }
    return postObj;
  } catch {
    const response2 = await fetch(`https://brasilapi.com.br/api/cep/v2/${postalCode}`);
    const data2 = await response2.json();
    const { street, neighborhood, city, state } = data2;
    const obj2 = {
      rua: street,
      bairro: neighborhood,
      cidade: city,
      estado: state,
    };
    const postObj = document.querySelector('.cart__address');
    const textReturn = await
    `${obj2.rua} - ${obj2.bairro} - ${obj2.cidade} - ${obj2.estado}`;
    if (obj2.rua === undefined) {
      postObj.innerHTML = 'CEP não encontrado';
    } else {
      postObj.innerHTML = textReturn;
    }
    return postObj;
  }
};

export const searchCep = () => {
  const searchInput = document.querySelector('.cep-input');
  const cep = searchInput.value;
  getAddress(cep);
};
