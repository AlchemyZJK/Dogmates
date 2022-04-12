import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './Home.jsx';
import Neighborhood from './Neighborhood.jsx';
import PostingSpace from './PostingSpace.jsx';
import DogalSpace from './DogalSpace.jsx';
import MyPosting from './MyPosting.jsx';
import NewPosting from './NewPosting.jsx';
import Chatting from './Chatting.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import graphQLFetch from './graphql/graphQLFetch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined };
    this.getUser = this.getUser.bind(this);
    this.loadAllPostings = this.loadAllPostings.bind(this);
  }

  componentDidMount() {
    this.loadAllPostings();
  }

  getUser(user) {
    this.setState({ user });
  }

  async loadAllPostings() {
    const allPostingsQuery = `query {
      postingInf {
        _id posting_id title kind content poster_id created_at
      }
    }`;

    const allPostings = await graphQLFetch(allPostingsQuery);
    if (allPostings) {
      console.log(allPostings);
    }
  }

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/neighborhood" element={<Neighborhood user={user} />} />
          <Route path="/posting-space" element={<PostingSpace user={user} />} />
          <Route path="/dogal-space" element={<DogalSpace user={user} />} />
          <Route path="/my-posting" element={<MyPosting user={user} />} />
          <Route path="/new-posting" element={<NewPosting user={user} />} />
          <Route path="/chatting" element={<Chatting user={user} />} />
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
