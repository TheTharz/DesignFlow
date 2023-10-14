import React from 'react';
import BackgroundImage from '../assets/background.png';
import SignUpCard from '../components/SignUpCard';
import Logo from '../assets/logo.png';
const Signup = () => {
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
        <SignUpCard />
      </div>
    </div>
  );
};

export default Signup;
