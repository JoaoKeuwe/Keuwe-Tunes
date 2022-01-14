import React from 'react';

const TRES = 3;
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
    };
  }

  disabledButton = () => {
    const { inputName } = this.state;
    if (inputName.length < TRES) {
      return false;
    } return true;
  }

  handleInput = (event) => {
    const { target: { value, id } } = event;
    this.setState({ [id]: value });
    this.disabledButton();
  }

  render() {
    const { name } = this.state;
    return (
      <div data-testid="page-login">
        <form data-testid="login-name-input">
          <label htmlFor="inputName">
            <input
              id="inputName"
              type="text"
              data-testid="login-name-input"
              value={ name }
              onChange={ this.handleInput }
            />
          </label>
          <button
            type="submit"
            id="button"
            disabled={
              !this.disabledButton()
            }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}
export default Login;
