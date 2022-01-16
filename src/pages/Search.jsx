import React from 'react';
import Header from '../components/Header';

const DOIS = 2;
// definindo estados atuais
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputMusic: '',
    };
  }

  // capturando eventos que forem passados para o input pela func handlemusic
  handleMusic = (event) => {
    const { target: { value, id } } = event;
    this.setState({ [id]: value });
  }

  // condição para que o botão seja desabilitado no inicio caso não haja  ao menos dois Caracteres
  buttonDisabled= () => {
    const { inputMusic } = this.state;
    if (inputMusic.length < DOIS) {
      return false;
    } return true;
  }

  render() {
    const { inputMusic } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {' '}
        {/* renderizando o header */}
        <form action="">
          <label htmlFor="inputMusic">
            <input
              type="text"
              value={ inputMusic } // passando a chave 'inputMusic' que está dentro do state
              data-testid="search-artist-input"
              placeholder="digite o pancadão"
              id="inputMusic"
              onChange={ this.handleMusic } // chamando a função 'handleMusic' através do evento 'onChange'
            />
          </label>

          <button
            id="buttonDisabled"
            type="submit"
            data-testid="search-artist-button"
            disabled={ !this.buttonDisabled() } // o '!' está alterando o valor incial da função 'buttonDisabled' para falso
          >
            Pesquisar
            {' '}

          </button>
        </form>
      </div>
    );
  }
}
export default Search;
