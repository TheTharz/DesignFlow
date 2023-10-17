import React from 'react';
import logoImageOnly from '../assets/logoImageOnly.png';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';
const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    axios.post('/api/users/logout');
    setUser(null);
    navigate('/');
  };
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    navigate('/search/' + search);
  };
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {user ? (
        <div className='flex flex-row items-center gap-5'>
          <button
            className='bg-white text-black rounded-lg cursor-pointer m-2 p-2 h-12 text-[12px] font-medium w-[150px] border-2 border-black'
            onClick={() => {
              navigate('/upload');
            }}
          >
            Share Your Work +
          </button>

          <img
            src={user.profilePicture}
            alt='profile'
            className='rounded-[25px] cursor-pointer'
            width={50}
            height={50}
            onClick={() => {
              navigate('/myprofile');
            }}
          />
          <button
            className='bg-white text-black rounded-lg cursor-pointer m-2 p-2 h-12 text-16 font-medium w-[100px]'
            onClick={(e) => {
              handleLogOut(e);
            }}
          >
            Log Out
          </button>
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
