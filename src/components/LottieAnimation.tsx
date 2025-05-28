import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/lottie/success.json';

export const LottieAnimation = () => (
  <div className="w-32 h-32 mx-auto">
    <Lottie animationData={animationData} loop={true} />
  </div>
); 