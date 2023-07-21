import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';

const Edit = () => {
  const { id } = useParams();
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

  const API_BASE_URL = process.env.VITE_API_BASE_URL || '';  const { isLoggedIn, user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.warning('You must be logged in to access this page', {
        toastId: 'login-toast',
      });
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Fetch listing data from API
  useEffect(() => {
    axios
      .get(`http://localhost:8000/listings/${id}`)
      .then((response) => {
        const listingData = response.data;
        setFormData(listingData);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to fetch listing data. Please try again.');
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSuccess = (msg) => {
    toast.success('Listing Updated!');
  };

  const handleError = (err) => {
    toast.error('Error Updating Listing!');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send PUT request to API to update listing
    axios
      .put(`${API_BASE_URL}/listings/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        navigate(`/listings/${id}`);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to update listing. Please try again.');
      });
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  // Handle delete listing
  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this listing?'
    );
    if (confirmed) {
      // Send DELETE request to API to delete listing
      axios
        .delete(`http://localhost:8000/listings/${id}`)
        .then((response) => {
          console.log(response.data);
          navigate('/');
        })
        .catch((error) => {
          console.error('Error:', error);
          setError('Failed to delete listing. Please try again.');
        });
    }
  };

  return (
    <Box sx={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
      <Paper elevation={3} sx={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <Box p={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            Edit Listing
          </Typography>
        </Box>
      </Paper>
      {error && <Typography className="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Apartment Number"
              name="apt_num"
              value={formData.apt_num}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Zip Code"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Neighborhood"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Borough"
              name="borough"
              value={formData.borough}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Property Type"
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Square Feet"
              name="square_feet"
              value={formData.square_feet}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Price per Sq. Ft."
              name="price_per_sq_ft"
              value={formData.price_per_sq_ft}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Listing Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Image URL"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <br />
        <Box sx={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginRight: '0.5rem' }}
          >
            Update
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Edit;
