import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import GoogleMap from './GoogleMap';
import TypoDivider from './TypoDivider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { toast } from 'react-toastify';
import './Show.css';

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

  // Handle delete confirmation
  const handleConfirm = () => {
    setOpen(false);
    axios
      .delete(`${API_BASE_URL}/listings/${id}`)
      .then((response) => {
        console.log(response.data);
        toast.success('Listing successfully deleted!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Failed to delete listing. Please try again.');
        setError('Failed to delete listing. Please try again.');
      });
  };
  
  // Handle delete cancellation
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className='show-div'>
      <Card className='show-card'>
        <img
          className='show-card-img'
          src={listing.image_url}
          title='listing image'
          alt='listing image'
        />
        <CardContent className='show-card-content'>
          <TypoDivider variant='h4'>
            {listing.address}, Apt {listing.apt_num}
          </TypoDivider>
          <TypoDivider variant='h6'>{listing.status}</TypoDivider>
          <TypoDivider variant='h6'>
            {listing.city}, {listing.state} {listing.zip_code}
          </TypoDivider>
          <TypoDivider variant='h6'>
            {listing.neighborhood} / {listing.borough}
          </TypoDivider>
          <TypoDivider variant='h6'>{listing.property_type}</TypoDivider>
          <TypoDivider variant='h6'>
            Bedrooms: {listing.bedrooms} Bathrooms: {listing.bathrooms}
          </TypoDivider>
          <TypoDivider variant='h6'>Price: {listing.price}</TypoDivider>
          <TypoDivider variant='h6'>
            Square Feet: {listing.square_feet} | Price Per SqFt:{' '}
            {listing.price_per_sq_ft}
          </TypoDivider>
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
        <CardActions className='show-card-actions'>
          <Button
            size='large'
            onClick={() => navigate(`/listings/${id}/edit`)}
            disabled={!isLoggedIn}
          >
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
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Are you sure you want to delete this listing?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Once deleted, you will not be able to recover this listing.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirm} color='primary' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Show;
