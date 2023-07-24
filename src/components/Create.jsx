import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Create = () => {
  const [formData, setFormData] = useState({
    address: '',
    apt_num: '',
    city: '',
    state: '',
    zip_code: '',
    neighborhood: '',
    borough: '',
    status: '',
    property_type: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    square_feet: '',
    price_per_sq_ft: '',
    description: '',
    image_url: '',
  });

  const { isLoggedIn, user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    if (!isLoggedIn) {
      toast.warning('You must be logged in to access this page', {
        toastId: 'login-toast',
      });
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSuccess = (msg) => {
    toast.success('Listing Created!');
  };

  const handleError = (err) => {
    toast.error('Error Creating Listing!');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send POST request to API to create new listing
    axios
      .post(`${API_BASE_URL}/listings/`, formData)
      .then((response) => {
        console.log(response.data);
        navigate(`/listings/${response.data._id}`);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response) {
          if (error.response.status === 400) {
            setError('Invalid form data. Please check your inputs.');
          } else if (error.response.status === 500) {
            setError('Internal server error. Please try again later.');
          } else {
            setError('An error occurred. Please try again.');
          }
        } else if (error.request) {
          setError('No response from the server. Please try again later.');
        } else {
          setError('An error occurred. Please try again.');
        }
      });
  };

  return (
    <Box sx={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
      <Paper elevation={3} sx={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <Box p={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant='h5'
            component='div'
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            Create Listing
          </Typography>
        </Box>
      </Paper>
      {error && <Typography className='error'>{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Apartment Number'
              name='apt_num'
              value={formData.apt_num}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='City'
              name='city'
              value={formData.city}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='State'
              name='state'
              value={formData.state}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Zip Code'
              name='zip_code'
              value={formData.zip_code}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Neighborhood'
              name='neighborhood'
              value={formData.neighborhood}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Borough'
              name='borough'
              value={formData.borough}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Status'
              name='status'
              value={formData.status}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Property Type'
              name='property_type'
              value={formData.property_type}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Bedrooms'
              name='bedrooms'
              value={formData.bedrooms}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Bathrooms'
              name='bathrooms'
              value={formData.bathrooms}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Price'
              name='price'
              value={formData.price}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Square Feet'
              name='square_feet'
              value={formData.square_feet}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Price per Sq. Ft.'
              name='price_per_sq_ft'
              value={formData.price_per_sq_ft}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Listing Description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label='Image URL'
              name='image_url'
              value={formData.image_url}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <br />
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Create;
