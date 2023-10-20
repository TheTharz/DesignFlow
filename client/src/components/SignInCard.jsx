import React, { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import signInValidation from '../constants/singInValidation';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import toast, { Toaster } from 'react-hot-toast';

const SignInCard = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const handleInput = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const [error, setError] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({});
    const validationErrors = signInValidation(data);
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { email, password } = data;
      try {
        const user = await axios.post('/api/users/login', {
          email,
          password,
        });

        console.log(user);
        setData({
          userName: '',
          password: '',
        });
        setUser(user.data.user);
        navigate('/');
      } catch (e) {
        console.log(e.response.data.message);
        if (e.response.data.message === 'Invalid credentials') {
          setError({ password: 'Password and email does not matching' });
          console.log(e.response.data.message);
          setData({
            ...data,
            password: '', // Clear the password field on error
          });
        }
        console.log(e.response.data.message);
        toast.error(e.response.data.message, {
          duration: 5000,
          position: 'top-right',
        });
      }
    }
  };

  return (
    <div className='bg-white h-[700px] w-[500px] rounded-[12px] m-4 p-4 shadow-lg'>
      <Toaster />
      <p className='text-3xl font-light py-4'>Welcome Back Designer!</p>
      <p className='text-3xl font-normal py-4'>
        Sign in to <br />
        <span className='text-3xl font-semibold py-2'>DesignFlow</span>
      </p>

      <div className='py-4'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1 py-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              className='border rounded px-4 py-2 border-border text-black focus:outline-none focus:border-lightgray'
              placeholder='Enter your email'
              onChange={handleInput}
            />
            {error.email && (
              <p className='text-red-500 text-xs'>{error.email}</p>
            )}
          </div>
          <div className='flex flex-col gap-1 py-2'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              className='border rounded px-4 py-2 border-border text-black focus:outline-none focus:border-lightgray'
              placeholder='Enter your password'
              onChange={handleInput}
            />
            {error.password && (
              <p className='text-red-500 text-xs'>{error.password}</p>
            )}
          </div>
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='w-[300px] bg-black text-white rounded-lg cursor-pointer m-4 p-2 h-12 text-16 font-medium'
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className='flex justify-center'>
        <p className='text-lightText text-sm'>
          Don't have an Account?{' '}
          <span
            className='text-black font-semibold cursor-pointer'
            onClick={() => {
              navigate('/signup');
            }}
          >
            Signup Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInCard;
