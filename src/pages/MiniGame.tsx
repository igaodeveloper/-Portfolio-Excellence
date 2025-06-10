import React from 'react';
import MemoryGame from '../components/minigame/MemoryGame';

const MiniGame: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <MemoryGame />
    </div>
  );
};

export default MiniGame; 