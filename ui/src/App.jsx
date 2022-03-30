import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './Home.jsx';
import Neighborhood from './Neighborhood.jsx';
import PostingSpace from './PostingSpace.jsx';
import DogalSpace from './DogalSpace.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined };
    this.getUser = this.getUser.bind(this);
  }

  getUser(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/neighborhood" element={<Neighborhood />} />
          <Route path="/posting-space" element={<PostingSpace />} />
          <Route path="/dogal-space" element={<DogalSpace />} />
          <Route path="/login" element={<Login getUser={this.getUser} />} />
          <Route path="/register" element={<Register getUser={this.getUser} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

const element = <App />;

ReactDOM.render(element, document.getElementById('contents'));
