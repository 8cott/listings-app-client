import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TypoDivider from './TypoDivider';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ViewList, ViewModule } from '@mui/icons-material';
import './Index.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Index = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [listings, setListings] = useState([]);
  const [viewMode, setViewMode] = useState('module');

  // Sets the view mode to module if the screen size is small
  useEffect(() => {
    if (isSmallScreen) {
      setViewMode('module');
    }
  }, [isSmallScreen]);

  // Sets the view mode to list if the screen size is large
  const handleViewModule = () => {
    setViewMode('module');
  };

  // Sets the view mode to module if the screen size is small
  const handleViewList = () => {
    setViewMode('list');
  };

  // Fetch all listings from the database
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/listings`)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setListings(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);



  return (
    <div>
      <Paper elevation={3} className='index-paper'>
        <Box p={2} className='index-box'>
          <Typography variant='h5' component='div' className='index-typo'>
            Scott's Listings
          </Typography>
          <div>
            <IconButton
              onClick={handleViewModule}
              disabled={viewMode === 'module'}
            >
              <ViewModule className='index-view-module' />
            </IconButton>
            <IconButton onClick={handleViewList} disabled={viewMode === 'list'}>
              <ViewList className='index-view-list' />
            </IconButton>
          </div>
        </Box>
      </Paper>

      <Paper elevation={3}>
        <Box p={2}>
          {viewMode === 'list' ? (
            <Table stickyHeader>
              <TableHead className='index-table-head'>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Apt</TableCell>
                  <TableCell>Neighborhood</TableCell>
                  <TableCell>Borough</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Bedrooms</TableCell>
                  <TableCell>Bathrooms</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Sq Feet</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(listings) ? (
                  listings.map((listing, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Link to={`/listings/${listing._id}`}>
                          <img
                            src={listing.image_url}
                            alt='Listing Image'
                            className='index-table-image'
                          />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/listings/${listing._id}`}>
                          {listing.address}
                        </Link>
                      </TableCell>
                      <TableCell>{listing.apt_num}</TableCell>
                      <TableCell>{listing.neighborhood}</TableCell>
                      <TableCell>{listing.borough}</TableCell>
                      <TableCell>{listing.status}</TableCell>
                      <TableCell>{listing.property_type}</TableCell>
                      <TableCell>{listing.bedrooms}</TableCell>
                      <TableCell>{listing.bathrooms}</TableCell>
                      <TableCell>{listing.price}</TableCell>
                      <TableCell>{listing.square_feet}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className='index-table-row'>
                      No listings available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <Grid container spacing={2}>
              {Array.isArray(listings) && listings.length > 0 ? (
                listings.map((listing, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Link
                      to={`/listings/${listing._id}`}
                      className='index-card-link'
                    >
                      <Card className='index-card'>
                        <img
                          className='index-card-img'
                          src={listing.image_url}
                          title='listing image'
                          alt='listing image'
                        />
                        <CardContent className='index-card-content'>
                          <TypoDivider variant='h6'>
                            {listing.address}, Apt {listing.apt_num}
                          </TypoDivider>
                          <TypoDivider variant='body2'>
                            {listing.status}
                          </TypoDivider>
                          <TypoDivider variant='body2'>
                            {listing.city}, {listing.state} {listing.zip_code}
                          </TypoDivider>
                          <TypoDivider variant='body2'>
                            {listing.neighborhood} / {listing.borough}
                          </TypoDivider>
                          <TypoDivider variant='body2'>
                            {listing.property_type}
                          </TypoDivider>
                          <TypoDivider variant='body2'>
                            Bedrooms: {listing.bedrooms} Bathrooms:{' '}
                            {listing.bathrooms}
                          </TypoDivider>
                          <TypoDivider variant='body2'>
                            Price: {listing.price}
                          </TypoDivider>
                          <TypoDivider variant='body2'>
                            Square Feet: {listing.square_feet} | Price Per SqFt:{' '}
                            {listing.price_per_sq_ft}
                          </TypoDivider>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))
              ) : (
                <Typography variant='body1'>No listings available.</Typography>
              )}
            </Grid>
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default Index;
