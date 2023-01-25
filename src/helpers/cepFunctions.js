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
    if (obj.rua === undefined) {
      const throwError = 'CEP não encontrado';
      postObj.innerHTML = throwError;
      postObj.innerText = throwError;
      throw new Error(throwError);
    } else {
      postObj.innerHTML = textReturn;
    }
    return postObj;
  } catch {
    const erro = 'CEP não encontrado';
    const postError = document.querySelector('.cart__address');
    postError.innerText = erro;
    postError.innerHTML = erro;
    throw new Error(erro);
  }
}

export const searchCep = () => {
  const searchInput = document.querySelector('.cep-input');
  const cep = searchInput.value;
  getAddress(cep);
};
