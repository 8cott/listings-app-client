import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Show from './components/Show';
import Create from './components/Create'
import Edit from './components/Edit';
import NavBar from './components/NavBar'

import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/listings/:id" element={<Show />} />
      <Route path="/listings/create" element={<Create />} />
      <Route path="/listings/:id/edit" element={<Edit />} />
    </Routes>
  </Router>
  );
}

export default App;
