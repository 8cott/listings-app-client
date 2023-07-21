import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Show from './components/Show';
import Create from './components/Create';
import Edit from './components/Edit';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthProvider } from './components/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listings/create" element={<Create />} />
          <Route path="/listings/:id/edit" element={<Edit />} />
          <Route path="/listings/:id" element={<Show />} />
          <Route path="/" element={<Index />} />
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
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
