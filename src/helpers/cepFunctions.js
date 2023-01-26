export default async function getAddress(postalCode) {
  try {
    const response1 = await fetch(`https://cep.awesomeapi.com.br/json/${postalCode}`);
    const response2 = await fetch(`https://brasilapi.com.br/api/cep/v2/${postalCode}`);
    const responseList = [response1, response2];
    const request = await Promise.any(responseList).then((response) => response.json());
    const obj = {
      rua: request.address || request.street,
      bairro: request.district || request.neighborhood,
      cidade: request.city,
      estado: request.state,
    };
    const postObj = document.querySelector('.cart__address');
    const textReturn = `${obj.rua} - ${obj.bairro} - ${obj.cidade} - ${obj.estado}`;
    console.log(obj.rua);
    if (obj.rua === undefined) {
      console.log('entrei');
      const throwError = 'CEP não encontrado';
      postObj.innerText = throwError;
      // throw new Error(throwError);
    } else {
      postObj.innerText = textReturn;
    }
  } catch (err) {
    const throwError = 'CEP não encontrado';
    const postObj = document.querySelector('.cart__address');
    postObj.innerText = throwError;
    console.log('catch');
    console.log(err);
    return err;
  }
}

export const searchCep = () => {
  const searchInput = document.querySelector('.cep-input');
  const cep = searchInput.value;
  getAddress(cep);
};
