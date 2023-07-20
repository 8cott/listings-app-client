export const loadGoogleMapsAPI = () => {
    return new Promise((resolve, reject) => {
      // Don't append the script if it's already present
      if (document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js?key="]')) {
        resolve();
        return;
      }
  
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
  
      script.addEventListener('load', () => {
        // Check every 100ms if the `google` object is defined
        const interval = setInterval(() => {
          if (window.google) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
  
      script.addEventListener('error', e => reject(e.error));
      document.head.appendChild(script);
    });
  };
  