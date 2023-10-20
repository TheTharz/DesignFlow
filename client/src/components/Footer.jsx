import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { SlSocialDribbble } from 'react-icons/sl';
import ContactUs from '../additional/ContactUs';
import {
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialPinterest,
} from 'react-icons/ti';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Footer = () => {
  const [showContact, setShowContact] = useState(false);
  return (
    <div className='w-full h-[300px] bg-gray-200 flex flex-row justify-between items-center px-8'>
      <div className='px-8'>
        <img src={logo} alt='logo' width='300' height='300' />
      </div>
      <div className='flex flex-col gap-3 px-8'>
        <div className='flex flex-row gap-8 font-semibold p-4'>
          <Link to='/about'>About</Link>
          <Link to='/services'>Services</Link>
          <p onClick={() => setShowContact(true)}>Contact Us</p>
          <Link to='/privacy'>Privacy</Link>
        </div>
        <div className='flex flex-row gap-3 p-4'>
          <SlSocialDribbble size={35} />
          <TiSocialTwitter size={35} />
          <TiSocialFacebook size={35} />
          <TiSocialInstagram size={35} />
          <TiSocialPinterest size={35} />
        </div>
        <div className='p-4'>
          <p>
            Designed By ©Tharindu Imalka.
            <br />
            All rights reserved.
          </p>
        </div>
      </div>
      {showContact && <ContactUs setShowContact={setShowContact} />}
    </div>
  );
};

export default Footer;
