import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

export default function Neighborhood() {
  return (
    <div className="neighborhood-container">
      <MapWrapper />
    </div>
  );
}

function MapWrapper() {
  const apiKey = 'AIzaSyBd2oCXrZufX271XlIvsHbUVIRYeUtB59k';
  return (
    <Wrapper apiKey={apiKey}>
      <div id="my-google-map" style={{ width: '640px', height: '640px' }} />
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
