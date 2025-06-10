import React from 'react';
import SuperFrontEndQuiz from '../components/minigame/SuperFrontEndQuiz';
import '../components/minigame/SuperFrontEndQuiz.css';

const SuperMinigame: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <SuperFrontEndQuiz />
    </div>
  );
};

export default SuperMinigame; 