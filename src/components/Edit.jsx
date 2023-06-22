import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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

  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:8000/listings/${id}`, formData)  
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

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this listing?');
    if (confirmed) {
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
    <div>
      <h3 className="edit">Edit Listing</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="address">address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <label htmlFor="apt_num">apt_num</label>
        <input
          type="text"
          name="apt_num"
          id="apt_num"
          value={formData.apt_num}
          onChange={handleChange}
          required
        />
        <label htmlFor="city">city</label>
        <input
          type="text"
          name="city"
          id="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <label htmlFor="state">state</label>
        <input
          type="text"
          name="state"
          id="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <label htmlFor="zip_code">zip_code</label>
        <input
          type="text"
          name="zip_code"
          id="zip_code"
          value={formData.zip_code}
          onChange={handleChange}
          required
        />
        <label htmlFor="neighborhood">neighborhood</label>
        <input
          type="text"
          name="neighborhood"
          id="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          required
        />
        <label htmlFor="borough">borough</label>
        <input
          type="text"
          name="borough"
          id="borough"
          value={formData.borough}
          onChange={handleChange}
          required
        />
        <label htmlFor="status">status</label>
        <input
          type="text"
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
          required
        />
        <label htmlFor="property_type">property_type</label>
        <input
          type="text"
          name="property_type"
          id="property_type"
          value={formData.property_type}
          onChange={handleChange}
          required
        />
        <label htmlFor="bedrooms">bedrooms</label>
        <input
          type="text"
          name="bedrooms"
          id="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          required
        />
        <label htmlFor="bathrooms">bathrooms</label>
        <input
          type="text"
          name="bathrooms"
          id="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          required
        />
        <label htmlFor="price">price</label>
        <input
          type="text"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <label htmlFor="square_feet">square_feet</label>
        <input
          type="text"
          name="square_feet"
          id="square_feet"
          value={formData.square_feet}
          onChange={handleChange}
          required
        />
        <label htmlFor="price_per_sq_ft">price_per_sq_ft</label>
        <input
          type="text"
          name="price_per_sq_ft"
          id="price_per_sq_ft"
          value={formData.price_per_sq_ft}
          onChange={handleChange}
        />
        <label htmlFor="description">listing description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="image_url">image_url</label>
        <input
          type="text"
          name="image_url"
          id="image_url"
          value={formData.image_url}
          onChange={handleChange}
        />
      </form>
      <button type="submit" onClick={handleSubmit}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Edit;
