import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import '../styles/Search.css';
import Image from '../components/Image';
import { FaRegSadTear } from 'react-icons/fa';
import { HiMusicNote } from 'react-icons/hi';

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
      <section data-testid="page-search">
        <Header />
        {/* renderizando o header */}
        <div className="content">
          <form action="">
            <label htmlFor="artist">
              <input
                type="text"
                value={ artist } // passando a chave 'artist' que está dentro do state
                data-testid="search-artist-input"
                placeholder="Digite o nome de um artista ou álbum"
                id="artist"
                className="input"
                onChange={ this.handleMusic } // chamando a função 'handleMusic' através do evento 'onChange'
              />
            </label>

            <button
              id="buttonDisabled"
              type="submit"
              data-testid="search-artist-button"
              className="main-button"
              disabled={ !this.buttonDisabled() } // o '!' está alterando o valor incial da função 'buttonDisabled' para falso
              onClick={ this.searchButton }
            >
              Pesquisar
            </button>
          </form>
          <h2 className="text-content-2">
            {sttsButton
              ? `Resultado de álbuns de: ${nameArtist}`// condição caso 'sttsButton' for verdadeiro retorna o resultado, senão, não retorna nada
              : null}
          </h2>
          <section className="all-albums-content">
            {listAlbums.length > 0
              ? listAlbums.map(({
                collectionId,
                artistName,
                artworkUrl100,
                collectionName, // fiz uma desconstrução direta dos objetos que estão dentro de ListAlbum
              }) => (
                <section
                  key={ collectionId }
                  className="album-content"
                >
                  {' '}
                  {/*  o lint que coloca {''} */}
                  {/* quando se usa map é necessario ter uma key para identificar o elemento */}
                  <Link
                    className="name-album"
                    to={ `/album/${collectionId}` }// aparece na barra de navegação/album/numero do album

                  >
                    <li
                      data-testid={ `link-to-album-${collectionId}` }
                      className="name-album"
                    >
                      <div className="album">
                        <img
                          src={ artworkUrl100 }
                          alt={ artistName }
                          className="img"
                        />
                        <h6 className="name-album">{collectionName}</h6>
                        <br />
                        <p className="name-album">{ artistName }</p>
                      </div>
                    </li>
                  </Link>
                </section>

              ))
              : <h2 className="text-content">
                Nenhum álbum foi encontrado
                <br />
                <div className="icon">
                  <FaRegSadTear />
                </div>
                {' '}
              </h2>}

          </section>
        </div>
      </section>
    );
  }
}
export default Search;
