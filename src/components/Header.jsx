import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI'; // por não ser a unica dentro de usersApi se usa chaves para especificar
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userObj: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const response = await getUser();

    this.handleObj(response);
  }

  handleObj = (response) => {
    if (response) {
      return this.setState({
        userObj: response,
        loading: false });
    }
  }

  render() {
    const { loading, userObj } = this.state;
    return (
      <section>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>

        <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>

        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>

        { loading ? <Loading /> : null}
        <header data-testid="header-component">
          <h2 data-testid="header-user-name">
            { userObj.name }
          </h2>
        </header>
      </section>
    );
  }
}

export default Header;
