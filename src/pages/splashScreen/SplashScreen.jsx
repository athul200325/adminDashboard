import React, { useEffect } from 'react';
import './splashScreen.css'
import splashImg from '../../assets/splash.png'

const SplashScreen = ({ onSplashEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSplashEnd();  
    }, 1200); 

    return () => clearTimeout(timer); 
  }, [onSplashEnd]);

  return (
    <div className="splash-screen">
      <img className='img' src={splashImg} alt="" />
    </div>
  );
};

export default SplashScreen;
