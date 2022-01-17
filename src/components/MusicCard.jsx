import React from 'react';

class MusicCard extends React.Component{
render() {
  const {trackName,previewUrl }= this.props
  return(
    <section>
      <h2>{trackName}</h2>
      

  <audio
      data-testid="audio-component"
      src={ previewUrl } controls>
      <track kind="captions" />
  </audio>

    </section>
)}
}

export default MusicCard;