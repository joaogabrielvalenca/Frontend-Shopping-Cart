export const getAddress = async (postalCode) => {
  const response = await fetch(`https://cep.awesomeapi.com.br/json/${postalCode}`);
  const data = await response.json();
  const { address, district, city, state } = data;
  const obj = {};
  obj.rua = address;
  obj.bairro = district;
  obj.cidade = city;
  obj.estado = state;
  const postObj = document.querySelector('.cart__address');
  const textReturn = await `${obj.rua} - ${obj.bairro} - ${obj.cidade} - ${obj.estado}`;
  postObj.innerHTML = textReturn;
  return obj;
};

export const searchCep = () => {
  const searchInput = document.querySelector('.cep-input');
  const cep = searchInput.value;
  getAddress(cep);
};
