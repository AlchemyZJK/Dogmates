import React from 'react';

import Map from './components/Map.jsx';
import graphQLFetch from './graphql/graphQLFetch.js';

export default class Neighborhood extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dogs: [], keyword: '', results: [] };
    this.loadAllUsers = this.loadAllUsers.bind(this);
    this.getSearchResult = this.getSearchResult.bind(this);
  }

  componentDidMount() {
    this.loadAllUsers();
  }

  getSearchResult(keyword) {
    const { dogs } = this.state;
    const results = dogs.filter(
      (dog) => dog.pet_name.toLowerCase().indexOf(keyword) !== -1,
    );
    this.setState({ keyword, results });
  }

  async loadAllUsers() {
    const query = `query {
      petInf {
        _id pet_id pet_name pet_breed pet_mail pet_postcode latitude longitude
      }
    }`;

    const res = await graphQLFetch(query);
    // console.log(res);
    if (res) {
      this.setState({ dogs: res.petInf, results: res.petInf });
    }
  }

  render() {
    const { dogs, keyword, results } = this.state;
    const items = keyword === '' ? dogs : results;
    return (
      <div className="neighborhood-container">
        <SearchContainer dogs={items} setKeyword={this.getSearchResult} />
        <Map dogs={items} />
      </div>
    );
  }
}

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.searchForm;
    const keyword = form.keyword.value.toLowerCase();
    const { setKeyword } = this.props;
    setKeyword(keyword);
  }

  render() {
    const { dogs } = this.props;
    return (
      <div className="search-container">
        <form className="search-form" name="searchForm" onSubmit={this.handleSubmit}>
          <input className="keyword" type="text" name="keyword" />
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 30 30"
              style={{ fill: '#000000' }}
            >
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
            </svg>
          </span>
        </form>
        <div className="search-list">
          {dogs.map(
            (dog) => {
              const imgUrl = `./imgs/dog_imgs/${dog.pet_breed.toLowerCase().split(' ').join('-')}.png`;
              return (
                <SearchItem
                  key={dog.pet_id}
                  id={dog.pet_id}
                  imgUrl={imgUrl}
                  name={dog.pet_name}
                  breed={dog.pet_breed}
                />
              );
            },
          )}
        </div>
      </div>
    );
  }
}

function SearchItem(props) {
  const {
    id, imgUrl, name, breed,
  } = props;
  return (
    <div className="search-item-container">
      <img src={imgUrl} width="64" height="64" alt="dog_img" />
      <div className="search-item-info">
        <div className="name">{`Name: ${name}`}</div>
        <div className="kind">{`Kind: ${breed}`}</div>
      </div>
      <button type="button" className="add">Add</button>
    </div>
  );
}
