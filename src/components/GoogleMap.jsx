import React, { useEffect, useRef } from 'react';

function GoogleMap({ address, city, state, zipCode }) {
  const mapRef = useRef(null);

  // Load Google Maps API script
  useEffect(() => {
    if (!mapRef.current) return;
    const map = new google.maps.Map(mapRef.current, {
      zoom: 15,
      center: { lat: 0, lng: 0 },
    });
    const geocoder = new google.maps.Geocoder();

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
  }, [address, city, state, zipCode]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>;
}

export default GoogleMap;
