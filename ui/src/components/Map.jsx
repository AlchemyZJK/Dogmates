import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const MyMap = ({ onClick, onIdle, children, style, ...options }) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        mapId: '305dba96e036e479',
        minZoom: 10,
        maxZoom: 18,
        restriction: {
          latLngBounds: {
            north: 1.6,
            south: 1.1,
            east: 105,
            west: 100,
          },
        },
      }));
    }
  }, [ref, map]);

  React.useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) => window.google.maps.event.clearListeners(map, eventName));

      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker = (options) => {
  const [marker, setMarker] = React.useState();
  // const contentRef = React.useRef(null);

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    const { label, position, map } = options;
    if (marker) {
      const infoWindow = new window.google.maps.InfoWindow({
        content: label,
      });
      marker.setOptions({ position, map });

      marker.addListener('click', () => {
        infoWindow.open({
          anchor: marker,
          shouldFocus: false,
        });
      });
    }
  }, [marker, options]);

  return null;
};

export default function Map(props) {
  const { dogs } = props;
  return (
    <div id="my-google-map" style={{ height: '552px', width: '640px' }}>
      <Wrapper apiKey="AIzaSyBd2oCXrZufX271XlIvsHbUVIRYeUtB59k">
        <MyMap
          center={{ lat: 1.295039, lng: 103.773667 }}
          zoom={16}
          style={{ height: '100%' }}
        >
          {dogs.map((dog) => {
            console.log(dog);
            const location = {
              lat: parseFloat(dog.latitude),
              lng: parseFloat(dog.longitude),
            };
            return <Marker key={dog.pet_id} position={location} label={dog.pet_name} />;
          })}
        </MyMap>
      </Wrapper>
    </div>
  );
}
