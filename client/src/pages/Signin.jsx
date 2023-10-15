import React from 'react';
import BackgroundImage from '../assets/background.png';
import Logo from '../assets/logo.png';
import SignInCard from '../components/SignInCard';

const Signin = () => {
  return (
    <div
      className='h-screen w-full flex flex-row justify-around items-center font-Poppins relative gap-4 p-4'
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Semi-transparent overlay */}
      <div className='absolute inset-0 bg-black opacity-50'></div>
      {/*For the logo*/}
      <div className='flex justify-center items-center h-screen'>
        <img src={Logo} alt='logo' className='w-[700px] h-screen' />
      </div>
      {/*For the signup card*/}
      <div className='z-10'>
        <SignInCard />
      </div>
    </div>
  );
};

export default Signin;
