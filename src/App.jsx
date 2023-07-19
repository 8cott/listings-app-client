import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Show from './components/Show';
import Create from './components/Create'
import Edit from './components/Edit';
import NavBar from './components/NavBar'
import Signup from '../../client/src/components/Signup';
import Login from '../../client/src/components/Login';
import { AuthProvider } from './components/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/listings/:id' element={<Show />} />
        <Route path='/listings/create' element={<Create />} />
        <Route path='/listings/:id/edit' element={<Edit />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
    </AuthProvider>
  );
}

export default App;
