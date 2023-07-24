import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });

  const { email, password, username, confirmPassword } = inputValue;

  // Handle form input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => toast.error(err, {});

  const handleSuccess = (msg) => toast.success('Signed up successfully');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      handleError("Passwords don't match!");
      return;
    }

    try {
      const { data } = await axios.post(
        'http://localhost:8000/signup',
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
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
      username: '',
      confirmPassword: '',
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
        marginTop: '-24em',
      }}
    >
      <Paper elevation={3} sx={{ width: '75%', maxWidth: '400px', padding: '1rem' }}>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom:"1rem" }}>
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleOnChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Enter your password again"
                onChange={handleOnChange}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <br />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginBottom: '1rem' }}>
            Submit
          </Button>
          <Typography>
            Already have an account? <Link to={'/login'}>Login</Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
