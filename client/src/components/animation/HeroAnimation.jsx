import React from 'react';
import { TypeAnimation } from 'react-type-animation';
const HeroAnimation = () => {
  return (
    <div>
      <h1 className='text-[40px] font-medium p-2'>
        Elevate Your Designs <br />
        with Experienced <br />
        <TypeAnimation
          sequence={[
            ' Graphic Designers.',
            2000,
            ' Web Designers.',
            2000,
            ' UX/UI designers.',
            2000,
            ' Illustrators.',
            2000,
            ' Animators.',
            2000,
          ]}
          wrapper='span'
          speed={20}
          repeat={Infinity}
          className='text-yellow-400'
        />
      </h1>
      <p className='text-xl p-2'>
        Connect, collaborate, and share your designs with <br />a community of
        experienced designers from all over the world.
      </p>
    </div>
  );
};

export default HeroAnimation;
