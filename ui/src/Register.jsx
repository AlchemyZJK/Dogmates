import React from 'react';
import { Link, Navigate } from 'react-router-dom';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { registerSuccess: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { getUser } = this.props;
    const { registerForm } = document.forms;
    console.log(registerForm.email.value);
    console.log(registerForm.name.value);
    console.log(registerForm.kind.value);
    console.log(registerForm.password.value);
    getUser({ id: 1, name: 'Mono' });
    alert('[Success]Register Success');
    this.setState({ registerSuccess: true });
  }

  render() {
    const { registerSuccess } = this.state;
    if (registerSuccess) {
      return <Navigate to="/" />;
    }
    return (
      <div className="login-register-page">
        <form className="login-register-form" id="registerForm" onSubmit={this.handleSubmit}>
          <input id="email" type="email" placeholder="email" required />
          <input id="name" type="text" placeholder="username" required />
          <select name="kind" id="kind" required placeholder="Kind">
            <option value="Husky">Husky</option>
            <option value="Border-Collie">Border Collie</option>
            <option value="Golden Retrievers">Golden Retrievers</option>
          </select>
          <input id="password" type="password" placeholder="password" required />
          <button type="submit">Register</button>
          <div className="link">
            <Link to="/login">Go to SignIn</Link>
          </div>
        </form>
      </div>
    );
  }
}
