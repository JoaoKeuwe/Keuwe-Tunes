import React from 'react';
import Header from '../components/Header';

const DOIS = 2;
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: false,
      inputMusic: '',
    };
  }

  handleMusic = (event) => {
    const { target: { value, id } } = event;
    this.setState({ [id]: value });
    this.handlevalidate();
  }

  handlevalidate = () => {
    const { inputMusic } = this.state;
    if (inputMusic.length >= DOIS) {
      return this.setState({ buttonDisabled: true });
    } return this.setState({ buttonDisabled: false });
  }

  render() {
    const { buttonDisabled, inputMusic } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <label htmlFor="inputMusic">
            <input
              type="text"
              value={ inputMusic }
              data-testid="search-artist-input"
              placeholder="digite o pancadão"
              id="inputMusic"
              onChange={ this.handleMusic }
            />
          </label>

          <button
            id="buttonDisabled"
            type="submit"
            data-testid="search-artist-button"
            disabled={ !buttonDisabled }
          >
            Pesquisar
            {' '}

          </button>
        </form>
      </div>
    );
  }
}
export default Search;
