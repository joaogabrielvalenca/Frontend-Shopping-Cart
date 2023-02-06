import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toEqual("function");
  });
  it('fetch é chamado ao executar fetchProductsList', async () => {
    const func = fetchProductsList('computador')
    expect(fetch()).toHaveBeenCalledWith(func)
  });
  it('fetchProductsList retorna mensagem de erro ao ser chamado sem ID', () => {
    expect(fetchProductsList('')).rejects.toThrow('Termo de busca não informado')
  })
  it('fetchProductsList retorna mensagem de erro ao ser chamado com ID inexistente', () => {
    expect(fetchProductsList('3927y32hgbg132')).rejects.toThrow('Algum erro ocorreu, recarregue a página e tente novamente')
  })
  it('fetchProductList passando computador retorna uma estrutura de dados igual a computadorSearch', async () => {
    expect(await fetchProductsList('computador')).toBe(computadorSearch)
  })
  // it('testa se quando a requisição dá erro mostra a mensagem em tela', () => { 
  //   expect(fetchProductsList('12ygu1yg2')).toBe('Algum erro ocorreu, recarregue a página e tente novamente')
  // })
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




// import './mocks/fetchSimulator';
// import { fetchProductsList } from '../helpers/fetchFunctions';
// import computadorSearch from './mocks/search';

// // implemente seus testes aqui
// describe('Teste a função fetchProductsList', () => {
//   it('fetchProductsList é uma função', () => {
    
//   });

//   it('fetch é chamado ao executar fetchProductsList', () => {

//   });

//   it('fetch é chamado com o endpoint correto ao executar fetchProductsList', () => {

//   });

//   // it('...', () => {
//   // });
// });
