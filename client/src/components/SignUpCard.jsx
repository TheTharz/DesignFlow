import React from 'react';
import { useState } from 'react';
import signupValidation from '../constants/signUpValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SignUpCard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    userName: '',
    password: '',
    confirm_password: '',
  });
  const handleInput = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const [error, setError] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({});
    const validationErrors = signupValidation(data);
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { email, userName, password } = data;
      try {
        const user = await axios.post('/api/users/register', {
          email,
          userName,
          password,
        });

        console.log(user);
        setData({
          email: '',
          userName: '',
          password: '',
          confirm_password: '',
        });

        navigate('/signin');
      } catch (e) {
        if (e.response.data.message === 'User already exists') {
          setError({ email: 'User already exists' });
          console.log(e.response.data.message);
          toast.error(e.response.data.message, {
            duration: 5000,
            position: 'top-right',
          });
        }
      }
    }
  };

  return (
    <div className='bg-white h-[700px] w-[500px] rounded-[12px] m-4 p-4 shadow-lg'>
      <Toaster />
      <p className='text-3xl font-light py-4'>Welcome!</p>
      <p className='text-3xl font-normal py-4'>
        Sign up to <span className='text-3xl font-semibold'>DesignFlow</span>
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
            <label htmlFor='userName'>Username</label>
            <input
              type='text'
              name='userName'
              id='userName'
              className='border rounded px-4 py-2 border-border text-black focus:outline-none focus:border-lightgray'
              placeholder='Enter username'
              onChange={handleInput}
            />
            {error.userName && (
              <p className='text-red-500 text-xs'>{error.userName}</p>
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
          <div className='flex flex-col gap-1 py-2'>
            <label htmlFor='confirm_password'>Confirm Password</label>
            <input
              type='password'
              name='confirm_password'
              id='confirm_password'
              className='border rounded px-4 py-2 border-border text-black focus:outline-none focus:border-lightgray'
              placeholder='Confirm your password'
              onChange={handleInput}
            />
            {error.confirm_password && (
              <p className='text-red-500 text-xs'>{error.confirm_password}</p>
            )}
          </div>
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='w-[300px] bg-black text-white rounded-lg cursor-pointer m-2 p-2 h-12 text-16 font-medium'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <div className='flex justify-center'>
        <p className='text-lightText text-sm'>
          Already have an Account?{' '}
          <span
            className='text-black font-semibold cursor-pointer'
            onClick={() => {
              navigate('/signin');
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpCard;
