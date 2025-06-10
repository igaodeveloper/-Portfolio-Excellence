import React, { useState, useEffect } from 'react';
import AnimatedParticles from '../AnimatedParticles';
import './MemoryGame.css';

const cardImages = [
  '🍎', '🍌', '🍇', '🍉', '🍒', '🍋',
];

function shuffleArray(array: any[]) {
  return array
    .concat(array)
    .sort(() => Math.random() - 0.5)
    .map((item, i) => ({ id: i, value: item, flipped: false, matched: false }));
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setCards(shuffleArray(cardImages));
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      const [first, second] = flipped;
      if (cards[first].value === cards[second].value) {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, matched: true } : card
          ));
          setFlipped([]);
          setMatchedCount(m => m + 1);
          setDisabled(false);
        }, 800);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, flipped: false } : card
          ));
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  }, [flipped, cards]);

  const handleCardClick = (idx: number) => {
    if (disabled || cards[idx].flipped || cards[idx].matched) return;
    setCards(prev => prev.map((card, i) =>
      i === idx ? { ...card, flipped: true } : card
    ));
    setFlipped(f => [...f, idx]);
  };

  const handleRestart = () => {
    setCards(shuffleArray(cardImages));
    setFlipped([]);
    setMatchedCount(0);
    setDisabled(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden minigame-hero-bg">
      <AnimatedParticles />
      <div className="z-10 memory-game-container">
        <h2>Jogo da Memória</h2>
        <button onClick={handleRestart} className="restart-btn">Reiniciar</button>
        <div className="memory-game-grid">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''}`}
              onClick={() => handleCardClick(idx)}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">{card.value}</div>
              </div>
            </div>
          ))}
        </div>
        {matchedCount === cardImages.length && (
          <div className="win-message">Parabéns! Você encontrou todos os pares! 🎉</div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame; 