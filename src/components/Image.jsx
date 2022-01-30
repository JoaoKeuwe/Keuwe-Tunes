import React from 'react';
import keuwe from '../styles/keuwe.png';

class Image extends React.Component {
  render() {
    return (
      <img src={ keuwe } alt="foto" className="picture-header" />
    );
  }
}

export default Image;
