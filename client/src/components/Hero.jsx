import React from 'react';
import HeroImage from '../assets/heroImage.jpg';
//import { useNavigate } from 'react-router-dom';
const Hero = () => {
  //const navigate = useNavigate();
  return (
    <div className='flex flex-row gap-4 m-2 p-2 justify-between font-Poppins items-center'>
      <div className='ml-10'>
        <h1 className='text-[40px] font-medium p-2'>
          Elevate Your Designs <br />
          with Experienced <br />
          <span className='text-yellow-400'>Graphic Designers</span>
        </h1>
        <p className='text-xl p-2'>
          Connect, collaborate, and share your designs with
          <br /> a community of experienced graphic designers.
        </p>
        <div className='p-2'>
          <button class='flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black px-7 py-3 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900'>
            Get Started
          </button>
        </div>
      </div>
      <div className='mr-10'>
        <img src={HeroImage} alt='HeroImage' width='600' height='500' />
      </div>
    </div>
  );
};

export default Hero;
