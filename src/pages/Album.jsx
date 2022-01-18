import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

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
    const {
      match: {
        params: { id },
      },
    } = this.props; // desenstruturando id dentro de params, e params dentro de match, e match dentro de props.
    const responseMusic = await getMusics(id); // fazendo a requisição de 'getMusics' com o id
    const filterMusics = responseMusic.filter(({ trackName }) => trackName);
    this.setState({
      arrayOfMusics: filterMusics,
      nameArtist: filterMusics[0].artistName,
      collectionAlbum: filterMusics[0].collectionName,
    });
    console.log(filterMusics);
  };

  render() {
    const { arrayOfMusics, nameArtist, collectionAlbum } = this.state;
    console.log(arrayOfMusics);
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{`Artist Name ${nameArtist}`}</h3>
        {''}
        {/* exibido nome do artista/album */}
        <h3 data-testid="album-name">{`Collection Name ${collectionAlbum}`}</h3>
        {/* //filtrando para que  filter pegue somente os objetos que contém 'previewUrl' dentro do array 'arrayOfMusic */}
        {Array.from(arrayOfMusics).map((music) => (
          <section key={ music.trackName }>
            <MusicCard
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          </section>
        ))}
      </div>
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
