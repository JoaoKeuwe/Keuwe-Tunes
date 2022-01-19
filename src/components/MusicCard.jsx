import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  musicFavorite = async () => {
    const { music } = this.props;
    this.setState({
      loading: true });
    const responseFavoriteMsc = await addSong(music);
    if (responseFavoriteMsc) {
      return this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
    return (
      <section>
        <h2>{trackName}</h2>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
        </audio>
        <form>
          <label htmlFor="button">
            Favorita
            <input
              type="checkbox"
              onChange={ this.musicFavorite }
              id="button"
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </form>
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
