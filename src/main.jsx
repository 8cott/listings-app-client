import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL); // Log the VITE_API_BASE_URL

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
