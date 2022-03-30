import React from 'react';
import { Link, Navigate } from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { loginSuccess: false };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { getUser } = this.props;
    const { loginForm } = document.forms;
    console.log(loginForm.email.value);
    console.log(loginForm.password.value);
    getUser({ id: 1, name: 'Mono' });
    alert('[Success]Login Successful.');
    this.setState({ loginSuccess: true });
  }

  render() {
    const { loginSuccess } = this.state;
    if (loginSuccess) {
      return <Navigate to="/" />;
    }
    return (
      <div className="login-register-page">
        <form className="login-register-form" id="loginForm" onSubmit={this.handleSubmit}>
          <input id="email" type="email" placeholder="email" required />
          <input id="password" type="password" placeholder="password" required />
          <button type="submit">login</button>
          <div className="link">
            <Link to="/register">Create an account</Link>
          </div>
        </form>
      </div>
    );
  }
}
