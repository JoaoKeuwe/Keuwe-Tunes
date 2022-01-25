import React from 'react';
import { AiOutlineReload } from 'react-icons/ai';

class Loading extends React.Component {
  render() {
    return (
      <p className="loading">
        <AiOutlineReload />

      </p>
    );
  }
}

export default Loading;
