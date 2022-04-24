import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import graphQLFetch from './graphql/graphQLFetch.js';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { registerSuccess: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.options = [
      { id: 0, value: 'breed' },
      { id: 1, value: 'Husky' },
      { id: 2, value: 'Border Collie' },
      { id: 3, value: 'Golden Retrievers' },
    ];
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { setUser } = this.props;
    const { registerForm } = document.forms;
    const email = registerForm.email.value;
    const name = registerForm.name.value;
    const breed = this.options[parseInt(registerForm.breed.value)].value;
    const password = registerForm.password.value;
    const postcode = registerForm.postcode.value;

    const newUser = {
      pet_name: name,
      pet_breed: breed,
      pet_mail: email,
      pet_password: password,
      pet_postcode: postcode,
    };

    const registerQuery = `mutation petRegister($register: PetRegisterInputs!) {
      petRegister(register: $register) {
        data { _id pet_id pet_name pet_breed pet_mail pet_password pet_postcode latitude longitude }
        status { valid message}
      }
    }`;

    const res = await graphQLFetch(registerQuery, { register: newUser });

    if (res) {
      if (res.petRegister.data) {
        setUser(res.petRegister.data);
        this.setState({ registerSuccess: true });
        alert('[Success]Register a new Account Successful.');
      } else {
        alert('[Failed]Failed to Register a new Account.');
      }
    } else {
      alert('[Error]Error when Registering a new Account.');
    }
  }

  render() {
    const { registerSuccess } = this.state;
    if (registerSuccess) {
      return <Navigate to="/" />;
    }
    const defaultOptions = 0;
    return (
      <div className="login-register-page">
        <form className="login-register-form" id="registerForm" onSubmit={this.handleSubmit}>
          <input id="email" type="email" placeholder="email" required />
          <input id="name" type="text" placeholder="username" required />
          <select name="breed" id="breed" defaultValue={defaultOptions} required>
            {this.options.map((option) => (
              <option
                key={option.id}
                value={option.id}
                disabled={option.id === 0}
                hidden={option.id === 0}
              >
                {option.value}
              </option>
            ))}
          </select>
          <input id="password" type="password" placeholder="password" required />
          <input id="postcode" type="text" placeholder="postcode" required />
          <button type="submit">Register</button>
          <div className="link">
            <Link to="/login">Go to SignIn</Link>
          </div>
        </form>
      </div>
    );
  }
}
