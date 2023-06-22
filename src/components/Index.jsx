import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

const API_BASE_URL = 'http://localhost:8000';

const Index = () => {
  const [listings, setListings] = useState([]);

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
      <Paper elevation={3}>
        <Box p={2}>
          <Table stickyHeader>
            <TableHead>
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
                          className='thumbnail'
                          style={{ width: '80px', height: 'auto' }}
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
                  <TableCell colSpan={11}>No listings available.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </div>
  );
};

export default Index;
