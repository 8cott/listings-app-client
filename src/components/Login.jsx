import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/AuthContext';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => toast.error(err, {});

  const handleSuccess = (msg) => toast.success('Logged in successfully');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message, token } = data;
      if (success) {
        localStorage.setItem('jwt', token);
        setIsLoggedIn(true);
        handleSuccess(message);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: '',
      password: '',
    });
  };

  return (
    <Box
      sx={{
        paddingLeft: '1rem',
        paddingRight: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        marginTop: '-28em',
      }}
    >
      <Paper elevation={3} sx={{ width: '75%', maxWidth: '400px', padding: '1rem' }}>
        <Typography variant='h5' component='div' sx={{ textAlign: 'center' }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label='Email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={handleOnChange}
            required
            fullWidth
            margin='normal'
          />
          <TextField
            label='Password'
            type='password'
            name='password'
            value={password}
            placeholder='Enter your password'
            onChange={handleOnChange}
            required
            fullWidth
            margin='normal'
          />
          <Button type='submit' variant='contained' color='primary' fullWidth sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
            Submit
          </Button>
          <Typography>
            Don't have an account? <Link to={'/signup'}>Signup</Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
