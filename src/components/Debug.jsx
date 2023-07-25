import React, { useEffect, useState } from 'react';

const Debug = () => {
  const [clientUrl, setClientUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://sr-listings-app-server.vercel.app/debug')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(setClientUrl)
      .catch(setError);
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return <p>{clientUrl}</p>;
};

export default Debug;
