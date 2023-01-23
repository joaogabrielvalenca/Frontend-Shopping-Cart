import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toEqual("function");
  });
  it('fetch é chamado ao executar fetchProductsList', () => {
    expect(fetchProductsList('gato')).resolves.toEqual(Object)
  });
  it('fetchProductsList retorna mensagem de erro ao ser chamado com id inválido', () => {
    expect(fetchProductsList('131ihiu13hi')).rejects.toEqual('Algum erro ocorreu, recarregue a página e tente novamente!')
  })
  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    const testFetch = async (search) => {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
      const data = await response.json();
      return data;
    }
    await expect(fetchProductsList('gato')).toEqual(testFetch('gato'));
  });
  

  // it('...', () => {
  // });
});
