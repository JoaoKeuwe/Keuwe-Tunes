import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import '../styles/Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      arrayOfMusics: [],
      collectionAlbum: '',
    };
  }

  componentDidMount() {
    // usei componentDidMount para ser executado após o render().
    this.handleMusics();
  }

  handleMusics = async () => {
    const { match: { params: { id } } } = this.props;
    // desenstruturando id dentro de params, e params dentro de match, e match dentro de props.
    const responseMusic = await getMusics(id); // requisição de 'getMusics' usando id do album para buscar as musicas desse album
    const filterMusics = responseMusic.filter((music) => music.trackName);// filtrando resultados dentro de 'responseMusic' e pegando tudo que contenha 'trackName'
    this.setState({
      arrayOfMusics: filterMusics, // arrayOfMusic irá receber todas as músicas que tem em trackName
      nameArtist: filterMusics[0].artistName, // ets asendo alterado o estado de nameAtist para receber a primeira posição do array de filterMusics dentro de artistName
      collectionAlbum: filterMusics[0].collectionName, // collectionAlbum esta recebendo a primira propriedade do array filterMusics
    });
  };

  render() {
    const { arrayOfMusics, nameArtist, collectionAlbum } = this.state;
    return (

      <div
        data-testid="page-album"
        className="name-album"
      >
        <div className="header-album">
          <Header />
        </div>
        <h3 data-testid="artist-name" className="artist-name">{` ${nameArtist}`}</h3>
        {/* exibido nome do artista/album */}
        <h3 data-testid="album-name">{` ${collectionAlbum}`}</h3>
        {/* //filtrando para que  filter pegue somente os objetos que contém 'previewUrl' dentro do array 'arrayOfMusic */}
        {Array.from(arrayOfMusics).map((music) => (
          <section key={ music.trackName }>
            <MusicCard
              music={ music }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          </section>
        ))}
      </div> // usei o array.From para transformar o arrayOfMusic em um array. OBS: foi necessarios transformar arrayofmusic em um array por mais que seu valor seja o retorno de um filter pois estava retornando varios objetos.
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired; // validando as props, objeto e string
export default Album;
