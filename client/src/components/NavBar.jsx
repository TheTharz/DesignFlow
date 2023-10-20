import React from 'react';
import logoImageOnly from '../assets/logoImageOnly.png';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import PostUploadCard from './PostUploadCard';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    try {
      axios.post('/api/users/logout');
      setUser(null);
      navigate('/');
      toast.success('Logged Out Successfully', {
        duration: 2000,
        position: 'top-right',
      });

      window.location.reload();
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
        position: 'top-right',
      });
      if (error.response.status === 401 || error.response.status === 400) {
        setUser(null);
        navigate('/signin');
      }
    }
  };

  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    navigate('/search/' + search);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setSelected(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const navigateProfile = () => {
    if (user) {
      navigate('/myprofile');
    } else {
      navigate('/signin');
    }
  };

  return (
    <div className='font-Poppins flex flex-row m-2 justify-between items-center w-[85%]'>
      <Toaster />
      <div
        className='p-2 flex flex-row items-center gap-3'
        onClick={() => {
          navigate('/');
        }}
      >
        <img src={logoImageOnly} alt='logo' className='w-12 h-8' />
        <h1 className='text-xl font-semibold'>DesignFlow</h1>
      </div>

      <div className='flex-grow'></div>

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
            try {
              setSearch(e.target.value);
            } catch (error) {
              toast.error(error.message, {
                duration: 2000,
                position: 'top-right',
              });
            }
          }}
        />
      </div>

      <div className='flex-grow'></div>

      {user ? (
        <div className='flex flex-row items-center gap-5'>
          <button
            className='bg-white text-black rounded-lg cursor-pointer m-2 p-2 h-12 text-[12px] font-medium w-[150px] border-2 border-black'
            onClick={() => {
              setSelected(true);
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
              if (user) {
                navigate('/myprofile/' + user._id);
              } else {
                toast.error('Please Log In', {
                  duration: 2000,
                  position: 'top-right',
                });
                navigate('/signin');
              }
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
      <div>{selected && <PostUploadCard setSelected={setSelected} />}</div>
    </div>
  );
};

export default NavBar;
