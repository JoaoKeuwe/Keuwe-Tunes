import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      /* nameArtist: '', */
      arrayOfMusics: '',
    };
  }

  componentDidMount() { // usei componentDidMount para ser executado após o render().
    this.handleMusics();
  }

  handleMusics= async () => {
    const { match: { params: { id } } } = this.props; // desenstruturando id dentro de params, e params dentro de match, e match dentro de props.
    const responseMusic = await getMusics(id);// fazendo a requisição de 'getMusics' com o id
    this.setState({ arrayOfMusics: responseMusic });
  }

  render() {
    const { arrayOfMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{arrayOfMusics[0].artistName}</p>
        {' '}
        {/* exibido nome do artista/album */}
        <p data-testid="album-name">{arrayOfMusics[0].collectionName}</p>
        {/*   <MusicCard /> */}

        {/* //filtrando para que  filter pegue somente os objetos que contém 'previewUrl' dentro do array 'arrayOfMusic */}
        {arrayOfMusics.filter(({ previewUrl }) => (previewUrl))
          .map(({ trackName, previewUrl }) => (
            <section key={ trackName }>
              <MusicCard trackName={ trackName } previewUrl={ previewUrl } />

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
