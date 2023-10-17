import React from 'react';
import logoImageOnly from '../assets/logoImageOnly.png';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
const NavBar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className='font-Poppins flex flex-row m-2 justify-between items-center'>
      <div
        className='p-2 flex flex-row items-center gap-3'
        onClick={() => {
          navigate('/');
        }}
      >
        <img src={logoImageOnly} alt='logo' className='w-12 h-8' />
        <h1 className='text-xl font-semibold'>DesignFlow</h1>
      </div>

      <div className='bg-gray-200 rounded-full flex items-center p-2 w-[500px] h-[50px]'>
        <AiOutlineSearch size={25} />
        <input
          className='bg-transparent p-2 focus:outline-none'
          type='text'
          placeholder='Search'
        />
      </div>
      {user ? (
        <div className='flex flex-row'>
          <button
            className='bg-white text-black rounded-lg cursor-pointer m-2 p-2 h-12 text-16 font-medium w-[200px]'
            onClick={() => {
              navigate('/upload');
            }}
          >
            Share Your Work +
          </button>
          <p
            className='m-2 p-2'
            onClick={() => {
              navigate('/profile');
            }}
          >
            {user.userName}
          </p>
        </div>
      ) : (
        <div>
          <button
            className='bg-black text-white rounded-lg cursor-pointer m-2 p-2 h-12 text-16 font-medium w-[100px]'
            onClick={() => {
              navigate('/signup');
            }}
          >
            Sign Up
          </button>
          <button
            className='bg-white text-black rounded-lg cursor-pointer m-2 p-2 h-12 text-16 font-medium w-[100px]'
            onClick={() => {
              navigate('/signin');
            }}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
