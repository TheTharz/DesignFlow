import React, { useState } from 'react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
const ContactUs = ({ setShowContact }) => {
  const form = useRef();
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_uwuuxie',
        'template_u2wo0kq',
        form.current,
        'F-xseGMeq1KZAaPM6'
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log(form.current);
          toast.success('Email sent successfully', { duration: 3000 });
          setShowContact(false);
          setSending(false);
        },
        (error) => {
          console.log(error.text);
          toast.error('Failed to send email');
          setSending(false);
        }
      );
  };

  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50 block'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-[16px] font-medium p-2'>Want to contact us?</h1>
        <form ref={form} onSubmit={sendEmail}>
          <div className='flex flex-col justify-center items-center gap-3'>
            <div className='flex flex-row gap-2'>
              <label>Name</label>
              <input
                type='text'
                name='user_name'
                className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='flex flex-row gap-2'>
              <label>Email</label>
              <input
                type='email'
                name='user_email'
                className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='flex flex-row gap-2'>
              <label>Message</label>
              <textarea
                name='message'
                className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
              />
            </div>
          </div>
          <div className='flex flex-row justify-center items-center gap-2 p-2'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
              onClick={() => {
                setSending(true);
              }}
            >
              {sending ? 'sending' : 'Send'}
            </button>
            <button
              onClick={() => {
                setShowContact(false);
              }}
              className='bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400'
            >
              Cancel
            </button>
            <Toaster position='top-right' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
