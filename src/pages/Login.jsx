import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Login.css';
import keuwe from '../styles/keuwe.png';
// coloquei em chaves para exportar somente CreateUser, Redirect
const TRES = 3;
// setando os estados iniciais
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      renderLoading: false,
      loggedin: false,
    };
  }

  // função de desabilitar botão caso tenha menos de 3 caracteres
  disabledButton = () => {
    const { inputName } = this.state;
    if (inputName.length < TRES) {
      return false;
    } return true;
  }

  // função que  armazena o valor que for digitado no input, para dentro do respectivo id
  handleInput = (event) => {
    const { target: { value, id } } = event;
    this.setState({ [id]: value });
    this.disabledButton();
  }

  // usei Try catch pois por ser uma função assincrona pode ocorrer erros, caso ocorra retornará (err)
  handleSubmitUser = async (event) => {
    event.preventDefault(); // para a pagina não atualizar e consequentemente perder os dados
    try {
      const { inputName } = this.state; // desenstruturando inputName de this e dentro de this pegando o state
      this.setState({
        renderLoading: true,
      });
      const response = await createUser({ name: inputName });// response guarda a função crateUser(func que cria o usuario) com o inputName que desconstrui na linha 37

      // condição que muda o estado (setState) caso alguma condição seja atendida
      if (response) {
        return this.setState({
          loggedin: true,
          renderLoading: false });
      } this.setState({ renderLoading: true }); // se response for verdadeiro os etsados serão alterados, senão o estado renderLoading sera true
    } catch (err) {
      return err;
    }
  }

  render() {
    const { loggedin, name, renderLoading } = this.state; // desconrtuindo loggedin, name, renderLoading que estao dentro do state e state dentro do this
    return (
      <section className="login">
        <img src={ keuwe } alt="foto" className="picture" />
        <div
          data-testid="page-login"
          className="login-2"
        >
          {/* se loggedin for verdadeiro o redirect irá redirecionar o user para uma outra página(compenent) chamado Search */}
          <form className="form">
            <div className="welcome">

              <h1 className="welcome">Seja bem vindo!</h1>
            </div>

            <label htmlFor="inputName">
              <input
                className="msmclass"
                id="inputName"
                placeholder="Digite seu nome"
                type="text"
                autoComplete="off"
                data-testid="login-name-input"
                value={ name }
                onChange={ this.handleInput }
              />
            </label>
            <button
              className="msmclass button"
              type="submit"
              id="button"
              data-testid="login-submit-button"
              disabled={
                !this.disabledButton()
              }
              onClick={ this.handleSubmitUser }
            >
              Entrar

            </button>

          </form>
          {renderLoading ? <Loading /> : null}
          {loggedin ? <Redirect to="/search" /> : null }
        </div>
      </section>
    );
  }
}
export default Login;
