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
    this.state = {
      user: undefined, allPostings: [], userPostings: [], contactList: [],
    };
    this.setUser = this.setUser.bind(this);
    this.loadAllPostings = this.loadAllPostings.bind(this);
    this.loadMyPostings = this.loadMyPostings.bind(this);
    this.addPosting = this.addPosting.bind(this);
    this.deletePosting = this.deletePosting.bind(this);
    this.loadMyContactList = this.loadMyContactList.bind(this);
    this.addToMyContactList = this.addToMyContactList.bind(this);
  }

  componentDidMount() {
    this.loadAllPostings();
  }

  setUser(user) {
    this.setState({ user }, async () => {
      await this.loadMyPostings();
      await this.loadMyContactList();
    });
  }

  async loadAllPostings() {
    const allPostingsQuery = `query {
      postingInf {
        _id posting_id title kind content poster_id created_at user_name
      }
    }`;
    const allPostings = await graphQLFetch(allPostingsQuery);
    if (allPostings) {
      if (allPostings.postingInf) {
        this.setState({ allPostings: allPostings.postingInf });
      } else {
        console.error('[Failed]Failed to Load all postings.');
      }
    }
  }

  async loadMyPostings() {
    const { user } = this.state;
    const getMyPostingQuery = `mutation getMyPosting($user_id: Int!){
      getMyPosting(user_id: $user_id) {
        _id posting_id title kind content poster_id created_at user_name
      }
    }`;
    const allMyPosting = await graphQLFetch(getMyPostingQuery, { user_id: user.pet_id });
    if (allMyPosting) {
      if (allMyPosting.getMyPosting) {
        this.setState({ userPostings: allMyPosting.getMyPosting });
      } else {
        console.error('[Failed]Failed to Load current user\'s postings.');
      }
    }
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
        await this.loadAllPostings();
        await this.loadMyPostings();
      } else {
        alert('[Failed]Failed to Publish new Posting.');
      }
    }
  }

  async deletePosting(postingId) {
    const deletePostingQuery = `mutation deletePosting($posting_id: Int!){
      deletePosting(posting_id: $posting_id)
    }`;
    const res = await graphQLFetch(deletePostingQuery, { posting_id: postingId });
    if (res) {
      if (res.deletePosting) {
        alert('[Success]Delete a Posting.');
        await this.loadAllPostings();
        await this.loadMyPostings();
      } else {
        alert('[Failed]Failed to Delete Posting.');
      }
    }
  }

  async loadMyContactList() {
    const { user } = this.state;
    const getContactListQuery = `mutation getContactList($usera: Int!){
      getContactList(usera: $usera) {
        contact_id pet_id pet_name pet_breed
      }
    }`;
    const contactList = await graphQLFetch(getContactListQuery, { usera: user.pet_id });
    if (contactList) {
      if (contactList.getContactList) {
        this.setState({ contactList: contactList.getContactList });
      } else {
        console.error('[Failed]Failed to Load my Contact List.');
      }
    }
  }

  async addToMyContactList(id) {
    const { user } = this.state;
    if (user === undefined) {
      alert('Please LOGIN or REGISTER to add other dogs to your contact list.');
      return;
    }
    const addContactListQuery = `mutation addContactList($usera: Int!, $userb: Int!){
      addContactList(usera: $usera, userb: $userb) {
        valid message
      }
    }`;
    const res = await graphQLFetch(addContactListQuery, { usera: user.pet_id, userb: id });
    if (res) {
      if (res.addContactList) {
        if (res.addContactList.valid) {
          alert('[Success]Success Add to Contact List.');
          await this.loadMyContactList();
        } else {
          alert('You are already Friends. Go to your Chatting box and say Hi to him/her.');
        }
      } else {
        alert('[Error]Error when Adding him/her to Contact List.');
      }
    }
  }

  render() {
    const {
      user, allPostings, userPostings, contactList,
    } = this.state;
    return (
      <BrowserRouter>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/neighborhood" element={<Neighborhood user={user} addToContactList={this.addToMyContactList} />} />
          <Route path="/posting-space" element={<PostingSpace user={user} postings={allPostings} addToContactList={this.addToMyContactList} />} />
          <Route path="/dogal-space" element={<DogalSpace user={user} />} />
          <Route path="/my-posting" element={<MyPosting postings={userPostings} deletePosting={this.deletePosting} />} />
          <Route path="/new-posting" element={<NewPosting addPosting={this.addPosting} />} />
          <Route path="/chatting" element={<Chatting user={user} contactList={contactList} />} />
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
