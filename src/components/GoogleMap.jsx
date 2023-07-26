import React, { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

function GoogleMap({ address, city, state, zipCode }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_APP_GMAPS_API_KEY,
      version: "weekly",
    });

    let map;
    let geocoder;

    loader.load().then(() => {
      map = new google.maps.Map(mapRef.current, {
        zoom: 15,
        center: { lat: 0, lng: 0 },
      });
      geocoder = new google.maps.Geocoder();
      
      geocoder.geocode(
        { address: `${address}, ${city}, ${state}, ${zipCode}` },
        (results, status) => {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
              map,
              position: results[0].geometry.location,
            });
          } else {
            alert(
              'Geocode was not successful for the following reason: ' + status
            );
          }
        }
      );
    });
  }, [address, city, state, zipCode]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>;
}

export default GoogleMap;
