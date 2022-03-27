import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

export default function Neighborhood() {
  return (
    <div className="neighborhood-container">
      <SearchContainer />
      <MapContainer />
    </div>
  );
}

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      dogs: [
        { id: 1, name: 'Momo', kind: 'Husky', imgUrl: './imgs/dog_imgs/husky.png' },
        { id: 2, name: 'Lucky', kind: 'Border Collie', imgUrl: './imgs/dog_imgs/border-collie.png' },
      ],
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.searchForm;
    const keyword = form.keyword.value;
    console.log(keyword);
    form.keyword.value = '';
  }

  render() {
    const { dogs } = this.state;
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
            (dog) => <SearchItem key={dog.id} imgUrl={dog.imgUrl} name={dog.name} kind={dog.kind} />
          )}
        </div>
      </div>
    );
  }
}

function SearchItem(props) {
  const { imgUrl, name, kind } = props;
  return (
    <div className="search-item-container">
      <img src={imgUrl} width="64" height="64" alt="dog_img" />
      <div className="search-item-info">
        <div className="name">{`Name: ${name}`}</div>
        <div className="kind">{`Kind: ${kind}`}</div>
      </div>
      <button type="button" className="add">Add</button>
    </div>
  );
}

function MapContainer() {
  const apiKey = 'AIzaSyBd2oCXrZufX271XlIvsHbUVIRYeUtB59k';
  return (
    <Wrapper apiKey={apiKey}>
      <div id="my-google-map" style={{ width: '640px', height: '560px' }} />
      <MyGoogleMap />
    </Wrapper>
  );
}

function MyGoogleMap() {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(document.getElementById('my-google-map'), {
        center: { lat: 1.29493, lng: 103.77369 },
        zoom: 15,
        mapId: '305dba96e036e479',
      }));
    }
  }, [ref, map]);

  return <div ref={ref} />;
}
