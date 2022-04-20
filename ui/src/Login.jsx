import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import graphQLFetch from './graphql/graphQLFetch.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { loginSuccess: false };
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { setUser } = this.props;
    const { loginForm } = document.forms;
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    const loginQuery = `mutation petLogin($login: PetLoginInputs!){
      petLogin(login: $login){
        data { _id pet_id pet_name pet_breed pet_mail pet_password pet_postcode latitude longitude }
        status { valid message}
      }
    }`;
    const res = await graphQLFetch(
      loginQuery,
      { login: { pet_mail: email, pet_password: password } },
    );
    if (res) {
      setUser(res.petLogin.data);
      this.setState({ loginSuccess: true });
      alert('[Success]Login Success.');
    } else {
      alert('[Failed]Wrong Email Address or Password!');
    }
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
