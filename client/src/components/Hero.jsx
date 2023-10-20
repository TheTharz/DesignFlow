import React from 'react';
import HeroImage from '../assets/heroImage.jpg';
import HeroAnimation from './animation/HeroAnimation';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
//import { useNavigate } from 'react-router-dom';
const Hero = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  //const navigate = useNavigate();
  return (
    <div className='flex flex-row gap-4 m-2 p-2 justify-between font-Poppins items-center'>
      <div className='ml-10'>
        <HeroAnimation />
        <div className='p-2'>
          <button
            class='flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-7 py-3 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900'
            onClick={() => {
              try {
                if (user) {
                  navigate('/myprofile');
                } else {
                  navigate('/signin');
                }
              } catch (error) {
                toast.error(error.message, {
                  duration: 2000,
                  position: 'top-right',
                });
              }
            }}
          >
            Get Started
          </button>
        </div>
      </div>
      <div className='mr-10'>
        <img src={HeroImage} alt='HeroImage' width='600' height='500' />
      </div>
      <Toaster />
    </div>
  );
};

export default Hero;
