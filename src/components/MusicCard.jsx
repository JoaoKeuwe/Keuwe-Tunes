import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteResponse: '',
      isFavorite: '',
    };
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  musicFavorite = async (event) => {
    const { checked } = event.target;
    const { music } = this.props;
    this.setState({
      loading: true,
      isFavorite: checked,
    });
    const responseFavoriteMsc = await addSong(music);
    if (responseFavoriteMsc) {
      return this.setState({
        loading: false,
      });
    }
  }

  favoriteSongs = async () => {
    const { trackId } = this.props;
    const responseFavorite = await getFavoriteSongs();
    this.setState({ favoriteResponse: responseFavorite });
    const { favoriteResponse } = this.state;
    const searchFavoriteMsc = favoriteResponse.some((songs) => songs.trackId === trackId);
    if (searchFavoriteMsc) {
      return this.setState({ isFavorite: searchFavoriteMsc });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isFavorite } = this.state;
    return (
      <section className="section-musics">

        <div className="name-music">
          <h2>{trackName}</h2>
        </div>
        <div className="audio">
          <audio
            className="audio"
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
          </audio>

        </div>

        <div>
          <form>
            <label htmlFor="button">
              Favorita

              <input
                className="checkbox"
                type="checkbox"
                checked={ isFavorite }
                onChange={ this.musicFavorite }
                id="button"
                data-testid={ `checkbox-music-${trackId}` }
              />

            </label>

          </form>
        </div>
        {loading ? <Loading /> : null}
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
export default MusicCard;
