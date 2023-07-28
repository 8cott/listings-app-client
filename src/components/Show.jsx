import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import GoogleMap from './GoogleMap';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [open, setOpen] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);

  // Fetch listing data from API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/listings/${id}`)
      .then((response) => {
        setListing(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  if (listing === null) {
    return <div>Loading...</div>;
  }

  // Handle delete listing
  const handleDelete = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    setOpen(false);
    axios
      .delete(`${API_BASE_URL}/listings/${id}`)
      .then((response) => {
        console.log(response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to delete listing. Please try again.');
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card sx={{ maxWidth: '50rem' }}>
        <img
          style={{ width: '100%', objectFit: 'contain' }}
          src={listing.image_url}
          title='listing image'
          alt='listing image'
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography
            gutterBottom
            variant='h1'
            component='div'
            sx={{ fontWeight: 'bold', fontSize: '2rem' }}
          >
            {listing.address}, Apt {listing.apt_num}
          </Typography>
          <Divider />
          <Typography gutterBottom variant='h6' component='div'>
            {listing.status}
          </Typography>
          <Divider />
          <Typography gutterBottom variant='h6' component='div'>
            {listing.city}, {listing.state} {listing.zip_code}
          </Typography>
          <Divider />
          <Typography gutterBottom variant='h6' component='div'>
            {listing.neighborhood} / {listing.borough}
          </Typography>
          <Divider />
          <Typography gutterBottom variant='h6' component='div'>
            {listing.property_type}
          </Typography>
          <Divider />
          <Typography gutterBottom variant='h6' component='div'>
            Bedrooms: {listing.bedrooms} Bathrooms: {listing.bathrooms}
          </Typography>
          <Divider />
          <Typography gutterBottom variant='h6' component='div'>
            Price: {listing.price}
          </Typography>
          <Divider />
          <Typography gutterBottom variant='h6' component='div'>
            Square Feet: {listing.square_feet} | Price Per SqFt:{' '}
            {listing.price_per_sq_ft}
          </Typography>
          <Divider />
          <Typography
            variant='body1'
            color='text.secondary'
            fontSize='1rem'
            padding='1rem'
          >
            {listing.description}
          </Typography>
          <Divider />
          <GoogleMap
            address={listing.address}
            city={listing.city}
            state={listing.state}
            zipCode={listing.zip_code}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button size='large' onClick={() => navigate(`/listings/${id}/edit`)} disabled={!isLoggedIn}>
            Edit
          </Button>
          <Button size='large' onClick={handleDelete} disabled={!isLoggedIn}>
            Delete
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this listing?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, you will not be able to recover this listing.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Show;
