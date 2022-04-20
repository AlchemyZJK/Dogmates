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
import graphQLFetch from './graphql/graphQLFetch.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined, allPostings: [], userPostings: [] };
    this.setUser = this.setUser.bind(this);
    this.loadAllPostings = this.loadAllPostings.bind(this);
    this.loadMyPostings = this.loadMyPostings.bind(this);
    this.addPosting = this.addPosting.bind(this);
  }

  componentDidMount() {
    this.loadAllPostings();
  }

  setUser(user) {
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
      this.setState({ allPostings: allPostings.postingInf });
    }
  }

  async loadMyPostings() {
    const { user } = this.state;
  }

  async addPosting(title, kind, content) {
    const { user } = this.state;
    const addPostingQuery = `mutation addPosting($posting: PostingAddInputs!){
      addPosting(posting: $posting)
    }`;
    const newPosting = {
      title,
      kind,
      content,
      poster_id: user.pet_id,
    };
    const res = await graphQLFetch(
      addPostingQuery,
      { posting: newPosting },
    );
    if (res) {
      if (res.addPosting) {
        alert('[Success]Publish a new Posting.');
      }
      await this.loadAllPostings();
    }
  }

  async loadMyContactList() {
    const { user } = this.state;
    const getContactListQuery = `mutation getContactList($usera: Int!){
      getContactList(usera: $usera) {
        _id contact_id user_a user_b: Int!
      }
    }`;
  }

  render() {
    const { user, allPostings, userPostings } = this.state;
    return (
      <BrowserRouter>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/neighborhood" element={<Neighborhood user={user} />} />
          <Route path="/posting-space" element={<PostingSpace user={user} postings={allPostings} />} />
          <Route path="/dogal-space" element={<DogalSpace user={user} />} />
          <Route path="/my-posting" element={<MyPosting user={user} postings={userPostings} />} />
          <Route path="/new-posting" element={<NewPosting addPosting={this.addPosting} />} />
          <Route path="/chatting" element={<Chatting user={user} />} />
          <Route path="/login" element={<Login setUser={this.setUser} />} />
          <Route path="/register" element={<Register setUser={this.setUser} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

const element = <App />;

ReactDOM.render(element, document.getElementById('contents'));
