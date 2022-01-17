import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

const DOIS = 2;
// definindo estados atuais
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      listAlbums: '',
      nameArtist: '',
      sttsButton: false,
    };
  }

  // capturando eventos que forem passados para o input pela func handlemusic
  handleMusic = (event) => {
    const { target: { value, id } } = event;
    this.setState({ [id]: value, nameArtist: value });
  }

  // condição para que o botão seja desabilitado no inicio caso não haja  ao menos dois Caracteres
  buttonDisabled= () => {
    const { artist } = this.state;
    if (artist.length < DOIS) {
      return false;
    } return true;
  }

  searchButton= async (event) => {
    event.preventDefault();
    const { artist } = this.state;
    this.setState({ sttsButton: true });

    const responseAlbum = await searchAlbumsAPIs(artist); // fazendo a requisição da API
    this.setState({ listAlbums: responseAlbum, artist: '' });
  }

  render() {
    const { artist, listAlbums, sttsButton, nameArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {/* renderizando o header */}
        <form action="">
          <label htmlFor="artist">
            <input
              type="text"
              value={ artist } // passando a chave 'artist' que está dentro do state
              data-testid="search-artist-input"
              placeholder="digite o pancadão"
              id="artist"
              onChange={ this.handleMusic } // chamando a função 'handleMusic' através do evento 'onChange'
            />
          </label>

          <button
            id="buttonDisabled"
            type="submit"
            data-testid="search-artist-button"
            disabled={ !this.buttonDisabled() } // o '!' está alterando o valor incial da função 'buttonDisabled' para falso
            onClick={ this.searchButton }
          >
            Pesquisar
          </button>
        </form>
        <h2>
          {sttsButton
            ? `Resultado de álbuns de: ${nameArtist}` // condição caso 'sttsButton' for verdadeiro retorna o resultado, senão, não retorna nada
            : null}
        </h2>
        {listAlbums.length > 0
          ? listAlbums.map(({
            collectionId,
            artistName,
            artworkUrl100,
            collectionName, // fiz uma desconstrução direta dos objetos que estão dentro de ListAlbum
          }) => (
            <section key={ collectionId }>
              {' '}
              {/*  o lint que coloca {''} */}
              {/* quando se usa map é necessario ter uma key para identificar o elemento */}
              <Link
                to={ `/album/${collectionId}` }// aparece na barra de navegação/album/numero do album

              >
                <li data-testid={ `link-to-album-${collectionId}` }>
                  <p>{ artistName }</p>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <p>{collectionName}</p>
                </li>
              </Link>
            </section>
          ))
          : <h2>Nenhum álbum foi encontrado</h2>}
      </div>
    );
  }
}
export default Search;
