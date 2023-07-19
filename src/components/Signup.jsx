import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });

  const { email, password, username, confirmPassword } = inputValue;

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
    <div className='form_container'>
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            value={username}
            placeholder='Enter your username'
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Enter your password'
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Enter your password again'
            onChange={handleOnChange}
          />
        </div>
        <button type='submit'>Submit</button>
        <span>
          Already have an account? <Link to={'/login'}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
