import React from 'react';
import ReactDOM from 'react-dom';

import graphQLFetch from './graphQLFetch';

class Test extends React.Component {
  constructor() {
    super();
    this.state = { text: '' };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      test
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ text: data.test });
    }
  }

  render() {
    const { text } = this.state;
    return <h1>{text}</h1>;
  }
}

const element = <Test />;

ReactDOM.render(element, document.getElementById('contents'));
