import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './Home.jsx';
import Neighborhood from './Neighborhood.jsx';
import PostingSpace from './PostingSpace.jsx';
import DogalSpace from './DogalSpace.jsx';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/neighborhood" element={<Neighborhood />} />
          <Route path="/posting-space" element={<PostingSpace />} />
          <Route path="/dogal-space" element={<DogalSpace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

const element = <App />;

ReactDOM.render(element, document.getElementById('contents'));
