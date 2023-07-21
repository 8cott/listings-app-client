export const loadGoogleMapsAPI = () => {
    return new Promise((resolve, reject) => {
      // Don't append the script if it's already present
      if (document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js?key="]')) {
        resolve();
        return;
      }
      
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
  